import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'
import { transitions } from './transition'

export const theInnsmouthConspiracyCampaign: Campaign = {
	name: 'The Innsmouth Conspiracy',
	investigatorExpansion: CardPack.TheInnsmouthConspiracy,
	scenarioTransitions: transitions,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
