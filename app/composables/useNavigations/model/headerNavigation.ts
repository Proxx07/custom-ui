import type { IHeaderNavigation } from '../types';

export const HEADER_NAVIGATION: IHeaderNavigation[] = [
  {
    to: '',
    name: 'header.main',
    withGamePrefix: true,
  },
  {
    to: 'manage/inventory',
    name: 'header.sell-items',
    withGamePrefix: true,
  },
  {
    to: 'manage/sell-offers',
    name: 'header.my-shop',
    withGamePrefix: true,
  },
  {
    to: '/blog',
    name: 'header.blog',
  },
];
