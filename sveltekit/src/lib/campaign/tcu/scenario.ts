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
} from './encounter'

export const theUntamedWildsScenario: Scenario = {
	index: 1,
	name: 'The Untamed Wilds',
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
