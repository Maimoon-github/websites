import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, address, city, paymentMethod = 'COD' } = body;

    // Validate Pakistani mobile format (10 digits after prefix or 11 digits starting with 03)
    const cleanedPhone = String(phone || '').replace(/\D/g, '');
    const isValidPkPhone = cleanedPhone.length === 10 || (cleanedPhone.length === 11 && cleanedPhone.startsWith('03'));

    if (!fullName || !isValidPkPhone || !address || !city) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please verify recipient name, address, city, and a valid 10-digit mobile number.',
        },
        { status: 400 }
      );
    }

    const orderId = `RAKA-PK-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully. Cash on delivery confirmed.',
      data: {
        orderId,
        paymentMethod,
        recipient: fullName,
        estimatedDelivery: '2 to 4 working days',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Unable to process checkout request.' },
      { status: 500 }
    );
  }
}
