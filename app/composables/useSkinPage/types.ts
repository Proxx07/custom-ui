import type { DeliveryTimeTypes } from '@/composables/useDeliveryTime';
import type { gameTypes } from '@/composables/useGames';
import type { ExteriorTypes } from '@/composables/useSkinItem';
import type { SkinItemId } from '@/composables/useSkinsList';

export interface SkinPageOptions {
  id: MaybeRefOrGetter<SkinItemId>
  game: MaybeRefOrGetter<gameTypes>
}

export interface ISkinFetchQuery {
  id?: string
  name: string
  game: gameTypes
}

export interface SkinPageUser {
  id: string
  shop: string
  avatar?: string
  average_time?: number
  seller_rating: number
  seller_trades_count: number
  is_seller_new: boolean
  kyc_status?: 'approved'
}

export interface SkinPageStickers {
  sticker_id: number
  slot: number
  image: string
  name: string
  /*
    * wear: fractional number [0 - 1] should be converted into %
  */
  wear?: number
}

export interface SkinPageSteamPrice {
  market_name: string
  average: number
  current: number
  lowest_price: number
  listings?: number
  rating?: number
  rating_votes?: number
  collection?: string
  collection_icon?: string
  rarity_color?: string
  rarity?: string
  ru_description?: string
  ch_description?: string
  description?: string
  pros?: Array<{ name: string, avatar: string }>
  localized_name?: string
}

export interface SkinPageItem {
  item_id: SkinItemId
  brand?: string
  category?: string
  image: string
  price: number
  game: gameTypes
  exterior?: ExteriorTypes
  name: string
  pasxalka?: boolean
  selling?: boolean
  escrow?: boolean
  tag?: string
  stat_trak?: boolean
  float?: number
  phase?: boolean
  auto?: boolean
  fade_percent?: number
  paint_seed?: number
  paint_index?: number
  user: SkinPageUser
  steam_price?: SkinPageSteamPrice
  inspect_item?: {
    front?: string
    back?: string
    full_screenshot?: string
    stickers?: SkinPageStickers[]
    inspect?: string // link to steam
  }
  deliveryTiming?: DeliveryTimeTypes
  /*
  custom_descriptions: [
  {
    category: 'about',
    data: '<h2>Order AWP | Dragon Lore</h2><p>Handcrafted with spray paint, mesh fencing, and stencils, the Dragon Lore skin is perfect for customizing your AWP as it combines boldness and elegance at the same time. With this particular skin, the rifle has a promising potential to become one of your signature weapons on the battlefield. The dragon’s flame, being the brightest spot of the design, is the most eye-catching detail that will undoubtedly be in the spotlight. If you’re looking for a catchy and enduring skin, then you definitely should go for it. Thanks to the fast and secure payments via Waxpeer, selling your AWP skin or buying it as a gift for another user is easier than ever.</p>',
  },
  {
    category: 'top_description',
    data: '<p>Customized with the knotwork dragon, this notorious AWP skin is an irreplaceable choice for everyone who values authenticity and always hits the target. While killing with only one shot, it makes its distinctive look, which, in tandem with the custom design, greatly enhances your experience of using this kind of weapon. On top of that, the cost is fully justified by the impeccable characteristics of the AWP itself – being the most powerful and accurate weapon in the Counter-Strike series, it is capable of precisely hitting the target within just one shot regardless of the enemy’s armor. Considering such compelling characteristics, the elegant and exquisite design only adds to the mix.</p>',
  },
  {
    category: 'description',
    data: '<h2>Buy AWP | Dragon Lore Online</h2><p>Customized with the knotwork dragon, this notorious AWP skin is an irreplaceable choice for everyone who values authenticity and always hits the target. While killing with only one shot, it makes its distinctive look, which, in tandem with the custom design, greatly enhances your experience of using this kind of weapon. On top of that, the cost is fully justified by the impeccable characteristics of the AWP itself – being the most powerful and accurate weapon in the Counter-Strike series, it is capable of precisely hitting the target within just one shot regardless of the enemy’s armor. Considering such compelling characteristics, the elegant and exquisite design only adds to the mix.</p>',
  },
],
*/
}

export interface SkinPageResponse {
  success: boolean
  item: SkinPageItem
}

