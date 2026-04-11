import { NextResponse } from 'next/server';
import { processContactSubmission } from '@/lib/processContactSubmission';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await processContactSubmission(
      typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {}
    );
    if (result.ok) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      {
        error: result.error,
        ...(result.details ? { details: result.details } : {}),
      },
      { status: result.status }
    );
  } catch (e) {
    console.error('[contact]', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
