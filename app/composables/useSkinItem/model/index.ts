import type { ExteriorTypes, SkinPlaceholderTypes } from '../types';
import type { gameTypes } from '@/composables/useGames';
import type { PhaseQueryTypes } from '@/composables/useItemFades';
import type { IFilterSelectedItem } from '@/composables/useRouteFilters';
import SkinPlaceholderUrlsRecord from '@/assets/icons/skins';

export const SKIN_PLACEHOLDERS_ENUM: Record<SkinPlaceholderTypes, string> = SkinPlaceholderUrlsRecord;
export const SKIN_PLACEHOLDERS_LIST: SkinPlaceholderTypes[] = Object.keys(SKIN_PLACEHOLDERS_ENUM) as SkinPlaceholderTypes[];

export const EXTERIORS_LIST: ExteriorTypes[] = ['FN', 'MW', 'FT', 'WW', 'BS'];

export const getExteriorFromName = (name: string): ExteriorTypes | '' => {
  if (!name) return '';
  if (/Factory New/i.test(name)) return 'FN';
  if (/Minimal Wear/i.test(name)) return 'MW';
  if (/Field-Tested/i.test(name)) return 'FT';
  if (/Well-Worn/i.test(name)) return 'WW';
  if (/Battle-Scarred/i.test(name)) return 'BS';
  return '';
};

export const EXTERIOR_FLOATS: Record<Exclude<ExteriorTypes, 'BS'>, number> = {
  FN: 0.07,
  MW: 0.15,
  FT: 0.37,
  WW: 0.44,
};

export const getExteriorFromFloat = (float?: number): ExteriorTypes | '' => {
  if (float === undefined || float === null || float < 0 || float > 1 || Number.isNaN(float)) return '';
  if (float < EXTERIOR_FLOATS.FN) return 'FN';
  if (float < EXTERIOR_FLOATS.MW) return 'MW';
  if (float < EXTERIOR_FLOATS.FT) return 'FT';
  if (float < EXTERIOR_FLOATS.WW) return 'WW';
  return 'BS';
};

export const getFloatPercent = (float?: number): number => {
  if (float === undefined || float === null || float < 0 || float > 1 || Number.isNaN(float)) return 0;
  return +(float * 100).toFixed(2);
};

const EXTERIOR_RANGES: ReadonlyArray<{ type: ExteriorTypes, min: number, max: number }> = [
  { type: 'FN', min: 0, max: EXTERIOR_FLOATS.FN },
  { type: 'MW', min: EXTERIOR_FLOATS.FN, max: EXTERIOR_FLOATS.MW },
  { type: 'FT', min: EXTERIOR_FLOATS.MW, max: EXTERIOR_FLOATS.FT },
  { type: 'WW', min: EXTERIOR_FLOATS.FT, max: EXTERIOR_FLOATS.WW },
  { type: 'BS', min: EXTERIOR_FLOATS.WW, max: 1 },
];

export const parsePhaseToPhaseKey = (phase?: string): PhaseQueryTypes | '' => {
  const str = phase?.toLowerCase() || '';
  if (str[0] === 'p') return str[0] + str[str.length - 1] as PhaseQueryTypes;
  if (str === 'sapphire') return 'sh';
  if (str === 'ruby') return 'rb';
  if (str === 'black pearl') return 'bp';
  if (str === 'emerald') return 'em';
  return '';
};

export const parseSkinName = (itemName: string, phase?: string) => {
  const hasSeparator = itemName.includes('|');
  const [type, name = '', nameSuffix = ''] = itemName.split('|');
  let exactName = name.replace(/\s*\([^)]*\)/g, '');

  if (phase) exactName = exactName.replace(phase, '');

  return {
    type: hasSeparator ? type : undefined,
    name: hasSeparator ? (nameSuffix ? `${exactName} | ${nameSuffix}` : exactName) : type,
  };
};

export const getExteriorListFromFloatRange = (minFloat?: number, maxFloat?: number): ExteriorTypes[] => {
  if (typeof minFloat !== 'number' || typeof maxFloat !== 'number' || minFloat < 0 || maxFloat > 1 || minFloat > maxFloat) return [];

  return EXTERIOR_RANGES
    .filter(({ min, max }) => minFloat < max && maxFloat >= min)
    .map(({ type }) => type);
};

export const setFilterBadgeItemFromTypes = <T>(value: T, labelPrefix?: string): IFilterSelectedItem<T> => {
  return {
    label: `${labelPrefix ? `${labelPrefix}.` : ''}${value}`,
    value,
  };
};

export const SKIN_IMAGE_ASPECT_RATIO: Record<gameTypes, number> = {
  csgo: 3 / 4,
  dota2: 2 / 3,
  tf2: 1,
  rust: 1,
};

export const removeSizeFromImage = (url: string): string => {
  const sizeRegex = /\/\d+[a-z]*x\d+[a-z]*\/?$/i;
  return url.replace(sizeRegex, '');
};

const IMAGE_PROXY_BASE_URL = 'https://imageproxy.waxpeer.com/insecure';
const IMAGE_SITE_BASE_URL = 'https://waxpeer.com';

export const imageProxy = (url: string | null, options?: { width?: number, height?: number, game?: gameTypes }): string => {
  if (!url) return '';
  if (url.startsWith(IMAGE_PROXY_BASE_URL)) return url;
  const src = url.startsWith('http') ? url : `${IMAGE_SITE_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  const isWebp = url.includes('webp');

  let width, height;

  if (options?.game) {
    width = options.width
      ? options.width
      : options.height
        ? Math.round((options.height / SKIN_IMAGE_ASPECT_RATIO[options.game]))
        : 0;
    height = options.width
      ? 0
      : options.height || 0;
  }
  else {
    width = options?.width || 0;
    height = options?.height || 0;
  }

  const fit = `rs:fit${width ? `:${width}` : ''}${height ? `:${height}` : ''}:0`;
  const webp = !isWebp ? 'f:webp' : '';
  return `${IMAGE_PROXY_BASE_URL}/${fit}/g:nowe/${webp}/plain/${src}`;
};
