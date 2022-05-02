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
if (latestTaboo !== null) {
  console.log(latestTaboo);
  latestTaboo.cards.forEach((x) => {
    if (x.xp !== undefined) {
      tabooXpMap[x.code] = x.xp;
    }
  });
}

const popupDatabaseItems: PopupDatabaseItem[] = [];
allCards.forEach((x) => {
  if (x.faction_code === "mythos") {
    return;
  }
  popupDatabaseItems.push({
    name: x.name,
    subName: x.subname,
    position: x.position,
    packCode:
      x.pack_code in repackageMap.packParentCodeMap
        ? repackageMap.packParentCodeMap[x.pack_code]
        : x.pack_code,
    packName:
      x.pack_code in repackageMap.packParentCodeMap
        ? repackageMap.packAliasMap[x.pack_code]
        : x.pack_name,
    subPackName:
      x.pack_code in repackageMap.packParentCodeMap ? x.pack_name : "",
    exceptional: x.exceptional,
    xp: x.xp,
    xpTaboo: x.code in tabooXpMap ? tabooXpMap[x.code] : 0,
    class1: x.faction_code,
    class2: x.faction2_code,
    class3: x.faction3_code,
  });
});

console.log("Writing popup database...");
await emptyDir(path.join(pullsDirectory, pullsUtils));
await Deno.writeTextFile(
  path.join(pullsDirectory, pullsUtils, pullsUtilsPopupDatabase),
  JSON.stringify(popupDatabaseItems)
);
console.log("Finished writing popup database.");
