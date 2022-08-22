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
	shuffles: [
		{ encounterSet: extracurricularActivity, overwriteCount: 0 },
		agentsOfYogSothoth,
		ancientEvils,
		lockedDoors,
		bishopsThralls,
		sorcery,
		theBeyond,
		whippoorwills,
	],
}

export const theHouseAlwaysWinsScenario: Scenario = {
	index: 2,
	name: 'The House Always Wins',
	shortName: 'I-B',
	shuffles: [{ encounterSet: theHouseAlwaysWins, overwriteCount: 4 }, rats, badLuck, naomisCrew],
	gameComponents: [GameComponent.TokenElderThing],
	setAsides: [strikingFear, hideousAbominations],
}

export const theMiskatonicMuseumScenario: Scenario = {
	index: 5,
	name: 'The Miskatonic Museum',
	shortName: 'II',
	gameComponents: [GameComponent.TokenTablet],
	shuffles: [
		{ encounterSet: theMiskatonicMuseum, overwriteCount: 10 },
		chillingCold,
		lockedDoors,
		badLuck,
		sorcery,
		theBeyond,
	],
}

export const theEssexCountyExpressScenario: Scenario = {
	index: 6,
	name: 'The Essex County Express',
	shortName: 'III',
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
}

export const bloodOnTheAltarScenario: Scenario = {
	index: 7,
	name: 'Blood on the Altar',
	shortName: 'IV',
	shuffles: [
		{ encounterSet: bloodOnTheAltar, overwriteCount: 13 },
		ancientEvils,
		nightgaunts,
		dunwich,
		whippoorwills,
	],
	setAsides: [naomisCrew],
}

export const undimensionedAndUnseenScenario: Scenario = {
	index: 8,
	name: 'Undimensioned and Unseen',
	shortName: 'V',
	shuffles: [
		{ encounterSet: undimensionedAndUnseen, overwriteCount: 11 },
		strikingFear,
		beastThralls,
		dunwich,
		whippoorwills,
	],
}

export const whereDoomAwaitsScenario: Scenario = {
	index: 9,
	name: 'Where Doom Awaits',
	shortName: 'VI',
	shuffles: [
		{ encounterSet: whereDoomAwaits, overwriteCount: 12 },
		ancientEvils,
		chillingCold,
		strikingFear,
		beastThralls,
		bishopsThralls,
		sorcery,
	],
	setAsides: [hideousAbominations],
}

export const lostInTimeAndSpaceScenario: Scenario = {
	index: 10,
	name: 'Lost in Time and Space',
	shortName: 'VII',
	shuffles: [
		{ encounterSet: lostInTimeAndSpace, overwriteCount: 23 },
		agentsOfYogSothoth,
		hideousAbominations,
		sorcery,
		theBeyond,
	],
}

export const returnToExtracurricularActivityScenario: Scenario = {
	index: 1,
	name: 'Extracurricular Activity',
	shortName: 'I-A',
	shuffles: [
		{ encounterSet: returnToExtracurricularActivity, overwriteCount: 0 },
		{ encounterSet: extracurricularActivity, overwriteCount: 0 },
		bishopsThralls,
		sorcery,
		whippoorwills,
		beyondTheThreshold,
		resurgentEvils,
		secretDoors,
		yogSothothsEmissaries,
	],
}

export const returnToTheHouseAlwaysWinsScenario: Scenario = {
	index: 2,
	name: 'The House Always Wins',
	shortName: 'I-B',
	shuffles: [
		{ encounterSet: returnToTheHouseAlwaysWins, overwriteCount: 0 },
		{ encounterSet: theHouseAlwaysWins, overwriteCount: 0 },
		rats,
		badLuck,
		naomisCrew,
	],
	setAsides: [hideousAbominations, erraticFear],
}

export const returnToTheMiskatonicMuseumScenario: Scenario = {
	index: 5,
	name: 'The Miskatonic Museum',
	shortName: 'II',
	gameComponents: [GameComponent.TokenTablet],
	shuffles: [
		{ encounterSet: returnToTheMiskatonicMuseum, overwriteCount: 0 },
		{ encounterSet: theMiskatonicMuseum, overwriteCount: 0 },
		badLuck,
		sorcery,
		beyondTheThreshold,
		creepingCold,
		secretDoors,
	],
}

export const returnToTheEssexCountyExpressScenario: Scenario = {
	index: 6,
	name: 'The Essex County Express',
	shortName: 'III',
	shuffles: [
		{ encounterSet: returnToTheEssexCountyExpress, overwriteCount: 0 },
		{ encounterSet: theEssexCountyExpress, overwriteCount: 0 },
		darkCult,
		beyondTheThreshold,
		erraticFear,
		resurgentEvils,
	],
}

export const returnToBloodOnTheAltarScenario: Scenario = {
	index: 7,
	name: 'Blood on the Altar',
	shortName: 'IV',
	shuffles: [
		{ encounterSet: returnToBloodOnTheAltar, overwriteCount: 0 },
		{ encounterSet: bloodOnTheAltar, overwriteCount: 0 },
		nightgaunts,
		dunwich,
		whippoorwills,
		resurgentEvils,
	],
	setAsides: [naomisCrew],
}

export const returnToUndimensionedAndUnseenScenario: Scenario = {
	index: 8,
	name: 'Undimensioned and Unseen',
	shortName: 'V',
	shuffles: [
		{ encounterSet: returnToUndimensionedAndUnseen, overwriteCount: 0 },
		{ encounterSet: undimensionedAndUnseen, overwriteCount: 0 },
		beastThralls,
		dunwich,
		whippoorwills,
		erraticFear,
	],
}

export const returnToWhereDoomAwaitsScenario: Scenario = {
	index: 9,
	name: 'Where Doom Awaits',
	shortName: 'VI',
	shuffles: [
		{ encounterSet: returnToWhereDoomAwaits, overwriteCount: 0 },
		{ encounterSet: whereDoomAwaits, overwriteCount: 0 },
		beastThralls,
		bishopsThralls,
		sorcery,
		creepingCold,
		erraticFear,
		resurgentEvils,
	],
	setAsides: [hideousAbominations],
}

export const returnToLostInTimeAndSpaceScenario: Scenario = {
	index: 10,
	name: 'Lost in Time and Space',
	shortName: 'VII',
	shuffles: [
		{ encounterSet: returnToLostInTimeAndSpace, overwriteCount: 0 },
		{ encounterSet: lostInTimeAndSpace, overwriteCount: 0 },
		hideousAbominations,
		sorcery,
		beyondTheThreshold,
		yogSothothsEmissaries,
	],
}
