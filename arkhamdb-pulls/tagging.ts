import { publicAllCards, publicTaboos } from "./scripts/public-api.ts"
import { AhdbCard, AhdbTaboo, extractTraits } from "./scripts/interfaces.ts"
import { emptyDir } from "./mod.ts"
import { PopupDatabase, PopupDatabaseItem } from "./scripts/popup-database.ts"
import { path } from "./mod.ts"
import {
  pullsDirectory,
  pullsJson,
  pullsUtilsPlayerDatabase,
  pullsUtilsPopupDatabase,
  pullsUtilsTaboo,
} from "./scripts/constants.ts"
import { extractCustomizable } from "./scripts/customizable.ts"
import { manualEdit } from "./scripts/manual-edit.ts"

enum CardPack {
  RevisedCoreSet = "rcore",

  TheDunwichLegacy = "dwl",
  ThePathToCarcosa = "ptc",
  TheForgottenAge = "tfa",
  TheCircleUndone = "tcu",
  TheDreamEaters = "tde",
  TheInnsmouthConspiracy = "tic",
  EdgeOfTheEarth = "eote",
  TheScarletKeys = "tsk",
  TheFeastOfHemlockVale = "fhv",
  TheDrownedCity = "tdc",

  ReturnTo = "rt",

  NathanielCho = "nat",
  HarveyWalters = "har",
  WinifredHabbamock = "win",
  JacquelineFine = "jac",
  StellaClark = "ste",

  ParallelInvestigator = "par",
  Other = "etc",
}

function packCodeToIconConversion(p: string): CardPack {
  switch (p) {
    case "core":
    case "rcore":
      return CardPack.RevisedCoreSet
    case "rod":
    case "aon":
    case "bad":
    case "btb":
    case "rtr":
    case "otr":
    case "ltr":
    case "ptr":
    case "rop":
    case "hfa":
      return CardPack.ParallelInvestigator
    case "books":
    case "hoth":
    case "tdor":
    case "iotv":
    case "tdg":
    case "tftbw":
    case "bob":
    case "dre":
    case "promo":
      return CardPack.Other

    case "nat":
      return CardPack.NathanielCho
    case "har":
      return CardPack.HarveyWalters
    case "win":
      return CardPack.WinifredHabbamock
    case "jac":
      return CardPack.JacquelineFine
    case "ste":
      return CardPack.StellaClark

    case "dwl":
    case "tmm":
    case "tece":
    case "bota":
    case "uau":
    case "wda":
    case "litas":
      return CardPack.TheDunwichLegacy
    case "ptc":
    case "eotp":
    case "tuo":
    case "apot":
    case "tpm":
    case "bsr":
    case "dca":
      return CardPack.ThePathToCarcosa
    case "tfa":
    case "tof":
    case "tbb":
    case "hote":
    case "tcoa":
    case "tdoy":
    case "sha":
      return CardPack.TheForgottenAge
    case "tcu":
    case "tsn":
    case "wos":
    case "fgg":
    case "uad":
    case "icc":
    case "bbt":
      return CardPack.TheCircleUndone
    case "tde":
    case "sfk":
    case "tsh":
    case "dsm":
    case "pnr":
    case "wgd":
    case "woc":
      return CardPack.TheDreamEaters
    case "tic":
    case "itd":
    case "def":
    case "hhg":
    case "lif":
    case "lod":
    case "itm":
      return CardPack.TheInnsmouthConspiracy
    case "eoep":
      return CardPack.EdgeOfTheEarth
    case "tskp":
      return CardPack.TheScarletKeys
    case "fhvp":
      return CardPack.TheFeastOfHemlockVale
    case "tdcp":
      return CardPack.TheDrownedCity

    case "rtnotz":
    case "rtdwl":
    case "rtptc":
    case "rttfa":
    case "rttcu":
      return CardPack.ReturnTo
    default:
      return CardPack.Other
  }
}

export interface TagJson {
  code: string
  name: string
  text: string
  tags: string[]
}

console.log("Downloading all player cards for tagging...")
const allCards = await publicAllCards("")
console.log("DONE")
const onlyPlayerCards = allCards.filter((x) => {
  return (
    x.subtype_code !== "weakness" &&
    x.subtype_code !== "basicweakness" &&
    x.type_code !== "investigator" &&
    x.faction_code !== "mythos" &&
    x.position !== 1000
  )
})

const outFolder = "./tagging/ai/work"
const groupedByCardPack: { [k: string]: AhdbCard[] } = {}
onlyPlayerCards.forEach((x) => {
  const gropedPackCode = packCodeToIconConversion(x.pack_code)
  if (groupedByCardPack[gropedPackCode] === undefined) {
    groupedByCardPack[gropedPackCode] = []
  }
  groupedByCardPack[gropedPackCode].push(x)
})

// sort by code
for (const k in groupedByCardPack) {
  groupedByCardPack[k].sort((a, b) => a.code.localeCompare(b.code))
}

// write to one json per pack code
await emptyDir(outFolder)
for (const k in groupedByCardPack) {
  const toWrite: TagJson[] = []
  groupedByCardPack[k].forEach((x) => {
    toWrite.push({
      code: x.code,
      name: x.name,
      text: x.real_text,
      tags: [],
    })
  })
  const json = JSON.stringify(toWrite, null, 2)
  await Deno.writeTextFile(path.join(outFolder, `${k}.json`), json)
}
console.log("DONE")
