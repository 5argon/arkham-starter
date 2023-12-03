import type { ScenarioTransition } from '$lib/core/campaign'
import {
	heartOfTheEldersPart1Scenario,
	heartOfTheEldersPart2Scenario,
	returnToHeartOfTheEldersPart1Scenario,
	returnToHeartOfTheEldersPart2Scenario,
	returnToShatteredAeonsScenario,
	returnToTheBoundaryBeyondScenario,
	returnToTheCityOfArchivesScenario,
	returnToTheDepthsOfYothScenario,
	returnToTheDoomOfEztliScenario,
	returnToTheUntamedWildsScenario,
	returnToThreadsOfFateScenario,
	returnToTurnBackTimeScenario,
	shatteredAeonsScenario,
	theBoundaryBeyondScenario,
	theCityOfArchivesScenario,
	theDepthsOfYothScenario,
	theDoomOfEztliScenario,
	theUntamedWildsScenario,
	threadsOfFateScenario,
	turnBackTimeScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
	{ from: null, to: theUntamedWildsScenario },
	{ from: theUntamedWildsScenario, to: theDoomOfEztliScenario },
	{ from: theDoomOfEztliScenario, to: threadsOfFateScenario },
	{ from: threadsOfFateScenario, to: theBoundaryBeyondScenario },
	{ from: theBoundaryBeyondScenario, to: heartOfTheEldersPart1Scenario },
	{ from: heartOfTheEldersPart1Scenario, to: heartOfTheEldersPart2Scenario },
	{ from: heartOfTheEldersPart2Scenario, to: theCityOfArchivesScenario },
	{ from: theCityOfArchivesScenario, to: theDepthsOfYothScenario },
	{ from: theDepthsOfYothScenario, to: shatteredAeonsScenario },
	{ from: shatteredAeonsScenario, to: turnBackTimeScenario },
]

export const transitionsReturnTo: ScenarioTransition[] = [
	{ from: null, to: returnToTheUntamedWildsScenario },
	{ from: returnToTheUntamedWildsScenario, to: returnToTheDoomOfEztliScenario },
	{ from: returnToTheDoomOfEztliScenario, to: returnToThreadsOfFateScenario },
	{ from: returnToThreadsOfFateScenario, to: returnToTheBoundaryBeyondScenario },
	{ from: returnToTheBoundaryBeyondScenario, to: returnToHeartOfTheEldersPart1Scenario },
	{ from: returnToHeartOfTheEldersPart1Scenario, to: returnToHeartOfTheEldersPart2Scenario },
	{ from: returnToHeartOfTheEldersPart2Scenario, to: returnToTheCityOfArchivesScenario },
	{ from: returnToTheCityOfArchivesScenario, to: returnToTheDepthsOfYothScenario },
	{ from: returnToTheDepthsOfYothScenario, to: returnToShatteredAeonsScenario },
	{ from: returnToShatteredAeonsScenario, to: returnToTurnBackTimeScenario },
]
