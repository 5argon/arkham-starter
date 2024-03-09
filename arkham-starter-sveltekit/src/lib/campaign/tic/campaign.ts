import {
	aLightInTheFogScenario,
	devilReefScenario,
	horrorInHighGearScenario,
	inTooDeepScenario,
	intoTheMaelstromScenario,
	theLairOfDagonScenario,
	thePitOfDespairScenario,
	theVanishingOfElinaHarperScenario,
} from '$lib/campaign/tic/scenario'
import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'

export const theInnsmouthConspiracyCampaign: Campaign = {
	name: 'The Innsmouth Conspiracy',
	investigatorExpansion: CardPack.TheInnsmouthConspiracy,
	scenarios: [
		aLightInTheFogScenario,
		devilReefScenario,
		horrorInHighGearScenario,
		inTooDeepScenario,
		intoTheMaelstromScenario,
		theLairOfDagonScenario,
		thePitOfDespairScenario,
		theVanishingOfElinaHarperScenario,
	],
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
