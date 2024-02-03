import { GameComponent, type Scenario } from '$lib/core/campaign'
import {
	agentsOfYogSothoth,
	ancientEvils,
	chillingCold,
	darkCult,
	lockedDoors,
	nightgaunts,
	rats,
	strikingFear,
} from '../notz/encounter'
import {
	armitagesFate,
	badLuck,
	beastThralls,
	beyondTheThreshold,
	bishopsThralls,
	bloodOnTheAltar,
	creepingCold,
	dunwich,
	erraticFear,
	extracurricularActivity,
	hideousAbominations,
	lostInTimeAndSpace,
	naomisCrew,
	resurgentEvils,
	returnToBloodOnTheAltar,
	returnToExtracurricularActivity,
	returnToLostInTimeAndSpace,
	returnToTheEssexCountyExpress,
	returnToTheHouseAlwaysWins,
	returnToTheMiskatonicMuseum,
	returnToUndimensionedAndUnseen,
	returnToWhereDoomAwaits,
	secretDoors,
	sorcery,
	theBeyond,
	theEssexCountyExpress,
	theHouseAlwaysWins,
	theMiskatonicMuseum,
	undimensionedAndUnseen,
	whereDoomAwaits,
	whippoorwills,
	yogSothothsEmissaries,
} from './encounter'

export const extracurricularActivityScenario: Scenario = {
	index: 1,
	name: 'Extracurricular Activity',
	shortName: 'I-A',
	diagram: 'Dunwich_1',
	setups: [
		{
			shuffles: [
				agentsOfYogSothoth,
				ancientEvils,
				lockedDoors,
				bishopsThralls,
				sorcery,
				theBeyond,
				whippoorwills,
			],
			remaining: [extracurricularActivity],
		},
	],
}

export const theHouseAlwaysWinsScenario: Scenario = {
	index: 2,
	name: 'The House Always Wins',
	shortName: 'I-B',
	diagram: 'Dunwich_2',
	setups: [
		{
			shuffles: [
				{ encounterSet: theHouseAlwaysWins, overwriteCount: 4 },
				rats,
				badLuck,
				naomisCrew,
			],
			remaining: [strikingFear, hideousAbominations],
		},
	],
	commonSetup: {
		notes: [
			{ encounterSet: hideousAbominations, what: 'Set this encounter set aside, out of play.' },
			{ encounterSet: strikingFear, what: 'Set this encounter set aside, out of play.' },
		],
	},
}

export const theMiskatonicMuseumScenario: Scenario = {
	index: 5,
	name: 'The Miskatonic Museum',
	shortName: 'II',
	diagram: 'Dunwich_3',
	setups: [
		{
			shuffles: [
				{ encounterSet: theMiskatonicMuseum, overwriteCount: 10 },
				chillingCold,
				lockedDoors,
				badLuck,
				sorcery,
				theBeyond,
			],
		},
	],
}

export const theEssexCountyExpressScenario: Scenario = {
	index: 6,
	name: 'The Essex County Express',
	shortName: 'III',
	diagram: 'Dunwich_4',
	setups: [
		{
			shuffles: [
				{ encounterSet: theEssexCountyExpress, overwriteCount: 13 },
				ancientEvils,
				darkCult,
				strikingFear,
				theBeyond,
			],
		},
	],
	commonSetup: {
		gameComponentsPerDifficulty: {
			easy: [GameComponent.TokenM2],
			standard: [GameComponent.TokenM3],
			hard: [GameComponent.TokenM4],
			expert: [GameComponent.TokenM5],
		},
	},
}

export const bloodOnTheAltarScenario: Scenario = {
	index: 7,
	name: 'Blood on the Altar',
	shortName: 'IV',
	diagram: 'Dunwich_5',
	setups: [
		{
			shuffles: [
				{ encounterSet: bloodOnTheAltar, overwriteCount: 13 },
				ancientEvils,
				nightgaunts,
				dunwich,
				whippoorwills,
			],
		},
		{
			shuffles: [
				{ encounterSet: bloodOnTheAltar, overwriteCount: 13 },
				ancientEvils,
				nightgaunts,
				dunwich,
				whippoorwills,
				naomisCrew,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				what: 'Take out 3 encounter cards to attach under locations.',
			},
		],
		specialGather: [
			{ encounterSet: armitagesFate, overwriteCount: 1, what: ['Dr. Henry Armitage'] },
			{ encounterSet: theHouseAlwaysWins, overwriteCount: 1, what: ['Dr. Francis Morgan'] },
			{
				encounterSet: extracurricularActivity,
				overwriteCount: 1,
				what: ['Professor Warren Rice'],
			},
		],
	},
}

