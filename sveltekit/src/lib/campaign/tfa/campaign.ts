import type { Campaign } from '$lib/core/campaign'
import { transitions } from './transition'

export const theForgottenAgeCampaign: Campaign = {
	name: 'The Forgotten Age',
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
