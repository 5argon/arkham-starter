import { CampaignBaseInput } from "../../common/campaign"
import { CampaignNote } from "./notes"

export interface TheDunwichLegacyCampaign
  extends CampaignBaseInput<CampaignNote> {
  returnTo: boolean
  sacrificedToYogSothoth: SacrificedToYogSothoth
}

export interface SpecStep {
  name: string
}

export interface SacrificedToYogSothoth {
  henryArmitage: boolean
  warrenRice: boolean
  earlSawyer: boolean
  francisMorgan: boolean
  zebulonWhateley: boolean
  allyCardIds: string[]
}
