import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    brand: 'RAKA',
    version: '1.2.0',
    launchDate: '2026-12-01',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
