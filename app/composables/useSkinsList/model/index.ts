import type { CatalogSkinItem, SkinListItem } from '../types';
import type { gameTypes } from '@/composables/useGames';
import type { ISkin } from '@/composables/useSkinItem';

export const mapSkinsListItemForCard = (skin: SkinListItem, game: gameTypes): ISkin => {
  return {
    id: skin.item_id,
    game: skin.game || game,
    name: skin.name,
    localized_name: skin.steam_price?.localized_name || '',
    type: skin.steam_price?.type,

    float: skin.inspect_item?.floatvalue || skin?.float || 0,
    rarityColor: skin.steam_price?.rarity_color ?? '',
    phase: skin?.phase ?? '',
    exterior: skin.exterior,

    image: skin.image ?? skin.inspect_item?.imageurl,
    imageFront: skin.inspect_item?.front,
    imageBack: skin.inspect_item?.back,
    imageScreenshot: skin.inspect_item?.full_screenshot,

    price: skin.price,
    steamPrice: skin.steam_price?.current ?? 0,
    lowestPrice: skin.steam_price?.lowest_price,
    averagePrice: skin.steam_price?.average,

    auto: skin.auto,
    offersCount: skin.offer_count,
  };
};

export const mapCatalogItemForCard = (skin: CatalogSkinItem, game: gameTypes): ISkin => {
  return {
    id: skin.item_id,
    game: skin.game || game,
    name: skin.market_name,
    localized_name: skin.localized_name,

    image: skin.image,
    imageFront: skin.inspect_images?.front,
    imageBack: skin.inspect_images?.back,

    phase: skin.phase,
    price: skin.max_price,
    lowestPrice: skin.min_price,
    rarityColor: skin.rarity_color,

    steamPrice: 0,
    offersCount: skin.offer_count,
  };
};

export const MARKETPLACE_SKIN_IMAGES_QUERY = {
  small: { 1920: 135, 1440: 142, 1230: 150, 600: 142, 320: 190 },
  default: { 1920: 157, 1440: 155, 1230: 177, 600: 178, 320: 190 },
  large: { 1920: 200, 1440: 185, 1230: 230, 600: 250, 320: 190 },
};

export const SKINS_LIST_ORDER_DATA = ['recommended', 'price', 'name'];
