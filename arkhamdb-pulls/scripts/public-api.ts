import { AhdbCard, AhdbDeck } from "./interfaces.ts";
import { path } from "../mod.ts";
import { baseUrl, publicApiCard, publicApiDecklist } from "./constants.ts";

export async function publicCard(cardNumber: string): Promise<AhdbCard> {
  const joinedPath = path.join(baseUrl, publicApiCard, cardNumber);
  const ret = await fetch(joinedPath);
  const c = (await ret.json()) as AhdbCard;
  //console.log(c);
  return c;
}

export async function publicDeck(deckNumber: number): Promise<AhdbDeck> {
  const joinedPath = path.join(
    baseUrl,
    publicApiDecklist,
    deckNumber.toString()
  );
  const ret = await fetch(joinedPath);
  const c = (await ret.json()) as AhdbDeck;
  //console.log(c);
  return c;
}
