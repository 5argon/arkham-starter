import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'
import {
	aThousandShapesOfHorrorScenario,
	beyondTheGatesOfSleepScenario,
	darkSideOfTheMoonScenario,
	pointOfNoReturnScenario,
	theSearchForKadathScenario,
	wakingNightmareScenario,
	weaverOfTheCosmosScenario,
	whereTheGodsDwellScenario,
} from '$lib/campaign/tde/scenario'

export const theDreamEatersCampaign: Campaign = {
	name: 'The Dream-Eaters',
	investigatorExpansion: CardPack.TheDreamEaters,
	scenarios:[
		aThousandShapesOfHorrorScenario,
		beyondTheGatesOfSleepScenario,
		darkSideOfTheMoonScenario,
		pointOfNoReturnScenario,
		theSearchForKadathScenario,
		wakingNightmareScenario,
		weaverOfTheCosmosScenario,
		whereTheGodsDwellScenario,
	],
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
