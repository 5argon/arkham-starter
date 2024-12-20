/**
 * Compact database of all player cards that is enough to use in a quick popup
 * and card listing. Preprocessed from full data from ArkhamDB with the latest
 * taboo pre-applied.
 */
export interface PopupDatabase {
  packNames: { [k: number]: string }
  packCodes: { [k: number]: string }
  classNames: { [k: number]: string }
  traits: { [k: number]: string }
  items: PopupDatabaseItem[]
}

export interface PopupDatabaseItem {
  /**
   * Card string ID like in ArkhamDB, such as "01006".
   */
  id: string

  /**
   * Card name.
   */
  n: string

  /**
   * Card subname, such as "The Fed" of "Roland Banks".
   */
  sn?: string

  /**
   * If `true`, it means there are other cards with the same name
   * and requires showing subname explicitly to not be confused.
   * Such as various instances of "Strange Solution".
   */
  esn: boolean

  /**
   * Pack code.
   * Use number to map with the real string in outer maps.
   */
  pc: number

  /**
   * Pack name
   * Use number to map with the real string in outer maps.
   */
  pn: number

  /**
   * Position. The number of cards on the bottom right corner.
   */
  ps: number

  /**
   * Class string from ArkhamDB, such as "survivor". (all lowercase)
   */
  c1: number

  /**
   * Class string from ArkhamDB, such as "survivor". (all lowercase)
   */
  c2?: number

  /**
   * Class string from ArkhamDB, such as "survivor". (all lowercase)
   */
  c3?: number

  /**
   * XP pips
   */
  xp?: number

  /**
   * XP added (chained) from taboo. Can be negative in the case of unchain.
   */
  xpat: number

  /**
   * Exceptional status.
   */
  ex: boolean

  /**
   * Exceptional status after latest taboo applied.
   */
  ext: boolean

  /**
   * Investigator restriction.
   * Essentially `true` when it is an investigator signature card / weakness.
   * It is also `true` when it is Bonded to an another `ir` card, even if that card is
   * techically not IR.
   */
  ir?: boolean

  /**
   * This is an investigator card.
   */
  inv?: boolean

  /**
   * Weakness.
   */
  wk?: boolean

  /**
   * Basic Weakness.
   */
  bwk?: boolean

  /**
   * If defined, it is linked to this card ID.
   */
  lnk?: string

  /**
   * If defined, card is double-sided and this is the image name of the back side.
   */
  dbl?: string

  /**
   * Cost.
   */
  cs?: number

  /**
   * Intellect icons.
   */
  sit?: number

  /**
   * Combat icons.
   */
  scm?: number

  /**
   * Wild icons.
   */
  swl?: number

  /**
   * Agility icons.
   */
  sag?: number

  /**
   * Willpower icons.
   */
  swi?: number

  /**
   * Traits.
   * Use number to map with the real string in outer maps.
   */
  tra: number[]

  /**
   * Customizable choices.
   */
  cus?: CustomizableStruct[]

  /**
   * Quantity
   */
  q: number

  /**
   * Spoiler was on in arkhamdb
   */
  sp?: boolean

  /**
   * Hidden was on in arkhamdb
   */
  hd?: boolean

  /**
   * Whether the card has Bonded keyword.
   */
  bd?: boolean

  /**
   * This card can call for these Bonded cards.
   */
  bdt?: { c: string; q: number }[]

  /**
   * Is a Permanent card.
   */
  pe?: boolean

  /*
   * Is a Myraid card.
   */
  myr?: boolean

  /**
   * List of investigator codes that can include this card.
   */
  resir?: string[]

  /**
   * List of investigator traits that can include this card.
   * It also means it is a Specialist card.
   */
  restr?: string[]
}

export interface CustomizableStruct {
  /**
   * XP checkboxes
   */
  xp: number

  /**
   * Customizable name
   */
  n: string
}
