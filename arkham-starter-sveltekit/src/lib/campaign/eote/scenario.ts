import { GameComponent, type Scenario } from '$lib/core/campaign'

import { ancientEvils, chillingCold, lockedDoors, strikingFear } from '../notz/encounter'
import {
	agentsOfTheUnknown,
	cityOfTheElderThings,
	creaturesInTheIce,
	deadlyWeather,
	elderThings,
	fatalMirage,
	hazardsOfAntarctica,
	iceAndDeath,
	leftBehind,
	lostInTheNight,
	miasma,
	namelessHorrors,
	penguins,
	seepingNightmares,
	shoggoths,
	silenceAndMystery,
	stirringInTheDeep,
	theCrash,
	theGreatSeal,
	theHeartOfMadness,
	toTheForbiddenPeaks,
} from './encounter'

export const iceAndDeathPart1Scenario: Scenario = {
	index: 2,
	name: 'Ice and Death, Part I',
	shortName: 'I (Pt. I)',
	diagram: 'EOTE_1',
	setups: [
		{
			shuffles: [
				{ encounterSet: iceAndDeath, overwriteCount: 4 },
				ancientEvils,
				deadlyWeather,
				hazardsOfAntarctica,
				silenceAndMystery,
			],
			remaining: [theCrash, creaturesInTheIce],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: iceAndDeath,
				what: 'Set each Skittering Nonsense enemy aside, out of play. (3 cards)',
			},
			{ encounterSet: creaturesInTheIce, what: 'Set this encounter set aside, out of play.' },
		],
	},
}

export const iceAndDeathPart2Scenario: Scenario = {
	index: 3,
	name: 'Ice and Death, Part II',
	shortName: 'I (Pt. II)',
	diagram: 'EOTE_2',
	setups: [
		{
			shuffles: [
				{ encounterSet: iceAndDeath, overwriteCount: 7 },
				ancientEvils,
				leftBehind,
				deadlyWeather,
				hazardsOfAntarctica,
				silenceAndMystery,
			],
			remaining: [lostInTheNight],
		},
	],
	commonSetup: {
		gameComponents: [GameComponent.TokenFrost],
	},
}

export const iceAndDeathPart3Scenario: Scenario = {
	index: 4,
	name: 'Ice and Death, Part III',
	shortName: 'I (Pt. III)',
	diagram: 'EOTE_3',
	setups: [
		{
			shuffles: [
				{ encounterSet: iceAndDeath, overwriteCount: 4 },
				{ encounterSet: seepingNightmares, overwriteCount: 2 },
				ancientEvils,
				{ encounterSet: creaturesInTheIce, overwriteCount: 2 },
				deadlyWeather,
				hazardsOfAntarctica,
				silenceAndMystery,
			],
		},
	],
	commonSetup: {
		gameComponents: [GameComponent.TokenFrost],
		notes: [
			{
				encounterSet: iceAndDeath,
				what: '3 Eidolon enemies from this set are under Seeping Nightmares.',
			},
			{
				encounterSet: creaturesInTheIce,
				what: '5 Eidolon enemies from this set are under Seeping Nightmares.',
			},
		],
	},
}

export const fatalMirageScenario: Scenario = {
	index: 5,
	name: 'Fatal Mirage',
	shortName: '???',
	diagram: 'EOTE_4',
	setups: [
		{
			shuffles: [
				{ encounterSet: fatalMirage, overwriteCount: 9 },
				chillingCold,
				agentsOfTheUnknown,
				leftBehind,
				miasma,
				namelessHorrors,
				silenceAndMystery,
			],
		},
	],
}

export const toTheForbiddenPeaksScenario: Scenario = {
	index: 6,
	name: 'To the Forbidden Peaks',
	shortName: 'II',
	diagram: 'EOTE_5',
	setups: [
		{
			shuffles: [
				{ encounterSet: toTheForbiddenPeaks, overwriteCount: 14 },
				deadlyWeather,
				elderThings,
				hazardsOfAntarctica,
				namelessHorrors,
			],
			gameComponents: [GameComponent.TokenElderThing],
		},
	],
}

