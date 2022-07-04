import { publicAllCards, publicTaboos } from "./scripts/public-api.ts";
import { AhdbCard, AhdbTaboo, extractTraits } from "./scripts/interfaces.ts";
import { emptyDir } from "./mod.ts";
import { PopupDatabase, PopupDatabaseItem } from "./scripts/popup-database.ts";
import { path } from "./mod.ts";
import {
  pullsDirectory,
  pullsUtils,
  pullsUtilsPlayerDatabase,
  pullsUtilsPopupDatabase,
  pullsUtilsTaboo,
} from "./scripts/constants.ts";
import {
  downloadImages,
  downloadImageSingleCard,
} from "./scripts/process-user-deck/download-images.ts";

export enum CardClass {
  Guardian,
  Seeker,
  Rogue,
  Mystic,
  Survivor,
  Neutral,
}

export function classConversion(c: string): CardClass {
  switch (c) {
    case "neutral":
      return CardClass.Neutral;
    case "guardian":
      return CardClass.Guardian;
    case "seeker":
      return CardClass.Seeker;
    case "rogue":
      return CardClass.Rogue;
    case "mystic":
      return CardClass.Mystic;
    case "survivor":
      return CardClass.Survivor;
    default:
      return CardClass.Neutral;
  }
}

export function iconToNewNameConversion(c: CardPack): string | null {
  switch (c) {
    case CardPack.Unknown:
      return "(Unknown Set)";
    case CardPack.CoreSet:
      break;
    case CardPack.RevisedCoreSet:
      break;
    case CardPack.ParallelInvestigator:
      return "Parallel Investigator";
    case CardPack.Novella:
      return "Novella";

    case CardPack.NathanielCho:
      break;
    case CardPack.HarveyWalters:
      break;
    case CardPack.WinifredHabbamock:
      break;
    case CardPack.JacquelineFine:
      break;
    case CardPack.StellaClark:
      break;

    case CardPack.TheDunwichLegacy:
      return "The Dunwich Legacy Investigator Expansion";
    case CardPack.ThePathToCarcosa:
      return "The Path to Carcosa Investigator Expansion";
    case CardPack.TheForgottenAge:
      return "The Forgotten Age Investigator Expansion";
    case CardPack.TheCircleUndone:
      return "The Circle Undone Investigator Expansion";
    case CardPack.TheDreamEaters:
      return "The Dream-Eaters Investigator Expansion";
    case CardPack.TheInnsmouthConspiracy:
      return "The Innsmouth Conspiracy Investigator Expansion";

    case CardPack.ReturnToTheNightOfTheZealot:
      break;
    case CardPack.ReturnToTheDunwichLegacy:
      break;
    case CardPack.ReturnToThePathToCarcosa:
      break;
    case CardPack.ReturnToTheCircleUndone:
      break;
    case CardPack.ReturnToTheForgottenAge:
      break;
    case CardPack.ReturnToTheDreamEaters:
      break;
    case CardPack.ReturnToTheInnsmouthConspiracy:
      break;
  }
  return null;
}

export enum CardPack {
  Unknown,

  CoreSet,
  RevisedCoreSet,
  ParallelInvestigator,
  Novella,

  NathanielCho,
  HarveyWalters,
  WinifredHabbamock,
  JacquelineFine,
  StellaClark,

  TheDunwichLegacy,
  ThePathToCarcosa,
  TheForgottenAge,
  TheCircleUndone,
  TheDreamEaters,
  TheInnsmouthConspiracy,
  EdgeOfTheEarth,
  TheScarletKeys,

  ReturnToTheNightOfTheZealot,
  ReturnToTheDunwichLegacy,
  ReturnToThePathToCarcosa,
  ReturnToTheCircleUndone,
  ReturnToTheForgottenAge,
  ReturnToTheDreamEaters,
  ReturnToTheInnsmouthConspiracy,
}

