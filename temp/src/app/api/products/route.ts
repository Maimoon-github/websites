import { NextResponse } from 'next/server';
import { Product } from '@/types';

export async function GET() {
  const products: Product[] = [
    {
      id: 'raka-001',
      slug: 'hair-fall-control-treatment-oil',
      title: 'Hair Fall Control Treatment Oil',
      category: 'For hair fall',
      keyIngredients: 'Rosemary · Arnica · Jaborandi · Biotin',
      pricePkr: 3850,
      volume: '200 ml',
      image: '/brand/hair-fall-control-oil.jpg',
      inStock: true,
      isNew: true,
    },
    {
      id: 'raka-002',
      slug: 'scalp-hair-growth-treatment-oil',
      title: 'Scalp & Hair Growth Treatment Oil',
      category: 'Scalp care',
      keyIngredients: 'Bhurjay · Almond · Kalonji · Tea Tree',
      pricePkr: 4200,
      volume: '200 ml',
      image: '/brand/hair-fall-control-oil.jpg',
      inStock: true,
      isNew: false,
    },
  ];

  return NextResponse.json({
    success: true,
    data: products,
    count: products.length,
  });
}
