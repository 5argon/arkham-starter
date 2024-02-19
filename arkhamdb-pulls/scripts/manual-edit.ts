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
    c.linked_to_code = "09021b"
    addCustLink(c, p, "09021")
  })
  manualEditOne(p, "09022", (c) => {
    c.linked_to_code = "09022b"
    addCustLink(c, p, "09022")
  })
  manualEditOne(p, "09023", (c) => {
    c.linked_to_code = "09023b"
    addCustLink(c, p, "09023")
  })

  manualEditOne(p, "09040", (c) => {
    c.linked_to_code = "09040b"
    addCustLink(c, p, "09040")
  })
  manualEditOne(p, "09041", (c) => {
    c.linked_to_code = "09041b"
    addCustLink(c, p, "09041")
  })
  manualEditOne(p, "09042", (c) => {
    c.linked_to_code = "09042b"
    addCustLink(c, p, "09042")
  })

  manualEditOne(p, "09059", (c) => {
    c.linked_to_code = "09059b"
    addCustLink(c, p, "09059")
  })
  manualEditOne(p, "09060", (c) => {
    c.linked_to_code = "09060b"
    addCustLink(c, p, "09060")
  })
  manualEditOne(p, "09061", (c) => {
    c.linked_to_code = "09061b"
    addCustLink(c, p, "09061")
  })

  manualEditOne(p, "09079", (c) => {
    c.linked_to_code = "09079b"
    addCustLink(c, p, "09079")
  })
  manualEditOne(p, "09080", (c) => {
    c.linked_to_code = "09080b"
    addCustLink(c, p, "09080")
  })
  manualEditOne(p, "09081", (c) => {
    c.linked_to_code = "09081b"
    addCustLink(c, p, "09081")
  })

  manualEditOne(p, "09099", (c) => {
    c.linked_to_code = "09099b"
    addCustLink(c, p, "09099")
  })
  manualEditOne(p, "09100", (c) => {
    c.linked_to_code = "09100b"
    addCustLink(c, p, "09100")
  })
  manualEditOne(p, "09101", (c) => {
    c.linked_to_code = "09101b"
    addCustLink(c, p, "09101")
  })

  manualEditOne(p, "09119", (c) => {
    c.linked_to_code = "09119b"
    addCustLink(c, p, "09119")
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

  // Suzi
  manualEditOne(p, "89001", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/89001b.png"
  })
  // Reality Acid Table
  manualEditOne(p, "89005", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/89005b.png"
  })

}

/**
 * Adds customizable sheet graphic as a linked card of customizable card.
 */
function addCustLink(card: AhdbCard, p: AhdbCard[], c: string) {
  const n: Partial<AhdbCard> = {
    code: c + "b",
    name: card.name + " Upgrade Sheet",
    position: 124,
    type_code: "upgrade",
    pack_code: "tskp",
    faction_code: "neutral",
    quantity: 3,
    hidden: true,
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
