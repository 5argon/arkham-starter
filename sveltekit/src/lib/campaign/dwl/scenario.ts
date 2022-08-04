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
	encounterSets: [
		extracurricularActivity,
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
	encounterSets: [theHouseAlwaysWins, rats, badLuck, naomisCrew],
	gameComponents: [GameComponent.TokenElderThing],
	encounterSetsSecondary: [strikingFear, hideousAbominations],
}

export const theMiskatonicMuseumScenario: Scenario = {
	index: 5,
	name: 'The Miskatonic Museum',
	gameComponents: [GameComponent.TokenTablet],
	encounterSets: [theMiskatonicMuseum, chillingCold, lockedDoors, badLuck, sorcery, theBeyond],
}

export const theEssexCountyExpressScenario: Scenario = {
	index: 6,
	name: 'The Essex County Express',
	encounterSets: [theEssexCountyExpress, ancientEvils, darkCult, strikingFear, theBeyond],
	gameComponentsPerDifficulty: {
		easy: [GameComponent.TokenM2],
		standard: [GameComponent.TokenM3],
		hard: [GameComponent.TokenM4],
		expert: [GameComponent.TokenM5],
	}
}

export const bloodOnTheAltarScenario: Scenario = {
	index: 7,
	name: 'Blood on the Altar',
	encounterSets: [bloodOnTheAltar, ancientEvils, nightgaunts, dunwich, whippoorwills],
	encounterSetsSecondary: [naomisCrew],
}

export const undimensionedAndUnseenScenario: Scenario = {
	index: 8,
	name: 'Undimensioned and Unseen',
	encounterSets: [undimensionedAndUnseen, strikingFear, beastThralls, dunwich, whippoorwills],
}

export const whereDoomAwaitsScenario: Scenario = {
	index: 9,
	name: 'Where Doom Awaits',
	encounterSets: [
		whereDoomAwaits,
		ancientEvils,
		chillingCold,
		strikingFear,
		beastThralls,
		bishopsThralls,
		sorcery,
	],
	encounterSetsSecondary: [hideousAbominations],
}

export const lostInTimeAndSpaceScenario: Scenario = {
	index: 10,
	name: 'Lost in Time and Space',
	encounterSets: [lostInTimeAndSpace, agentsOfYogSothoth, hideousAbominations, sorcery, theBeyond],
}
