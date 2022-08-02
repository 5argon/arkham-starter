import type { ScenarioTransition } from "$lib/core/campaign";
import { theDevourerBelowScenario, theGatheringScenario, theMidnightMasksScenario } from "./scenario";

export const transitions: ScenarioTransition[] = [
    { from: null, to: theGatheringScenario },
    { from: theGatheringScenario, to: theMidnightMasksScenario },
    { from: theMidnightMasksScenario, to: theDevourerBelowScenario },
]
