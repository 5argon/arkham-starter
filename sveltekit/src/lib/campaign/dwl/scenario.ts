import { CoreGameComponent, type Scenario } from '$lib/core/campaign'
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
	name: 'Extracurricular Activity (I)',
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
	name: 'The House Always Wins (I)',
	encounterSets: [theHouseAlwaysWins, rats, badLuck, naomisCrew],
	coreGameComponents: [CoreGameComponent.TokenElderThing],
	encounterSetsSecondary: [strikingFear, hideousAbominations],
}

export const extracurricularActivity2Scenario: Scenario = {
	name: 'Extracurricular Activity (II)',
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

export const theHouseAlwaysWins2Scenario: Scenario = {
	name: 'The House Always Wins (II)',
	encounterSets: [theHouseAlwaysWins, rats, badLuck, naomisCrew],
	coreGameComponents: [CoreGameComponent.TokenElderThing],
	encounterSetsSecondary: [strikingFear, hideousAbominations],
}

export const theMiskatonicMuseumScenario: Scenario = {
	name: 'The Miskatonic Museum',
	coreGameComponents: [CoreGameComponent.TokenTablet],
	encounterSets: [theMiskatonicMuseum, chillingCold, lockedDoors, badLuck, sorcery, theBeyond],
}

export const theEssexCountyExpressScenario: Scenario = {
	name: 'The Essex County Express',
	encounterSets: [theEssexCountyExpress, ancientEvils, darkCult, strikingFear, theBeyond],
	coreGameComponentsPerDifficulty: {
		easy: [CoreGameComponent.TokenM2],
		standard: [CoreGameComponent.TokenM3],
		hard: [CoreGameComponent.TokenM4],
		expert: [CoreGameComponent.TokenM5],
	}
}

export const bloodOnTheAltarScenario: Scenario = {
	name: 'Blood on the Altar',
	encounterSets: [bloodOnTheAltar, ancientEvils, nightgaunts, dunwich, whippoorwills],
	encounterSetsSecondary: [naomisCrew],
}

export const undimensionedAndUnseenScenario: Scenario = {
	name: 'Undimensioned and Unseen',
	encounterSets: [undimensionedAndUnseen, strikingFear, beastThralls, dunwich, whippoorwills],
}

export const whereDoomAwaitsScenario: Scenario = {
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
	name: 'Lost in Time and Space',
	encounterSets: [lostInTimeAndSpace, agentsOfYogSothoth, hideousAbominations, sorcery, theBeyond],
}
