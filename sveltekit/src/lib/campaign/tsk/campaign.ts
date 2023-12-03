import type { Campaign } from '$lib/core/campaign'
import { globetrotting, redCoterie } from './encounter'
import { transitions } from './transition'

export const theScarletKeysCampaign: Campaign = {
	name: 'The Scarlet Keys',
	scenarioTransitions: transitions,
	setupReferenceGraphic: 'https://drive.google.com/drive/folders/1BO6ueaHvVj8bao0jCOnmGMmJHAkI7OfD?usp=share_link',
	commonEncounterSets: [globetrotting, redCoterie],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
