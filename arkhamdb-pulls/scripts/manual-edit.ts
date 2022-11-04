import { AhdbCard } from "./interfaces.ts";

export function manualEdit(p: AhdbCard[]) {
  manualEditOne(p, "09112", (c) => {
    c.quantity = 2;
  });
  manualEditOne(p, "09113", (c) => {
    c.quantity = 2;
  });
  manualEditOne(p, "01601", (c) => {
    c.subtype_code = "basicweakness";
  });
  manualEditOne(p, "01602", (c) => {
    c.subtype_code = "basicweakness";
  });
  manualEditOne(p, "01603", (c) => {
    c.subtype_code = "basicweakness";
  });
}

export function manualEditOne(
  p: AhdbCard[],
  c: string,
  edit: (c: AhdbCard) => void
) {
  const found = p.find((x) => x.code === c);
  if (found) {
    edit(found);
    return;
  }
  throw new Error("Not found for manual edit " + c);
}
