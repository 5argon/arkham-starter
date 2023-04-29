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
			gameComponents: [GameComponent.TokenFrost],
		},
	],
}

export const iceAndDeathPart2Scenario: Scenario = {
	index: 3,
	name: 'Ice and Death, Part II',
	shortName: 'I (Pt. II)',
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
			gameComponents: [GameComponent.TokenFrost],
		},
	],
}

export const iceAndDeathPart3Scenario: Scenario = {
	index: 4,
	name: 'Ice and Death, Part III',
	shortName: 'I (Pt. III)',
	setups: [
		{
			shuffles: [
				{ encounterSet: iceAndDeath, overwriteCount: 7 },
				{ encounterSet: seepingNightmares, overwriteCount: 2 },
				ancientEvils,
				{ encounterSet: creaturesInTheIce, overwriteCount: 2 },
				deadlyWeather,
				hazardsOfAntarctica,
				silenceAndMystery,
			],
			gameComponents: [GameComponent.TokenFrost],
		},
	],
}

export const fatalMirageScenario: Scenario = {
	index: 5,
	name: 'Fatal Mirage',
	shortName: '???',
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
			gameComponents: [GameComponent.TokenFrost],
		},
	],
}

export const toTheForbiddenPeaksScenario: Scenario = {
	index: 6,
	name: 'To the Forbidden Peaks',
	shortName: 'II',
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
	name: 'City of the Elder Things (v.I)',
	shortName: 'III (v.I)',
	setups: [
		{
			shuffles: [
				{ encounterSet: cityOfTheElderThings, overwriteCount: 6 },
				lockedDoors,
				elderThings,
				miasma,
				namelessHorrors,
				penguins,
				shoggoths,
			],
			gameComponents: [
				GameComponent.Token0,
				GameComponent.Token0,
				GameComponent.TokenM1,
				GameComponent.TokenM1,
				GameComponent.TokenM2,
				GameComponent.TokenM2,
				GameComponent.TokenSkull,
				GameComponent.TokenSkull,
				GameComponent.TokenCultist,
				GameComponent.TokenCultist,
				GameComponent.TokenTablet,
				GameComponent.TokenTablet,
				GameComponent.TokenElderThing,
				GameComponent.TokenElderThing,
				GameComponent.TokenElderThing,
			],
		},
	],
}

export const cityOfTheElderThings2Scenario: Scenario = {
	index: 8,
	name: 'City of the Elder Things (v.II)',
	shortName: 'III (v.II)',
	setups: [
		{
			shuffles: [
				{ encounterSet: cityOfTheElderThings, overwriteCount: 6 },
				chillingCold,
				creaturesInTheIce,
				elderThings,
				namelessHorrors,
				penguins,
				silenceAndMystery,
			],
			gameComponents: [
				GameComponent.Token0,
				GameComponent.Token0,
				GameComponent.TokenM1,
				GameComponent.TokenM1,
				GameComponent.TokenM2,
				GameComponent.TokenM2,
				GameComponent.TokenSkull,
				GameComponent.TokenSkull,
				GameComponent.TokenCultist,
				GameComponent.TokenCultist,
				GameComponent.TokenTablet,
				GameComponent.TokenTablet,
				GameComponent.TokenElderThing,
				GameComponent.TokenElderThing,
				GameComponent.TokenElderThing,
			],
		},
	],
}

export const cityOfTheElderThings3Scenario: Scenario = {
	index: 9,
	name: 'City of the Elder Things (v.III)',
	shortName: 'III (v.III)',
	setups: [
		{
			shuffles: [
				{ encounterSet: cityOfTheElderThings, overwriteCount: 6 },
				chillingCold,
				lockedDoors,
				creaturesInTheIce,
				penguins,
				miasma,
				shoggoths,
			],
			gameComponents: [
				GameComponent.Token0,
				GameComponent.Token0,
				GameComponent.TokenM1,
				GameComponent.TokenM1,
				GameComponent.TokenM2,
				GameComponent.TokenM2,
				GameComponent.TokenSkull,
				GameComponent.TokenSkull,
				GameComponent.TokenCultist,
				GameComponent.TokenCultist,
				GameComponent.TokenTablet,
				GameComponent.TokenTablet,
				GameComponent.TokenElderThing,
				GameComponent.TokenElderThing,
			],
		},
	],
}

export const theHeartOfMadness1Scenario: Scenario = {
	index: 10,
	name: 'The Heart of Madness, Part I',
	shortName: 'IV (Pt. I)',
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
			gameComponents: [
				GameComponent.Seal1,
				GameComponent.Seal2,
				GameComponent.Seal3,
				GameComponent.Seal4,
				GameComponent.Seal5,
			],
		},
	],
}

export const theHeartOfMadness2Scenario: Scenario = {
	index: 11,
	name: 'The Heart of Madness, Part II',
	shortName: 'IV (Pt. II)',
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
			gameComponents: [
				GameComponent.Seal1,
				GameComponent.Seal2,
				GameComponent.Seal3,
				GameComponent.Seal4,
				GameComponent.Seal5,
			],
		},
	],
}
