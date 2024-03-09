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
	cultOfPnakotus,
	deadlyTraps,
	doomedExpedition,
	expedition,
	forgottenRuins,
	guardiansOfTime,
	heartOfTheElders,
	knyan,
	pillarsOfJudgement,
	pnakoticBrotherhood,
	poison,
	rainforest,
	returnToHeartOfTheElders,
	returnToKnyan,
	returnToPillarsOfJudgement,
	returnToRainforest,
	returnToShatteredAeons,
	returnToTheBoundaryBeyond,
	returnToTheCityOfArchives,
	returnToTheDepthsOfYoth,
	returnToTheDoomOfEztli,
	returnToTheUntamedWilds,
	returnToThreadsOfFate,
	returnToTurnBackTime,
	serpents,
	shatteredAeons,
	temporalFlux,
	temporalHunters,
	theBoundaryBeyond,
	theCityOfArchives,
	theDepthsOfYoth,
	theDoomOfEztli,
	theUntamedWilds,
	threadsOfFate,
	turnBackTime,
	venomousHate,
	yigsVenom,
} from './encounter'

export const theUntamedWildsScenario: Scenario = {
	index: 1,
	diagram: 'TFA_1',
	name: 'The Untamed Wilds',
	shortName: 'I',
	setups: [
		{
			shuffles: [
				{ encounterSet: theUntamedWilds, overwriteCount: 0 },
				ancientEvils,
				{ encounterSet: rainforest, overwriteCount: 3 },
				{ encounterSet: serpents, overwriteCount: 6 },
				{ encounterSet: expedition, overwriteCount: 3 },
				{ encounterSet: guardiansOfTime, overwriteCount: 3 },
				{ encounterSet: agentsOfYig, overwriteCount: 0 },
				{ encounterSet: poison, overwriteCount: 2 },
			],
		},
	],
	commonSetup: {
		notes: [
			{
				topic: 'Exploration Deck',
				what: '10 cards. (5x Treacheries, 5x Locations)',
			},
			{
				encounterSet: rainforest,
				what: 'Overgrown Ruins and Temple of the Fang are set aside. 1x Overgrowth and 5 remaining locations are in the exploration deck.',
			},
			{ encounterSet: serpents, what: '1x Snake Bite is in the exploration deck.' },
			{
				encounterSet: expedition,
				what: '1x Lost in the Wilds and 1x Low on Supplies are in the exploration deck.',
			},
			{
				encounterSet: guardiansOfTime,
				what: '1x Arrows from the Trees is in the exploration deck.',
			},
			{
				encounterSet: agentsOfYig,
				what: 'This entire encounter set is set aside, out of play.',
			},
		],
	},
}

export const theDoomOfEztliScenario: Scenario = {
	index: 2,
	diagram: 'TFA_2',
	name: 'The Doom of Eztli',
	shortName: 'II',
	setups: [
		{
			shuffles: [
				{ encounterSet: theDoomOfEztli, overwriteCount: 0 },
				{ encounterSet: chillingCold, overwriteCount: 3 },
				agentsOfYig,
				{ encounterSet: deadlyTraps, overwriteCount: 3 },
				{ encounterSet: forgottenRuins, overwriteCount: 5 },
				{ encounterSet: poison, overwriteCount: 2 },
				temporalFlux,
				yigsVenom,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				topic: 'Exploration Deck',
				what: '10 cards. (5x Treacheries, 5x Locations)',
			},
			{
				encounterSet: deadlyTraps,
				what: '1x Final Mistake and 1x Entombed are in the exploration deck.',
			},
			{
				encounterSet: forgottenRuins,
				what: '1x Ill Omen and 1x Deep Dark are in the exploration deck.',
			},
			{
				encounterSet: chillingCold,
				what: '1x Crypt Chill is in the exploration deck.',
			},
		],
	},
}

export const threadsOfFateScenario: Scenario = {
	index: 3,
	diagram: 'TFA_3',
	name: 'Threads of Fate',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: threadsOfFate, overwriteCount: 7 },
				darkCult,
				lockedDoors,
				nightgaunts,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				pnakoticBrotherhood,
			],
		},
	],
}

