import { path } from "../../mod.ts";
import { transformDirectory, transformRepackage } from "../constants.ts";
import { AhdbDeck, AhdbCard, Repackage, RepackageMaps } from "../interfaces.ts";

// export async function transformDecksAndCards(
//   decks: AhdbDeck[],
//   cards: AhdbCard[]
// ): [AhdbDeck[], AhdbCard[]] {}

export async function createRepackageMaps(): Promise<RepackageMaps> {
  const repackages = JSON.parse(
    await Deno.readTextFile(path.join(transformDirectory, transformRepackage))
  ) as Repackage[];
  const packForwardMap: { [k: string]: string } = {};
  const packAliasMap: { [k: string]: string } = {};
  const packParentCodeMap: { [k: string]: string } = {};
  repackages.forEach((x) => {
    x.sources.forEach((y) => {
      if (x.addAlias !== undefined) {
        packAliasMap[y] = x.addAlias;
      }
      if (x.forwardTo !== undefined) {
        packForwardMap[y] = x.forwardTo;
      }
      if (x.addParentCode !== undefined) {
        packParentCodeMap[y] = x.addParentCode;
      }
    });
  });
  return {
    packAliasMap: packAliasMap,
    packForwardMap: packForwardMap,
    packParentCodeMap: packParentCodeMap,
  };
}
