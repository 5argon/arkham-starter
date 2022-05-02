import { AhdbCard, AhdbDeck, UserDecks } from "../interfaces.ts";
import { publicCard, publicDeck } from "../public-api.ts";
import { gatherUniqueCardIds } from "./gather-cards.ts";

export async function processUserDeck(
  userDeck: UserDecks
): Promise<AhdbDeck[]> {
  const deckReadPromises = userDeck.decks.map((x) => publicDeck(x));
  const deckReadPromises2 = userDeck.deckGroups.flatMap((x) =>
    x.decks.map((y) => {
      return publicDeck(y);
    })
  );
  const decks = await Promise.all(deckReadPromises);
  const decks2 = await Promise.all(deckReadPromises2);
  const allDecks = [...decks, ...decks2];
  return allDecks;
}

export async function gatherCards(decks: AhdbDeck[]): Promise<AhdbCard[]> {
  const uniqueCardIds = gatherUniqueCardIds(decks);
  const cardReadPromises = uniqueCardIds.map((x) => publicCard(x));
  const cards = await Promise.all(cardReadPromises);
  return cards;
}
