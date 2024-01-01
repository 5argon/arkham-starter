export interface Scenario<NOTE> {
  resolutions: GuideStepResolution[]
  possibleNotes: CampaignNote<NOTE>[]
}

export interface GuideStepResolution {
  resolution: string
  chain?: string[]
}

export type CampaignNote<T> = {
  note: T
  type: "boolean" | "number"
}
