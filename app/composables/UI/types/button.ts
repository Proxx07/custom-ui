import type { TColors } from "~/utils";

type Severity = 'primary' | 'secondary' | 'tretiary' | 'destructive' | 'attention';

export interface ButtonProps {
  severity?: Severity;
  hoverSeverity?: Severity;
  size?: 'xl' | 'l' | 'm' | 's';
  variant?: 'outlined' | 'text';

  type?: 'button' | 'nuxt-link';
  label?: string;
  iconLeft?: string; // svg icons from assets
  iconRight?: string; // svg icons from assets

  bgColor?: TColors
  hoverBgColor?: TColors
  textColor?: TColors
  hoverTextColor?: TColors

  padding?: string
  noHoverBg?: boolean
  fluid?: boolean

  rotateLeftIcon?: boolean
  rotateRightIcon?: boolean
  leftIconNoFill?: boolean
  rightIconNoFill?: boolean
}