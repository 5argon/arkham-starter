import type { ScenarioTransition } from '$lib/core/campaign'
import { aPhantomOfTruthScenario, blackStarsRiseScenario, curtainCallScenario, dimCarcosaScenario, echoesOfThePastScenario, theLastKingScenario, thePallidMaskScenario, theUnspeakableOathScenario } from './scenario'

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