export const undimensionedAndUnseenScenario: Scenario = {
	index: 8,
	name: 'Undimensioned and Unseen',
	shortName: 'V',
	diagram: 'Dunwich_6',
	setups: [
		{
			shuffles: [
				{ encounterSet: undimensionedAndUnseen, overwriteCount: 11 },
				strikingFear,
				beastThralls,
				dunwich,
				whippoorwills,
			],
		},
	],
	commonSetup: {
		additionalWeakness: [
			{
				trait: 'Madness',
			},
			{
				trait: 'Injury',
			},
			{
				trait: 'Pact',
			},
		],
	},
}

export const whereDoomAwaitsScenario: Scenario = {
	index: 9,
	name: 'Where Doom Awaits',
	shortName: 'VI',
	diagram: 'Dunwich_7',
	setups: [
		{
			shuffles: [
				{ encounterSet: whereDoomAwaits, overwriteCount: 12 },
				ancientEvils,
				chillingCold,
				strikingFear,
				beastThralls,
				bishopsThralls,
				sorcery,
			],
		},
		{
			shuffles: [
				{ encounterSet: whereDoomAwaits, overwriteCount: 12 },
				ancientEvils,
				chillingCold,
				strikingFear,
				beastThralls,
				bishopsThralls,
				sorcery,
				{ encounterSet: hideousAbominations, overwriteCount: 2 },
			],
			notes: [
				{
					encounterSet: hideousAbominations,
					what: 'One Conglomeration of Spheres at Ascending Path, the rest of this set in the encounter deck.',
				},
			],
		},
	],
	commonSetup: {
		gameComponentsPerDifficulty: {
			easy: [GameComponent.TokenM3],
			standard: [GameComponent.TokenM5],
			hard: [GameComponent.TokenM6],
			expert: [GameComponent.TokenM7],
		},
	},
}

export const lostInTimeAndSpaceScenario: Scenario = {
	index: 10,
	name: 'Lost in Time and Space',
	shortName: 'VII',
	diagram: 'Dunwich_8',
	setups: [
		{
			shuffles: [
				{ encounterSet: lostInTimeAndSpace, overwriteCount: 23 },
				agentsOfYogSothoth,
				hideousAbominations,
				sorcery,
				theBeyond,
			],
		},
	],
}

export const returnToExtracurricularActivityScenario: Scenario = {
	index: 1,
	name: 'Extracurricular Activity',
	shortName: 'I-A',
	diagram: 'RT_Dunwich_1',
	setups: [
		{
			name: 'As 1st Scenario',
			shuffles: [
				{ encounterSet: extracurricularActivity, overwriteCount: 0 },
				{ encounterSet: returnToExtracurricularActivity, overwriteCount: 2 },
				bishopsThralls,
				sorcery,
				whippoorwills,
				beyondTheThreshold,
				resurgentEvils,
				secretDoors,
				yogSothothsEmissaries,
			],
			notes: [
				{
					encounterSet: returnToExtracurricularActivity,
					what: 'Both copies of Enthralled Security Guard in the encounter deck.',
				},
			],
		},
		{
			name: 'As 2nd Scenario',
			shuffles: [
				{ encounterSet: extracurricularActivity, overwriteCount: 0 },
				{ encounterSet: returnToExtracurricularActivity, overwriteCount: 1 },
				bishopsThralls,
				sorcery,
				whippoorwills,
				beyondTheThreshold,
				resurgentEvils,
				secretDoors,
				yogSothothsEmissaries,
			],
			notes: [
				{
					encounterSet: returnToExtracurricularActivity,
					what: 'One Enthralled Security Guard is at the Administration Building, one in the encounter deck.',
				},
			],
		},
	],
}

export const returnToTheHouseAlwaysWinsScenario: Scenario = {
	index: 2,
	name: 'The House Always Wins',
	shortName: 'I-B',
	diagram: 'RT_Dunwich_2',
	setups: [
		{
			shuffles: [
				{ encounterSet: theHouseAlwaysWins, overwriteCount: 4 },
				{ encounterSet: returnToTheHouseAlwaysWins, overwriteCount: 4 },
				rats,
				badLuck,
				naomisCrew,
			],
			remaining: [hideousAbominations, erraticFear],
		},
	],
	commonSetup: {
		notes: [
			{ encounterSet: hideousAbominations, what: 'Set this encounter set aside, out of play.' },
			{ encounterSet: erraticFear, what: 'Set this encounter set aside, out of play.' },
		],
	},
}

export const returnToTheMiskatonicMuseumScenario: Scenario = {
	index: 5,
	name: 'The Miskatonic Museum',
	shortName: 'II',
	diagram: 'RT_Dunwich_3',
	setups: [
		{
			shuffles: [
				{ encounterSet: theMiskatonicMuseum, overwriteCount: 10 },
				{ encounterSet: returnToTheMiskatonicMuseum, overwriteCount: 4 },
				badLuck,
				sorcery,
				beyondTheThreshold,
				creepingCold,
				secretDoors,
			],
		},
	],
}

