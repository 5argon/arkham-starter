import type { Scenario } from '$lib/core/campaign'
import {
	agentsOfShubNiggurath,
	ancientEvils,
	chillingCold,
	darkCult,
	lockedDoors,
	nightgaunts,
	rats,
	strikingFear,
	theDevourerBelow,
	theMidnightMasks,
} from '../notz/encounter'
import {
	agentsOfAzathoth,
	anettesCoven,
	atDeathsDoorstep,
	beforeTheBlackThrone,
	bloodthirstySpirits,
	chillingMists,
	cityOfSins,
	cityOfTheDamned,
	disappearanceAtTheTwilightEstate,
	forTheGreaterGood,
	hexcraft,
	impendingEvils,
	inexorableFate,
	inTheClutchesOfChaos,
	musicOfTheDamned,
	realmOfDeath,
	returnToAtDeathsDoorstep,
	returnToBeforeTheBlackThrone,
	returnToDisappearanceAtTheTwilightEstate,
	returnToForTheGreaterGood,
	returnToInTheClutchesOfChaos,
	returnToTheSecretName,
	returnToTheWagesOfSin,
	returnToTheWitchingHour,
	returnToUnionAndDisillusion,
	secretsOfTheUniverse,
	silverTwilightLodge,
	spectralPredators,
	theSecretName,
	theWagesOfSin,
	theWatcher,
	theWitchingHour,
	trappedSpirits,
	unionAndDisillusion,
	unspeakableFate,
	unstableRealm,
	witchcraft,
} from './encounter'

export const disappearanceAtTheTwilightEstateScenario: Scenario = {
	index: 1,
	name: 'Disappearance at the Twilight Estate',
	shortName: 'P',
	setups: [
		{
			shuffles: [
				{ encounterSet: disappearanceAtTheTwilightEstate, overwriteCount: 0 },
				{ encounterSet: atDeathsDoorstep, overwriteCount: 7 },
				chillingCold,
				inexorableFate,
				realmOfDeath,
				spectralPredators,
				theWatcher,
				trappedSpirits,
			],
		},
	],
}

export const theWitchingHourScenario: Scenario = {
	index: 2,
	name: 'The Witching Hour',
	shortName: 'I',
	setups: [
		{
			shuffles: [
				{ encounterSet: theWitchingHour, overwriteCount: 0 },
				ancientEvils,
				strikingFear,
				{ encounterSet: theDevourerBelow, overwriteCount: 6 },
				anettesCoven,
				cityOfSins,
				witchcraft,
			],
			remaining: [agentsOfShubNiggurath, agentsOfAzathoth],
		},
	],
}

export const atDeathsDoorstepScenario: Scenario = {
	index: 3,
	name: "At Death's Doorstep",
	shortName: 'II',
	setups: [
		{
			shuffles: [
				{ encounterSet: atDeathsDoorstep, overwriteCount: 0 },
				chillingCold,
				inexorableFate,
				silverTwilightLodge,
				spectralPredators,
				trappedSpirits,
			],
			remaining: [realmOfDeath, theWatcher],
		},
	],
}

export const theSecretNameScenario: Scenario = {
	index: 4,
	name: 'The Secret Name',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: theSecretName, overwriteCount: 0 },
				rats,
				cityOfSins,
				inexorableFate,
				realmOfDeath,
				witchcraft,
			],
		},
	],
}

export const theWagesOfSinScenario: Scenario = {
	index: 5,
	name: 'The Wages of Sin',
	shortName: 'IV',
	setups: [
		{
			shuffles: [
				{ encounterSet: theWagesOfSin, overwriteCount: 0 },
				anettesCoven,
				cityOfSins,
				inexorableFate,
				realmOfDeath,
				trappedSpirits,
				witchcraft,
			],
			remaining: [theWatcher],
		},
	],
}

