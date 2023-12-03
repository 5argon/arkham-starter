import { ChaosToken } from "./chaos-token"
import { Difficulty } from "./difficulty"
import { Investigator } from "./investigator"

export interface CampaignBaseInput<T> {
  difficulty: Difficulty
  chaosBag: ChaosToken[]
  investigators: Investigator[]
  campaignNotes: CampaignNoteInput<T>[]
}

export interface CampaignNote<T> {
  note: T
  type: "boolean" | "number"
}

export interface CampaignNoteInput<T> {
  note: T

  /**
   * Only required if it has numerical parameter to remember.
   */
  amount?: number
}