/* Response example
{
    "success": true,
    "item": {
        "item_id": "54120429940",
        "brand": "sniper_rifle",
        "category": "AWP",
        "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993144651",
        "pasxalka": false,
        "price": 9495957,
        "game": "csgo",
        "exterior": "MW",
        "tag": "",
        "name": "Souvenir AWP | Dragon Lore (Minimal Wear)",
        "market_name": "Dragon Lore",
        "selling": true,
        "by": "ec369764-6e99-417c-ac4f-8078b2af6827",
        "escrow": false,
        "unlock_at": null,
        "stat_trak": false,
        "float": 0.07589305937290192,
        "phase": "",
        "auto": false,
        "type": "Souvenir AWP",
        "fade_percent": 0,
        "paint_seed": 627,
        "paint_index": 344,
        "user": {
            "id": "8e39e27d-5582-43f5-a194-d070bf8575ce",
            "shop_public": true
        },
        "inspect_item": {
            "floatvalue": 0.07589305937290192,
            "paintseed": 627,
            "defindex": null,
            "paintindex": 344,
            "rarity": null,
            "quality": null,
            "front": "https://images.waxpeer.com/screenshot/items/54120429940_front_full_1792255322470.webp",
            "back": "https://images.waxpeer.com/screenshot/items/54120429940_back_full_1792255322470.webp",
            "full_screenshot": "https://images.waxpeer.com/screenshot/fs/54120429940_full_screen_1792255324455.webp",
            "stickers": [
                {
                    "slot": -1,
                    "wear": null,
                    "image": "https://cdn.steamstatic.com/apps/730/icons/econ/keychains/cologne2026/kc_cologne2026.05d337fcc1a93e8c4eabedc73679b2b92ac8588e.png",
                    "name": "Souvenir Charm | Cologne 2026 Highlight | Falcons Trophy-lifting Moment",
                    "sticker_id": 926,
                    "t": "charm",
                    "pattern": 0
                },
                {
                    "slot": 0,
                    "wear": null,
                    "image": "https://cdn.steamstatic.com/apps/730/icons/econ/stickers/tournament_assets/de_dust2_gold.30c34e3f11c40cf4f44c0577e01f2a9446feb88f.png",
                    "name": "Sticker | Dust II (Gold)",
                    "sticker_id": 1690,
                    "t": "sticker",
                    "pattern": 0
                },
                {
                    "slot": 2,
                    "wear": null,
                    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOXSQ61MnpNWipV_mTSL2kZrks3ADu6r3baI7eKnLCjHClexz6LQ6HXrlxEkmtWSDnon_dymXaQJzCMBuBbld38vKSOc",
                    "name": "Sticker | Falcons (Gold) | Cologne 2026",
                    "sticker_id": 10380,
                    "t": "sticker",
                    "pattern": 0
                },
                {
                    "slot": 3,
                    "wear": null,
                    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOXSQ61MnpNWipUr3SA_OmZns-WwD7ar2PKE1I6WSXWKSlrkv6Lc8SS3hzE4jtjjWn46vJX7FaAFyDMFwW6dU5UffrHPu",
                    "name": "Sticker | Team Spirit (Gold) | Cologne 2026",
                    "sticker_id": 10408,
                    "t": "sticker",
                    "pattern": 0
                },
                {
                    "slot": 4,
                    "wear": null,
                    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOXSQ61MnpNWipUruRiL8zpjl7jtk6P2ibOo5cfHKV2XBkO0i5eIwHCiwxEQk5WSAyoyoJHmfbg4mCcN2F-VZukTtjJS5YBltmHKb",
                    "name": "Sticker | m0NESY (Gold) | Cologne 2026",
                    "sticker_id": 10585,
                    "t": "sticker",
                    "pattern": 0
                }
            ],
            "inspect": "steam://rungame/730/76561202255233023/+csgo_econ_action_preview 0010F4F2D0CEC901180920D80238D2DBEDEC0340F30462090800109A0D3000500062090802108C51300050006209080310A851300050006209080410D95230005000A201130800109E0730003D102D074145F98FAF3F5000F34E38CC"
        },
        "steam_price": {
            "name": "Souvenir AWP | Dragon Lore (Minimal Wear)",
            "market_name": "souvenir awp dragon lore minimal wear",
            "average": 8668360,
            "current": 0,
            "img": "https://images.waxpeer.com/i/730-souvenir-awp-dragon-lore-minimal-wear.webp",
            "game_id": 730,
            "lowest_price": 9720000,
            "listings": 8,
            "rating": 4.5,
            "rating_votes": 3944,
            "type": "Rifles",
            "tag_type": null,
            "collection": "The Cobblestone Collection",
            "collection_icon": "https://images.waxpeer.com/i/730-the-cobblestone-collection.webp",
            "rarity_color": "#eb4b4b",
            "cases_count": 10,
            "pros_count": 0,
            "rarity": "Covert",
            "ru_description": "Печально известная снайперская винтовка AWP — очень опасное и очень эффективное оружие, которое легко узнается по характерному звуку выстрела и жестокому правилу: «один выстрел, один труп». Узловой рисунок в виде дракона нанесен вручную.\n\n<i>Даже две сотни ключей не раскроют его секретов</i>",
            "ch_description": "高风险，高回报，恶名昭彰的 AWP 因其标志性的枪声和一枪一个的准则而为人熟知。 这把武器使用凯尔特龙的图案进行了自定义涂装。\n\n<i>200 把钥匙绝对无法解开它的秘密</i>",
            "description": "High risk and high reward, the infamous AWP is recognizable by its signature report and one-shot, one-kill policy. It has been custom painted with a knotwork dragon.\n\n<i>200 keys could never unlock its secrets</i>",
            "api_count": 2,
            "pros": [],
            "colors": [
                {
                    "hex": "#000000",
                    "title": "Black",
                    "percentage": 37.538475
                },
                {
                    "hex": "#999999",
                    "title": "Gray",
                    "percentage": 32.958218
                },
                {
                    "hex": "#FFC802",
                    "title": "Yellow",
                    "percentage": 8.069791
                }
            ],
            "localized_name": "Souvenir AWP | История о драконе (Немного поношенное)"
        },
        "deliveryTiming": "12h",
        "custom_descriptions": [
            {
                "category": "description",
                "data": "<h2>Купить AWP | История о драконе</h2><p>Винтовка AWP популярна не только во многих спецподразделениях мира, но и в компьютерных играх. Трудно представить раунд без винтовки, работающей по принципу \"один выстрел — один труп\". Вечной классикой CS:GO является История о драконе. Каждый трейдер и любитель контрактов обмена обязан подержать в руках эту винтовку, скрафтить ее или выменять у другого человека на Waxpeer. На цевье болтовки расположен красный дракон, источающий смертоносной пламя. Комбинация желтого, золотого и различных оттенков красного не только выделяют такую AWP среди всех остальных, но и превращает ее в один из самых красивых скинов игрового мира CS:GO. Скин был добавлен в игру 1 июля 2014 года одновременно с операцией \"Прорыв\". Именно эта винтовка является флагманом коллекции Cobblestone. </p>"
            },
            {
                "category": "about",
                "data": "<h2>Продать AWP | История о драконе</h2><p>Покупать и продавать скины для CS:GO и Dota 2 очень просто: вы заходите на сайт, легко покупаете и столь же просто продаете. Waxpeer - это уникальная торговая площадка, которая позволяет легко покупать и продавать товары. Пополнение счета на сайте и вывод средств происходит четко, просто и быстро. На сайте подробно описано, как работает покупка и продажа скинов CS:GO и Dota 2, безопасность сделок подтверждена множеством реальных отзывов пользователей, а онлайн-поддержка всегда оперативно решает любые проблемы и отвечает на вопросы. Кроме того, алгоритм передачи товара работает безупречно, поэтому вы получите свой скин без промедлений.</p>"
            }
        ]
    },
    "similar": [
        {
            "item_id": "53848076165",
            "name": "Souvenir AWP | Dragon Lore (Minimal Wear)",
            "game": "csgo",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993144651/200fx125f",
            "price": 9720000,
            "float": 0.11309150606393814,
            "auto": true,
            "by": "c593bab6-e32a-4aaa-8a93-25ca8c711853",
            "escrow": false,
            "unlock_at": null,
            "fade_percent": 0,
            "best_price": false,
            "deliveryTiming": "1m",
            "steam_price": {
                "min_csmc": 8750000
            },
            "inspect_item": {
                "floatvalue": 0.11309150606393814,
                "front": "https://images.waxpeer.com/screenshot/items/53848076165_front_full_1790453317192.webp",
                "back": "https://images.waxpeer.com/screenshot/items/53848076165_back_full_1790453317192.webp",
                "stickers": [
                    {
                        "name": "Sticker | Dust II (Gold)",
                        "img": "https://cdn.steamstatic.com/apps/730/icons/econ/stickers/tournament_assets/de_dust2_gold.30c34e3f11c40cf4f44c0577e01f2a9446feb88f.png",
                        "steam_price": {
                            "average": 0,
                            "type": "Stickers"
                        }
                    },
                    {
                        "name": "Sticker | G2 esports (Gold) | Cologne 2026",
                        "img": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOXSQ61MnpNWipV61fhr-kpKurCQPuPf6a6Y1d6TCXDGSluovtbI5HCuxzEUh5G2By4v7I3_FZg5yXowwG7A4RXlLyw",
                        "steam_price": {
                            "average": 64440,
                            "type": "Stickers"
                        }
                    },
                    {
                        "name": "Sticker | m0NESY (Gold) | Cologne 2026",
                        "img": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOXSQ61MnpNWipUruRiL8zpjl7jtk6P2ibOo5cfHKV2XBkO0i5eIwHCiwxEQk5WSAyoyoJHmfbg4mCcN2F-VZukTtjJS5YBltmHKb",
                        "steam_price": {
                            "average": 125070,
                            "type": "Stickers"
                        }
                    }
                ]
            }
        }
    ],
    "similar_cursor": null,
    "similar_count": 1,
    "highPrice": 9720000,
    "hasMoreSimilarItems": false,
    "recommended_items": [
        {
            "item_id": "54070710469",
            "name": "AWP | Gungnir (Minimal Wear)",
            "game": "csgo",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993051280/200fx125f",
            "price": 10460593,
            "steam_price": {
                "average": 9619771,
                "suggested": 1617490,
                "rarity_color": "#eb4b4b"
            },
            "float": 0.1365261971950531,
            "exterior": "MW",
            "stat_trak": false,
            "souvenir": false,
            "byName": false,
            "locked_until": "2026-10-14T10:00:53.614Z",
            "deliveryTiming": "5m",
            "inspect_item": {
                "front": "https://images.waxpeer.com/screenshot/items/54070710469_front_full_1791972073708.webp",
                "back": "https://images.waxpeer.com/screenshot/items/54070710469_back_full_1791972073708.webp"
            }
        },
        {
            "item_id": "53212873435",
            "name": "AWP | Medusa (Factory New)",
            "game": "csgo",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993043963/200fx125f",
            "price": 5044990,
            "steam_price": {
                "average": 5802400,
                "suggested": 1763339,
                "rarity_color": "#eb4b4b"
            },
            "float": 0.023232927545905113,
            "exterior": "FN",
            "stat_trak": false,
            "souvenir": false,
            "byName": false,
            "locked_until": "2026-08-22T08:12:24.362Z",
            "deliveryTiming": "5m",
            "inspect_item": {
                "front": "https://images.waxpeer.com/screenshot/items/53212873435_front_full_1786967967988.webp",
                "back": "https://images.waxpeer.com/screenshot/items/53212873435_back_full_1786967967988.webp"
            }
        },
        {
            "item_id": "53905911064",
            "name": "Souvenir AWP | The Prince (Minimal Wear)",
            "game": "csgo",
            "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6FjIf2WAlicyOl-pK9qHXHkw093sGvTw4uqJSnDPQAkCsNyEbZcshiwxtK0Yumz4gbX2o9C02yg2f5NtC8l",
            "price": 2506406,
            "steam_price": {
                "average": 4483635,
                "rarity_color": "#eb4b4b"
            },
            "float": 0.10604195296764374,
            "exterior": "MW",
            "stat_trak": false,
            "souvenir": true,
            "byName": false,
            "locked_until": "2026-10-17T06:14:38.920Z",
            "deliveryTiming": "12h",
            "inspect_item": {
                "front": "https://images.waxpeer.com/screenshot/items/53905911064_front_full_1791998928285.webp",
                "back": "https://images.waxpeer.com/screenshot/items/53905911064_back_full_1791998928285.webp"
            }
        },
        {
            "item_id": "52540464191",
            "name": "StatTrak™ AWP | Lightning Strike (Minimal Wear)",
            "game": "csgo",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993073147/200fx125f",
            "price": 1833260,
            "steam_price": {
                "average": 30538934,
                "suggested": 875000,
                "rarity_color": "#eb4b4b"
            },
            "float": 0.07927203178405762,
            "exterior": "MW",
            "stat_trak": true,
            "souvenir": false,
            "byName": false,
            "locked_until": "2026-07-16T18:38:57.183Z",
            "deliveryTiming": "5m",
            "inspect_item": {
                "front": "https://images.waxpeer.com/screenshot/items/53251544186_front_full_1786989247313.webp",
                "back": "https://images.waxpeer.com/screenshot/items/53251544186_back_full_1786989247313.webp"
            }
        },
        {
            "item_id": "53682948952",
            "name": "Souvenir AWP | LongDog (Factory New)",
            "game": "csgo",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993044845",
            "price": 799395,
            "steam_price": {
                "average": 730534,
                "suggested": 1156530,
                "rarity_color": "#eb4b4b"
            },
            "float": 0.026491140946745872,
            "exterior": "FN",
            "stat_trak": false,
            "souvenir": true,
            "byName": false,
            "locked_until": "2026-10-15T01:06:43.358Z",
            "deliveryTiming": "12h"
        },
        {
            "item_id": "52995865547",
            "name": "Souvenir AWP | Desert Hydra (Factory New)",
            "game": "csgo",
            "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6x0JOKSMWuZxuZi_uA7Syu2w0Ry4mqGzYypeH3DaAEnCpt0FuAK4RjrkoDgMb7mtFfcit5bjXKpX4RFZcA",
            "price": 1340836,
            "steam_price": {
                "average": 1799050,
                "suggested": 1800000,
                "rarity_color": "#eb4b4b"
            },
            "float": 0.04800216108560562,
            "exterior": "FN",
            "stat_trak": false,
            "souvenir": true,
            "byName": false,
            "locked_until": "2026-10-17T06:14:38.920Z",
            "deliveryTiming": "12h",
            "inspect_item": {
                "front": "https://images.waxpeer.com/screenshot/items/52995865547_front_full_1792160395139.webp",
                "back": "https://images.waxpeer.com/screenshot/items/52995865547_back_full_1792160395139.webp"
            }
        }
    ],
    "variants": [
        {
            "item_id": "54108833042",
            "name": "AWP | Dragon Lore (Battle-Scarred)",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993035825",
            "price": 4873344,
            "selling": true,
            "game": "csgo",
            "exterior": "BS",
            "stat_trak": false,
            "souvenir": false,
            "float": 0.634791374206543,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": "54110011501",
            "name": "AWP | Dragon Lore (Factory New)",
            "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv3--Y3nj1H6qBFvMWHyIo7Adw9raF6GrlK9lLi-jJO7tJ_JzyNh63F3sX_emUPkgQYMMLL2MDRAbQ",
            "price": 11170571,
            "selling": true,
            "game": "csgo",
            "exterior": "FN",
            "stat_trak": false,
            "souvenir": false,
            "float": 0.0316438302397728,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": "54080437558",
            "name": "AWP | Dragon Lore (Field-Tested)",
            "image": "https://community.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMyoD0mlOx5UM5ZWClcYCUdgU3Z1rQ_FK-xezngZO46MzOziQ1vSMmtCmIyxfkgx5SLrs4SgJFJKs",
            "price": 6460334,
            "selling": true,
            "game": "csgo",
            "exterior": "FT",
            "stat_trak": false,
            "souvenir": false,
            "float": 0.3088771104812622,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": "54088482994",
            "name": "AWP | Dragon Lore (Minimal Wear)",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993048815",
            "price": 8881136,
            "selling": true,
            "game": "csgo",
            "exterior": "MW",
            "stat_trak": false,
            "souvenir": false,
            "float": 0.11354836821556091,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": "48943231091",
            "name": "AWP | Dragon Lore (Well-Worn)",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/520108472/200fx125f",
            "price": 9149000,
            "selling": true,
            "game": "csgo",
            "exterior": "WW",
            "stat_trak": false,
            "souvenir": false,
            "float": 0.41760191321372986,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": "51413579394",
            "name": "Souvenir AWP | Dragon Lore (Battle-Scarred)",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993056520/200fx125f",
            "price": 28999000,
            "selling": true,
            "game": "csgo",
            "exterior": "BS",
            "stat_trak": false,
            "souvenir": true,
            "float": 0.616372287273407,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": "54102534457",
            "name": "Souvenir AWP | Dragon Lore (Factory New)",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993116245/200fx125f",
            "price": 12441600,
            "selling": true,
            "game": "csgo",
            "exterior": "FN",
            "stat_trak": false,
            "souvenir": true,
            "float": 0.04778660833835602,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": "52455432492",
            "name": "Souvenir AWP | Dragon Lore (Field-Tested)",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993050357/200fx125f",
            "price": 7095360,
            "selling": true,
            "game": "csgo",
            "exterior": "FT",
            "stat_trak": false,
            "souvenir": true,
            "float": 0.2816266715526581,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": "54120429940",
            "name": "Souvenir AWP | Dragon Lore (Minimal Wear)",
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/class/730/7993144651",
            "price": 9495957,
            "selling": true,
            "game": "csgo",
            "exterior": "MW",
            "stat_trak": false,
            "souvenir": true,
            "float": 0.07589305937290192,
            "phase": null,
            "rarity_color": "#eb4b4b"
        },
        {
            "item_id": null,
            "name": "Souvenir AWP | Dragon Lore (Well-Worn)",
            "image": "https://images.waxpeer.com/i/730-souvenir-awp-dragon-lore-well-worn.webp",
            "price": null,
            "selling": false,
            "game": "csgo",
            "exterior": "WW",
            "stat_trak": false,
            "souvenir": true,
            "float": null,
            "phase": null,
            "rarity_color": "#eb4b4b"
        }
    ],
    "attributes": {
        "weapon": "AWP",
        "prefab": "sniper_rifle",
        "used_by_classes": {
            "terrorists": 1,
            "counter-terrorists": 1
        },
        "attributes": {
            "range": 8192,
            "damage": 115,
            "spread": 0.2,
            "cycletime": 1.455,
            "kill award": 100,
            "spread alt": 0.2,
            "zoom fov 1": 40,
            "zoom fov 2": 10,
            "addon scale": 0.9,
            "armor ratio": 1.95,
            "penetration": 2.5,
            "recoil seed": 4100,
            "zoom levels": 2,
            "zoom time 0": 0.05,
            "zoom time 1": 0.05,
            "zoom time 2": 0.05,
            "recoil angle": 0,
            "time to idle": 2,
            "heat per shot": 1.5,
            "idle interval": 60,
            "in game price": 4750,
            "rumble effect": 2,
            "weapon weight": 30,
            "magazine model": "models/weapons/w_snip_awp_mag.mdl",
            "range modifier": 0.99,
            "inaccuracy fire": 53.849998,
            "inaccuracy jump": 133.830002,
            "inaccuracy land": 0.307,
            "inaccuracy move": 176.479996,
            "inaccuracy stand": 80.800003,
            "max player speed": 200,
            "recoil angle alt": 0,
            "recoil magnitude": 78,
            "inaccuracy crouch": 60.599998,
            "inaccuracy ladder": 136.5,
            "inaccuracy reload": 0,
            "primary clip size": 5,
            "unzoom after shot": 1,
            "inaccuracy fire alt": 53.849998,
            "inaccuracy jump alt": 133.830002,
            "inaccuracy land alt": 0.1,
            "inaccuracy move alt": 176.479996,
            "recovery time stand": 0.34539,
            "inaccuracy stand alt": 2,
            "max player speed alt": 100,
            "recoil magnitude alt": 25,
            "recovery time crouch": 0.24671,
            "inaccuracy crouch alt": 1.5,
            "inaccuracy ladder alt": 136.5,
            "recoil angle variance": 20,
            "crosshair min distance": 8,
            "hide view model zoomed": 1,
            "inaccuracy jump initial": 172.860001,
            "primary reserve ammo max": 30,
            "recoil angle variance alt": 20,
            "recoil magnitude variance": 15,
            "recovery time stand final": 0.34539,
            "recovery time crouch final": 0.24671,
            "recoil magnitude variance alt": 2,
            "flinch velocity modifier large": 0.35,
            "flinch velocity modifier small": 0.4
        }
    },
    "breadcrumbs": [],
    "recommended_stickers": [
        {
            "name": "Sticker | Crown (Foil)",
            "image": "https://images.waxpeer.com/i/730-sticker-crown-foil.webp",
            "item_count": 21,
            "min_price": 375490,
            "max_price": 375490,
            "item_id": 53870259535,
            "localized_name": "Наклейка | Корона (металлическая)"
        },
        {
            "name": "Sticker | Dragon Lore (Foil)",
            "image": "https://images.waxpeer.com/i/730-sticker-dragon-lore-foil.webp",
            "item_count": 13,
            "min_price": 6699,
            "max_price": 6699,
            "item_id": 54109014650,
            "localized_name": "Наклейка | История о драконе (голографическая)"
        },
        {
            "name": "Sticker | s1mple (Gold) | Stockholm 2021",
            "image": "https://images.waxpeer.com/i/730-sticker-s1mple-gold-stockholm-2021.webp",
            "item_count": 6,
            "min_price": 30576,
            "max_price": 30576,
            "item_id": 54115646017,
            "localized_name": "Наклейка | s1mple (золотая) | Стокгольм-2021"
        },
        {
            "name": "Sticker | My Other Awp",
            "image": "https://images.waxpeer.com/i/730-sticker-my-other-awp.webp",
            "item_count": 5,
            "min_price": 389,
            "max_price": 389,
            "item_id": 54063155349,
            "localized_name": "Наклейка | Запасной AWP"
        },
        {
            "name": "Sticker | kennyS (Gold) | Krakow 2017",
            "image": "https://images.waxpeer.com/i/730-sticker-kennys-gold-krakow-2017.webp",
            "item_count": 4,
            "min_price": 1633990,
            "max_price": 1633990,
            "item_id": 53280076297,
            "localized_name": "Наклейка | kennyS (золотая) | Краков-2017"
        },
        {
            "name": "Sticker | kennyS (Gold) | Boston 2018",
            "image": "https://images.waxpeer.com/i/730-sticker-kennys-gold-boston-2018.webp",
            "item_count": 3,
            "min_price": 1109990,
            "max_price": 1109990,
            "item_id": 52014140482,
            "localized_name": "Наклейка | kennyS (золотая) | Бостон-2018"
        },
        {
            "name": "Sticker | Vox Eminor (Holo) | Katowice 2015",
            "image": "https://images.waxpeer.com/i/730-sticker-vox-eminor-holo-katowice-2015.webp",
            "item_count": 3,
            "min_price": 1781021,
            "max_price": 1781021,
            "item_id": 51045909979,
            "localized_name": "Наклейка | Vox Eminor (голографическая) | Катовице-2015"
        },
        {
            "name": "Sticker | Scorch Loop",
            "image": "https://images.waxpeer.com/i/730-sticker-scorch-loop.webp",
            "item_count": 3,
            "min_price": 126,
            "max_price": 126,
            "item_id": 54112344836,
            "localized_name": "Наклейка | Огненная дуга"
        }
    ],
    "family_skins": [],
    "hasMoreFamilySkins": false,
    "cases": {
        "success": true,
        "count": 10,
        "hasMore": false,
        "data": [
            {
                "name": "Boston 2018 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-boston-2018-cobblestone-souvenir-package.webp"
            },
            {
                "name": "Krakow 2017 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-krakow-2017-cobblestone-souvenir-package.webp"
            },
            {
                "name": "Atlanta 2017 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-atlanta-2017-cobblestone-souvenir-package.webp"
            },
            {
                "name": "Cologne 2016 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-cologne-2016-cobblestone-souvenir-package.webp"
            },
            {
                "name": "DreamHack 2014 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-dreamhack-2014-cobblestone-souvenir-package.webp"
            },
            {
                "name": "MLG Columbus 2016 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-mlg-columbus-2016-cobblestone-souvenir-package.webp"
            },
            {
                "name": "ESL One Cologne 2014 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-esl-one-cologne-2014-cobblestone-souvenir-package.webp"
            },
            {
                "name": "ESL One Cologne 2015 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-esl-one-cologne-2015-cobblestone-souvenir-package.webp"
            },
            {
                "name": "ESL One Katowice 2015 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-esl-one-katowice-2015-cobblestone-souvenir-package.webp"
            },
            {
                "name": "DreamHack Cluj-Napoca 2015 Cobblestone Souvenir Package",
                "image": "https://images.waxpeer.com/i/730-dreamhack-cluj-napoca-2015-cobblestone-souvenir-package.webp"
            }
        ]
    }
}
*/
