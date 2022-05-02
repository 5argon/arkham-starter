import { publicAllCards, publicTaboos } from "./scripts/public-api.ts";
import { AhdbTaboo, PopupDatabaseItem } from "./scripts/interfaces.ts";
import { createRepackageMaps } from "./scripts/process-user-deck/transforms.ts";
import { emptyDir } from "./mod.ts";
import { path } from "./mod.ts";
import {
  pullsDirectory,
  pullsUtils,
  pullsUtilsPopupDatabase,
} from "./scripts/constants.ts";

console.log("Downloading all cards to create popup database...");
const allCards = await publicAllCards("");
const taboos = await publicTaboos();
const repackageMap = await createRepackageMaps();
const latestTaboo: AhdbTaboo | null = taboos.length > 0 ? taboos[0] : null;
const tabooXpMap: { [k: string]: number } = {};
const tabooExceptionalMap: { [k: string]: boolean } = {};
if (latestTaboo !== null) {
  latestTaboo.cards.forEach((x) => {
    if (x.xp !== undefined) {
      tabooXpMap[x.code] = x.xp;
    }
    if (x.exceptional !== undefined) {
      tabooExceptionalMap[x.code] = x.exceptional;
    }
  });
}

const popupDatabaseItems: PopupDatabaseItem[] = [];
allCards.forEach((x) => {
  if (x.faction_code === "mythos") {
    return;
  }
  popupDatabaseItems.push({
    id: x.code,
    n: x.name,
    sn: x.subname,
    ps: x.position,
    pss: x.position.toString(),
    pc:
      x.pack_code in repackageMap.packParentCodeMap
        ? repackageMap.packParentCodeMap[x.pack_code]
        : x.pack_code,
    pn:
      x.pack_code in repackageMap.packParentCodeMap
        ? repackageMap.packAliasMap[x.pack_code]
        : x.pack_name,
    spn: x.pack_code in repackageMap.packParentCodeMap ? x.pack_name : "",
    ex: x.exceptional,
    ext:
      x.code in tabooExceptionalMap
        ? tabooExceptionalMap[x.code]
        : x.exceptional,
    xp: x.xp,
    xpat: x.code in tabooXpMap ? tabooXpMap[x.code] : 0,
    xps: x.xp?.toString() ?? "",
    xpts:
      x.xp === undefined
        ? ""
        : (x.xp + (x.code in tabooXpMap ? tabooXpMap[x.code] : 0)).toString(),
    c1: x.faction_code,
    c2: x.faction2_code,
    c3: x.faction3_code,
  });
});

console.log("Writing popup database...");
await emptyDir(path.join(pullsDirectory, pullsUtils));
await Deno.writeTextFile(
  path.join(pullsDirectory, pullsUtils, pullsUtilsPopupDatabase),
  JSON.stringify(popupDatabaseItems)
);
console.log("Finished writing popup database.");
