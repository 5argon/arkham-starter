import type { ScenarioTransition } from '$lib/core/campaign'
import {
	cityOfTheElderThings1Scenario,
	cityOfTheElderThings2Scenario,
	cityOfTheElderThings3Scenario,
	fatalMirageScenario,
	iceAndDeathPart1Scenario,
	iceAndDeathPart2Scenario,
	iceAndDeathPart3Scenario,
	theHeartOfMadness1Scenario,
	theHeartOfMadness2Scenario,
	toTheForbiddenPeaksScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
	{ from: null, to: iceAndDeathPart1Scenario },

	{ from: iceAndDeathPart1Scenario, to: iceAndDeathPart2Scenario },
	{ from: iceAndDeathPart1Scenario, to: iceAndDeathPart3Scenario },

	{ from: iceAndDeathPart2Scenario, to: iceAndDeathPart3Scenario },
	{ from: iceAndDeathPart2Scenario, to: toTheForbiddenPeaksScenario },
	{ from: iceAndDeathPart2Scenario, to: fatalMirageScenario },

	{ from: iceAndDeathPart3Scenario, to: fatalMirageScenario },
	{ from: iceAndDeathPart3Scenario, to: toTheForbiddenPeaksScenario },

	{ from: fatalMirageScenario, to: toTheForbiddenPeaksScenario },
	{ from: fatalMirageScenario, to: cityOfTheElderThings1Scenario },
	{ from: fatalMirageScenario, to: cityOfTheElderThings2Scenario },
	{ from: fatalMirageScenario, to: cityOfTheElderThings3Scenario },
	{ from: fatalMirageScenario, to: theHeartOfMadness1Scenario },

	{ from: toTheForbiddenPeaksScenario, to: cityOfTheElderThings1Scenario },
	{ from: toTheForbiddenPeaksScenario, to: cityOfTheElderThings2Scenario },
	{ from: toTheForbiddenPeaksScenario, to: cityOfTheElderThings3Scenario },
	{ from: toTheForbiddenPeaksScenario, to: fatalMirageScenario },

	{ from: cityOfTheElderThings1Scenario, to: theHeartOfMadness1Scenario },
	{ from: cityOfTheElderThings1Scenario, to: theHeartOfMadness2Scenario },
	{ from: cityOfTheElderThings1Scenario, to: fatalMirageScenario },

	{ from: cityOfTheElderThings2Scenario, to: theHeartOfMadness1Scenario },
	{ from: cityOfTheElderThings2Scenario, to: theHeartOfMadness2Scenario },
	{ from: cityOfTheElderThings2Scenario, to: fatalMirageScenario },

	{ from: cityOfTheElderThings3Scenario, to: theHeartOfMadness1Scenario },
	{ from: cityOfTheElderThings3Scenario, to: theHeartOfMadness2Scenario },
	{ from: cityOfTheElderThings3Scenario, to: fatalMirageScenario },

	{ from: theHeartOfMadness1Scenario, to: theHeartOfMadness2Scenario },
]
