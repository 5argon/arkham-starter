export interface FinalCount {
  criteria: CountingCriteriaWithLevels;
  quantity: number;
  unique: number;
  names: string[];
}

export function finalCountToCsvRow(f: FinalCount): string {
  const s: string[] = [
    JSON.stringify(f.criteria.packCodes),
    JSON.stringify(f.criteria.special),
    JSON.stringify(f.criteria.classes),
    JSON.stringify(f.criteria.levels),
    JSON.stringify(f.criteria.typeCode),
    JSON.stringify(f.criteria.cardIds),
    f.unique.toString(),
    f.quantity.toString(),
    JSON.stringify(f.names),
  ];
  return s.join("\t");
}

export type CountingCriteriaWithLevels = CountingCriteria & {
  special?: SpecialCounting;
  levels?: number[];
  typeCode?: TypeCode;
};
export type TypeCode = "asset" | "skill" | "event";

export type SpecialCounting = "investigator" | "basicweakness" | "bonded";

export interface CountingCriteria {
  packCodes?: string[];
  classes?: Class123[];
  cardIds?: number[];
}

export interface Class123 {
  c1?: string;
  c2?: string;
  c3?: string;
}

export const specialCc: CountingCriteria[] = [
  {
    packCodes: ["core"],
    // Knife, Flashlight, Emergency Cache
    cardIds: [86, 87, 88],
  },
  {
    packCodes: ["core"],
    // All other neutrals
    cardIds: [89, 90, 91, 92, 93, 94, 95],
  },
  {
    packCodes: ["rcore"],
    // Knife, Flashlight, Emergency Cache
    cardIds: [86, 87, 88],
  },
  {
    packCodes: ["rcore"],
    // All other neutrals
    cardIds: [89, 90, 91, 92, 93, 94, 95, 193, 194, 195],
  },
  {
    packCodes: ["eoep"],
    classes: [{ c1: "guardian", c2: "*" }],
  },
  {
    packCodes: ["eoep"],
    classes: [{ c1: "seeker", c2: "*" }],
  },
  {
    packCodes: ["eoep"],
    classes: [{ c1: "rogue", c2: "*" }],
  },
  {
    packCodes: ["eoep"],
    classes: [
      // Other multiclasses.
      { c1: "mystic", c2: "*" },
      { c1: "survivor", c2: "*" },
      { c1: "*", c2: "*", c3: "*" },
    ],
  },
];

export const bunches: (string[] | undefined)[] = [
  undefined,
  ["core"],
  ["rcore"],
  ["dwl", "tmm", "tece", "bota", "uau", "wda", "litas"],
  ["ptc", "eotp", "tuo", "apot", "tpm", "bsr", "dca"],
  ["tfa", "tof", "tbb", "hote", "tcoa", "tdoy", "sha"],
  ["tcu", "tsn", "wos", "fgg", "uad", "icc", "bbt"],
  ["tde", "sfk", "tsh", "dsm", "pnr", "wgd", "woc"],
  ["tic", "itd", "def", "hhg", "lif", "lod", "itm"],
  ["eoep"],
  ["rtnotz"],
  ["rtdwl"],
  ["rtptc"],
  ["rttfa"],
  ["rttcu"],
  ["nat"],
  ["har"],
  ["win"],
  ["jac"],
  ["ste"],
];
