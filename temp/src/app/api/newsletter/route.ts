import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, concern } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required to join the First Circle.' },
        { status: 400 }
      );
    }

    // Optional WhatsApp verification for Pakistan numbers
    if (whatsapp) {
      const cleanWa = String(whatsapp).replace(/\D/g, '');
      if (cleanWa.length < 10) {
        return NextResponse.json(
          { success: false, error: 'That number looks short. Mobiles have 10 digits after +92.' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome to the First Circle. We will send you one message on launch day.',
      data: {
        member: name,
        email,
        concern: concern || 'General Care',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'First Circle enrollment service unavailable.' },
      { status: 500 }
    );
  }
}
