import { NextRequest, NextResponse } from 'next/server';

// Vercel's edge network sets this header automatically on every request — absent in local dev.
export async function GET(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country');
  return NextResponse.json(
    { country },
    { headers: { 'Cache-Control': 'private, no-store' } }
  );
}
