import type { Scenario } from '$lib/core/campaign'
import {
	agentsOfYogSothoth,
	ancientEvils,
	chillingCold,
	darkCult,
	lockedDoors,
	nightgaunts,
	strikingFear,
	theMidnightMasks,
} from '../notz/encounter'
import {
	agentsOfYig,
	deadlyTraps,
	expedition,
	forgottenRuins,
	guardiansOfTime,
	heartOfTheElders,
	pillarsOfJudgement,
	knyan,
	pnakoticBrotherhood,
	poison,
	rainforest,
	serpents,
	shatteredAeons,
	temporalFlux,
	theBoundaryBeyond,
	theCityOfArchives,
	theDepthsOfYoth,
	theDoomOfEztli,
	theUntamedWilds,
	threadsOfFate,
	turnBackTime,
	yigsVenom,
	returnToTheUntamedWilds,
	returnToTheDoomOfEztli,
	returnToThreadsOfFate,
	returnToTheBoundaryBeyond,
	returnToPillarsOfJudgement,
	returnToKnyan,
	returnToTheCityOfArchives,
	returnToTheDepthsOfYoth,
	returnToShatteredAeons,
	returnToTurnBackTime,
	doomedExpedition,
	cultOfPnakotus,
	returnToRainforest,
	venomousHate,
	temporalHunters,
	returnToHeartOfTheElders,
} from './encounter'

export const theUntamedWildsScenario: Scenario = {
	index: 1,
	name: 'The Untamed Wilds',
	shortName: 'I',
	shuffles: [
		{ encounterSet: theUntamedWilds, overwriteCount: 0 },
		ancientEvils,
		agentsOfYig,
		expedition,
		guardiansOfTime,
		poison,
		rainforest,
		serpents,
	],
}

export const theDoomOfEztliScenario: Scenario = {
	index: 2,
	name: 'The Doom of Eztli',
	shortName: 'II',
	shuffles: [
		{ encounterSet: theDoomOfEztli, overwriteCount: 0 },
		chillingCold,
		agentsOfYig,
		deadlyTraps,
		forgottenRuins,
		poison,
		temporalFlux,
		yigsVenom,
	],
}

export const threadsOfFateScenario: Scenario = {
	index: 3,
	name: 'Threads of Fate',
	shortName: 'III',
	shuffles: [
		{ encounterSet: threadsOfFate, overwriteCount: 0 },
		darkCult,
		lockedDoors,
		nightgaunts,
		{ encounterSet: theMidnightMasks, overwriteCount: 5 },
		pnakoticBrotherhood,
	],
}

export const theBoundaryBeyondScenario: Scenario = {
	index: 4,
	name: 'The Boundary Beyond',
	shortName: 'IV',
	shuffles: [
		{ encounterSet: theBoundaryBeyond, overwriteCount: 0 },
		darkCult,
		guardiansOfTime,
		pnakoticBrotherhood,
		poison,
		temporalFlux,
		yigsVenom,
	],
}

export const heartOfTheEldersPart1Scenario: Scenario = {
	index: 5,
	name: 'Heart of the Elders, Part I',
	shortName: 'V-A',
	shuffles: [
		{ encounterSet: heartOfTheElders, overwriteCount: 0 },
		{ encounterSet: pillarsOfJudgement, overwriteCount: 0 },
		expedition,
		poison,
		rainforest,
		serpents,
	],
}

export const heartOfTheEldersPart2Scenario: Scenario = {
	index: 6,
	name: 'Heart of the Elders, Part II',
	shortName: 'V-B',
	shuffles: [
		{ encounterSet: heartOfTheElders, overwriteCount: 0 },
		{ encounterSet: knyan, overwriteCount: 0 },
		agentsOfYig,
		deadlyTraps,
		forgottenRuins,
		poison,
		yigsVenom,
	],
}

export const theCityOfArchivesScenario: Scenario = {
	index: 7,
	name: 'The City of Archives',
	shortName: 'VI',
	shuffles: [
		{ encounterSet: theCityOfArchives, overwriteCount: 0 },
		agentsOfYogSothoth,
		chillingCold,
		lockedDoors,
		strikingFear,
	],
}

export const theDepthsOfYothScenario: Scenario = {
	index: 8,
	name: 'The Depths of Yoth',
	shortName: 'VII',
	shuffles: [
		{ encounterSet: theDepthsOfYoth, overwriteCount: 0 },
		agentsOfYig,
		expedition,
		forgottenRuins,
		poison,
		yigsVenom,
	],
}

export const shatteredAeonsScenario: Scenario = {
	index: 9,
	name: 'Shattered Aeons',
	shortName: 'VIII',
	shuffles: [
		{ encounterSet: shatteredAeons, overwriteCount: 0 },
		ancientEvils,
		darkCult,
		agentsOfYig,
		pnakoticBrotherhood,
		temporalFlux,
	],
}

export const turnBackTimeScenario: Scenario = {
	index: 10,
	name: 'Turn Back Time',
	shortName: 'IX',
	shuffles: [
		{ encounterSet: turnBackTime, overwriteCount: 0 },
		{ encounterSet: theDoomOfEztli, overwriteCount: 0 },
		chillingCold,
		agentsOfYig,
		deadlyTraps,
		forgottenRuins,
		poison,
		temporalFlux,
		yigsVenom,
	],
}

