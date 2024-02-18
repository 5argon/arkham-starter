import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'
import { transitions, transitionsReturnTo } from './transition'

export const theCircleUndoneCampaign: Campaign = {
	name: 'The Circle Undone',
	setupReferenceGraphic:
		'https://drive.google.com/drive/folders/1rENxazq4uHxScafpKT--ISXjaPDpV8U8?usp=share_link',
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
