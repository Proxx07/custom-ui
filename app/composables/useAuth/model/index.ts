import type { LanguagesTypes } from '~~/i18n/types';

export const setSteamAuthLink = (url: string, lang: LanguagesTypes): string => {
  const encodedRedirect = encodeURIComponent(url);
  // https://waxpeer.com hardcoded, otherwise steam platform wouldn't be reached
  return `https://waxpeer.com/api/auth/steam?redirect=${encodedRedirect}&lang=${lang}`;
};
