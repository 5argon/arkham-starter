import type { Campaign } from '$lib/core/campaign'
import { transitions, transitionsReturnTo } from './transition'

export const theForgottenAgeCampaign: Campaign = {
	name: 'The Forgotten Age',
	scenarioTransitions: transitions,
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}

export const returnToTheForgottenAgeCampaign: Campaign = {
	name: 'Return to the Forgotten Age',
	scenarioTransitions: transitionsReturnTo,
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