export const forTheGreaterGoodScenario: Scenario = {
	index: 6,
	name: 'For the Greater Good',
	shortName: 'V',
	setups: [
		{
			shuffles: [
				{ encounterSet: forTheGreaterGood, overwriteCount: 0 },
				ancientEvils,
				darkCult,
				lockedDoors,
				cityOfSins,
				silverTwilightLodge,
			],
		},
	],
}

export const unionAndDisillusionScenario: Scenario = {
	index: 7,
	name: 'Union and Disillusion',
	shortName: 'VI',
	setups: [
		{
			shuffles: [
				{ encounterSet: unionAndDisillusion, overwriteCount: 0 },
				ancientEvils,
				chillingCold,
				inexorableFate,
				realmOfDeath,
				spectralPredators,
			],
			remaining: [anettesCoven, silverTwilightLodge, theWatcher],
		},
	],
}

export const inTheClutchesOfChaos1Scenario: Scenario = {
	index: 8,
	name: 'In the Clutches of Chaos (v.I)',
	shortName: 'VII (v.I)',
	setups: [
		{
			shuffles: [
				{ encounterSet: inTheClutchesOfChaos, overwriteCount: 0 },
				{ encounterSet: musicOfTheDamned, overwriteCount: 0 },
				nightgaunts,
				agentsOfAzathoth,
				anettesCoven,
				cityOfSins,
				witchcraft,
			],
		},
	],
}

export const inTheClutchesOfChaos2Scenario: Scenario = {
	index: 9,
	name: 'In the Clutches of Chaos (v.II)',
	shortName: 'VII (v.II)',
	setups: [
		{
			shuffles: [
				{ encounterSet: inTheClutchesOfChaos, overwriteCount: 0 },
				{ encounterSet: secretsOfTheUniverse, overwriteCount: 0 },
				nightgaunts,
				agentsOfAzathoth,
				strikingFear,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				silverTwilightLodge,
			],
		},
	],
}

export const beforeTheBlackThroneScenario: Scenario = {
	index: 10,
	name: 'Before the Black Throne',
	shortName: 'VIII',
	setups: [
		{
			shuffles: [
				{ encounterSet: beforeTheBlackThrone, overwriteCount: 0 },
				ancientEvils,
				darkCult,
				agentsOfAzathoth,
				inexorableFate,
			],
		},
	],
}

export const returnToDisappearanceAtTheTwilightEstateScenario: Scenario = {
	index: 1,
	name: 'Disappearance at the Twilight Estate',
	shortName: 'P',
	setups: [
		{
			shuffles: [
				{ encounterSet: disappearanceAtTheTwilightEstate, overwriteCount: 0 },
				{ encounterSet: returnToDisappearanceAtTheTwilightEstate, overwriteCount: 0 },
				{ encounterSet: atDeathsDoorstep, overwriteCount: 7 },
				spectralPredators,
				theWatcher,
				bloodthirstySpirits,
				chillingMists,
				unspeakableFate,
				unstableRealm,
			],
		},
	],
}

export const returnToTheWitchingHourScenario: Scenario = {
	index: 2,
	name: 'The Witching Hour',
	shortName: 'I',
	setups: [
		{
			shuffles: [
				{ encounterSet: theWitchingHour, overwriteCount: 0 },
				{ encounterSet: returnToTheWitchingHour, overwriteCount: 0 },
				{ encounterSet: theDevourerBelow, overwriteCount: 6 },
				strikingFear,
				anettesCoven,
				cityOfTheDamned,
				hexcraft,
				impendingEvils,
			],
			remaining: [agentsOfShubNiggurath, agentsOfAzathoth],
		},
	],
}

export const returnToAtDeathsDoorstepScenario: Scenario = {
	index: 3,
	name: "At Death's Doorstep",
	shortName: 'II',
	setups: [
		{
			shuffles: [
				{ encounterSet: atDeathsDoorstep, overwriteCount: 0 },
				{ encounterSet: returnToAtDeathsDoorstep, overwriteCount: 0 },
				silverTwilightLodge,
				spectralPredators,
				bloodthirstySpirits,
				chillingMists,
				unspeakableFate,
			],
			remaining: [unstableRealm, theWatcher],
		},
	],
}

