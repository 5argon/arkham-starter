import type { ScenarioTransition } from '$lib/core/campaign'
import {
	aLightInTheFogScenario,
	devilReefScenario,
	horrorInHighGearScenario,
	inTooDeepScenario,
	intoTheMaelstromScenario,
	theLairOfDagonScenario,
	thePitOfDespairScenario,
	theVanishingOfElinaHarperScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
	{ from: null, to: thePitOfDespairScenario },
	{ from: thePitOfDespairScenario, to: theVanishingOfElinaHarperScenario },
	{ from: theVanishingOfElinaHarperScenario, to: inTooDeepScenario },
	{ from: inTooDeepScenario, to: devilReefScenario },
	{ from: devilReefScenario, to: horrorInHighGearScenario },
	{ from: horrorInHighGearScenario, to: aLightInTheFogScenario },
	{ from: aLightInTheFogScenario, to: theLairOfDagonScenario },
	{ from: theLairOfDagonScenario, to: intoTheMaelstromScenario },
]