export function packCodeToIconConversion(p: string): CardPack {
  switch (p) {
    case "unk":
      return CardPack.Unknown;
    case "core":
      return CardPack.CoreSet;
    case "rcore":
      return CardPack.RevisedCoreSet;
    case "rod":
    case "aon":
    case "bad":
    case "btb":
    case "rtr":
      return CardPack.ParallelInvestigator;
    case "books":
    case "hoth":
    case "tdor":
    case "iotv":
    case "tdg":
    case "tftbw":
    case "bob":
    case "dre":
    case "promo":
      return CardPack.Novella;

    case "nat":
      return CardPack.NathanielCho;
    case "har":
      return CardPack.HarveyWalters;
    case "win":
      return CardPack.WinifredHabbamock;
    case "jac":
      return CardPack.JacquelineFine;
    case "ste":
      return CardPack.StellaClark;

    case "dwl":
    case "tmm":
    case "tece":
    case "bota":
    case "uau":
    case "wda":
    case "litas":
      return CardPack.TheDunwichLegacy;
    case "ptc":
    case "eotp":
    case "tuo":
    case "apot":
    case "tpm":
    case "bsr":
    case "dca":
      return CardPack.ThePathToCarcosa;
    case "tfa":
    case "tof":
    case "tbb":
    case "hote":
    case "tcoa":
    case "tdoy":
    case "sha":
      return CardPack.TheForgottenAge;
    case "tcu":
    case "tsn":
    case "wos":
    case "fgg":
    case "uad":
    case "icc":
    case "bbt":
      return CardPack.TheCircleUndone;
    case "tde":
    case "sfk":
    case "tsh":
    case "dsm":
    case "pnr":
    case "wgd":
    case "woc":
      return CardPack.TheDreamEaters;
    case "tic":
    case "itd":
    case "def":
    case "hhg":
    case "lif":
    case "lod":
    case "itm":
      return CardPack.TheInnsmouthConspiracy;
    case "eoep":
      return CardPack.EdgeOfTheEarth;
    case "sck":
      return CardPack.TheScarletKeys;

    case "rtnotz":
      return CardPack.ReturnToTheNightOfTheZealot;
    case "rtdwl":
      return CardPack.ReturnToTheDunwichLegacy;
    case "rtptc":
      return CardPack.ReturnToThePathToCarcosa;
    case "rttfa":
      return CardPack.ReturnToTheForgottenAge;
    case "rttcu":
      return CardPack.ReturnToTheCircleUndone;
    case "rttde":
      return CardPack.ReturnToTheDreamEaters;
    case "rttic":
      return CardPack.ReturnToTheInnsmouthConspiracy;
    default:
      return CardPack.CoreSet;
  }
}

export function classesScore(
  a: CardClass | undefined,
  b: CardClass | undefined,
  c: CardClass | undefined
): number {
  const total = classScore(a, 0) | classScore(b, 1) | classScore(c, 2);
  // Have fewer class count always win.
  let bonusShift = 3;
  if (b === undefined && c === undefined) {
    bonusShift = 2;
  } else if (b !== undefined && c === undefined) {
    bonusShift = 1;
  }
  // console.log(a,b,c,total)
  return total << bonusShift;
}

function classScore(c: CardClass | undefined, pos: number): number {
  if (c === undefined) {
    return 0 << (pos * 3);
  }
  return (c + 1) << (pos * 3);
}

export function typeScore(
  typeCode: string,
  subtypeCode: string | undefined
): number {
  switch (typeCode) {
    case "investigator":
      return 1 << 3;
    case "asset":
      return 2 << 3;
    case "event":
      return 3 << 3;
    case "skill":
      return 4 << 3;
    case "treachery":
      return 5 << 3;
    default:
      return 6 << 3;
  }
}

console.log("Downloading all cards...");
const allCards = await publicAllCards("");
const playerCards = allCards.filter((x) => {
  return x.faction_code !== "mythos" && x.type_code !== "story";
});

playerCards.sort((a, b) => {
  {
    const asc = classesScore(
      classConversion(a.faction_code),
      a.faction2_code ? classConversion(a.faction2_code) : undefined,
      a.faction3_code ? classConversion(a.faction3_code) : undefined
    );
    const bsc = classesScore(
      classConversion(b.faction_code),
      b.faction2_code ? classConversion(b.faction2_code) : undefined,
      b.faction3_code ? classConversion(b.faction3_code) : undefined
    );
    if (asc !== bsc) {
      return asc - bsc;
    }
  }
  {
    const asc = typeScore(a.type_code, undefined);
    const bsc = typeScore(b.type_code, undefined);
    if (asc !== bsc) {
      return asc - bsc;
    }
  }
  {
    const asc = a.xp ?? -3;
    const bsc = b.xp ?? -3;
    if (asc !== bsc) {
      return asc - bsc;
    }
  }
  {
    const apk =
      iconToNewNameConversion(packCodeToIconConversion(a.pack_code)) ??
      a.pack_name;
    const bpk =
      iconToNewNameConversion(packCodeToIconConversion(b.pack_code)) ??
      b.pack_name;
    if (apk !== bpk) {
      return apk.localeCompare(bpk);
    }
  }
  {
    if (a.name !== b.name) {
      a.name.localeCompare(b.name);
    }
  }
  {
    return a.position - b.position;
  }
});

function cardToName(c: AhdbCard): string {
  return [
    c.faction_name,
    c.faction2_name,
    c.faction3_name,
    c.type_code,
    c.xp,
    iconToNewNameConversion(packCodeToIconConversion(c.pack_code)) ??
      c.pack_name,
    c.name,
    c.position,
  ].join(" - ");
}

await Deno.writeTextFile("./test.txt", playerCards.map(cardToName).join("\n"));
await emptyDir("./out");
await Promise.all(
  playerCards.map((x) => downloadImageSingleCard(x, cardToName(x), "./out"))
);
