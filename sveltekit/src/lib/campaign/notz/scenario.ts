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
	setups: [
		{
			shuffles: [
				{ encounterSet: theGathering, overwriteCount: 2 },
				ancientEvils,
				chillingCold,
				ghouls,
				rats,
				strikingFear,
			],
		},
	],
}

export const theMidnightMasksScenario: Scenario = {
	index: 2,
	name: 'The Midnight Masks',
	shortName: 'II',
	setups: [
		{
			shuffles: [
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				chillingCold,
				darkCult,
				lockedDoors,
				nightgaunts,
			],
			remaining: [cultOfUmordhoth],
		},
	],
}

export const theDevourerBelowScenario: Scenario = {
	index: 3,
	name: 'The Devourer Below',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: theDevourerBelow, overwriteCount: 2 },
				ancientEvils,
				darkCult,
				ghouls,
				strikingFear,
				{ encounterSet: agentsOfCthulhu },
			],
			remaining: [cultOfUmordhoth],
		},
		{
			shuffles: [
				{ encounterSet: theDevourerBelow, overwriteCount: 2 },
				ancientEvils,
				darkCult,
				ghouls,
				strikingFear,
				{ encounterSet: agentsOfShubNiggurath },
			],
			remaining: [cultOfUmordhoth],
		},
		{
			shuffles: [
				{ encounterSet: theDevourerBelow, overwriteCount: 2 },
				ancientEvils,
				darkCult,
				ghouls,
				strikingFear,
				{ encounterSet: agentsOfHastur },
			],
			remaining: [cultOfUmordhoth],
		},
		{
			shuffles: [
				{ encounterSet: theDevourerBelow, overwriteCount: 2 },
				ancientEvils,
				darkCult,
				ghouls,
				strikingFear,
				{ encounterSet: agentsOfYogSothoth },
			],
			remaining: [cultOfUmordhoth],
		},
	],
}

export const returnToTheGatheringScenario: Scenario = {
	index: 1,
	name: 'The Gathering',
	shortName: 'I',
	setups: [
		{
			shuffles: [
				{ encounterSet: theGathering, overwriteCount: 0 },
				{ encounterSet: returnToTheGathering, overwriteCount: 0 },
				ancientEvils,
				chillingCold,
				ghoulsOfUmordhoth,
				rats,
				strikingFear,
			],
		},
	],
}

export const returnToTheMidnightMasksScenario: Scenario = {
	index: 2,
	name: 'The Midnight Masks',
	shortName: 'II',
	setups: [
		{
			shuffles: [
				{ encounterSet: theMidnightMasks, overwriteCount: 0 },
				{ encounterSet: returnToTheMidnightMasks, overwriteCount: 0 },
				chillingCold,
				lockedDoors,
				nightgaunts,
				theDevourersCult,
			],
			remaining: [cultOfUmordhoth, returnToCultOfUmordhoth],
		},
	],
}

export const returnToTheDevourerBelowScenario: Scenario = {
	index: 3,
	name: 'The Devourer Below',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: theDevourerBelow, overwriteCount: 0 },
				{ encounterSet: returnToTheDevourerBelow, overwriteCount: 0 },
				ancientEvils,
				ghoulsOfUmordhoth,
				theDevourersCult,
				strikingFear,
				returnToCultOfUmordhoth,
			],
			remaining: [
				agentsOfCthulhu,
				agentsOfHastur,
				agentsOfShubNiggurath,
				agentsOfYogSothoth,
				cultOfUmordhoth,
			],
		},
	],
}
