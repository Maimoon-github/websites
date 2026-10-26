import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function BagIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Bag"
      className={className}
      {...props}
    >
      <path d="M6 7h12l-1 13H7L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function SearchIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      role="img"
      aria-label="Search"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </svg>
  );
}

export function AccountIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      role="img"
      aria-label="Account"
      className={className}
      {...props}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

export function WishlistIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Wishlist"
      className={className}
      {...props}
    >
      <path d="M12 21s-7-4.35-9-9a5.5 5.5 0 0 1 9.5-4 5.5 5.5 0 0 1 9.5 4c-2 4.65-9 9-9 9z" />
    </svg>
  );
}

export function OilDropIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Oil drop"
      className={className}
      {...props}
    >
      <path d="M12 3C8 8 6 12 6 15a6 6 0 0 0 12 0c0-3-2-7-6-12z" />
    </svg>
  );
}

export function BotanicalIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Botanical"
      className={className}
      {...props}
    >
      <path d="M20 4c-8 0-14 6-14 14 8 0 14-6 14-14z" />
      <path d="M6 18c3-3 7-5 11-7" />
    </svg>
  );
}

export function DeliveryIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Delivery"
      className={className}
      {...props}
    >
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </svg>
  );
}

export function CashOnDeliveryIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Cash on delivery"
      className={className}
      {...props}
    >
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function ReturnsIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Returns"
      className={className}
      {...props}
    >
      <path d="M4 12a8 8 0 0 1 14.9-4M20 12a8 8 0 0 1-14.9 4" />
      <path d="M18 4v4h4M6 20v-4H2" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="WhatsApp chat"
      className={className}
      {...props}
    >
      <path d="M12 21a9 9 0 0 1-4.5-1.2L3 21l1.3-4.3A9 9 0 1 1 12 21z" />
      <path d="M9 10a4 4 0 0 0 5 5l1.5-1.5" />
    </svg>
  );
}

export function MountainIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Mountain"
      className={className}
      {...props}
    >
      <path d="M3 20h18" />
      <path d="M5 20l5-9 3 4 3-6 3 11" />
    </svg>
  );
}

/**
 * The Sparkle — The only filled icon in the RAKA design system.
 */
export function SparkleIcon({ size = 24, fill = '#8E5530', className, ...props }: IconProps & { fill?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Sparkle, new"
      className={className}
      {...props}
    >
      <path
        d="M12 2C12 8 16 12 22 12C16 12 12 16 12 22C12 16 8 12 2 12C8 12 12 8 12 2Z"
        fill={fill}
      />
    </svg>
  );
}

/**
 * The Signature Rakaposhi Ridge outline divider.
 */
export function RakaposhiRidgeDivider({ className, stroke = '#CF8F63' }: { className?: string; stroke?: string }) {
  return (
    <div className={`flex justify-center items-center py-6 ${className || ''}`} aria-hidden="true">
      <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
        <path
          d="M1 27 L12 14 L17 18 L27 4 L33 11 L37 8 L47 27"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
