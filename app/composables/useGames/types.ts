export type gameTypes = 'csgo' | 'dota2' | 'tf2' | 'rust';
export type TGamePrefixForLink = '/' | `/${Exclude<gameTypes, 'csgo'>}/`;
