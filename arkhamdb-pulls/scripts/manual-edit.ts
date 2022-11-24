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
  manualEditOne(p, "01509", (c) => {
    c.subtype_code = "weakness";
  });
  manualEditOne(p, "01513", (c) => {
    c.subtype_code = "weakness";
  });

  // TSK Investigator backside
  manualEditOne(p, "09001", (c) => {
    c.double_sided = true;
    c.backimagesrc = "\/bundles\/cards\/09001b.png";
  });
  manualEditOne(p, "09004", (c) => {
    c.double_sided = true;
    c.backimagesrc = "\/bundles\/cards\/09004b.png";
  });
  manualEditOne(p, "09008", (c) => {
    c.double_sided = true;
    c.backimagesrc = "\/bundles\/cards\/09008b.png";
  });
  manualEditOne(p, "09011", (c) => {
    c.double_sided = true;
    c.backimagesrc = "\/bundles\/cards\/09011b.png";
  });
  manualEditOne(p, "09015", (c) => {
    c.double_sided = true;
    c.backimagesrc = "\/bundles\/cards\/09015b.png";
  });
  manualEditOne(p, "09018", (c) => {
    c.double_sided = true;
    c.backimagesrc = "\/bundles\/cards\/09018b.png";
  });

  // Customizable
  manualEditOne(p, "09021", (c) => {
    c.linked_to_code = "09021b";
    addCust(p, "09021");
  });
  manualEditOne(p, "09022", (c) => {
    c.linked_to_code = "09022b";
    addCust(p, "09022");
  });
  manualEditOne(p, "09023", (c) => {
    c.linked_to_code = "09023b";
    addCust(p, "09023");
  });

  manualEditOne(p, "09040", (c) => {
    c.linked_to_code = "09040b";
  });
  addCust(p, "09040");
  manualEditOne(p, "09041", (c) => {
    c.linked_to_code = "09041b";
  });
  addCust(p, "09041");
  manualEditOne(p, "09042", (c) => {
    c.linked_to_code = "09042b";
  });
  addCust(p, "09042");

  manualEditOne(p, "09059", (c) => {
    c.linked_to_code = "09059b";
  });
  addCust(p, "09059");
  manualEditOne(p, "09060", (c) => {
    c.linked_to_code = "09060b";
  });
  addCust(p, "09060");
  manualEditOne(p, "09061", (c) => {
    c.linked_to_code = "09061b";
  });
  addCust(p, "09061");

  manualEditOne(p, "09079", (c) => {
    c.linked_to_code = "09079b";
  });
  addCust(p, "09079");
  manualEditOne(p, "09080", (c) => {
    c.linked_to_code = "09080b";
  });
  addCust(p, "09080");
  manualEditOne(p, "09081", (c) => {
    c.linked_to_code = "09081b";
  });
  addCust(p, "09081");

  manualEditOne(p, "09099", (c) => {
    c.linked_to_code = "09099b";
  });
  addCust(p, "09099");
  manualEditOne(p, "09100", (c) => {
    c.linked_to_code = "09100b";
  });
  addCust(p, "09100");
  manualEditOne(p, "09101", (c) => {
    c.linked_to_code = "09101b";
  });
  addCust(p, "09101");

  manualEditOne(p, "09119", (c) => {
    c.linked_to_code = "09119b";
  });
  addCust(p, "09119");
}

function addCust(p: AhdbCard[], c: string) {
  const n: Partial<AhdbCard> = {
    code: c + "b",
    hidden: true,
  };
  p.push(n as AhdbCard);
}

function manualEditOne(p: AhdbCard[], c: string, edit: (c: AhdbCard) => void) {
  const found = p.find((x) => x.code === c);
  if (found) {
    edit(found);
    return;
  }
  throw new Error("Not found for manual edit " + c);
}
