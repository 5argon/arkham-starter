import type { Campaign } from '$lib/core/campaign'
import { returnToTransitions, transitions } from './transition'

export const nightOfTheZealotCampaign: Campaign = {
	name: 'Night of the Zealot',
	scenarioTransitions: transitions,
}

export const returnToNightOfTheZealotCampaign: Campaign = {
	name: 'Return to Night of the Zealot',
	scenarioTransitions: returnToTransitions,
}
