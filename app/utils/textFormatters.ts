export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const CompactFormatIntl = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export function formatCompact(num: number): string {
  if (num === 0) return '';
  return num > 1 ? CompactFormatIntl.format(num) : num.toString();
}

export const slugify = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[^a-z\d]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
};
