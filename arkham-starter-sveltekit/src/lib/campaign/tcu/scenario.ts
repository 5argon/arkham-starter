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
	diagram: 'TCU_1',
	shortName: 'P',
	setups: [
		{
			shuffles: [
				{ encounterSet: disappearanceAtTheTwilightEstate, overwriteCount: 0 },
				{ encounterSet: atDeathsDoorstep, overwriteCount: 0 },
				chillingCold,
				inexorableFate,
				realmOfDeath,
				spectralPredators,
				{ encounterSet: theWatcher, overwriteCount: 2 },
				trappedSpirits,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				what: 'The starting encounter deck is reduced by setup instructions on the back of investigator cards.',
			},
			{
				encounterSet: atDeathsDoorstep,
				what: 'Only gather 7 Spectral locations.',
			},
			{
				encounterSet: theWatcher,
				what: 'Put The Spectral Watcher into play in the Entry Hall.',
			},
		],
	},
}

export const theWitchingHourScenario: Scenario = {
	index: 2,
	name: 'The Witching Hour',
	diagram: 'TCU_2',
	shortName: 'I',
	setups: [
		{
			shuffles: [ancientEvils, strikingFear, anettesCoven, cityOfSins, witchcraft],
			remaining: [theWitchingHour, agentsOfShubNiggurath, agentsOfAzathoth, theDevourerBelow],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: theDevourerBelow,
				what: 'Only gather 6 Arkham Woods locations.',
			},
			{
				encounterSet: agentsOfAzathoth,
				what: 'Set the Agents of Azathoth encounter set aside, out of play.',
			},
			{
				encounterSet: agentsOfShubNiggurath,
				what: 'Set the Agents of Shub-Niggurath encounter set aside, out of play.',
			},
		],
	},
}

export const atDeathsDoorstepScenario: Scenario = {
	index: 3,
	name: "At Death's Doorstep",
	diagram: 'TCU_3',
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
	commonSetup: {
		notes: [
			{
				encounterSet: realmOfDeath,
				what: 'Set the Realm of Death encounter set aside, out of play.',
			},
			{
				encounterSet: theWatcher,
				what: 'Set The Watcher encounter set aside, out of play.',
			},
		],
	},
}

export const theSecretNameScenario: Scenario = {
	index: 4,
	name: 'The Secret Name',
	diagram: 'TCU_4',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: theSecretName, overwriteCount: 10 },
				rats,
				cityOfSins,
				inexorableFate,
				realmOfDeath,
				witchcraft,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: theSecretName,
				what: 'In the starting encounter deck : Meddlesome Familiar (3x), Extradimensional Visions (2x), Pulled by the Stars (2x), Disquieting Dreams (2x), Brown Jenkin. (10 cards)',
			},
		],
	},
}

export const theWagesOfSinScenario: Scenario = {
	index: 5,
	name: 'The Wages of Sin',
	diagram: 'TCU_5',
	shortName: 'IV',
	setups: [
		{
			shuffles: [
				{ encounterSet: theWagesOfSin, overwriteCount: 8 },
				anettesCoven,
				cityOfSins,
				witchcraft,
			],
			remaining: [theWatcher, inexorableFate, realmOfDeath, trappedSpirits],
		},
	],
	commonSetup: {
		notes: [
			{
				topic: 'Spectral Encounter Deck',
				what: '20 Cards',
			},
			{
				encounterSet: theWagesOfSin,
				what: 'In the spectral encounter deck : Malevolent Spirit x2, Burdens of the Past x2, and Bane of the Living x2. (6 cards)',
			},
			{
				encounterSet: inexorableFate,
				what: 'The entire Inexorable Fate set in the spectral encounter deck. (6 cards)',
			},
			{
				encounterSet: realmOfDeath,
				what: 'The entire Realm of Death set in the spectral encounter deck. (4 cards)',
			},
			{
				encounterSet: trappedSpirits,
				what: 'The entire Trapped Spirits set in the spectral encounter deck. (4 cards)',
			},
			{
				encounterSet: theWatcher,
				what: 'Set The Watcher encounter set aside, out of play.',
			},
		],
	},
}

