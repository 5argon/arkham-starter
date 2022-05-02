export interface UserDecks {
  id: number;
  username: string;
  deckGroups: DeckGroup[];
  decks: number[];
}

export interface DeckGroup {
  name: string;
  decks: number[];
}

export interface AhdbCard {
  pack_code: string;
  pack_name: string;
  type_code: string;
  type_name: string;
  faction_code: string;
  faction_name: string;
  position: number;
  exceptional: boolean;
  myriad: false;
  code: string;
  name: string;
  real_name: string;
  subname: string;
  cost: number;
  text: string;
  real_text: string;
  quantity: number;
  skill_combat?: number;
  skill_intellect?: number;
  skill_agility?: number;
  skill_willpower?: number;
  skill_wild?: number;
  xp: number;
  health?: number;
  sanity?: number;
  health_per_investigator: boolean;
  deck_limit: number;
  slot: string;
  real_slot: string;
  traits: string;
  real_traits: string;
  flavor?: string;
  illustrator: string;
  is_unique: boolean;
  permanent: boolean;
  double_sided: boolean;
  octgn_id: string;
  url: string;
  imagesrc: string;
}

export type CardList = { [k: string]: number } | null;

export interface AhdbDeck {
  id: number;
  name: string;
  date_creation: string;
  date_update: string;
  description_md: string;
  user_id: number;
  investigator_code: string;
  investigator_name: string;
  slots: CardList;
  sideSlots: CardList;
  ignoreDeckLimitSlots: CardList;
  version: number;
  xp: number | null;
  xp_spent: number | null;
  xp_adjustment: number;
  exile_string: null;
  taboo_id: number;
  meta: string;
  tags: string;
  previous_deck: number | null;
  next_deck: number | null;
}
