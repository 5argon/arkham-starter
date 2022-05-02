import { path } from "../../mod.ts";
import { pullsCards, pullsDecks } from "../constants.ts";
import { pullsDirectory } from "../constants.ts";
import { AhdbCard, AhdbDeck } from "../interfaces.ts";

export async function writeDecks(decks: AhdbDeck[]): Promise<void> {
  const proms = decks.map((x) => {
    return Deno.writeTextFile(
      path.join(pullsDirectory, pullsDecks, x.id + ".json"),
      JSON.stringify(x, null, 2)
    );
  });
  await Promise.all(proms);
}

export async function writeCards(cards: AhdbCard[]): Promise<void> {
  const proms = cards.map((x) => {
    return Deno.writeTextFile(
      path.join(pullsDirectory, pullsCards, x.code + ".json"),
      JSON.stringify(x, null, 2)
    );
  });
  await Promise.all(proms);
}