export const returnToTheSecretNameScenario: Scenario = {
	index: 4,
	name: 'The Secret Name',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: theSecretName, overwriteCount: 0 },
				{ encounterSet: returnToTheSecretName, overwriteCount: 0 },
				rats,
				cityOfTheDamned,
				hexcraft,
				unspeakableFate,
				unstableRealm,
			],
		},
	],
}

export const returnToTheWagesOfSinScenario: Scenario = {
	index: 5,
	name: 'The Wages of Sin',
	shortName: 'IV',
	setups: [
		{
			shuffles: [
				{ encounterSet: theWagesOfSin, overwriteCount: 0 },
				{ encounterSet: returnToTheWagesOfSin, overwriteCount: 0 },
				anettesCoven,
				bloodthirstySpirits,
				cityOfTheDamned,
				hexcraft,
				unspeakableFate,
				unstableRealm,
			],
			remaining: [theWatcher],
		},
	],
}

export const returnToForTheGreaterGoodScenario: Scenario = {
	index: 6,
	name: 'For the Greater Good',
	shortName: 'V',
	setups: [
		{
			shuffles: [
				{ encounterSet: forTheGreaterGood, overwriteCount: 0 },
				{ encounterSet: returnToForTheGreaterGood, overwriteCount: 0 },
				darkCult,
				lockedDoors,
				silverTwilightLodge,
				cityOfTheDamned,
				impendingEvils,
			],
		},
	],
}

export const returnToUnionAndDisillusionScenario: Scenario = {
	index: 7,
	name: 'Union and Disillusion',
	shortName: 'VI',
	setups: [
		{
			shuffles: [
				{ encounterSet: unionAndDisillusion, overwriteCount: 0 },
				{ encounterSet: returnToUnionAndDisillusion, overwriteCount: 0 },
				spectralPredators,
				chillingMists,
				impendingEvils,
				unspeakableFate,
				unstableRealm,
			],
			remaining: [anettesCoven, silverTwilightLodge, theWatcher],
		},
	],
}

export const returnToInTheClutchesOfChaos1Scenario: Scenario = {
	index: 8,
	name: 'In the Clutches of Chaos (v.I)',
	shortName: 'VII (v.I)',
	setups: [
		{
			shuffles: [
				{ encounterSet: inTheClutchesOfChaos, overwriteCount: 0 },
				{ encounterSet: returnToInTheClutchesOfChaos, overwriteCount: 0 },
				{ encounterSet: musicOfTheDamned, overwriteCount: 0 },
				nightgaunts,
				agentsOfAzathoth,
				anettesCoven,
				cityOfTheDamned,
				hexcraft,
			],
		},
	],
}

export const returnToInTheClutchesOfChaos2Scenario: Scenario = {
	index: 9,
	name: 'In the Clutches of Chaos (v.II)',
	shortName: 'VII (v.II)',
	setups: [
		{
			shuffles: [
				{ encounterSet: inTheClutchesOfChaos, overwriteCount: 0 },
				{ encounterSet: returnToInTheClutchesOfChaos, overwriteCount: 0 },
				{ encounterSet: secretsOfTheUniverse, overwriteCount: 0 },
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				nightgaunts,
				strikingFear,
				agentsOfAzathoth,
				silverTwilightLodge,
			],
		},
	],
}

export const returnToBeforeTheBlackThroneScenario: Scenario = {
	index: 10,
	name: 'Before the Black Throne',
	shortName: 'VIII',
	setups: [
		{
			shuffles: [
				{ encounterSet: beforeTheBlackThrone, overwriteCount: 0 },
				{ encounterSet: returnToBeforeTheBlackThrone, overwriteCount: 0 },
				darkCult,
				agentsOfAzathoth,
				impendingEvils,
				unspeakableFate,
			],
		},
	],
}
