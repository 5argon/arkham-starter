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
	setups: [
		{
			shuffles: [
				{ encounterSet: theHouseAlwaysWins, overwriteCount: 4 },
				rats,
				badLuck,
				naomisCrew,
			],
			gameComponents: [GameComponent.TokenElderThing],
			remaining: [strikingFear, hideousAbominations],
		},
	],
}

export const theMiskatonicMuseumScenario: Scenario = {
	index: 5,
	name: 'The Miskatonic Museum',
	shortName: 'II',
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
			gameComponents: [GameComponent.TokenTablet],
		},
	],
}

export const theEssexCountyExpressScenario: Scenario = {
	index: 6,
	name: 'The Essex County Express',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: theEssexCountyExpress, overwriteCount: 13 },
				ancientEvils,
				darkCult,
				strikingFear,
				theBeyond,
			],
			gameComponentsPerDifficulty: {
				easy: [GameComponent.TokenM2],
				standard: [GameComponent.TokenM3],
				hard: [GameComponent.TokenM4],
				expert: [GameComponent.TokenM5],
			},
		},
	],
}

export const bloodOnTheAltarScenario: Scenario = {
	index: 7,
	name: 'Blood on the Altar',
	shortName: 'IV',
	setups: [
		{
			shuffles: [
				{ encounterSet: bloodOnTheAltar, overwriteCount: 13 },
				ancientEvils,
				nightgaunts,
				dunwich,
				whippoorwills,
			],
			customRemove: { count: 3, why: 'Three random encounter cards under locations.' },
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
		{
			shuffles: [
				{ encounterSet: bloodOnTheAltar, overwriteCount: 13 },
				ancientEvils,
				nightgaunts,
				dunwich,
				whippoorwills,
				naomisCrew,
			],
			customRemove: { count: 3, why: 'Three random encounter cards under locations.' },
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
	],
}

export const undimensionedAndUnseenScenario: Scenario = {
	index: 8,
	name: 'Undimensioned and Unseen',
	shortName: 'V',
	setups: [
		{
			shuffles: [
				{ encounterSet: undimensionedAndUnseen, overwriteCount: 11 },
				strikingFear,
				beastThralls,
				dunwich,
				whippoorwills,
			],
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
	],
}

export const whereDoomAwaitsScenario: Scenario = {
	index: 9,
	name: 'Where Doom Awaits',
	shortName: 'VI',
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
			gameComponentsPerDifficulty: {
				easy: [GameComponent.TokenM3],
				standard: [GameComponent.TokenM5],
				hard: [GameComponent.TokenM6],
				expert: [GameComponent.TokenM7],
			},
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
			gameComponentsPerDifficulty: {
				easy: [GameComponent.TokenM3],
				standard: [GameComponent.TokenM5],
				hard: [GameComponent.TokenM6],
				expert: [GameComponent.TokenM7],
			},
		},
	],
}

export const lostInTimeAndSpaceScenario: Scenario = {
	index: 10,
	name: 'Lost in Time and Space',
	shortName: 'VII',
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
		},
	],
}

export const returnToTheHouseAlwaysWinsScenario: Scenario = {
	index: 2,
	name: 'The House Always Wins',
	shortName: 'I-B',
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
}

export const returnToTheMiskatonicMuseumScenario: Scenario = {
	index: 5,
	name: 'The Miskatonic Museum',
	shortName: 'II',
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
			gameComponents: [GameComponent.TokenTablet],
		},
	],
}

export const returnToTheEssexCountyExpressScenario: Scenario = {
	index: 6,
	name: 'The Essex County Express',
	shortName: 'III',
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
}

export const returnToBloodOnTheAltarScenario: Scenario = {
	index: 7,
	name: 'Blood on the Altar',
	shortName: 'IV',
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
			customRemove: { count: 3, why: 'Three random encounter cards under locations.' },
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
			remaining: [naomisCrew],
			customRemove: {
				count: 3,
				why: "Three non-Naomi's Crew encounter cards under locations.",
			},
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
	],
}

export const returnToUndimensionedAndUnseenScenario: Scenario = {
	index: 8,
	name: 'Undimensioned and Unseen',
	shortName: 'V',
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
	],
}

export const returnToWhereDoomAwaitsScenario: Scenario = {
	index: 9,
	name: 'Where Doom Awaits',
	shortName: 'VI',
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
			gameComponentsPerDifficulty: {
				easy: [GameComponent.TokenM3],
				standard: [GameComponent.TokenM5],
				hard: [GameComponent.TokenM6],
				expert: [GameComponent.TokenM7],
			},
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
			gameComponentsPerDifficulty: {
				easy: [GameComponent.TokenM3],
				standard: [GameComponent.TokenM5],
				hard: [GameComponent.TokenM6],
				expert: [GameComponent.TokenM7],
			},
		},
	],
}

export const returnToLostInTimeAndSpaceScenario: Scenario = {
	index: 10,
	name: 'Lost in Time and Space',
	shortName: 'VII',
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
