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
} from '../core/encounter'
import {
	badLuck,
	beastThralls,
	bishopsThralls,
	bloodOnTheAltar,
	dunwich,
	extracurricularActivity,
	hideousAbominations,
	lostInTimeAndSpace,
	naomisCrew,
	sorcery,
	theBeyond,
	theEssexCountyExpress,
	theHouseAlwaysWins,
	theMiskatonicMuseum,
	undimensionedAndUnseen,
	whereDoomAwaits,
	whippoorwills,
} from './encounter'

export const extracurricularActivityScenario: Scenario = {
	index: 1,
	name: 'Extracurricular Activity',
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
	shuffles: [
		{ encounterSet: theHouseAlwaysWins, overwriteCount: 4 },
		rats,
		badLuck,
		naomisCrew,
	],
	gameComponents: [GameComponent.TokenElderThing],
	setAsides: [strikingFear, hideousAbominations],
}

export const theMiskatonicMuseumScenario: Scenario = {
	index: 5,
	name: 'The Miskatonic Museum',
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
	shuffles: [
		{ encounterSet: lostInTimeAndSpace, overwriteCount: 23 },
		agentsOfYogSothoth,
		hideousAbominations,
		sorcery,
		theBeyond,
	],
}
