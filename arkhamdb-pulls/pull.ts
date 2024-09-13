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

console.log("Downloading all cards to create popup database...")
const allCards = await publicAllCards("/?encounter=1")
// Read local json file as additional cards.
const localCardsString = await Deno.readTextFile(
  path.join("json-patch", "tdcp.json"),
)
const fhvCards = JSON.parse(localCardsString) as AhdbCard[]
for (const x of fhvCards) {
  // For each card, if it already exists in allCards, replace it.
  const index = allCards.findIndex((y) => y.code === x.code)
  if (index !== -1) {
    allCards[index] = x
  } else {
    allCards.push(x)
  }
}
console.log("DONE")
const taboos = await publicTaboos()
const latestTaboo: AhdbTaboo | null = taboos.length > 0 ? taboos[0] : null
const tabooXpMap: { [k: string]: number } = {}
const tabooExceptionalMap: { [k: string]: boolean } = {}
if (latestTaboo !== null) {
  latestTaboo.cards.forEach((x) => {
    if (x.xp !== undefined) {
      tabooXpMap[x.code] = x.xp
    }
    if (x.exceptional !== undefined) {
      tabooExceptionalMap[x.code] = x.exceptional
    }
  })
}

const uniquePackCode = new Set<string>()
const uniquePackName = new Set<string>()
const uniqueClassName = new Set<string>()
const uniqueTrait = new Set<string>()

// Preprocess to collect repeated strings.
allCards.forEach((x) => {
  uniqueClassName.add(x.faction_code)
  if (x.faction2_code !== undefined) {
    uniqueClassName.add(x.faction2_code)
  }
  if (x.faction3_code !== undefined) {
    uniqueClassName.add(x.faction3_code)
  }
  if (x.traits !== undefined) {
    const extracted = extractTraits(x.traits)
    extracted.forEach((x) => {
      uniqueTrait.add(x)
    })
  }
  uniquePackCode.add(x.pack_code)
  uniquePackName.add(x.pack_name)
})

function makeMap(s: Set<string>): {
  toNum: { [k: string]: number }
  fromNum: { [k: number]: string }
} {
  const m1: { [k: string]: number } = {}
  const m2: { [k: number]: string } = {}
  const st = Array.from(s)
  st.forEach((x, i) => {
    m1[x] = i
    m2[i] = x
  })
  return { toNum: m1, fromNum: m2 }
}

const packCodeMap = makeMap(uniquePackCode)
const packNameMap = makeMap(uniquePackName)
const classNameMap = makeMap(uniqueClassName)
const traitMap = makeMap(uniqueTrait)

const popupDatabaseItems: PopupDatabaseItem[] = []
// Hidden card is kept, it is up to front end to not display them.
const playerCards = allCards.filter((x) => {
  return x.faction_code !== "mythos"
})
manualEdit(playerCards)

// Cards that need its subname shown to remove ambiguity are collected here.
// It searches an entire game if there is a card with same name but different subname or not.
const sameNameDifferentSubname: {
  [name: string]: { code: string; subname: string }[]
} = {}
const bondedToInvestigatorRestriction = new Set<string>()

const needExplicitSubnameCodes = new Set<string>()
playerCards.forEach((x) => {
  if (x.subname === undefined) {
    return
  }
  if (x.type_code === "upgrade") {
    needExplicitSubnameCodes.add(x.code)
  }
  const name = x.name
  if (!(name in sameNameDifferentSubname)) {
    sameNameDifferentSubname[name] = []
  }
  sameNameDifferentSubname[name].push({ code: x.code, subname: x.subname })

  const technicallyIr = x.restrictions !== undefined && x.restrictions !== null
  if (technicallyIr) {
    // Make all its bonded cards IR too, because they are technically not.
    x.bonded_cards?.forEach((y) => {
      bondedToInvestigatorRestriction.add(y.code)
    })
  }
})

Object.entries(sameNameDifferentSubname).forEach(([_, v]) => {
  const subnameCheck = new Set<string>()
  v.forEach((x) => {
    subnameCheck.add(x.subname)
  })
  if (subnameCheck.size > 1) {
    v.forEach((x) => {
      needExplicitSubnameCodes.add(x.code)
    })
  }
})

