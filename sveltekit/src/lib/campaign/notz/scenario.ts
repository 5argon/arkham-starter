import type { Scenario } from '$lib/core/campaign'
import {
	theGathering,
	theMidnightMasks,
	theDevourerBelow,
	ancientEvils,
	chillingCold,
	ghouls,
	rats,
	strikingFear,
	cultOfUmordhoth,
	darkCult,
	lockedDoors,
	nightgaunts,
	agentsOfCthulhu,
	agentsOfHastur,
	agentsOfShubNiggurath,
	agentsOfYogSothoth,
	ghoulsOfUmordhoth,
	returnToTheGathering,
	returnToTheMidnightMasks,
	returnToTheDevourerBelow,
	returnToCultOfUmordhoth,
	theDevourersCult,
} from './encounter'

export const theGatheringScenario: Scenario = {
	index: 1,
	name: 'The Gathering',
	shortName: 'I',
	shuffles: [
		{ encounterSet: theGathering, overwriteCount: 2 },
		ancientEvils,
		chillingCold,
		ghouls,
		rats,
		strikingFear,
	],
}

export const theMidnightMasksScenario: Scenario = {
	index: 2,
	name: 'The Midnight Masks',
	shortName: 'II',
	shuffles: [
		{ encounterSet: theMidnightMasks, overwriteCount: 5 },
		chillingCold,
		darkCult,
		lockedDoors,
		nightgaunts,
	],
	setAsides: [cultOfUmordhoth],
}

export const theDevourerBelowScenario: Scenario = {
	index: 3,
	name: 'The Devourer Below',
	shortName: 'III',
	shuffles: [
		{ encounterSet: theDevourerBelow, overwriteCount: 2 },
		ancientEvils,
		darkCult,
		ghouls,
		strikingFear,
	],
	setAsides: [
		agentsOfCthulhu,
		agentsOfHastur,
		agentsOfShubNiggurath,
		agentsOfYogSothoth,
		cultOfUmordhoth,
	],
}

export const returnToTheGatheringScenario: Scenario = {
	index: 1,
	name: 'The Gathering',
	shortName: 'I',
	shuffles: [
		{ encounterSet: theGathering, overwriteCount: 0 },
		{ encounterSet: returnToTheGathering, overwriteCount: 0 },
		ancientEvils,
		chillingCold,
		ghoulsOfUmordhoth,
		rats,
		strikingFear,
	],
}

export const returnToTheMidnightMasksScenario: Scenario = {
	index: 2,
	name: 'The Midnight Masks',
	shortName: 'II',
	shuffles: [
		{ encounterSet: theMidnightMasks, overwriteCount: 0 },
		{ encounterSet: returnToTheMidnightMasks, overwriteCount: 0 },
		chillingCold,
		lockedDoors,
		nightgaunts,
		theDevourersCult,
	],
	setAsides: [cultOfUmordhoth, returnToCultOfUmordhoth],
}

export const returnToTheDevourerBelowScenario: Scenario = {
	index: 3,
	name: 'The Devourer Below',
	shortName: 'III',
	shuffles: [
		{ encounterSet: theDevourerBelow, overwriteCount: 0 },
		{ encounterSet: returnToTheDevourerBelow, overwriteCount: 0 },
		ancientEvils,
		ghoulsOfUmordhoth,
		theDevourersCult,
		strikingFear,
		returnToCultOfUmordhoth,
	],
	setAsides: [
		agentsOfCthulhu,
		agentsOfHastur,
		agentsOfShubNiggurath,
		agentsOfYogSothoth,
		cultOfUmordhoth,
	],
}