export const theBoundaryBeyondScenario: Scenario = {
	index: 4,
	diagram: 'TFA_4',
	name: 'The Boundary Beyond',
	shortName: 'IV',
	setups: [
		{
			name: 'Cultist',
			shuffles: [
				{ encounterSet: theBoundaryBeyond, overwriteCount: 3 },
				{ encounterSet: poison, overwriteCount: 2 },
				{ encounterSet: temporalFlux, overwriteCount: 3 },
				pnakoticBrotherhood,
				darkCult,
			],
		},
		{
			name: 'Tablet',
			shuffles: [
				{ encounterSet: theBoundaryBeyond, overwriteCount: 3 },
				{ encounterSet: poison, overwriteCount: 2 },
				{ encounterSet: temporalFlux, overwriteCount: 3 },
				yigsVenom,
				guardiansOfTime,
			],
		},
		{
			name: 'Neutral',
			shuffles: [
				{ encounterSet: theBoundaryBeyond, overwriteCount: 3 },
				{ encounterSet: poison, overwriteCount: 2 },
				{ encounterSet: temporalFlux, overwriteCount: 3 },
				pnakoticBrotherhood,
				guardiansOfTime,
			],
		},
	],
	commonSetup: {
		specialGather: [{ encounterSet: theDoomOfEztli, what: ['Harbinger of Valusia'] }],
		notes: [
			{
				topic: 'Exploration Deck',
				what: '16 cards. (4x Treacheries, 12x Locations)',
			},
			{
				what: 'You might need a Madness or Injury random basic weakness.',
			},
			{
				encounterSet: theBoundaryBeyond,
				what: '1x Window to Another Time and 1x Timeline Destabilization are in the exploration deck.',
			},
			{
				encounterSet: temporalFlux,
				what: '1x A Tear in Time and 1x Lost in Time are in the exploration deck.',
			},
		],
	},
}

export const heartOfTheEldersPart1Scenario: Scenario = {
	index: 5,
	diagram: 'TFA_5',
	name: 'Heart of the Elders, Part I',
	shortName: 'V-A',
	setups: [
		{
			shuffles: [
				{ encounterSet: heartOfTheElders, overwriteCount: 5 },
				{ encounterSet: pillarsOfJudgement, overwriteCount: 6 },
				{ encounterSet: expedition, overwriteCount: 2 },
				{ encounterSet: rainforest, overwriteCount: 4 },
				{ encounterSet: poison, overwriteCount: 2 },
				serpents,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				topic: 'Exploration Deck',
				what: '10~11 cards. (4x Treacheries, 6~7x Locations : 6x Jungle + Possible 1x Ruins)',
			},
			{
				encounterSet: heartOfTheElders,
				what: '1x Pitfall is in the exploration deck.',
			},
			{
				encounterSet: expedition,
				what: '1x Lost in the Wild and 1x Low on Supplies are in the exploration deck.',
			},
			{
				encounterSet: pillarsOfJudgement,
				what: '1x Time-Wracked Woods (Jungle) and 1x Ants! are in the exploration deck. Stone Altar (Ruins) is randomized with 2 other Ruins in the Rainforest set.',
			},
			{
				encounterSet: rainforest,
				what: 'Overgrown Ruins (Ruins) and Temple of the Fang (Ruins) are randomized with Stone Altar (Ruins) in the Pillars of Judgment set. 5 remaining Jungle locations are all in the exploration deck.',
			},
		],
	},
}

export const heartOfTheEldersPart2Scenario: Scenario = {
	index: 6,
	diagram: 'TFA_6',
	name: 'Heart of the Elders, Part II',
	shortName: 'V-B',
	setups: [
		{
			shuffles: [
				{ encounterSet: heartOfTheElders, overwriteCount: 5 },
				{ encounterSet: knyan, overwriteCount: 2 },
				{ encounterSet: deadlyTraps, overwriteCount: 4 },
				{ encounterSet: forgottenRuins, overwriteCount: 6 },
				{ encounterSet: poison, overwriteCount: 2 },
				agentsOfYig,
				yigsVenom,
			],
		},
	],
	commonSetup: {
		specialGather: [{ encounterSet: theDoomOfEztli, what: ['Harbinger of Valusia'] }],
		notes: [
			{
				topic: 'Exploration Deck',
				what: '9 cards. (4x Treacheries, 5x Locations)',
			},
			{
				encounterSet: heartOfTheElders,
				what: '1x Pitfall is in the exploration deck.',
			},
			{
				encounterSet: knyan,
				what: '1x No Turning Back and 5 locations other than Descent to Yoth are in the exploration deck.',
			},
			{
				encounterSet: deadlyTraps,
				what: '1x Final Mistake is in the exploration deck.',
			},
			{
				encounterSet: forgottenRuins,
				what: '1x Deep Dark is in the exploration deck.',
			},
		],
	},
}

