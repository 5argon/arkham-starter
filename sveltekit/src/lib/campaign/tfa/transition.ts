import type { ScenarioTransition } from '$lib/core/campaign'
import {
    heartOfTheEldersPart1Scenario,
    heartOfTheEldersPart2Scenario,
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
