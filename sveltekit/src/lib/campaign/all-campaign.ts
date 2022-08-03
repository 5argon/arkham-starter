import type { Campaign } from "$lib/core/campaign";
import { nightOfTheZealotCampaign } from "./core/campaign";
import { theDunwichLegacyCampaign } from "./dwl/campaign";
import { edgeOfTheEarthCampaign } from "./eote/campaign";

/**
 * Order of this array reflects in the UI.
 */
export const allCampaigns: Campaign[] = [
    nightOfTheZealotCampaign,
    theDunwichLegacyCampaign,
    edgeOfTheEarthCampaign
]