export const returnToTheUntamedWildsScenario: Scenario = {
	index: 1,
	name: 'The Untamed Wilds',
	shortName: 'I',
	shuffles: [
		{ encounterSet: theUntamedWilds, overwriteCount: 0 },
		{ encounterSet: returnToTheUntamedWilds, overwriteCount: 0 },
		ancientEvils,
		agentsOfYig,
		guardiansOfTime,
		poison,
		rainforest,
		serpents,
		doomedExpedition,
		returnToRainforest,
	],
}

export const returnToTheDoomOfEztliScenario: Scenario = {
	index: 2,
	name: 'The Doom of Eztli',
	shortName: 'II',
	shuffles: [
		{ encounterSet: theDoomOfEztli, overwriteCount: 0 },
		{ encounterSet: returnToTheDoomOfEztli, overwriteCount: 0 },
		chillingCold,
		agentsOfYig,
		deadlyTraps,
		forgottenRuins,
		poison,
		serpents,
		temporalHunters,
		venomousHate,
	],
}

export const returnToThreadsOfFateScenario: Scenario = {
	index: 3,
	name: 'Threads of Fate',
	shortName: 'III',
	shuffles: [
		{ encounterSet: threadsOfFate, overwriteCount: 0 },
		{ encounterSet: returnToThreadsOfFate, overwriteCount: 0 },
		lockedDoors,
		nightgaunts,
		{ encounterSet: theMidnightMasks, overwriteCount: 5 },
		pnakoticBrotherhood,
		cultOfPnakotus,
	],
}

export const returnToTheBoundaryBeyondScenario: Scenario = {
	index: 4,
	name: 'The Boundary Beyond',
	shortName: 'IV',
	shuffles: [
		{ encounterSet: theBoundaryBeyond, overwriteCount: 0 },
		{ encounterSet: returnToTheBoundaryBeyond, overwriteCount: 0 },
		guardiansOfTime,
		pnakoticBrotherhood,
		poison,
		cultOfPnakotus,
		temporalHunters,
		venomousHate,
	],
}

export const returnToHeartOfTheEldersPart1Scenario: Scenario = {
	index: 5,
	name: 'Heart of the Elders, Part I',
	shortName: 'V-A',
	shuffles: [
		{ encounterSet: heartOfTheElders, overwriteCount: 0 },
		{ encounterSet: pillarsOfJudgement, overwriteCount: 0 },
		{ encounterSet: returnToHeartOfTheElders, overwriteCount: 0 },
		{ encounterSet: returnToPillarsOfJudgement, overwriteCount: 0 },
		poison,
		rainforest,
		doomedExpedition,
		returnToRainforest,
	],
}

export const returnToHeartOfTheEldersPart2Scenario: Scenario = {
	index: 6,
	name: 'Heart of the Elders, Part II',
	shortName: 'V-B',
	shuffles: [
		{ encounterSet: heartOfTheElders, overwriteCount: 0 },
		{ encounterSet: knyan, overwriteCount: 0 },
		{ encounterSet: returnToHeartOfTheElders, overwriteCount: 0 },
		{ encounterSet: returnToKnyan, overwriteCount: 0 },
		agentsOfYig,
		deadlyTraps,
		forgottenRuins,
		poison,
		venomousHate,
	],
}

export const returnToTheCityOfArchivesScenario: Scenario = {
	index: 7,
	name: 'The City of Archives',
	shortName: 'VI',
	shuffles: [
		{ encounterSet: theCityOfArchives, overwriteCount: 0 },
		{ encounterSet: returnToTheCityOfArchives, overwriteCount: 0 },
		agentsOfYogSothoth,
		chillingCold,
		lockedDoors,
		strikingFear,
	],
}

export const returnToTheDepthsOfYothScenario: Scenario = {
	index: 8,
	name: 'The Depths of Yoth',
	shortName: 'VII',
	shuffles: [
		{ encounterSet: theDepthsOfYoth, overwriteCount: 0 },
		{ encounterSet: returnToTheDepthsOfYoth, overwriteCount: 0 },
		agentsOfYig,
		forgottenRuins,
		poison,
		doomedExpedition,
		venomousHate,
	],
}

export const returnToShatteredAeonsScenario: Scenario = {
	index: 9,
	name: 'Shattered Aeons',
	shortName: 'VIII',
	shuffles: [
		{ encounterSet: shatteredAeons, overwriteCount: 0 },
		{ encounterSet: returnToShatteredAeons, overwriteCount: 0 },
		ancientEvils,
		agentsOfYig,
		pnakoticBrotherhood,
		cultOfPnakotus,
		temporalHunters,
	],
}

export const returnToTurnBackTimeScenario: Scenario = {
	index: 10,
	name: 'Turn Back Time',
	shortName: 'IX',
	shuffles: [
		{ encounterSet: turnBackTime, overwriteCount: 0 },
		{ encounterSet: returnToTurnBackTime, overwriteCount: 0 },
		{ encounterSet: theDoomOfEztli, overwriteCount: 0 },
		chillingCold,
		agentsOfYig,
		deadlyTraps,
		forgottenRuins,
		poison,
		serpents,
		temporalHunters,
		venomousHate,
	],
}
