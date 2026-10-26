import { ReactNode } from 'react';

/**
 * Layout & Grid Interfaces
 */
export type Breakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export interface BaseLayoutProps {
  children?: ReactNode;
  className?: string;
}

export interface ContainerProps extends BaseLayoutProps {
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer';
  noPadding?: boolean;
}

export interface GridProps extends BaseLayoutProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  responsiveProductGrid?: boolean;
}

export interface StackProps extends BaseLayoutProps {
  direction?: 'vertical' | 'horizontal';
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '7';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}

export interface SectionProps extends BaseLayoutProps {
  background?: 'snow' | 'paper' | 'linen' | 'alpenglow-tint';
  paddingY?: 'tight' | 'normal' | 'relaxed' | 'none';
}

/**
 * UI Component Props
 */
export type ButtonVariant = 'primary-buy' | 'copper-join' | 'outline-explore' | 'disabled';
export type ButtonSize = 'large' | 'medium';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isPakistanPhone?: boolean;
}

export type BadgeVariant = 'new' | 'first-circle' | 'offer' | 'spec';

export interface BadgeProps extends BaseLayoutProps {
  variant?: BadgeVariant;
  text: string;
}

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
}

export interface CardProps extends BaseLayoutProps {
  surface?: 'paper' | 'alpenglow-tint';
  elevation?: 'e0' | 'e1' | 'e2' | 'e3';
  radius?: 'crisp' | 'card' | 'capsule';
}

/**
 * Full-Stack E-Commerce Data Models
 */
export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  keyIngredients: string;
  pricePkr: number;
  compareAtPricePkr?: number;
  volume: string;
  image: string;
  inStock: boolean;
  isNew?: boolean;
}

/**
 * Homepage Typed Data Models
 */
export interface Swatch {
  name: string;
  hex: string;
}

export interface HomeProduct {
  name: string;
  cat: string;
  note: string;
  price?: string;
  bg: string;
  img?: string | null;
  badge?: string;
  badgeBg?: string;
  badgeFg?: string;
  swatches?: Swatch[];
}

export interface HomeCategory {
  name: string;
  img?: string | null;
  bg: string;
  pos?: string;
  href?: string;
}

export interface HomeReel {
  src: string;
  poster: string;
  product: string;
  views: string;
  alt: string;
  price?: string;
}

export interface HomeGiftSet {
  name: string;
  items: string;
  tag: string;
  img?: string | null;
  bg: string;
  price?: string;
}

export interface HomeReview {
  poster: string;
  product: string;
  customerName?: string;
  location?: string;
}

export interface HomeArticle {
  title: string;
  tag: string;
  img: string;
  href?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
