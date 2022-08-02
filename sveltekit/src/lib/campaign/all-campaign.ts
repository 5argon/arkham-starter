import type { Campaign } from "$lib/core/campaign";
import { nightOfTheZealotCampaign } from "./core/campaign";
import { theDunwichLegacyCampaign } from "./dwl/campaign";

/**
 * Order of this array reflects in the UI.
 */
export const allCampaigns: Campaign[] = [
    nightOfTheZealotCampaign,
    theDunwichLegacyCampaign
]