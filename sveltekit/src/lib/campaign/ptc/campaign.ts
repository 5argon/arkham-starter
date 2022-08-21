import type { Campaign } from '$lib/core/campaign'
import { transitions, transitionsReturnTo } from './transition'

export const thePathToCarcosaCampaign: Campaign = {
	name: 'The Path to Carcosa',
	setupReferenceGraphic: 'The Path to Carcosa',
	scenarioTransitions: transitions,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [

		],
		standard: [

		],
		hard: [

		],
		expert: [

		],
	},
}

export const returnToThePathToCarcosaCampaign: Campaign = {
	name: 'Return to the Path to Carcosa',
	setupReferenceGraphic: 'Return to the Path to Carcosa',
	scenarioTransitions: transitionsReturnTo,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [

		],
		standard: [

		],
		hard: [

		],
		expert: [

		],
	},
}
