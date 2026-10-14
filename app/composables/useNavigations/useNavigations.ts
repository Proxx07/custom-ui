import type { NavListItem } from './types';
import { useGames } from '@/composables/useGames';
import { FOOTER_MENU, HEADER_NAVIGATION } from './model';

export const useNavigations = () => {
  const { gamePrefixForLink } = useGames();
  const { t } = useI18n();

  const headerNavigation = computed<NavListItem[]>(() => {
    return HEADER_NAVIGATION.map((el) => {
      return {
        to: el.withGamePrefix ? `${gamePrefixForLink.value}${el.to}` : el.to,
        name: t(el.name),
      };
    });
  });

  const footerNavigation = computed<NavListItem[]>(() => {
    return FOOTER_MENU.map((el) => {
      return {
        to: el.to,
        name: el.noTranslation ? el.name : t(el.name),
      };
    });
  });

  return {
    headerNavigation,
    footerNavigation,
  };
};
