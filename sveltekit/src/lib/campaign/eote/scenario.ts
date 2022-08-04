import { GameComponent, type Scenario } from '$lib/core/campaign'
import { ancientEvils, chillingCold, lockedDoors, strikingFear } from '../core/encounter'
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
	encounterSets: [
		theCrash,
		ancientEvils,
		{ encounterSet: iceAndDeath, subtractCount: 3 },
		deadlyWeather,
		hazardsOfAntarctica,
		silenceAndMystery,
	],
	encounterSetsSecondary: [creaturesInTheIce, { encounterSet: iceAndDeath, overwriteCount: 3 }],
	gameComponents: [GameComponent.TokenFrost],
}

export const iceAndDeathPart2Scenario: Scenario = {
	index: 3,
	name: 'Ice and Death, Part II',
	encounterSets: [
		lostInTheNight,
		ancientEvils,
		iceAndDeath,
		leftBehind,
		deadlyWeather,
		hazardsOfAntarctica,
		silenceAndMystery,
	],
	gameComponents: [GameComponent.TokenFrost],
}

export const iceAndDeathPart3Scenario: Scenario = {
	index: 4,
	name: 'Ice and Death, Part III',
	encounterSets: [
		seepingNightmares,
		ancientEvils,
		{ encounterSet: iceAndDeath, subtractCount: 3 },
		{ encounterSet: creaturesInTheIce, subtractCount: 5 },
		deadlyWeather,
		hazardsOfAntarctica,
		silenceAndMystery,
	],
	encounterSetsSecondary: [
		{ encounterSet: iceAndDeath, overwriteCount: 3 },
		{ encounterSet: creaturesInTheIce, overwriteCount: 5 }
	],
	gameComponents: [GameComponent.TokenFrost],
}

export const fatalMirage1Scenario: Scenario = {
	index: 5,
	name: 'Fatal Mirage (I)',
	encounterSets: [
		fatalMirage,
		chillingCold,
		agentsOfTheUnknown,
		leftBehind,
		miasma,
		namelessHorrors,
		silenceAndMystery,
	],
	gameComponents: [GameComponent.TokenFrost],
}

export const toTheForbiddenPeaksScenario: Scenario = {
	index: 6,
	name: 'To the Forbidden Peaks',
	encounterSets: [
		toTheForbiddenPeaks,
		deadlyWeather,
		elderThings,
		hazardsOfAntarctica,
		namelessHorrors,
	],
	gameComponents: [GameComponent.TokenElderThing],
}

export const fatalMirage2Scenario: Scenario = {
	index: 7,
	name: 'Fatal Mirage (II)',
	encounterSets: [
		fatalMirage,
		chillingCold,
		agentsOfTheUnknown,
		leftBehind,
		miasma,
		namelessHorrors,
		silenceAndMystery,
	],
	gameComponents: [GameComponent.TokenFrost],
}

export const cityOfTheElderThings1Scenario: Scenario = {
	index: 8,
	name: 'City of the Elder Things (v.I)',
	encounterSets: [
		{ encounterSet: cityOfTheElderThings, subtractCount: 3 },
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
}

export const cityOfTheElderThings2Scenario: Scenario = {
	index: 9,
	name: 'City of the Elder Things (v.II)',
	encounterSets: [
		{ encounterSet: cityOfTheElderThings, subtractCount: 3 },
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
}

export const cityOfTheElderThings3Scenario: Scenario = {
	index: 10,
	name: 'City of the Elder Things (v.III)',
	encounterSets: [
		{ encounterSet: cityOfTheElderThings, subtractCount: 3 },
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
}

export const fatalMirage3Scenario: Scenario = {
	index: 11,
	name: 'Fatal Mirage (III)',
	encounterSets: [
		fatalMirage,
		chillingCold,
		agentsOfTheUnknown,
		leftBehind,
		miasma,
		namelessHorrors,
		silenceAndMystery,
	],
	gameComponents: [GameComponent.TokenFrost],
}


export const theHeartOfMadness1Scenario: Scenario = {
	index: 12,
	name: 'The Heart of Madness, Part I',
	encounterSets: [
		theGreatSeal,
		ancientEvils,
		lockedDoors,
		theHeartOfMadness,
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
}

export const theHeartOfMadness2Scenario: Scenario = {
	index: 13,
	name: 'The Heart of Madness, Part II',
	encounterSets: [
		stirringInTheDeep,
		agentsOfTheUnknown,
		chillingCold,
		{ encounterSet: strikingFear, subtractCount: 3 },
		ancientEvils,
		theHeartOfMadness,
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
}
