import type { Campaign } from '$lib/core/campaign'
import { transitions } from './transition'

export const theInnsmouthConspiracyCampaign: Campaign = {
	name: 'The Innsmouth Conspiracy',
	setupReferenceGraphic: 'The Innsmouth Conspiracy',
	scenarioTransitions: transitions,
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
