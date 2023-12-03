import type { ScenarioTransition } from '$lib/core/campaign'
import {
	aPhantomOfTruthScenario,
	blackStarsRiseScenario,
	curtainCallScenario,
	dimCarcosaScenario,
	echoesOfThePastScenario,
	returnToAPhantomOfTruthScenario,
	returnToBlackStarsRiseScenario,
	returnToCurtainCallScenario,
	returnToDimCarcosaScenario,
	returnToEchoesOfThePastScenario,
	returnToTheLastKingScenario,
	returnToThePallidMaskScenario,
	returnToTheUnspeakableOathScenario,
	theLastKingScenario,
	thePallidMaskScenario,
	theUnspeakableOathScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
	{ from: null, to: curtainCallScenario },
	{ from: curtainCallScenario, to: theLastKingScenario },
	{ from: theLastKingScenario, to: echoesOfThePastScenario },
	{ from: echoesOfThePastScenario, to: theUnspeakableOathScenario },
	{ from: theUnspeakableOathScenario, to: aPhantomOfTruthScenario },
	{ from: aPhantomOfTruthScenario, to: thePallidMaskScenario },
	{ from: thePallidMaskScenario, to: blackStarsRiseScenario },
	{ from: blackStarsRiseScenario, to: dimCarcosaScenario },
]

export const transitionsReturnTo: ScenarioTransition[] = [
	{ from: null, to: returnToCurtainCallScenario },
	{ from: returnToCurtainCallScenario, to: returnToTheLastKingScenario },
	{ from: returnToTheLastKingScenario, to: returnToEchoesOfThePastScenario },
	{ from: returnToEchoesOfThePastScenario, to: returnToTheUnspeakableOathScenario },
	{ from: returnToTheUnspeakableOathScenario, to: returnToAPhantomOfTruthScenario },
	{ from: returnToAPhantomOfTruthScenario, to: returnToThePallidMaskScenario },
	{ from: returnToThePallidMaskScenario, to: returnToBlackStarsRiseScenario },
	{ from: returnToBlackStarsRiseScenario, to: returnToDimCarcosaScenario },
]
