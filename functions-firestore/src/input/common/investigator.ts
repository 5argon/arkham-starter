export interface Investigator {
  player: Player

  /**
   * The state of this deck (along with all its upgrade chain) at the time of import is downloaded from arkhamdb.com.
   * From that point on it will be unaffected by changes in arkhamdb.com, unless asked to "refresh".
   */
  arkhamDbDeckId: number

  trauma: Trauma
}

export interface Trauma {
  physical: number
  mental: number
  status: Status
}

export enum Status {
  Alive = "Alive",
  Insane = "Insane",
  Killed = "Killed",
}

/**
 * Either UUID to connect with per-username player,
 * or just a name with no connection.
 */
export type Player = PlayerUuid | PlayerName

export interface PlayerUuid {
  uuid: string
}

export interface PlayerName {
  name: string
}
