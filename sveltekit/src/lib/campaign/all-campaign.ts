import type { Campaign } from '$lib/core/campaign'
import { nightOfTheZealotCampaign, returnToTheNightOfTheZealotCampaign } from './notz/campaign'
import { returnToTheDunwichLegacyCampaign, theDunwichLegacyCampaign } from './dwl/campaign'
import { edgeOfTheEarthCampaign } from './eote/campaign'
import { returnToThePathToCarcosaCampaign, thePathToCarcosaCampaign } from './ptc/campaign'
import { returnToTheForgottenAgeCampaign, theForgottenAgeCampaign } from './tfa/campaign'

/**
 * Order of this array reflects in the UI.
 */
export const allCampaigns: Campaign[] = [
	nightOfTheZealotCampaign,
	theDunwichLegacyCampaign,
	thePathToCarcosaCampaign,
	theForgottenAgeCampaign,
	edgeOfTheEarthCampaign,

	returnToTheNightOfTheZealotCampaign,
	returnToTheDunwichLegacyCampaign,
	returnToThePathToCarcosaCampaign,
	returnToTheForgottenAgeCampaign,
]
