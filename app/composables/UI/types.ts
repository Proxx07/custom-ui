export type ThemeModes = 'dark' | 'blue' | 'grey' | 'red' | 'light';
export type CardSizeType = 'small' | 'default' | 'large';
export interface DimensionsType { x: number, y: number, w: number, h: number }
export interface BreadCrumbsItem {
  label: string
  link?: string
}
