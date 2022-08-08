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
} from '../core/encounter'
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
		theUntamedWilds,
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
		theDoomOfEztli,
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
		threadsOfFate,
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
		theBoundaryBeyond,
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
	name: 'Heart of the Elders (Part I)',
	shuffles: [
		heartOfTheElders,
		pillarsOfJudgement,
		expedition,
		poison,
		rainforest,
		serpents,
	],
}

export const heartOfTheEldersPart2Scenario: Scenario = {
	index: 6,
	name: 'Heart of the Elders (Part II)',
	shuffles: [
		heartOfTheElders,
		knyan,
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
	shuffles: [theCityOfArchives, agentsOfYogSothoth, chillingCold, lockedDoors, strikingFear],
}

export const theDepthsOfYothScenario: Scenario = {
	index: 8,
	name: 'The Depths of Yoth',
	shuffles: [theDepthsOfYoth, agentsOfYig, expedition, forgottenRuins, poison, yigsVenom],
}

export const shatteredAeonsScenario: Scenario = {
	index: 9,
	name: 'Shattered Aeons',
	shuffles: [
		shatteredAeons,
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
		turnBackTime,
		theDoomOfEztli,
		chillingCold,
		agentsOfYig,
		deadlyTraps,
		forgottenRuins,
		poison,
		temporalFlux,
		yigsVenom,
	],
}
