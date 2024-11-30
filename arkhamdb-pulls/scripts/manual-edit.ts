import { AhdbCard } from "./interfaces.ts"

export function manualEdit(p: AhdbCard[]) {
  manualEditOne(p, "09113", (c) => {
    c.quantity = 2
  })
  manualEditOne(p, "01601", (c) => {
    c.subtype_code = "basicweakness"
  })
  manualEditOne(p, "01602", (c) => {
    c.subtype_code = "basicweakness"
  })
  manualEditOne(p, "01603", (c) => {
    c.subtype_code = "basicweakness"
  })
  manualEditOne(p, "01509", (c) => {
    c.subtype_code = "weakness"
  })
  manualEditOne(p, "01513", (c) => {
    c.subtype_code = "weakness"
  })

  // Customizable
  manualEditOne(p, "09021", (c) => {
    addCustCard(c, p, "09021", 124)
  })
  manualEditOne(p, "09022", (c) => {
    addCustCard(c, p, "09022", 125)
  })
  manualEditOne(p, "09023", (c) => {
    addCustCard(c, p, "09023", 126)
  })

  manualEditOne(p, "09040", (c) => {
    addCustCard(c, p, "09040", 127)
  })
  manualEditOne(p, "09041", (c) => {
    addCustCard(c, p, "09041", 128)
  })
  manualEditOne(p, "09042", (c) => {
    addCustCard(c, p, "09042", 129)
  })

  manualEditOne(p, "09059", (c) => {
    addCustCard(c, p, "09059", 130)
  })
  manualEditOne(p, "09060", (c) => {
    addCustCard(c, p, "09060", 131)
  })
  manualEditOne(p, "09061", (c) => {
    addCustCard(c, p, "09061", 132)
  })

  manualEditOne(p, "09079", (c) => {
    addCustCard(c, p, "09079", 133)
  })
  manualEditOne(p, "09080", (c) => {
    addCustCard(c, p, "09080", 134)
  })
  manualEditOne(p, "09081", (c) => {
    addCustCard(c, p, "09081", 135)
  })

  manualEditOne(p, "09099", (c) => {
    addCustCard(c, p, "09099", 136)
  })
  manualEditOne(p, "09100", (c) => {
    addCustCard(c, p, "09100", 137)
  })
  manualEditOne(p, "09101", (c) => {
    addCustCard(c, p, "09101", 138)
  })

  manualEditOne(p, "09119", (c) => {
    addCustCard(c, p, "09119", 139)
  })
  // End Customizable

  // Un-hidden resolute Hank, add link to backside entry.
  manualEditOne(p, "10016a", (c) => {
    c.hidden = undefined
    c.linked_to_code = "10016b"
  })

  // Un-hidden some parallel investigators
  // Daisy
  manualEditOne(p, "90001", (c) => {
    c.hidden = undefined
  })
  // Skids
  manualEditOne(p, "90008", (c) => {
    c.hidden = undefined
  })
  // Agnes
  manualEditOne(p, "90017", (c) => {
    c.hidden = undefined
  })
  // Roland
  manualEditOne(p, "90024", (c) => {
    c.hidden = undefined
  })
  // Pete
  manualEditOne(p, "90046", (c) => {
    c.hidden = undefined
    c.backimagesrc = "/bundles/cards/90046b.png"
  })
  // Jim
  manualEditOne(p, "90049", (c) => {
    c.hidden = undefined
    c.backimagesrc = "/bundles/cards/90049b.png"
  })
  // Zoey
  manualEditOne(p, "90059", (c) => {
    c.backimagesrc = "/bundles/cards/90059b.png"
  })
  // Monterey
  manualEditOne(p, "90062", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/90062b.png"
  })

  // Reality Acid Table
  manualEditOne(p, "89005", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/89005b.png"
  })
}

/**
 * Makes a customizable card as a valid card that comes in the same box as "tskp".
 * Their code is the original code with a "b" at the end.
 */
function addCustCard(card: AhdbCard, p: AhdbCard[], c: string, pos: number) {
  const n: Partial<AhdbCard> = {
    code: c + "b",
    name: card.name,
    subname: "Upgrade Sheet",
    position: pos,
    type_code: "upgrade",
    pack_code: "tskp",
    faction_code: card.faction_code,
    quantity: 3,
  }
  p.push(n as AhdbCard)
}

function manualEditOne(p: AhdbCard[], c: string, edit: (c: AhdbCard) => void) {
  const found = p.find((x) => x.code === c)
  if (found) {
    edit(found)
    return
  }
  throw new Error("Not found for manual edit " + c)
}

// function synthesize(
//   p: AhdbCard[],
//   c: string,
//   name: string,
//   level: number,
//   subname?: string,
//   otherSide?: string,
// ) {}