export const cityOfTheElderThings1Scenario: Scenario = {
	index: 7,
	name: 'City of the Elder Things (v. I)',
	shortName: 'III (v. I)',
	diagram: 'EOTE_6',
	setups: [
		{
			shuffles: [
				{ encounterSet: cityOfTheElderThings, overwriteCount: 9 },
				lockedDoors,
				elderThings,
				miasma,
				namelessHorrors,
				penguins,
				{ encounterSet: shoggoths, overwriteCount: 0 },
			],
		},
	],
	commonSetup: {
		gameComponents: [GameComponent.TokenElderThing],
		notes: [
			{
				encounterSet: cityOfTheElderThings,
				what: 'Set the Terror of the Stars enemy aside, out of play.',
			},
			{
				encounterSet: cityOfTheElderThings,
				what: 'Remove all 3 copies of the Benign Elder Thing enemy from the game.',
			},
			{
				encounterSet: shoggoths,
				what: 'Set aside the Shoggoths encounter set.',
			},
		],
	},
}

export const cityOfTheElderThings2Scenario: Scenario = {
	index: 8,
	name: 'City of the Elder Things (v. II)',
	shortName: 'III (v. II)',
	diagram: 'EOTE_6',
	setups: [
		{
			shuffles: [
				{ encounterSet: cityOfTheElderThings, overwriteCount: 9 },
				chillingCold,
				{ encounterSet: creaturesInTheIce, overwriteCount: 0 },
				elderThings,
				namelessHorrors,
				penguins,
				silenceAndMystery,
			],
		},
	],
	commonSetup: {
		gameComponents: [GameComponent.TokenElderThing],
		notes: [
			{
				encounterSet: cityOfTheElderThings,
				what: 'Remove the Terror of the Stars enemy from the game.',
			},
			{
				encounterSet: cityOfTheElderThings,
				what: 'Remove all 3 copies of the Benign Elder Thing enemy from the game.',
			},
			{
				encounterSet: creaturesInTheIce,
				what: 'Set aside the Creatures in the Ice encounter set.',
			},
		],
	},
}

export const cityOfTheElderThings3Scenario: Scenario = {
	index: 9,
	name: 'City of the Elder Things (v. III)',
	shortName: 'III (v. III)',
	diagram: 'EOTE_6',
	setups: [
		{
			shuffles: [
				{ encounterSet: cityOfTheElderThings, overwriteCount: 9 },
				chillingCold,
				lockedDoors,
				creaturesInTheIce,
				penguins,
				miasma,
				{ encounterSet: shoggoths, overwriteCount: 0 },
			],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: cityOfTheElderThings,
				what: 'Remove the Terror of the Stars enemy from the game.',
			},
			{
				encounterSet: cityOfTheElderThings,
				what: 'Remove all 3 copies of the Reawakened Elder Thing enemy from the game.',
			},
			{
				encounterSet: shoggoths,
				what: 'Set aside the Shoggoths encounter set.',
			},
		],
	},
}

export const theHeartOfMadness1Scenario: Scenario = {
	index: 10,
	name: 'The Heart of Madness, Part I',
	shortName: 'IV (Pt. I)',
	diagram: 'EOTE_7',
	setups: [
		{
			shuffles: [
				{ encounterSet: theHeartOfMadness, overwriteCount: 6 },
				{ encounterSet: theGreatSeal, overwriteCount: 4 },
				ancientEvils,
				lockedDoors,
				miasma,
				namelessHorrors,
				penguins,
				shoggoths,
			],
		},
	],
}

export const theHeartOfMadness2Scenario: Scenario = {
	index: 11,
	name: 'The Heart of Madness, Part II',
	shortName: 'IV (Pt. II)',
	diagram: 'EOTE_7',
	setups: [
		{
			shuffles: [
				{ encounterSet: theHeartOfMadness, overwriteCount: 6 },
				{ encounterSet: stirringInTheDeep, overwriteCount: 2 },
				agentsOfTheUnknown,
				chillingCold,
				{ encounterSet: strikingFear, overwriteCount: 4 },
				ancientEvils,
				miasma,
				namelessHorrors,
				penguins,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: strikingFear,
				what: 'When gathering the Striking Fear encounter set, only gather 2x Dissonant Voices and 2x Frozen in Fear (do not gather 3x Rotting Remains).',
			},
		],
	},
}
