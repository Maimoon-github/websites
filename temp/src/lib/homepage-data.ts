import { HomeCategory, HomeProduct, HomeReel, HomeGiftSet, HomeReview, HomeArticle, Swatch } from '@/types';

export const STEEL_SWATCHES: Swatch[] = [
  { name: 'Rose gold', hex: '#D9A38A' },
  { name: 'Matte black', hex: '#2B2725' },
  { name: 'Champagne', hex: '#D8C29A' },
];

export const SILK_SWATCHES: Swatch[] = [
  { name: 'Ivory', hex: '#F4EDE1' },
  { name: 'Charcoal', hex: '#3C3A39' },
  { name: '[Third colour]', hex: '#C9B8D8' },
];

export const WOOD_SWATCHES: Swatch[] = [
  { name: 'Sheesham', hex: '#7A4B2A' },
  { name: 'Neem', hex: '#C9A574' },
];

export interface HeroSlideData {
  id: number;
  badge: string;
  badgeVariant?: 'pill-white' | 'capsule-dark';
  titlePrefix: string;
  titleItalic: string;
  titleSuffix?: string;
  description: string;
  bg?: string;
  image?: string;
  alt?: string;
  primaryCta: { text: string; href: string; variant?: 'primary-buy' | 'copper-join' };
  secondaryCta?: { text: string; href: string };
  price?: string;
  comparePrice?: string;
  heroProduct?: {
    name: string;
    meta: string;
    img: string;
  };
}

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 0,
    badge: '✦ New season, new ritual',
    badgeVariant: 'pill-white',
    titlePrefix: 'Your hair ritual, ',
    titleItalic: 'upgraded.',
    description: 'Treatment oils, mulberry silk and hand-carved tools. Everything for oil night, in one place.',
    image: '/home/55a4c1509fc7c6420b93d2021009bc12.jpg',
    alt: 'Laughing woman with long wavy hair on a rooftop at golden hour',
    primaryCta: { text: 'Shop the ritual', href: '/shop', variant: 'primary-buy' },
    secondaryCta: { text: 'See gift sets', href: '#sets' },
    heroProduct: {
      name: 'Hair Fall Control Oil',
      meta: '200 ml · Rs [PRICE]',
      img: '/brand/hair-fall-control-oil.jpg',
    },
  },
  {
    id: 1,
    badge: 'Eid and wedding season',
    badgeVariant: 'pill-white',
    titlePrefix: 'Gifts that feel ',
    titleItalic: 'personal.',
    description: 'Rigid gift boxes, foil stamped, with a name card. Add engraving to combs and tools.',
    image: '/home/9b91388e19a99e3df567ff5319f8f5e9.jpg',
    alt: 'Three women in festive outfits with long, glossy hair',
    primaryCta: { text: 'Shop gift sets', href: '#sets', variant: 'primary-buy' },
  },
  {
    id: 2,
    badge: 'Ritual Starter',
    badgeVariant: 'capsule-dark',
    titlePrefix: 'Oil, applicator, comb. ',
    titleItalic: 'Done.',
    description: 'Treatment oil, precision applicator and a hand-carved neem comb in one magnetic box.',
    price: 'Rs [SET PRICE]',
    comparePrice: 'Rs [VALUE]',
    image: '/home/05d03053f2e8215c0d19b91b54c53aad.jpg',
    alt: 'RAKA Hair Fall Control Treatment Oil with its printed gift box',
    primaryCta: { text: 'Get the set', href: '/shop', variant: 'copper-join' },
  },
];

export const TRUST_ITEMS = [
  {
    id: 'delivery',
    title: 'Delivery across Pakistan',
    subtitle: '[X to Y] working days',
    icon: 'delivery',
  },
  {
    id: 'cod',
    title: 'Cash on delivery',
    subtitle: 'Card and wallets too [confirm]',
    icon: 'cod',
  },
  {
    id: 'returns',
    title: 'Easy returns',
    subtitle: '[Return window] on unopened items',
    icon: 'returns',
  },
  {
    id: 'made-in-pakistan',
    title: 'Made in Pakistan',
    subtitle: 'Chiniot wood, Sialkot steel, Lahore silk',
    icon: 'mountain',
  },
];

