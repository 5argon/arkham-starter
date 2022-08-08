import type { Campaign } from '$lib/core/campaign'
import { transitions } from './transition'

export const thePathToCarcosaCampaign: Campaign = {
	name: 'The Path to Carcosa',
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
