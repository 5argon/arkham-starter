import {
	returnToTheDevourerBelowScenario,
	returnToTheGatheringScenario,
	returnToTheMidnightMasksScenario,
	theDevourerBelowScenario,
	theGatheringScenario,
	theMidnightMasksScenario,
} from '$lib/campaign/notz/scenario'
import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'

export const nightOfTheZealotCampaign: Campaign = {
	name: 'Night of the Zealot',
	investigatorExpansion: CardPack.RevisedCoreSet,
	scenarios: [theGatheringScenario, theMidnightMasksScenario, theDevourerBelowScenario],
}

export const returnToTheNightOfTheZealotCampaign: Campaign = {
	name: 'Return to the Night of the Zealot',
	investigatorExpansion: CardPack.ReturnToTheNightOfTheZealot,
	scenarios: [
		returnToTheGatheringScenario,
		returnToTheMidnightMasksScenario,
		returnToTheDevourerBelowScenario,
	],
}
