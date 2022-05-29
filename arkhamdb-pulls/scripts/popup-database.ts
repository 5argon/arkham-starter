/**
 * Compact database of all player cards that is enough to use in a quick popup
 * and card listing. Preprocessed from full data from ArkhamDB with the latest
 * taboo pre-applied.
 */
export interface PopupDatabase {
  packNames: { [k: number]: string };
  packCodes: { [k: number]: string };
  classNames: { [k: number]: string };
  traits: { [k: number]: string };
  items: PopupDatabaseItem[];
}

export interface PopupDatabaseItem {
  id: string;

  /**
   * Name
   */
  n: string;

  /**
   * Subname
   */
  sn: string;

  /**
   * Explicit subname
   */
  esn:boolean;

  /**
   * Pack code
   */
  pc: number;

  /**
   * Pack name
   */
  pn: number;

  /**
   * Position
   */
  ps: number;

  /**
   * Class string 1
   */
  c1: number;

  /**
   * Class string 2
   */
  c2?: number;

  /**
   * Class string 3
   */
  c3?: number;

  /**
   * XP
   */
  xp?: number;

  /**
   * XP added from taboo
   */
  xpat: number;

  /**
   * Exceptional
   */
  ex: boolean;

  /**
   * Exceptional after taboo
   */
  ext: boolean;

  /**
   * Investigator restriction
   */
  ir: boolean;

  /**
   * Weakness
   */
  wk: boolean;

  /**
   * Cost
   */
  cs?: number;

  /**
   * Intellect
   */
  sit?: number;

  /**
   * Combat
   */
  scm?: number;

  /**
   * Wild
   */
  swl?: number;

  /**
   * Agility
   */
  sag?: number;

  /**
   * Willpower
   */
  swi?: number;

  /**
   * Traits
   */
  tra: number[];
}
