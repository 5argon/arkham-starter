import { CampaignNote } from "./campaign"

export interface GuideStep<T> {
  /**
   *  Scenario or Interlude name.
   */
  name: string
  /**
   * Remember resolutions that you got from these choices.
   */
  resolutions: GuideStepResolution[]
  /**
   * UI show checkboxes for possible campaign notes that could occur in this scenario.
   * If element is an array, they are mutually exclusive notes.
   */
  possibleNotes: (CampaignNote<T> | CampaignNote<T>[])[]
}

export interface GuideStepResolution {
  /**
   * `number`: For "Resolution 1", "Epilogue 1", etc.
   * `string`: For "Investigator Defeat", etc.
   */
  resolution: number | string

  /**
   * How you got to this resolution.
   */
  hint: string

  /**
   * Makes UI ask for the next resolution after this one.
   */
  chain?: number[]
}
