export interface UserJson {
  decks: Deck[];
}

export interface Deck {
  id: number;
}

export interface UserDecks {
  id: number;
  decks: Deck[];
}