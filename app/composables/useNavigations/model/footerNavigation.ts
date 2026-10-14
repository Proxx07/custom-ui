import type { IFooterNavigation, ISocialsLink } from '../types';
import { discord, instagram, telegram, x } from '@/assets/icons/logos';

export const FOOTER_MENU: IFooterNavigation[] = [
  {
    to: '/faq',
    name: 'FAQ',
    noTranslation: true,
  },
  {
    to: '/docs',
    name: 'API',
    noTranslation: true,
  },
  {
    to: '/privacy',
    name: 'footer.privacy',
  },
  {
    to: '/terms',
    name: 'footer.terms',
  },
];

export const SOCIALS_LINK: ISocialsLink[] = [
  {
    icon: discord,
    link: 'https://discord.com/',
    label: 'Discord',
  },
  {
    icon: x,
    link: 'https://x.com/',
    label: 'X',
  },
  {
    icon: instagram,
    link: 'https://instagram.com/',
    label: 'Instagram',
  },
  {
    icon: telegram,
    link: 'https://telegram.org/',
    label: 'Telegram',
  },
];