export const forTheGreaterGoodScenario: Scenario = {
	index: 6,
	name: 'For the Greater Good',
	diagram: 'TCU_6',
	shortName: 'V',
	setups: [
		{
			name: '"The investigators are members of the Lodge"',
			shuffles: [
				{ encounterSet: forTheGreaterGood, overwriteCount: 11 },
				ancientEvils,
				{ encounterSet: darkCult, overwriteCount: 2 },
				lockedDoors,
				cityOfSins,
				silverTwilightLodge,
			],
			notes: [
				{
					encounterSet: forTheGreaterGood,
					what: 'Remove 3 cards from the game : Cell Keeper (1x), Knight of the Inner Circle (2x).',
				},
				{
					encounterSet: darkCult,
					what: 'Remove 4 cards from the game : Acolyte (3x), Wizard of the Order (1x).',
				},
			],
		},
		{
			name: 'Other',
			shuffles: [
				{ encounterSet: forTheGreaterGood, overwriteCount: 11 },
				ancientEvils,
				darkCult,
				lockedDoors,
				cityOfSins,
				{ encounterSet: silverTwilightLodge, overwriteCount: 2 },
			],
			notes: [
				{
					encounterSet: forTheGreaterGood,
					what: 'Remove 3 cards from the game : Lodge Jailor (1x), Knight of the Outer Void (2x).',
				},
				{
					encounterSet: silverTwilightLodge,
					what: 'Remove 4 cards from the game : Lodge Neophyte (3x), Keeper of Secrets (1x).',
				},
			],
		},
	],
}

export const unionAndDisillusionScenario: Scenario = {
	index: 7,
	name: 'Union and Disillusion',
	diagram: 'TCU_7',
	shortName: 'VI',
	setups: [
		{
			shuffles: [
				{ encounterSet: unionAndDisillusion, overwriteCount: 14 },
				ancientEvils,
				chillingCold,
				inexorableFate,
				realmOfDeath,
				spectralPredators,
			],
			remaining: [anettesCoven, silverTwilightLodge, theWatcher],
		},
	],
	commonSetup: {
		specialGather: [
			{
				encounterSet: theWitchingHour,
				what: ['Anette Mason'],
			},
			{
				encounterSet: atDeathsDoorstep,
				what: ['Josef Meiger'],
			},
		],
		notes: [
			{
				encounterSet: anettesCoven,
				what: 'Set the Anette’s Coven encounter set aside, out of play.',
			},
			{
				encounterSet: silverTwilightLodge,
				what: 'Set the Silver Twilight Lodge encounter set aside, out of play.',
			},
			{
				encounterSet: theWatcher,
				what: 'Set The Watcher encounter set aside, out of play.',
			},
			{
				what: 'For each heretic that was unleashed unto Arkham, place 1 doom on agenda 1a.',
			},
		],
	},
}

export const inTheClutchesOfChaosScenario: Scenario = {
	index: 8,
	name: 'In the Clutches of Chaos',
	diagram: 'TCU_8',
	shortName: 'VII',
	setups: [
		{
			name: '"Anette Mason is possessed by evil"',
			shuffles: [
				{ encounterSet: inTheClutchesOfChaos, overwriteCount: 8 },
				{ encounterSet: musicOfTheDamned, overwriteCount: 4 },
				nightgaunts,
				{ encounterSet: agentsOfAzathoth, overwriteCount: 3 },
				anettesCoven,
				cityOfSins,
				witchcraft,
			],
		},
		{
			name: '"Carl Sanford possesses the secrets of the universe"',
			shuffles: [
				{ encounterSet: inTheClutchesOfChaos, overwriteCount: 8 },
				{ encounterSet: secretsOfTheUniverse, overwriteCount: 4 },
				nightgaunts,
				{ encounterSet: agentsOfAzathoth, overwriteCount: 3 },
				silverTwilightLodge,
				strikingFear,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
			],
			notes: [
				{
					encounterSet: theMidnightMasks,
					what: 'Only gather the 5 treachery cards (2x False Lead and 3x Hunting Shadow).',
				},
			],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: agentsOfAzathoth,
				what: 'Set the Piper of Azathoth enemy aside, out of play.',
			},
			{
				what: 'Gather Silver Twilight Lodge and Hangman’s Hill from the other variant for breach randomization.',
			},
		],
	},
}

export const beforeTheBlackThroneScenario: Scenario = {
	index: 10,
	name: 'Before the Black Throne',
	diagram: 'TCU_9',
	shortName: 'VIII',
	setups: [
		{
			shuffles: [
				{ encounterSet: beforeTheBlackThrone, overwriteCount: 12 },
				ancientEvils,
				darkCult,
				{ encounterSet: agentsOfAzathoth, overwriteCount: 3 },
				inexorableFate,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: agentsOfAzathoth,
				what: 'Set the Piper of Azathoth enemy aside, out of play.',
			},
			{
				what: "Don't forget potential chaos bag changes in the prior Interlude IV.",
			},
		],
	},
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
