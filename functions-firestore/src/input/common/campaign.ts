import { ChaosToken } from "./chaos-token"
import { Difficulty } from "./difficulty"
import { Investigator } from "./investigator"

/**
 * All campaign input extends from this.
 */
export interface CampaignEndState<T> {
  endState: {
    difficulty: Difficulty
    chaosBag: ChaosToken[]
    investigators: Investigator[]

    /**
     * Scenario questionaire takes precedence.
     */
    campaignNotes: CampaignNoteInput<T>[] | undefined
  }
}

/**
 * If not object, type is assumed to be boolean.
 */
export type CampaignNote<T> =
  | T
  | {
      note: T
      type: "boolean" | "number"
    }

export type CampaignNoteInput<T> = {
  note: T

  /**
   * Only required if it has numerical parameter to remember.
   */
  amount?: number
}
