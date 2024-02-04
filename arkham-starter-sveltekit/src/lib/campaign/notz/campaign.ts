import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'
import { returnToTransitions, transitions } from './transition'

export const nightOfTheZealotCampaign: Campaign = {
	name: 'Night of the Zealot',
	investigatorExpansion: CardPack.RevisedCoreSet,
	scenarioTransitions: transitions,
}

export const returnToTheNightOfTheZealotCampaign: Campaign = {
	name: 'Return to the Night of the Zealot',
	investigatorExpansion: CardPack.ReturnToTheNightOfTheZealot,
	scenarioTransitions: returnToTransitions,
}
