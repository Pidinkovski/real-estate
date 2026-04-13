import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { SITE_CONTACT_EMAIL } from '@/lib/site';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function clamp(s: unknown, max: number): string {
  if (typeof s !== 'string') return '';
  return s.trim().slice(0, max);
}

export type ContactResult =
  | { ok: true; autoReplySent: boolean }
  | { ok: false; status: number; error: string; details?: string };

function resendErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
    return (err as { message: string }).message;
  }
  return String(err);
}

/** UI may send `en`, `EN`, or `en-GB`; anything else defaults to Bulgarian templates. */
function resolveContactLang(body: Record<string, unknown>): 'en' | 'bg' {
  const v = body.lang;
  if (typeof v !== 'string') return 'bg';
  const s = v.trim().toLowerCase();
  if (s === 'en' || s.startsWith('en-')) return 'en';
  return 'bg';
}

export async function processContactSubmission(body: Record<string, unknown>): Promise<ContactResult> {
  const name = clamp(body.name, 200);
  const email = clamp(body.email, 200);
  const phone = clamp(body.phone, 80);
  const project_type = clamp(body.project_type, 120);
  const budget_range = clamp(body.budget_range, 80);
  const message = clamp(body.message, 8000);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: 'Invalid name or email' };
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return { ok: false, status: 503, error: 'Email not configured' };
  }

  /** Team inbox: `CONTACT_TO_EMAIL` on the server, else same public address (defaults to info@virtusdecora.com). */
  const to = process.env.CONTACT_TO_EMAIL?.trim() || SITE_CONTACT_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || 'Virtus Decora <onboarding@resend.dev>';

  const phoneDisplay = phone || '—';
  const projectTypeDisplay = project_type || '—';
  const budgetDisplay = budget_range || '—';
  const messageDisplay = message || '—';

  const mailHref = `mailto:${email}?subject=${encodeURIComponent(`Re: Virtus Decora inquiry — ${name}`)}`;
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : '';

  const teamText = [
    'New consultation request (website form)',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phoneDisplay}`,
    `Project type: ${projectTypeDisplay}`,
    `Budget: ${budgetDisplay}`,
    '',
    'Message:',
    messageDisplay,
    '',
    'Reply directly to this email — Reply-To is set to the client address.',
  ].join('\n');

  const resend = new Resend(resendKey);
  const { error: emailError } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Website inquiry — ${name}`,
    text: teamText,
    html: `
        <div style="background-color:#0f172a;padding:28px 24px;font-family:system-ui,-apple-system,sans-serif;color:#ffffff;">
        <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;color:#ffffff;">New consultation request</h2>
        <p style="font-size:13px;line-height:1.5;color:#e2e8f0;margin:0 0 16px;">Sent from the Virtus Decora site contact form. <strong style="color:#ffffff;">Reply</strong> uses the client’s email (<code style="background:#1e293b;padding:2px 6px;border-radius:4px;font-size:12px;color:#f8fafc;">${escapeHtml(
          email
        )}</code>).</p>
        <table style="font-size:14px;line-height:1.6;color:#ffffff;border-collapse:collapse;">
          <tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#cbd5e1;"><strong style="color:#ffffff;">Name</strong></td><td style="padding:6px 0;color:#ffffff;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#cbd5e1;"><strong style="color:#ffffff;">Email</strong></td><td style="padding:6px 0;"><a href="${escapeAttr(mailHref)}" style="color:#c6a35a;text-decoration:underline;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#cbd5e1;"><strong style="color:#ffffff;">Phone</strong></td><td style="padding:6px 0;">${
            phone && telHref.length > 4
              ? `<a href="${escapeAttr(telHref)}" style="color:#c6a35a;text-decoration:underline;">${escapeHtml(phone)}</a>`
              : `<span style="color:#ffffff;">${escapeHtml(phoneDisplay)}</span>`
          }</td></tr>
          <tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#cbd5e1;"><strong style="color:#ffffff;">Project type</strong></td><td style="padding:6px 0;color:#ffffff;">${escapeHtml(projectTypeDisplay)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#cbd5e1;"><strong style="color:#ffffff;">Budget</strong></td><td style="padding:6px 0;color:#ffffff;">${escapeHtml(budgetDisplay)}</td></tr>
        </table>
        <p style="font-size:14px;margin:20px 0 8px;color:#ffffff;"><strong>Project description</strong></p>
        <pre style="font-size:14px;line-height:1.5;white-space:pre-wrap;background:#1e293b;color:#f8fafc;padding:14px;border-radius:8px;margin:0;border:1px solid #334155;">${escapeHtml(
          messageDisplay
        )}</pre>
        </div>
      `,
  });

  if (emailError) {
    const details = resendErrorMessage(emailError);
    console.error('[contact] Resend:', emailError);
    return { ok: false, status: 502, error: 'Failed to send email', details };
  }

  const lang = resolveContactLang(body);
  const autoReply =
    lang === 'en'
      ? {
          // Neutral subject + plain “receipt” HTML: dark promo-style layouts often score as bulk mail.
          subject: 'Contact form on virtusdecora.com',
          text: [
            `Hello ${name},`,
            '',
            'This is an automatic message to confirm we received your message via the contact form on virtusdecora.com.',
            '',
            'We will reply within 24 hours using the email address you entered on the form.',
            '',
            'If you did not fill in our contact form, you can ignore this email.',
            '',
            'Virtus Decora',
          ].join('\n'),
          html: `
              <div style="margin:0;padding:0;font-family:Georgia,'Times New Roman',Times,serif;font-size:16px;line-height:1.55;color:#111827;background:#ffffff;">
              <p style="margin:0 0 16px;">Hello ${escapeHtml(name)},</p>
              <p style="margin:0 0 16px;">This is an automatic message to confirm we received your message via the contact form on <a href="https://virtusdecora.com" style="color:#111827;text-decoration:underline;">virtusdecora.com</a>.</p>
              <p style="margin:0 0 16px;">We will reply within 24 hours using the email address you entered on the form.</p>
              <p style="margin:0 0 20px;font-size:14px;line-height:1.5;color:#4b5563;">If you did not fill in our contact form, you can ignore this email.</p>
              <p style="margin:0;font-size:15px;color:#111827;">Virtus Decora</p>
              </div>
            `,
        }
      : {
          subject: 'Благодарим за запитването — Virtus Decora',
          text: [
            `Здравейте, ${name}!`,
            '',
            'Благодарим ви, че се свързахте с Virtus Decora. Получихме вашето запитване и колега от екипа ни ще се свърже с вас в рамките на 24 часа.',
            '',
            'Поздрави,',
            'Екипът на Virtus Decora',
          ].join('\n'),
          html: `
              <div style="background-color:#0f172a;padding:28px 24px;font-family:system-ui,-apple-system,sans-serif;color:#ffffff;">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#ffffff;">Здравейте, ${escapeHtml(name)}!</p>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#ffffff;">
                Благодарим ви, че се свързахте с Virtus Decora. Получихме вашето запитване и колега от екипа ни ще се свърже с вас в рамките на <strong style="color:#ffffff;">24 часа</strong>.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#ffffff;">
                Поздрави,<br />
                Екипът на Virtus Decora
              </p>
              </div>
            `,
        };

  const autoReplyResult = await resend.emails.send({
    from,
    to: [email],
    replyTo: to,
    subject: autoReply.subject,
    text: autoReply.text,
    html: autoReply.html,
    headers: {
      'Auto-Submitted': 'auto-generated',
    },
    tags: [{ name: 'type', value: 'contact-autoreply' }],
  });

  const autoReplyError = autoReplyResult.error;
  const autoReplyId =
    autoReplyResult.data && typeof autoReplyResult.data === 'object' && 'id' in autoReplyResult.data
      ? String((autoReplyResult.data as { id: unknown }).id)
      : '';

  let autoReplySent = !autoReplyError && autoReplyId.length > 0;
  if (autoReplyError) {
    const autoDetails = resendErrorMessage(autoReplyError);
    console.error('[contact] Auto-reply Resend:', autoReplyError, autoDetails);
  } else if (!autoReplyId) {
    console.error('[contact] Auto-reply: Resend returned no message id', autoReplyResult.data);
    autoReplySent = false;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && anon) {
    const supabase = createClient(url, anon);
    const { error: dbError } = await supabase.from('contact_requests').insert([
      { name, email, phone, project_type, budget_range, message },
    ]);
    if (dbError) {
      console.error('[contact] Supabase insert (email was sent):', dbError);
    }
  }

  return { ok: true, autoReplySent };
}
