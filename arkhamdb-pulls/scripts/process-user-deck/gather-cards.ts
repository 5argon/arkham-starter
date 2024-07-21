import { CardList, AhdbDeck } from "../interfaces";

export function gatherUniqueCardIds(decks: AhdbDeck[]): string[] {
  const set = new Set<string>();
  decks.forEach((x) => {
    const cards = gatherUniqueCardIdsInner(x);
    cards.forEach((y) => set.add(y));
  });
  return Array.from(set);
}

function gatherUniqueCardIdsInner(deck: AhdbDeck): string[] {
  const set = new Set<string>();
  const g1 = gett(deck.slots);
  const g2 = gett(deck.sideSlots);
  const g3 = gett(deck.ignoreDeckLimitSlots);
  g1.forEach((x) => set.add(x));
  g2.forEach((x) => set.add(x));
  g3.forEach((x) => set.add(x));
  set.add(deck.investigator_code)

  // All cards mentioned in the description should also be gathered.
  

  return Array.from(set);
}

function gett(cardList: CardList): string[] {
  if (cardList === null) {
    return [];
  }
  return Object.keys(cardList);
}
