import { forwardPack } from "./scripts/counting-criteria.ts";
import { AhdbCard } from "./scripts/interfaces.ts";
import { publicAllCards } from "./scripts/public-api.ts";

type AhdbCardAugmented = AhdbCard & {
  main_pack_code: string;
};

console.log("Downloading all cards...");
const allCards = await publicAllCards("/?encounter=1");
const keySet = new Set<string>();
const allCardsAugmented = allCards.map<AhdbCardAugmented>((x) => {
  const augmented = { ...x, main_pack_code: forwardPack(x.pack_code) };
  Object.keys(augmented).forEach((y) => {
    keySet.add(y);
  });
  return augmented;
});

const fields = Array.from(keySet);
const keyToFieldIndex: { [k: string]: number } = {};
fields.forEach((v, i) => {
  keyToFieldIndex[v] = i;
});

const headerCsv: string = fields.join("\t");
const bodyCsv: string[] = allCardsAugmented.map<string>((x) => {
  const st: string[] = new Array(fields.length).fill("");
  Object.entries(x).forEach(([k, v]) => {
    st[keyToFieldIndex[k]] = JSON.stringify(v).replaceAll('\\"', '""');
  });
  return st.join("\t");
});
Deno.writeTextFile("./pivot.csv", [headerCsv, ...bodyCsv].join("\n"));
