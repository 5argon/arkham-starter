import { ChaosToken } from "./chaos-token"
import { Difficulty } from "./difficulty"
import { Investigator } from "./investigator"

export interface CampaignBaseInput<T> {
  difficulty: Difficulty
  chaosBag: ChaosToken[]
  investigators: Investigator[]
  campaignNotes: CampaignNoteInput<T>[]
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

export type CampaignNoteInput<T> =
  | T
  | {
      note: T

      /**
       * Only required if it has numerical parameter to remember.
       */
      amount?: number
    }
