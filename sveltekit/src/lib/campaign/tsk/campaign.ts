import type { Campaign } from '$lib/core/campaign'
import { globetrotting, redCoterie } from './encounter'
import { transitions } from './transition'

export const theScarletKeysCampaign: Campaign = {
	name: 'The Scarlet Keys',
	scenarioTransitions: transitions,
	commonEncounterSets: [globetrotting, redCoterie],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
