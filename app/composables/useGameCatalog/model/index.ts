import type { ICatalog } from '../types';
import gloves from '@/assets/images/categories/gloves.png?url';
import knives from '@/assets/images/categories/knives.png?url';
import machineguns from '@/assets/images/categories/machineguns.png?url';
import others from '@/assets/images/categories/others.png?url';
import pistols from '@/assets/images/categories/pistols.png?url';
import rifles from '@/assets/images/categories/rifles.png?url';
import shotguns from '@/assets/images/categories/shotguns.png?url';
import smgs from '@/assets/images/categories/smgs.png?url';
import snipers from '@/assets/images/categories/sniper-rifles.png?url';

export const CATALOG_PLACEHOLDERS_BY_SLUG: Record<ICatalog['slug'], string> = {
  gloves, knives, machineguns, pistols, rifles, shotguns, smgs,
  'sniper-rifles': snipers, others,
};
