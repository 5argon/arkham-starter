import type { Campaign } from '$lib/core/campaign'
import { CardPack, cardPackToRevised } from '$lib/core/card-pack'
import { transitions, transitionsReturnTo } from './transition'

export const theCircleUndoneCampaign: Campaign = {
	name: 'The Circle Undone',
	investigatorExpansion: CardPack.TheCircleUndone,
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
	investigatorExpansion: CardPack.ReturnToTheCircleUndone,
	scenarioTransitions: transitionsReturnTo,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
