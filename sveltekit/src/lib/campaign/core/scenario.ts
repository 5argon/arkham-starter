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
} from './encounter'

export const theGatheringScenario: Scenario = {
	index: 1,
	name: 'The Gathering',
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