export const CATEGORIES: HomeCategory[] = [
  { name: 'Hair oils', img: '/brand/hair-fall-control-oil.jpg', pos: 'center 70%', bg: '#EEEAE5', href: '/shop' },
  { name: 'Silk & night', bg: '#F8E1D4', pos: 'center', href: '/shop' },
  { name: 'Combs & brushes', bg: '#EDE3D6', pos: 'center', href: '/shop' },
  { name: 'Mani-pedi', bg: '#F3E2D5', pos: 'center', href: '/shop' },
  { name: 'Brow & face', bg: '#F8E1D4', pos: 'center', href: '/shop' },
  { name: 'Bath & spa', bg: '#EDE3D6', pos: 'center', href: '/shop' },
  { name: 'Men', bg: '#F3E2D5', pos: 'center', href: '/shop' },
  { name: 'Gift sets', img: '/home/05d03053f2e8215c0d19b91b54c53aad.jpg', pos: 'center 40%', bg: '#EDE3D6', href: '/shop' },
];

export const PRODUCT_TABS = [
  { id: 'hair', label: 'Hair care' },
  { id: 'silk', label: 'Silk & night' },
  { id: 'tools', label: 'Mani-pedi & brow' },
  { id: 'men', label: 'Men' },
] as const;

export type TabId = (typeof PRODUCT_TABS)[number]['id'];

