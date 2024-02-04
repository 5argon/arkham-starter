import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'
import { transitions } from './transition'

export const theDreamEatersCampaign: Campaign = {
	name: 'The Dream-Eaters',
	investigatorExpansion: CardPack.TheDreamEaters,
	scenarioTransitions: transitions,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
