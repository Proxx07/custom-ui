import type { CardSizeType } from './types';

export const useCardSize = () => {
  const cardSize = useCookie<CardSizeType>('card-size', { default: () => 'default' });

  const nameFontsBySize: Record<CardSizeType, string> = {
    small: 'font-12-m',
    default: 'font-14-m',
    large: 'font-16-m',
  };

  return { cardSize, nameFontsBySize };
};