export const PRODUCTS_BY_TAB: Record<TabId, HomeProduct[]> = {
  hair: [
    {
      name: 'Hair Fall Control Treatment Oil',
      cat: 'Treatment oil · 200 ml',
      note: 'Rosemary, arnica, jaborandi, biotin',
      img: '/brand/hair-fall-control-oil.jpg',
      bg: '#EEEAE5',
      badge: 'Launch',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Scalp & Hair Growth Treatment Oil',
      cat: 'Treatment oil · 200 ml',
      note: '[Approved benefit line]',
      bg: '#F8E1D4',
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Precision Oil Applicator',
      cat: 'Ritual tool',
      note: 'Frosted bottle, gold collar, fine nozzle',
      bg: '#EDE3D6',
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Hand-carved Neem Comb',
      cat: 'Chiniot wood',
      note: 'Wide teeth for oiled hair. Add engraving.',
      bg: '#F3E2D5',
      swatches: WOOD_SWATCHES,
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Sheesham Scalp Massager',
      cat: 'Ritual tool',
      note: 'Soft silicone tips for the massage step',
      bg: '#EDE3D6',
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Boar-bristle Paddle Brush',
      cat: 'Chiniot wood',
      note: 'Spreads oil from roots to ends',
      bg: '#F8E1D4',
      badge: 'Coming soon',
      badgeBg: '#FFFFFF',
      badgeFg: '#14110F',
    },
  ],
  silk: [
    {
      name: 'Mulberry Silk Bonnet',
      cat: '22 momme silk',
      note: 'Protects hair and pillow overnight',
      bg: '#F8E1D4',
      swatches: SILK_SWATCHES,
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Silk Scrunchie Set of 3',
      cat: '22 momme silk',
      note: 'Gentle hold for oiled hair',
      bg: '#EDE3D6',
      swatches: SILK_SWATCHES,
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Mulberry Silk Pillowcase',
      cat: '22 momme silk',
      note: 'Smoother feel, less friction',
      bg: '#F3E2D5',
      swatches: SILK_SWATCHES,
      badge: 'Coming soon',
      badgeBg: '#FFFFFF',
      badgeFg: '#14110F',
    },
    {
      name: 'Silk Heatless Curl Set',
      cat: '22 momme silk',
      note: 'Overnight curls without heat',
      bg: '#F8E1D4',
      badge: 'Coming soon',
      badgeBg: '#FFFFFF',
      badgeFg: '#14110F',
    },
    {
      name: 'Hair-towel Turban Wrap',
      cat: 'Faisalabad cotton',
      note: 'Quick-dry, gentle on wet hair',
      bg: '#EDE3D6',
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
  ],
  tools: [
    {
      name: 'Signature Manicure Set, 7 pieces',
      cat: 'Sialkot steel',
      note: 'J2 steel in a full-grain leather case',
      bg: '#EDE3D6',
      swatches: STEEL_SWATCHES,
      badge: 'Hero',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Cuticle Nipper, quarter jaw',
      cat: 'Sialkot steel',
      note: 'Hand-sharpened Japanese J2 steel',
      bg: '#F3E2D5',
      swatches: STEEL_SWATCHES,
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Slanted Brow Tweezers',
      cat: 'Sialkot steel',
      note: 'Hand-aligned tips grip a single hair',
      bg: '#F8E1D4',
      swatches: STEEL_SWATCHES,
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Laser-etched Nail File',
      cat: 'Sialkot steel',
      note: 'Washable, shapes smoothly',
      bg: '#EDE3D6',
      swatches: STEEL_SWATCHES,
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Stainless Foot File',
      cat: 'Sialkot + Chiniot',
      note: 'Coarse and fine sides, sheesham handle',
      bg: '#F3E2D5',
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
  ],
  men: [
    {
      name: "Gentleman's Grooming Kit",
      cat: 'Wazirabad Damascus',
      note: 'Razor, strop, beard scissors and comb',
      bg: '#EDE3D6',
      badge: 'Coming soon',
      badgeBg: '#FFFFFF',
      badgeFg: '#14110F',
    },
    {
      name: 'Sheesham Beard Comb',
      cat: 'Chiniot wood',
      note: 'Leather sleeve, monogram option',
      bg: '#F3E2D5',
      swatches: WOOD_SWATCHES,
      badge: 'Coming soon',
      badgeBg: '#FFFFFF',
      badgeFg: '#14110F',
    },
    {
      name: 'Fingernail Clipper',
      cat: 'Sialkot steel',
      note: 'Lever action, smooth clean clip',
      bg: '#F8E1D4',
      swatches: STEEL_SWATCHES,
      badge: 'New',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
    {
      name: 'Hair Fall Control Treatment Oil',
      cat: 'Treatment oil · 200 ml',
      note: 'For him too',
      img: '/brand/hair-fall-control-oil.jpg',
      bg: '#EEEAE5',
      badge: 'Launch',
      badgeBg: '#14110F',
      badgeFg: '#FFFFFF',
    },
  ],
};

export const REELS: HomeReel[] = [
  {
    src: '/home/4d2990ee5c1d9d574b32dfd06b57f457.mp4',
    poster: '/home/050f6d0d75737d802eb5e4f5caad13d1.jpg',
    product: 'Hair Fall Control Oil',
    views: '[views]',
    alt: 'Woman checking her hair in a mirror',
  },
  {
    src: '/home/b0b151a158014c8e5e1a61ad16486a27.mp4',
    poster: '/home/8f6295eb555528b0c9dcd430223fc983.jpg',
    product: 'Hair Fall Control Oil',
    views: '[views]',
    alt: 'RAKA treatment oil reel with a brush and hair',
  },
  {
    src: '/home/0a3892aed21906c4f02496aefd5376c4.mp4',
    poster: '/home/3620a2c10fc00176e58022820478ed9f.jpg',
    product: 'Hand-carved Neem Comb',
    views: '[views]',
    alt: 'Woman on a street showing healthy-looking hair',
  },
  {
    src: '/home/ac487ffd88f731703d1d0f9347fcc132.mp4',
    poster: '/home/217652f67e1e960d5f034579f1c29cae.jpg',
    product: 'Hair Fall Control Oil',
    views: '[views]',
    alt: 'Woman in denim with a braided hairstyle',
  },
  {
    src: '/home/4d3bf38e6ccaed28adc1a8ebc16bab5a.mp4',
    poster: '/home/3bb78143837b830745362a907d9e79ab.jpg',
    product: 'Sheesham Scalp Massager',
    views: '[views]',
    alt: 'Playful illustrated reel about a happy scalp',
  },
  {
    src: '/home/f6745c9790c82d2bee62a62d8ac51a12.mp4',
    poster: '/home/b877f4bc5a0f96e44c1eb21764686ca0.jpg',
    product: 'Ritual Starter set',
    views: '[views]',
    alt: 'Reel on common hair-care mistakes to skip',
  },
  {
    src: '/home/4fb063bb9bd5e9b7373bca0de824edc3.mp4',
    poster: '/home/e2e388073f5645048c8ca2b8e69d2c77.jpg',
    product: 'Mulberry Silk Bonnet',
    views: '[views]',
    alt: 'Woman talking about her hair routine',
  },
  {
    src: '/home/9b85a0bc5191d0b7b4084fefd7f6a3cb.mp4',
    poster: '/home/584e44f96a1557290ed2e336be720e75.jpg',
    product: 'Hair Fall Control Oil',
    views: '[views]',
    alt: 'Woman with long hair in soft light',
  },
];

export const CONCERN_ITEMS = [
  { name: 'Hair fall', bg: '#F8E1D4' },
  { name: 'Frizz', bg: '#EDE3D6' },
  { name: 'Dryness', bg: '#EDE3D6' },
  { name: 'Damage', bg: '#F8E1D4' },
  { name: 'Scalp care', bg: '#F8E1D4' },
  { name: 'Overnight care', bg: '#EDE3D6' },
];

export const GIFT_SETS: HomeGiftSet[] = [
  {
    name: 'Ritual Starter',
    items: 'Treatment oil, precision applicator, neem comb',
    tag: 'First-timers',
    img: '/home/05d03053f2e8215c0d19b91b54c53aad.jpg',
    bg: '#EDE3D6',
  },
  {
    name: 'Night Ritual',
    items: 'Treatment oil, silk bonnet, silk scrunchies',
    tag: 'Overnight',
    bg: '#F8E1D4',
  },
  {
    name: 'The Hair Social Gift Box',
    items: 'Treatment oil, silk pillowcase, comb, name card',
    tag: 'Gifting',
    bg: '#F3E2D5',
  },
  {
    name: 'Signature Mani-Pedi Collection',
    items: '7-piece manicure + 10-piece pedicure sets',
    tag: 'Wedding season',
    bg: '#EDE3D6',
  },
];

export const VIDEO_REVIEWS: HomeReview[] = [
  {
    poster: '/home/e2e388073f5645048c8ca2b8e69d2c77.jpg',
    product: 'Hair Fall Control Oil',
    customerName: '[Customer first name]',
    location: '[City]',
  },
  {
    poster: '/home/584e44f96a1557290ed2e336be720e75.jpg',
    product: 'Night Ritual set',
    customerName: '[Customer first name]',
    location: '[City]',
  },
  {
    poster: '/home/050f6d0d75737d802eb5e4f5caad13d1.jpg',
    product: 'Ritual Starter set',
    customerName: '[Customer first name]',
    location: '[City]',
  },
];

export const JOURNAL_ARTICLES: HomeArticle[] = [
  {
    img: '/home/76378be9561b77cd77eb92ecd98d5e64.jpg',
    tag: 'Hair fall · 5 min read',
    title: 'Seven everyday reasons hair sheds more than usual',
    href: '/journal',
  },
  {
    img: '/home/e799674d28a92c32801d79e72d0f50ca.jpg',
    tag: 'Routine · 4 min read',
    title: 'How to oil your hair, step by step',
    href: '/journal',
  },
  {
    img: '/home/bae42519474e813959c220c777aaff6b.jpg',
    tag: 'Dryness · 3 min read',
    title: 'Dry, frizzy, rough: what each one is telling you',
    href: '/journal',
  },
];

export const INSTAGRAM_POSTS = [
  '/home/a666447e3d9c4cb243e87e874b7b743d.jpg',
  '/home/474e23c491a911467d4a40061616e5b9.jpg',
  '/home/2673c1973bbd7b483536be43aae07aca.jpg',
  '/home/864b14f8f2bc9d47610f47645e25bfad.jpg',
  '/home/0c065fd44c80bdf1255cfd12605fdf92.jpg',
  '/home/7ba7da2a4145483b2154c8a1fdccb7bc.jpg',
  '/home/4a1b2ccc68d4a189f7bb2165064d1dbe.jpg',
  '/home/cf6eab48fc2509c5cae2d0f1a678454d.jpg',
];
