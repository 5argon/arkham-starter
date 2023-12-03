import type { Campaign } from '$lib/core/campaign'
import { transitions, transitionsReturnTo } from './transition'

export const theCircleUndoneCampaign: Campaign = {
	name: 'The Circle Undone',
	scenarioTransitions: transitions,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}

export const returnToTheCircleUndoneCampaign: Campaign = {
	name: 'Return to the Circle Undone',
	scenarioTransitions: transitionsReturnTo,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
