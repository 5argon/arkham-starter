import { AhdbCard } from "./interfaces.ts"

export function manualEdit(p: AhdbCard[]) {
  manualEditOne(p, "09112", (c) => {
    c.quantity = 2
  })
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

  // TSK Investigator backside
  manualEditOne(p, "09001", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/09001b.png"
  })
  manualEditOne(p, "09004", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/09004b.png"
  })
  manualEditOne(p, "09008", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/09008b.png"
  })
  manualEditOne(p, "09011", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/09011b.png"
  })
  manualEditOne(p, "09015", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/09015b.png"
  })
  manualEditOne(p, "09018", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/09018b.png"
  })

  // Customizable
  manualEditOne(p, "09021", (c) => {
    c.linked_to_code = "09021b"
    addCust(c, p, "09021")
  })
  manualEditOne(p, "09022", (c) => {
    c.linked_to_code = "09022b"
    addCust(c, p, "09022")
  })
  manualEditOne(p, "09023", (c) => {
    c.linked_to_code = "09023b"
    addCust(c, p, "09023")
  })

  manualEditOne(p, "09040", (c) => {
    c.linked_to_code = "09040b"
    addCust(c, p, "09040")
  })
  manualEditOne(p, "09041", (c) => {
    c.linked_to_code = "09041b"
    addCust(c, p, "09041")
  })
  manualEditOne(p, "09042", (c) => {
    c.linked_to_code = "09042b"
    addCust(c, p, "09042")
  })

  manualEditOne(p, "09059", (c) => {
    c.linked_to_code = "09059b"
    addCust(c, p, "09059")
  })
  manualEditOne(p, "09060", (c) => {
    c.linked_to_code = "09060b"
    addCust(c, p, "09060")
  })
  manualEditOne(p, "09061", (c) => {
    c.linked_to_code = "09061b"
    addCust(c, p, "09061")
  })

  manualEditOne(p, "09079", (c) => {
    c.linked_to_code = "09079b"
    addCust(c, p, "09079")
  })
  manualEditOne(p, "09080", (c) => {
    c.linked_to_code = "09080b"
    addCust(c, p, "09080")
  })
  manualEditOne(p, "09081", (c) => {
    c.linked_to_code = "09081b"
    addCust(c, p, "09081")
  })

  manualEditOne(p, "09099", (c) => {
    c.linked_to_code = "09099b"
    addCust(c, p, "09099")
  })
  manualEditOne(p, "09100", (c) => {
    c.linked_to_code = "09100b"
    addCust(c, p, "09100")
  })
  manualEditOne(p, "09101", (c) => {
    c.linked_to_code = "09101b"
    addCust(c, p, "09101")
  })

  manualEditOne(p, "09119", (c) => {
    c.linked_to_code = "09119b"
    addCust(c, p, "09119")
  })

  // Parallel Pete
  manualEditOne(p, "90046", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/90046b.png"
  })

  // Parallel Jim
  manualEditOne(p, "90049", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/90049b.png"
  })

  // Parallel Zoey
  manualEditOne(p, "90059", (c) => {
    c.double_sided = true
    c.backimagesrc = "/bundles/cards/90059b.png"
  })

  // Parallel Monterey
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
 * Adds customizable sheet graphic as a new back of customizable card.
 */
function addCust(card: AhdbCard, p: AhdbCard[], c: string) {
  const n: Partial<AhdbCard> = {
    code: c + "b",
    position: card.position,
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
