import type { Campaign } from '$lib/core/campaign'
import { transitions, transitionsReturnTo } from './transition'

export const theForgottenAgeCampaign: Campaign = {
	name: 'The Forgotten Age',
	scenarioTransitions: transitions,
	setupReferenceGraphic:
		'https://drive.google.com/drive/folders/1WnmIqXn7kXsWaw4Z2-1x6BRqWunsArFC?usp=share_link',
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
