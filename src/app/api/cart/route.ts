import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      items: [
        {
          productId: 'raka-001',
          quantity: 1,
          pricePkr: 3850,
        },
      ],
      subtotalPkr: 3850,
      currency: 'PKR',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json(
        { success: false, error: 'Valid product ID and quantity required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Added to your bag',
      data: { productId, quantity },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Invalid cart payload' },
      { status: 400 }
    );
  }
}