export const theCityOfArchivesScenario: Scenario = {
	index: 7,
	diagram: 'TFA_7',
	name: 'The City of Archives',
	shortName: 'VI',
	setups: [
		{
			shuffles: [
				{ encounterSet: theCityOfArchives, overwriteCount: 17 },
				{ encounterSet: agentsOfYogSothoth, overwriteCount: 3 },
				chillingCold,
				lockedDoors,
				strikingFear,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: agentsOfYogSothoth,
				what: '1x Yithian Observer is either spawned or in the victory display.',
			},
		],
	},
}

export const theDepthsOfYothScenario: Scenario = {
	index: 8,
	diagram: 'TFA_8',
	name: 'The Depths of Yoth',
	shortName: 'VII',
	setups: [
		{
			shuffles: [
				{ encounterSet: theDepthsOfYoth, overwriteCount: 15 },
				agentsOfYig,
				expedition,
				forgottenRuins,
				{ encounterSet: poison, overwriteCount: 2 },
				yigsVenom,
			],
		},
	],
	commonSetup: {
		specialGather: [{ encounterSet: theDoomOfEztli, what: ['Harbinger of Valusia'] }],
		notes: [
			{
				encounterSet: theDepthsOfYoth,
				what: 'If you have 0 tally mark, 2x Pit Warden are removed from the starting encounter deck.',
			},
		],
	},
}

export const shatteredAeonsScenario: Scenario = {
	index: 9,
	diagram: 'TFA_9',
	name: 'Shattered Aeons',
	shortName: 'VIII',
	setups: [
		{
			name: 'Cultist',
			shuffles: [
				{ encounterSet: shatteredAeons, overwriteCount: 10 },
				pnakoticBrotherhood,
				{ encounterSet: temporalFlux, overwriteCount: 4 },
				{ encounterSet: ancientEvils, overwriteCount: 2 },
				darkCult,
			],
		},
		{
			name: 'Tablet',
			shuffles: [
				{ encounterSet: shatteredAeons, overwriteCount: 10 },
				pnakoticBrotherhood,
				{ encounterSet: temporalFlux, overwriteCount: 4 },
				{ encounterSet: ancientEvils, overwriteCount: 2 },
				agentsOfYig,
			],
		},
		{
			name: 'Neutral',
			shuffles: [
				{ encounterSet: shatteredAeons, overwriteCount: 10 },
				pnakoticBrotherhood,
				{ encounterSet: temporalFlux, overwriteCount: 4 },
				{ encounterSet: ancientEvils, overwriteCount: 2 },
				darkCult,
				agentsOfYig,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				topic: 'Exploration Deck',
				what: '6 cards. (3x Treacheries, 3x Locations)',
			},
			{
				encounterSet: shatteredAeons,
				what: '3 Otherworld locations and 1x Between Worlds is in the exploration deck.',
			},
			{
				encounterSet: temporalFlux,
				what: '1x Wracked by Time is in the exploration deck.',
			},
			{
				encounterSet: ancientEvils,
				what: '1x Ancient Evils is in the exploration deck.',
			},
		],
	},
}

export const turnBackTimeScenario: Scenario = {
	index: 10,
	name: 'Turn Back Time',
	shortName: 'IX',
	setups: [
		{
			shuffles: [
				{ encounterSet: turnBackTime, overwriteCount: 0 },
				{ encounterSet: theDoomOfEztli, overwriteCount: 0 },
				chillingCold,
				agentsOfYig,
				deadlyTraps,
				forgottenRuins,
				{ encounterSet: poison, overwriteCount: 2 },
				temporalFlux,
				yigsVenom,
			],
		},
	],
}

export const returnToTheUntamedWildsScenario: Scenario = {
	index: 1,
	name: 'The Untamed Wilds',
	shortName: 'I',
	setups: [
		{
			shuffles: [
				{ encounterSet: theUntamedWilds, overwriteCount: 0 },
				{ encounterSet: returnToTheUntamedWilds, overwriteCount: 0 },
				ancientEvils,
				agentsOfYig,
				guardiansOfTime,
				{ encounterSet: poison, overwriteCount: 2 },
				rainforest,
				serpents,
				doomedExpedition,
				returnToRainforest,
			],
		},
	],
}

export const returnToTheDoomOfEztliScenario: Scenario = {
	index: 2,
	name: 'The Doom of Eztli',
	shortName: 'II',
	setups: [
		{
			shuffles: [
				{ encounterSet: theDoomOfEztli, overwriteCount: 0 },
				{ encounterSet: returnToTheDoomOfEztli, overwriteCount: 0 },
				{ encounterSet: chillingCold, overwriteCount: 3 },
				agentsOfYig,
				{ encounterSet: deadlyTraps, overwriteCount: 3 },
				{ encounterSet: forgottenRuins, overwriteCount: 5 },
				{ encounterSet: poison, overwriteCount: 2 },
				serpents,
				temporalHunters,
				venomousHate,
			],
		},
	],
}

