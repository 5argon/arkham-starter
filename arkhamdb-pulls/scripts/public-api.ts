import {
  AhdbCard,
  AhdbDeck,
  AhdbPack,
  AhdbTaboo,
  AhdbTabooProcessing,
  TabooItem,
} from "./interfaces.ts";
import { path } from "../mod.ts";
import {
  baseUrl,
  publicApiCard,
  publicApiCards,
  publicApiDecklist,
  publicApiPacks,
  publicApiTaboos,
} from "./constants.ts";
import { fetchWithRetries } from "./fetch.ts";

export async function publicCard(cardNumber: string): Promise<AhdbCard> {
  const joinedPath = path.join(baseUrl, publicApiCard, cardNumber);
  const ret = await fetchWithRetries(joinedPath);
  const c = (await ret.json()) as AhdbCard;
  //console.log(c);
  return c;
}

export async function publicAllCards(additional: string): Promise<AhdbCard[]> {
  const joinedPath = path.join(baseUrl, publicApiCards) + additional;
  const ret = await fetchWithRetries(joinedPath);
  const c = (await ret.json()) as AhdbCard[];
  //console.log(c);
  return c;
}

export async function publicDeck(deckNumber: number): Promise<AhdbDeck> {
  const joinedPath = path.join(
    baseUrl,
    publicApiDecklist,
    deckNumber.toString()
  );
  const ret = await fetchWithRetries(joinedPath);
  const c = (await ret.json()) as AhdbDeck;
  //console.log(c);
  return c;
}

export async function publicPacks(): Promise<AhdbPack[]> {
  const joinedPath = path.join(baseUrl, publicApiPacks);
  const ret = await fetchWithRetries(joinedPath);
  const c = (await ret.json()) as AhdbPack[];
  //console.log(c);
  return c;
}

export async function publicTaboos(): Promise<AhdbTaboo[]> {
  const joinedPath = path.join(baseUrl, publicApiTaboos);
  const ret = await fetchWithRetries(joinedPath);
  const c = (await ret.json()) as AhdbTabooProcessing[];
  const cc = c.map<AhdbTaboo>((x) => {
    return {
      ...x,
      cards: JSON.parse(x.cards) as TabooItem[],
    };
  });
  return cc;
}
