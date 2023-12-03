import type { Campaign } from '$lib/core/campaign'
import { transitions } from './transition'

export const theDreamEatersCampaign: Campaign = {
	name: 'The Dream-Eaters',
	scenarioTransitions: transitions,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
