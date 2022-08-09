import type { Campaign } from '$lib/core/campaign'
import { nightOfTheZealotCampaign, returnToNightOfTheZealotCampaign } from './notz/campaign'
import { theDunwichLegacyCampaign } from './dwl/campaign'
import { edgeOfTheEarthCampaign } from './eote/campaign'
import { thePathToCarcosaCampaign } from './ptc/campaign'
import { theForgottenAgeCampaign } from './tfa/campaign'

/**
 * Order of this array reflects in the UI.
 */
export const allCampaigns: Campaign[] = [
	nightOfTheZealotCampaign,
	returnToNightOfTheZealotCampaign,
	theDunwichLegacyCampaign,
	thePathToCarcosaCampaign,
	theForgottenAgeCampaign,
	edgeOfTheEarthCampaign,
]
