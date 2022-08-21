import type { ScenarioTransition } from '$lib/core/campaign'
import {
	disappearanceAtTheTwilightEstate,
	forTheGreaterGood,
	theSecretName,
	theWagesOfSin,
} from './encounter'
import {
	atDeathsDoorstepScenario,
	beforeTheBlackThroneScenario,
	disappearanceAtTheTwilightEstateScenario,
	forTheGreaterGoodScenario,
	inTheClutchesOfChaos1Scenario,
	inTheClutchesOfChaos2Scenario,
	returnToAtDeathsDoorstepScenario,
	returnToBeforeTheBlackThroneScenario,
	returnToDisappearanceAtTheTwilightEstateScenario,
	returnToForTheGreaterGoodScenario,
	returnToInTheClutchesOfChaos1Scenario,
	returnToInTheClutchesOfChaos2Scenario,
	returnToTheSecretNameScenario,
	returnToTheWagesOfSinScenario,
	returnToTheWitchingHourScenario,
	returnToUnionAndDisillusionScenario,
	theSecretNameScenario,
	theWagesOfSinScenario,
	theWitchingHourScenario,
	unionAndDisillusionScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
	{ from: null, to: disappearanceAtTheTwilightEstateScenario },
	{ from: disappearanceAtTheTwilightEstateScenario, to: theWitchingHourScenario },
	{ from: theWitchingHourScenario, to: atDeathsDoorstepScenario },
	{ from: atDeathsDoorstepScenario, to: theSecretNameScenario },
	{ from: theSecretNameScenario, to: theWagesOfSinScenario },
	{ from: theWagesOfSinScenario, to: forTheGreaterGoodScenario },
	{ from: forTheGreaterGoodScenario, to: unionAndDisillusionScenario },

	{ from: unionAndDisillusionScenario, to: inTheClutchesOfChaos1Scenario },
	{ from: unionAndDisillusionScenario, to: inTheClutchesOfChaos2Scenario },

	{ from: inTheClutchesOfChaos1Scenario, to: beforeTheBlackThroneScenario },
	{ from: inTheClutchesOfChaos2Scenario, to: beforeTheBlackThroneScenario },
]

export const transitionsReturnTo: ScenarioTransition[] = [
	{ from: null, to: returnToDisappearanceAtTheTwilightEstateScenario },
	{ from: returnToDisappearanceAtTheTwilightEstateScenario, to: returnToTheWitchingHourScenario },
	{ from: returnToTheWitchingHourScenario, to: returnToAtDeathsDoorstepScenario },
	{ from: returnToAtDeathsDoorstepScenario, to: returnToTheSecretNameScenario },
	{ from: returnToTheSecretNameScenario, to: returnToTheWagesOfSinScenario },
	{ from: returnToTheWagesOfSinScenario, to: returnToForTheGreaterGoodScenario },
	{ from: returnToForTheGreaterGoodScenario, to: returnToUnionAndDisillusionScenario },

	{ from: returnToUnionAndDisillusionScenario, to: returnToInTheClutchesOfChaos1Scenario },
	{ from: returnToUnionAndDisillusionScenario, to: returnToInTheClutchesOfChaos2Scenario },

	{ from: returnToInTheClutchesOfChaos1Scenario, to: returnToBeforeTheBlackThroneScenario },
	{ from: returnToInTheClutchesOfChaos2Scenario, to: returnToBeforeTheBlackThroneScenario },
]
