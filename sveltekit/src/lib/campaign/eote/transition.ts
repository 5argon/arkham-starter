import type { ScenarioTransition } from '$lib/core/campaign'
import { cityOfTheElderThings1Scenario, cityOfTheElderThings2Scenario, cityOfTheElderThings3Scenario, edgeOfTheEarthPrologueScenario, fatalMirage1Scenario, fatalMirage2Scenario, fatalMirage3Scenario, iceAndDeathPart1Scenario, iceAndDeathPart2Scenario, iceAndDeathPart3Scenario, theHeartOfMadness1Scenario, theHeartOfMadness2Scenario, toTheForbiddenPeaksScenario } from './scenario'

export const transitions: ScenarioTransition[] = [
    { from: null, to: edgeOfTheEarthPrologueScenario },
    { from: edgeOfTheEarthPrologueScenario, to: iceAndDeathPart1Scenario },

    { from: iceAndDeathPart1Scenario, to: iceAndDeathPart2Scenario },
    { from: iceAndDeathPart1Scenario, to: iceAndDeathPart3Scenario },

    { from: iceAndDeathPart2Scenario, to: iceAndDeathPart3Scenario },
    { from: iceAndDeathPart2Scenario, to: toTheForbiddenPeaksScenario },
    { from: iceAndDeathPart2Scenario, to: fatalMirage1Scenario },

    { from: iceAndDeathPart3Scenario, to: fatalMirage1Scenario },
    { from: iceAndDeathPart3Scenario, to: toTheForbiddenPeaksScenario },

    { from: fatalMirage1Scenario, to: toTheForbiddenPeaksScenario },

    { from: toTheForbiddenPeaksScenario, to: cityOfTheElderThings1Scenario },
    { from: toTheForbiddenPeaksScenario, to: cityOfTheElderThings2Scenario },
    { from: toTheForbiddenPeaksScenario, to: cityOfTheElderThings3Scenario },
    { from: toTheForbiddenPeaksScenario, to: fatalMirage2Scenario },

    { from: fatalMirage2Scenario, to: cityOfTheElderThings1Scenario },
    { from: fatalMirage2Scenario, to: cityOfTheElderThings2Scenario },
    { from: fatalMirage2Scenario, to: cityOfTheElderThings3Scenario },

    { from: cityOfTheElderThings1Scenario, to: theHeartOfMadness1Scenario },
    { from: cityOfTheElderThings1Scenario, to: theHeartOfMadness2Scenario },
    { from: cityOfTheElderThings1Scenario, to: fatalMirage3Scenario },

    { from: cityOfTheElderThings2Scenario, to: theHeartOfMadness1Scenario },
    { from: cityOfTheElderThings2Scenario, to: theHeartOfMadness2Scenario },
    { from: cityOfTheElderThings2Scenario, to: fatalMirage3Scenario },

    { from: cityOfTheElderThings3Scenario, to: theHeartOfMadness1Scenario },
    { from: cityOfTheElderThings3Scenario, to: theHeartOfMadness2Scenario },
    { from: cityOfTheElderThings3Scenario, to: fatalMirage3Scenario },

    { from: fatalMirage3Scenario, to: theHeartOfMadness1Scenario },
    { from: fatalMirage3Scenario, to: theHeartOfMadness2Scenario },

    { from: theHeartOfMadness1Scenario, to: theHeartOfMadness2Scenario },
]

