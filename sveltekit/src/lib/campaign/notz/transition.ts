import type { ScenarioTransition } from '$lib/core/campaign'
import {
	returnToTheDevourerBelowScenario,
	returnToTheGatheringScenario,
	returnToTheMidnightMasksScenario,
	theDevourerBelowScenario,
	theGatheringScenario,
	theMidnightMasksScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
	{ from: null, to: theGatheringScenario },
	{ from: theGatheringScenario, to: theMidnightMasksScenario },
	{ from: theMidnightMasksScenario, to: theDevourerBelowScenario },
]

export const returnToTransitions: ScenarioTransition[] = [
	{ from: null, to: returnToTheGatheringScenario },
	{ from: returnToTheGatheringScenario, to: returnToTheMidnightMasksScenario },
	{ from: returnToTheMidnightMasksScenario, to: returnToTheDevourerBelowScenario },
]