export const returnToTheEssexCountyExpressScenario: Scenario = {
	index: 6,
	name: 'The Essex County Express',
	shortName: 'III',
	diagram: 'RT_Dunwich_4',
	setups: [
		{
			shuffles: [
				{ encounterSet: theEssexCountyExpress, overwriteCount: 13 },
				{ encounterSet: returnToTheEssexCountyExpress, overwriteCount: 0 },
				darkCult,
				beyondTheThreshold,
				erraticFear,
				resurgentEvils,
			],
		},
	],
	commonSetup: {
		gameComponentsPerDifficulty: {
			easy: [GameComponent.TokenM2],
			standard: [GameComponent.TokenM3],
			hard: [GameComponent.TokenM4],
			expert: [GameComponent.TokenM5],
		},
	},
}

export const returnToBloodOnTheAltarScenario: Scenario = {
	index: 7,
	name: 'Blood on the Altar',
	shortName: 'IV',
	diagram: 'RT_Dunwich_5',
	setups: [
		{
			shuffles: [
				{ encounterSet: bloodOnTheAltar, overwriteCount: 13 },
				nightgaunts,
				dunwich,
				whippoorwills,
				resurgentEvils,
			],
			remaining: [returnToBloodOnTheAltar],
			notes: [
				{
					encounterSet: returnToBloodOnTheAltar,
					what: 'Both copies of Hired Gun are set aside.',
				},
			],
		},
		{
			shuffles: [
				{ encounterSet: bloodOnTheAltar, overwriteCount: 13 },
				{ encounterSet: returnToBloodOnTheAltar, overwriteCount: 1 },
				nightgaunts,
				dunwich,
				whippoorwills,
				resurgentEvils,
				naomisCrew,
			],
			notes: [
				{
					encounterSet: returnToBloodOnTheAltar,
					what: 'One Hired Gun at a location not connected to Village Commons, the other copy in the encounter deck.',
				},
			],
		},
	],
	commonSetup: {
		notes: [
			{
				what: "Take out 3 non-Naomi's Crew encounter cards to attach under locations.",
			},
		],
		specialGather: [
			{ encounterSet: armitagesFate, overwriteCount: 1, what: ['Dr. Henry Armitage'] },
			{ encounterSet: theHouseAlwaysWins, overwriteCount: 1, what: ['Dr. Francis Morgan'] },
			{
				encounterSet: extracurricularActivity,
				overwriteCount: 1,
				what: ['Professor Warren Rice'],
			},
		],
	},
}

export const returnToUndimensionedAndUnseenScenario: Scenario = {
	index: 8,
	name: 'Undimensioned and Unseen',
	shortName: 'V',
	diagram: 'RT_Dunwich_6',
	setups: [
		{
			shuffles: [
				{ encounterSet: undimensionedAndUnseen, overwriteCount: 11 },
				{ encounterSet: returnToUndimensionedAndUnseen, overwriteCount: 2 },
				beastThralls,
				dunwich,
				whippoorwills,
				erraticFear,
			],
		},
	],
	commonSetup: {
		additionalWeakness: [
			{
				trait: 'Madness',
			},
			{
				trait: 'Injury',
			},
			{
				trait: 'Pact',
			},
		],
	},
}

export const returnToWhereDoomAwaitsScenario: Scenario = {
	index: 9,
	name: 'Where Doom Awaits',
	shortName: 'VI',
	diagram: 'RT_Dunwich_7',
	setups: [
		{
			shuffles: [
				{ encounterSet: whereDoomAwaits, overwriteCount: 12 },
				{ encounterSet: returnToWhereDoomAwaits, overwriteCount: 0 },
				beastThralls,
				bishopsThralls,
				sorcery,
				creepingCold,
				erraticFear,
				resurgentEvils,
			],
		},
		{
			shuffles: [
				{ encounterSet: whereDoomAwaits, overwriteCount: 12 },
				{ encounterSet: returnToWhereDoomAwaits, overwriteCount: 0 },
				beastThralls,
				bishopsThralls,
				sorcery,
				creepingCold,
				erraticFear,
				resurgentEvils,
				{ encounterSet: hideousAbominations, overwriteCount: 2 },
			],
			notes: [
				{
					encounterSet: hideousAbominations,
					what: 'One Conglomeration of Spheres at Ascending Path, the rest of this set in the encounter deck.',
				},
			],
		},
	],
	commonSetup: {
		gameComponentsPerDifficulty: {
			easy: [GameComponent.TokenM3],
			standard: [GameComponent.TokenM5],
			hard: [GameComponent.TokenM6],
			expert: [GameComponent.TokenM7],
		},
	},
}

export const returnToLostInTimeAndSpaceScenario: Scenario = {
	index: 10,
	name: 'Lost in Time and Space',
	shortName: 'VII',
	diagram: 'RT_Dunwich_8',
	setups: [
		{
			shuffles: [
				{ encounterSet: lostInTimeAndSpace, overwriteCount: 23 },
				{ encounterSet: returnToLostInTimeAndSpace, overwriteCount: 3 },
				hideousAbominations,
				sorcery,
				beyondTheThreshold,
				yogSothothsEmissaries,
			],
		},
	],
}
