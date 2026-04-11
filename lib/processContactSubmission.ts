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

function clamp(s: unknown, max: number): string {
  if (typeof s !== 'string') return '';
  return s.trim().slice(0, max);
}

export type ContactResult =
  | { ok: true }
  | { ok: false; status: number; error: string; details?: string };

function resendErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
    return (err as { message: string }).message;
  }
  return String(err);
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

  const to = process.env.CONTACT_TO_EMAIL?.trim() || SITE_CONTACT_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || 'Virtus Decora <onboarding@resend.dev>';

  const resend = new Resend(resendKey);
  const { error: emailError } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Website inquiry — ${name}`,
    html: `
        <h2 style="font-family:system-ui,sans-serif;font-size:18px;">New consultation request</h2>
        <table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#111;">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone) || '—'}</td></tr>
          <tr><td><strong>Project type</strong></td><td>${escapeHtml(project_type) || '—'}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${escapeHtml(budget_range) || '—'}</td></tr>
        </table>
        <p style="font-family:system-ui,sans-serif;font-size:14px;margin-top:16px;"><strong>Message</strong></p>
        <pre style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;background:#f4f4f5;padding:12px;border-radius:8px;">${escapeHtml(
          message || '—'
        )}</pre>
      `,
  });

  if (emailError) {
    const details = resendErrorMessage(emailError);
    console.error('[contact] Resend:', emailError);
    return { ok: false, status: 502, error: 'Failed to send email', details };
  }

  const lang = body.lang === 'en' ? 'en' : 'bg';
  const autoReply =
    lang === 'en'
      ? {
          subject: 'We received your request — Virtus Decora',
          html: `
              <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111;">Hello ${escapeHtml(name)},</p>
              <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111;">
                Thank you for contacting Virtus Decora. We have received your inquiry and will get back to you within <strong>24 hours</strong>.
              </p>
              <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111;">
                Best regards,<br />
                Virtus Decora
              </p>
            `,
        }
      : {
          subject: 'Получихме вашето запитване — Virtus Decora',
          html: `
              <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111;">Здравейте, ${escapeHtml(name)},</p>
              <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111;">
                Благодарим ви, че се свързахте с Virtus Decora. Получихме вашето запитване и ще отговорим в рамките на <strong>24 часа</strong>.
              </p>
              <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111;">
                Поздрави,<br />
                Екипът на Virtus Decora
              </p>
            `,
        };

  const { error: autoReplyError } = await resend.emails.send({
    from,
    to: [email],
    replyTo: to,
    subject: autoReply.subject,
    html: autoReply.html,
  });

  if (autoReplyError) {
    console.error('[contact] Auto-reply Resend:', autoReplyError);
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

  return { ok: true };
}
