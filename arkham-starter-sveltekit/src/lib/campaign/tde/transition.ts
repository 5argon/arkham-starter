import type { ScenarioTransition } from '$lib/core/campaign'
import {
	aThousandShapesOfHorrorScenario,
	beyondTheGatesOfSleepScenario,
	darkSideOfTheMoonScenario,
	pointOfNoReturnScenario,
	theSearchForKadathScenario,
	wakingNightmareScenario,
	weaverOfTheCosmosScenario,
	whereTheGodsDwellScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
	{ from: null, to: beyondTheGatesOfSleepScenario },
	{ from: null, to: wakingNightmareScenario },

	{ from: beyondTheGatesOfSleepScenario, to: wakingNightmareScenario },
	{ from: wakingNightmareScenario, to: beyondTheGatesOfSleepScenario },

	{ from: beyondTheGatesOfSleepScenario, to: theSearchForKadathScenario },
	{ from: beyondTheGatesOfSleepScenario, to: aThousandShapesOfHorrorScenario },
	{ from: wakingNightmareScenario, to: theSearchForKadathScenario },
	{ from: wakingNightmareScenario, to: aThousandShapesOfHorrorScenario },

	{ from: theSearchForKadathScenario, to: aThousandShapesOfHorrorScenario },
	{ from: aThousandShapesOfHorrorScenario, to: theSearchForKadathScenario },

	{ from: theSearchForKadathScenario, to: darkSideOfTheMoonScenario },
	{ from: theSearchForKadathScenario, to: pointOfNoReturnScenario },
	{ from: aThousandShapesOfHorrorScenario, to: darkSideOfTheMoonScenario },
	{ from: aThousandShapesOfHorrorScenario, to: pointOfNoReturnScenario },

	{ from: darkSideOfTheMoonScenario, to: pointOfNoReturnScenario },
	{ from: pointOfNoReturnScenario, to: darkSideOfTheMoonScenario },

	{ from: darkSideOfTheMoonScenario, to: whereTheGodsDwellScenario },
	{ from: darkSideOfTheMoonScenario, to: weaverOfTheCosmosScenario },
	{ from: pointOfNoReturnScenario, to: whereTheGodsDwellScenario },
	{ from: pointOfNoReturnScenario, to: weaverOfTheCosmosScenario },

	{ from: whereTheGodsDwellScenario, to: weaverOfTheCosmosScenario },
	{ from: weaverOfTheCosmosScenario, to: whereTheGodsDwellScenario },
]