export const returnToThreadsOfFateScenario: Scenario = {
	index: 3,
	name: 'Threads of Fate',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: threadsOfFate, overwriteCount: 0 },
				{ encounterSet: returnToThreadsOfFate, overwriteCount: 0 },
				lockedDoors,
				nightgaunts,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				pnakoticBrotherhood,
				cultOfPnakotus,
			],
		},
	],
}

export const returnToTheBoundaryBeyondScenario: Scenario = {
	index: 4,
	name: 'The Boundary Beyond',
	shortName: 'IV',
	setups: [
		{
			shuffles: [
				{ encounterSet: theBoundaryBeyond, overwriteCount: 0 },
				{ encounterSet: returnToTheBoundaryBeyond, overwriteCount: 0 },
				guardiansOfTime,
				pnakoticBrotherhood,
				{ encounterSet: poison, overwriteCount: 2 },
				cultOfPnakotus,
				temporalHunters,
				venomousHate,
			],
		},
	],
}

export const returnToHeartOfTheEldersPart1Scenario: Scenario = {
	index: 5,
	name: 'Heart of the Elders, Part I',
	shortName: 'V-A',
	setups: [
		{
			shuffles: [
				{ encounterSet: heartOfTheElders, overwriteCount: 0 },
				{ encounterSet: pillarsOfJudgement, overwriteCount: 0 },
				{ encounterSet: returnToHeartOfTheElders, overwriteCount: 0 },
				{ encounterSet: returnToPillarsOfJudgement, overwriteCount: 0 },
				{ encounterSet: poison, overwriteCount: 2 },
				rainforest,
				doomedExpedition,
				returnToRainforest,
			],
		},
	],
}

export const returnToHeartOfTheEldersPart2Scenario: Scenario = {
	index: 6,
	name: 'Heart of the Elders, Part II',
	shortName: 'V-B',
	setups: [
		{
			shuffles: [
				{ encounterSet: heartOfTheElders, overwriteCount: 0 },
				{ encounterSet: knyan, overwriteCount: 0 },
				{ encounterSet: returnToHeartOfTheElders, overwriteCount: 0 },
				{ encounterSet: returnToKnyan, overwriteCount: 0 },
				agentsOfYig,
				deadlyTraps,
				forgottenRuins,
				{ encounterSet: poison, overwriteCount: 2 },
				venomousHate,
			],
		},
	],
}

export const returnToTheCityOfArchivesScenario: Scenario = {
	index: 7,
	name: 'The City of Archives',
	shortName: 'VI',
	setups: [
		{
			shuffles: [
				{ encounterSet: theCityOfArchives, overwriteCount: 0 },
				{ encounterSet: returnToTheCityOfArchives, overwriteCount: 0 },
				agentsOfYogSothoth,
				chillingCold,
				lockedDoors,
				strikingFear,
			],
		},
	],
}

export const returnToTheDepthsOfYothScenario: Scenario = {
	index: 8,
	name: 'The Depths of Yoth',
	shortName: 'VII',
	setups: [
		{
			shuffles: [
				{ encounterSet: theDepthsOfYoth, overwriteCount: 0 },
				{ encounterSet: returnToTheDepthsOfYoth, overwriteCount: 0 },
				agentsOfYig,
				forgottenRuins,
				{ encounterSet: poison, overwriteCount: 2 },
				doomedExpedition,
				venomousHate,
			],
		},
	],
}

export const returnToShatteredAeonsScenario: Scenario = {
	index: 9,
	name: 'Shattered Aeons',
	shortName: 'VIII',
	setups: [
		{
			shuffles: [
				{ encounterSet: shatteredAeons, overwriteCount: 0 },
				{ encounterSet: returnToShatteredAeons, overwriteCount: 0 },
				ancientEvils,
				agentsOfYig,
				pnakoticBrotherhood,
				cultOfPnakotus,
				temporalHunters,
			],
		},
	],
}

export const returnToTurnBackTimeScenario: Scenario = {
	index: 10,
	name: 'Turn Back Time',
	shortName: 'IX',
	setups: [
		{
			shuffles: [
				{ encounterSet: turnBackTime, overwriteCount: 0 },
				{ encounterSet: returnToTurnBackTime, overwriteCount: 0 },
				{ encounterSet: theDoomOfEztli, overwriteCount: 0 },
				chillingCold,
				agentsOfYig,
				deadlyTraps,
				forgottenRuins,
				{ encounterSet: poison, overwriteCount: 2 },
				serpents,
				temporalHunters,
				venomousHate,
			],
		},
	],
}
