import type { Scenario } from '$lib/core/campaign'
import {
	ancientEvils,
	chillingCold,
	darkCult,
	ghouls,
	lockedDoors,
	nightgaunts,
	rats,
	strikingFear,
} from '../notz/encounter'
import {
	beyondTheGatesOfSleep,
	wakingNightmare,
	theSearchForKadath,
	aThousandShapesOfHorror,
	darkSideOfTheMoon,
	pointOfNoReturn,
	terrorOfTheVale,
	descentIntoThePitch,
	whereTheGodsDwell,
	weaverOfTheCosmos,
	agentsOfNyarlathotep,
	dreamersCurse,
	dreamlands,
	zoogs,
	agentsOfAtlachNacha,
	mergingRealities,
	spiders,
	whispersOfHypnos,
	corsairs,
	creaturesOfTheUnderworld,
} from './encounter'

export const beyondTheGatesOfSleepScenario: Scenario = {
	name: 'Beyond the Gates of Sleep',
	index: 1,
	shortName: 'I-A',
	setups: [
		{
			shuffles: [
				{ encounterSet: beyondTheGatesOfSleep, overwriteCount: 0 },
				chillingCold,
				agentsOfNyarlathotep,
				dreamersCurse,
				dreamlands,
				zoogs,
			],
		},
	],
}

export const wakingNightmareScenario: Scenario = {
	name: 'Waking Nightmare',
	index: 2,
	shortName: 'I-B',
	setups: [
		{
			shuffles: [
				{ encounterSet: wakingNightmare, overwriteCount: 0 },
				lockedDoors,
				strikingFear,
				agentsOfAtlachNacha,
				mergingRealities,
			],
			remaining: [spiders, whispersOfHypnos],
		},
	],
}

export const theSearchForKadathScenario: Scenario = {
	name: 'The Search for Kadath',
	index: 3,
	shortName: 'II-A',
	setups: [
		{
			shuffles: [
				{ encounterSet: theSearchForKadath, overwriteCount: 0 },
				agentsOfNyarlathotep,
				corsairs,
				dreamlands,
				whispersOfHypnos,
				zoogs,
			],
		},
	],
}

export const aThousandShapesOfHorrorScenario: Scenario = {
	name: 'A Thousand Shapes of Horror',
	index: 4,
	shortName: 'II-B',
	setups: [
		{
			shuffles: [
				{ encounterSet: aThousandShapesOfHorror, overwriteCount: 0 },
				chillingCold,
				ghouls,
				lockedDoors,
				rats,
				creaturesOfTheUnderworld,
				mergingRealities,
			],
		},
	],
}

export const darkSideOfTheMoonScenario: Scenario = {
	name: 'Dark Side of the Moon',
	index: 5,
	shortName: 'III-A',
	setups: [
		{
			shuffles: [
				{ encounterSet: darkSideOfTheMoon, overwriteCount: 0 },
				ancientEvils,
				corsairs,
				dreamersCurse,
			],
		},
	],
}

export const pointOfNoReturnScenario: Scenario = {
	name: 'Point of No Return',
	index: 6,
	shortName: 'III-B',
	setups: [
		{
			shuffles: [
				{ encounterSet: pointOfNoReturn, overwriteCount: 0 },
				ancientEvils,
				ghouls,
				strikingFear,
				creaturesOfTheUnderworld,
				whispersOfHypnos,
			],

			remaining: [descentIntoThePitch, terrorOfTheVale, nightgaunts, agentsOfAtlachNacha],
		},
	],
}

export const whereTheGodsDwellScenario: Scenario = {
	name: 'Where the Gods Dwell',
	index: 7,
	shortName: 'IV-A',
	setups: [
		{
			shuffles: [
				{ encounterSet: whereTheGodsDwell, overwriteCount: 0 },
				darkCult,
				agentsOfNyarlathotep,
				dreamersCurse,
				whispersOfHypnos,
			],
		},
	],
}

export const weaverOfTheCosmosScenario: Scenario = {
	name: 'Weaver of the Cosmos',
	index: 8,
	shortName: 'IV-B',
	setups: [
		{
			shuffles: [
				{ encounterSet: weaverOfTheCosmos, overwriteCount: 0 },
				ancientEvils,
				chillingCold,
				agentsOfAtlachNacha,
				spiders,
			],
		},
	],
}
