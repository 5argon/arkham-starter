import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'
import { globetrotting, redCoterie } from './encounter'
import {
	congressOfTheKeys1Scenario,
	congressOfTheKeys2Scenario,
	congressOfTheKeys3Scenario,
	dancingMad1Scenario,
	dancingMad2Scenario,
	deadHeatScenario,
	dealingsInTheDarkScenario,
	dogsOfWar1Scenario,
	dogsOfWar2Scenario,
	dogsOfWar3Scenario,
	onThinIceScenario,
	riddlesAndRainScenario,
	sanguineShadowsScenario, shadesOfSufferingScenario, withoutATraceScenario
} from '$lib/campaign/tsk/scenario'

export const theScarletKeysCampaign: Campaign = {
	name: 'The Scarlet Keys',
	investigatorExpansion: CardPack.TheScarletKeys,
	scenarios:[
		congressOfTheKeys1Scenario,
		congressOfTheKeys2Scenario,
		congressOfTheKeys3Scenario,
		dancingMad1Scenario,
		dancingMad2Scenario,
		deadHeatScenario,
		dealingsInTheDarkScenario,
		dogsOfWar1Scenario,
		dogsOfWar2Scenario,
		dogsOfWar3Scenario,
		onThinIceScenario,
		riddlesAndRainScenario,
		sanguineShadowsScenario,
		shadesOfSufferingScenario,
		withoutATraceScenario,
	],
	setupReferenceGraphic:
		'https://drive.google.com/drive/folders/1BO6ueaHvVj8bao0jCOnmGMmJHAkI7OfD?usp=share_link',
	commonEncounterSets: [globetrotting, redCoterie],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