playerCards.forEach((x) => {
  let traits: number[] = []
  if (x.traits !== undefined) {
    const extracted = extractTraits(x.traits)
    traits = extracted.map((x) => {
      return traitMap.toNum[x]
    })
  }
  const investigatorRestrictionList: string[] = []
  const traitRestrictionList: string[] = []
  let technicallyIr = false
  if (x.restrictions !== undefined && x.restrictions !== null) {
    if (typeof x.restrictions === "string") {
      // String Format
      // "restrictions": "investigator:11001, investigator:11002",
      const commaSplit = x.restrictions.split(", ")
      for (const comma of commaSplit) {
        const colonSplit = comma.split(":")
        if (colonSplit[0] === "investigator") {
          investigatorRestrictionList.push(colonSplit[1])
        }
      }
    } else if (x.restrictions.investigator !== undefined) {
      Object.keys(x.restrictions.investigator).forEach((k) => {
        investigatorRestrictionList.push(k)
      })
    }
  }
  if (investigatorRestrictionList.length > 0) {
    technicallyIr = true
  }
  const effectiveIr =
    technicallyIr || bondedToInvestigatorRestriction.has(x.code)

  let specialist = false
  if (x.restrictions !== undefined && x.restrictions !== null) {
    if (typeof x.restrictions === "string") {
      // String Format
      // "restrictions": "trait:traitone, trait:traittwo",
      const commaSplit = x.restrictions.split(", ")
      for (const comma of commaSplit) {
        const colonSplit = comma.split(":")
        if (colonSplit[0] === "trait") {
          traitRestrictionList.push(colonSplit[1])
        }
      }
    } else if (x.restrictions.trait !== undefined) {
      x.restrictions.trait.forEach((k) => {
        traitRestrictionList.push(k)
      })
    }
  }
  if (traitRestrictionList.length > 0) {
    specialist = true
  }

  popupDatabaseItems.push({
    id: x.code,
    n: x.name,
    sn: x.subname,
    esn: needExplicitSubnameCodes.has(x.code),
    ps: x.position,
    pc: packCodeMap.toNum[x.pack_code],
    pn: packNameMap.toNum[x.pack_name],
    ex: x.exceptional,
    ext:
      x.code in tabooExceptionalMap
        ? tabooExceptionalMap[x.code]
        : x.exceptional,
    xp: x.xp ?? undefined,
    xpat: x.code in tabooXpMap ? tabooXpMap[x.code] : 0,
    tra: traits,
    sag: x.skill_agility,
    scm: x.skill_combat,
    sit: x.skill_intellect,
    swi: x.skill_willpower,
    swl: x.skill_wild,
    c1: classNameMap.toNum[x.faction_code],
    c2:
      x.faction2_code !== undefined
        ? classNameMap.toNum[x.faction2_code]
        : undefined,
    c3:
      x.faction3_code !== undefined
        ? classNameMap.toNum[x.faction3_code]
        : undefined,
    ir: effectiveIr,
    wk:
      x.subtype_code !== undefined &&
      (x.subtype_code === "weakness" || x.subtype_code === "basicweakness")
        ? true
        : undefined,
    bwk:
      x.subtype_code !== undefined && x.subtype_code === "basicweakness"
        ? true
        : undefined,
    inv:
      x.type_code !== undefined && x.type_code === "investigator"
        ? true
        : undefined,
    cs: x.cost,
    cus: extractCustomizable(x),
    q: x.quantity,
    sp: x.spoiler !== undefined ? true : undefined,
    hd: x.hidden !== undefined ? true : undefined,
    bd: x.bonded_to !== undefined ? true : undefined,
    bdt:
      x.bonded_cards?.map((x) => {
        return {
          c: x.code,
          q: x.count,
        }
      }) ?? undefined,
    pe: x.permanent ? true : undefined,
    myr: x.myriad ? true : undefined,
    lnk: x.linked_to_code,
    dbl:
      x.double_sided && x.backimagesrc
        ? path.basename(x.backimagesrc)
        : undefined,
    spe: specialist ? true : undefined,
    resir:
      investigatorRestrictionList.length === 0
        ? undefined
        : investigatorRestrictionList,
    restr: traitRestrictionList.length === 0 ? undefined : traitRestrictionList,
  })
})

const popupDatabase: PopupDatabase = {
  items: popupDatabaseItems,
  classNames: classNameMap.fromNum,
  packCodes: packCodeMap.fromNum,
  packNames: packNameMap.fromNum,
  traits: traitMap.fromNum,
}

console.log("Writing popup database...")
await emptyDir(path.join(pullsDirectory, pullsJson))
const w1 = Deno.writeTextFile(
  path.join(pullsDirectory, pullsJson, pullsUtilsPopupDatabase),
  JSON.stringify(popupDatabase),
)
const w2 = Deno.writeTextFile(
  path.join(pullsDirectory, pullsJson, pullsUtilsPlayerDatabase),
  JSON.stringify(playerCards),
)
const w3 = Deno.writeTextFile(
  path.join(pullsDirectory, pullsJson, pullsUtilsTaboo),
  JSON.stringify(taboos),
)
await Promise.all([w1, w2, w3])
console.log("Finished writing popup database and player database.")
