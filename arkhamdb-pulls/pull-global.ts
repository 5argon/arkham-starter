import { publicAllCards, publicTaboos } from "./scripts/public-api.ts";
import { AhdbTaboo, extractTraits } from "./scripts/interfaces.ts";
import { emptyDir } from "./mod.ts";
import { PopupDatabase, PopupDatabaseItem } from "./scripts/popup-database.ts";
import { path } from "./mod.ts";
import {
  pullsDirectory,
  pullsUtils,
  pullsUtilsPlayerDatabase,
  pullsUtilsPopupDatabase,
} from "./scripts/constants.ts";
import { downloadImages } from "./scripts/process-user-deck/download-images.ts";

console.log("Downloading all cards to create popup database...");
const allCards = await publicAllCards("");
const taboos = await publicTaboos();
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

const uniquePackCode = new Set<string>();
const uniquePackName = new Set<string>();
const uniqueClassName = new Set<string>();
const uniqueTrait = new Set<string>();

// Preprocess to collect repeated strings.
allCards.forEach((x) => {
  uniqueClassName.add(x.faction_code);
  if (x.faction2_code !== undefined) {
    uniqueClassName.add(x.faction2_code);
  }
  if (x.faction3_code !== undefined) {
    uniqueClassName.add(x.faction3_code);
  }
  if (x.traits !== undefined) {
    const extracted = extractTraits(x.traits);
    extracted.forEach((x) => {
      uniqueTrait.add(x);
    });
  }
  uniquePackCode.add(x.pack_code);
  uniquePackName.add(x.pack_name);
});

function makeMap(s: Set<string>): {
  toNum: { [k: string]: number };
  fromNum: { [k: number]: string };
} {
  const m1: { [k: string]: number } = {};
  const m2: { [k: number]: string } = {};
  const st = Array.from(s);
  st.forEach((x, i) => {
    m1[x] = i;
    m2[i] = x;
  });
  return { toNum: m1, fromNum: m2 };
}

const packCodeMap = makeMap(uniquePackCode);
const packNameMap = makeMap(uniquePackName);
const classNameMap = makeMap(uniqueClassName);
const traitMap = makeMap(uniqueTrait);

const popupDatabaseItems: PopupDatabaseItem[] = [];
const playerCards = allCards.filter((x) => {
  return x.faction_code !== "mythos";
});

playerCards.forEach((x) => {
  let traits: number[] = [];
  if (x.traits !== undefined) {
    const extracted = extractTraits(x.traits);
    traits = extracted.map((x) => {
      return traitMap.toNum[x];
    });
  }
  popupDatabaseItems.push({
    id: x.code,
    n: x.name,
    sn: x.subname,
    ps: x.position,
    pc: packCodeMap.toNum[x.pack_code],
    pn: packNameMap.toNum[x.pack_name],
    ex: x.exceptional,
    ext:
      x.code in tabooExceptionalMap
        ? tabooExceptionalMap[x.code]
        : x.exceptional,
    xp: x.xp,
    xpat: x.code in tabooXpMap ? tabooXpMap[x.code] : 0,
    tra: traits,
    sag: x.skill_agility,
    scm: x.skill_combat,
    sit: x.skill_intellect,
    swi: x.skill_wild,
    swl: x.skill_willpower,
    c1: classNameMap.toNum[x.faction_code],
    c2:
      x.faction2_code !== undefined
        ? classNameMap.toNum[x.faction2_code]
        : undefined,
    c3:
      x.faction3_code !== undefined
        ? classNameMap.toNum[x.faction3_code]
        : undefined,
    ir: x.restrictions !== undefined && x.restrictions !== null,
  });
});

const popupDatabase: PopupDatabase = {
  items: popupDatabaseItems,
  classNames: classNameMap.fromNum,
  packCodes: packCodeMap.fromNum,
  packNames: packNameMap.fromNum,
  traits: traitMap.fromNum,
};

console.log("Writing popup database...");
await emptyDir(path.join(pullsDirectory, pullsUtils));
const w1 = Deno.writeTextFile(
  path.join(pullsDirectory, pullsUtils, pullsUtilsPopupDatabase),
  JSON.stringify(popupDatabase)
);
const w2 = Deno.writeTextFile(
  path.join(pullsDirectory, pullsUtils, pullsUtilsPlayerDatabase),
  JSON.stringify(playerCards)
);
await Promise.all([w1, w2]);
console.log("Finished writing popup database and player database.");

console.log("Downloading all player card images... (TAKES TIME!)");
await downloadImages(playerCards);
console.log("Downloaded all player card images.");
