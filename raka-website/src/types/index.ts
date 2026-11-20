import { ReactNode } from "react";

/**
 * Layout & Container Interfaces
 */
export interface BaseLayoutProps {
  children?: ReactNode;
  className?: string;
}

export interface ContainerProps extends BaseLayoutProps {
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
  noPadding?: boolean;
}

export interface SectionProps extends BaseLayoutProps {
  background?: "snow" | "paper" | "linen" | "alpenglow-tint";
  paddingY?: "tight" | "normal" | "relaxed" | "none";
}

/**
 * UI Component Interfaces
 */
export type ButtonVariant = "primary-buy" | "copper-join" | "outline-explore" | "disabled";
export type ButtonSize = "large" | "medium";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export type BadgeVariant = "new" | "first-circle" | "offer" | "spec";

export interface BadgeProps extends BaseLayoutProps {
  variant?: BadgeVariant;
  text: string;
}

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}
