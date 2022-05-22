import {
  bunches,
  Class123,
  CountingCriteriaWithLevels,
  FinalCount,
  finalCountToCsvRow,
  specialCc,
  TypeCode,
} from "./scripts/counting-criteria.ts";
import { AhdbCard } from "./scripts/interfaces.ts";
import { publicAllCards } from "./scripts/public-api.ts";

const autogenCriterias: CountingCriteriaWithLevels[] = [];
const basicLevels: (number[] | undefined)[] = [
  undefined,
  // [0, 1, 2, 3, 4, 5],
  // [0],
  // [1, 2, 3, 4, 5],
];
const typeCodes: (TypeCode | undefined)[] = [
  // "asset",
  // "skill",
  // "event",
  undefined,
];

bunches.forEach((x) => {
  // Each pack receives bonded count and investigator count indepentdently, no levels.
  autogenCriterias.push({
    special: "bonded",
    packCodes: x,
  });
  autogenCriterias.push({
    special: "investigator",
    packCodes: x,
  });
  autogenCriterias.push({
    special: "basicweakness",
    packCodes: x,
  });
});

typeCodes.forEach((w) => {
  basicLevels.forEach((z) => {
    specialCc.forEach((x) => {
      autogenCriterias.push({
        packCodes: x.packCodes,
        cardIds: x.cardIds,
        classes: x.classes,
        levels: z,
      });
    });
    bunches.forEach((x) => {
      const basicClasses: (Class123[] | undefined)[] = [
        undefined,
        [{ c1: "guardian" }],
        [{ c1: "seeker" }],
        [{ c1: "rogue" }],
        [{ c1: "mystic" }],
        [{ c1: "survivor" }],
        [{ c1: "neutral" }],
        [
          { c1: "*", c2: "*" },
          { c1: "*", c2: "*", c3: "*" },
        ],
      ];

      basicClasses.forEach((y) => {
        autogenCriterias.push({
          packCodes: x,
          classes: y,
          levels: z,
          typeCode: w,
        });
      });
    });
  });
});

const quantityCounts: number[] = Array(autogenCriterias.length).fill(0);
const uniqueCounts: number[] = Array(autogenCriterias.length).fill(0);
const uniqueCardName: string[][] = [];
for (let i = 0; i < autogenCriterias.length; i++) {
  uniqueCardName.push([]);
}

console.log("Downloading all cards...");
const allCards = (await publicAllCards("")).filter(
  (x) => x.faction_code !== "mythos" && x.code !== "01000"
);

// For each card, check against ALL criterias and add to the tally.
allCards.forEach((c, k) => {
  console.log(`Card ${k}/${allCards.length}`);
  for (let i = 0; i < autogenCriterias.length; i++) {
    const ac = autogenCriterias[i];
    if (ac.special === "investigator") {
      if (
        c.type_code === "investigator" ||
        (c.restrictions !== undefined && c.restrictions !== null)
      ) {
        // Need to pass only pack code checks
        if (ac.packCodes !== undefined) {
          if (ac.packCodes.findIndex((x) => x === c.pack_code) === -1) {
            continue;
          }
        }
        quantityCounts[i] += c.quantity;
        uniqueCounts[i]++;
        uniqueCardName[i].push(c.name);
        continue;
      } else {
        continue;
      }
    }
    if (ac.special === "basicweakness") {
      if (c.subtype_code === "basicweakness") {
        // Need to pass only pack code checks
        if (ac.packCodes !== undefined) {
          if (ac.packCodes.findIndex((x) => x === c.pack_code) === -1) {
            continue;
          }
        }
        quantityCounts[i] += c.quantity;
        uniqueCounts[i]++;
        uniqueCardName[i].push(c.name);
        continue;
      } else {
        continue;
      }
    }
    if (ac.special === "bonded") {
      if (c.bonded_to !== undefined && c.bonded_to !== null) {
        // Need to pass only pack code checks
        if (ac.packCodes !== undefined) {
          if (ac.packCodes.findIndex((x) => x === c.pack_code) === -1) {
            continue;
          }
        }
        quantityCounts[i] += c.quantity;
        uniqueCounts[i]++;
        uniqueCardName[i].push(c.name);
        continue;
      } else {
        continue;
      }
    }
    // End of specials.
    // All cards that hit inside the special should be taken out now.
    if (
      c.type_code === "investigator" ||
      (c.restrictions !== undefined && c.restrictions !== null)
    ) {
      continue;
    }
    if (c.subtype_code === "basicweakness") {
      continue;
    }
    if (c.bonded_to !== undefined && c.bonded_to !== null) {
      continue;
    }

    // Now this card should pass ALL checks to count.
    if (ac.typeCode !== undefined) {
      if (c.type_code !== ac.typeCode) {
        continue;
      }
    }
    if (ac.levels !== undefined) {
      if (c.xp == undefined || c.xp === null) {
        continue;
      }
      if (ac.levels.findIndex((x) => x === c.xp) === -1) {
        continue;
      }
    }
    if (ac.classes !== undefined) {
      // Now must pass all c123 in this array
      const cls = ac.classes;
      if (!c123(cls, c)) {
        continue;
      }
    }
    if (ac.packCodes !== undefined) {
      if (ac.packCodes.findIndex((x) => x === c.pack_code) === -1) {
        continue;
      }
    }
    if (ac.cardIds !== undefined) {
      if (ac.cardIds.findIndex((x) => x === c.position) === -1) {
        continue;
      }
    }
    // Passed all the test, increase the count.
    quantityCounts[i] += c.quantity;
    uniqueCounts[i]++;
    uniqueCardName[i].push(c.name);
  }
});

console.log("Finalizing");
const final: FinalCount[] = [];
for (let i = 0; i < quantityCounts.length; i++) {
  final.push({
    criteria: autogenCriterias[i],
    quantity: quantityCounts[i],
    unique: uniqueCounts[i],
    names: uniqueCardName[i],
  });
}
const filtered = final.filter((x) => x.quantity > 0);
Deno.writeTextFile("./final.json", JSON.stringify(filtered, null, 2));
Deno.writeTextFile(
  "./final.csv",
  filtered.map<string>(finalCountToCsvRow).join("\n")
);

function c123(cls: Class123[], c: AhdbCard): boolean {
  // This outer layer is an OR, but inner is AND
  for (let ccc = 0; ccc < cls.length; ccc++) {
    const a = cls[ccc];
    if (
      !(
        ctest(a.c1, c.faction_code) &&
        ctest(a.c2, c.faction2_code) &&
        ctest(a.c3, c.faction3_code)
      )
    ) {
      continue;
    } else {
      // OR, so instantly succeed.
      return true;
    }
  }
  // Fails all
  return false;
}

function ctest(s: string | undefined, t: string | undefined): boolean {
  if (s === undefined) {
    return t === undefined;
  }
  // Star means something must be in this slot.
  if (s === "*") {
    if (t === undefined) {
      return false;
    } else {
      return true;
    }
  }
  return s === t;
}
