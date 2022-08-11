import type { ScenarioTransition } from '$lib/core/campaign'
import {
	bloodOnTheAltarScenario,
	extracurricularActivityScenario,
	lostInTimeAndSpaceScenario,
	returnToBloodOnTheAltarScenario,
	returnToExtracurricularActivityScenario,
	returnToLostInTimeAndSpaceScenario,
	returnToTheEssexCountyExpressScenario,
	returnToTheHouseAlwaysWinsScenario,
	returnToTheMiskatonicMuseumScenario,
	returnToUndimensionedAndUnseenScenario,
	returnToWhereDoomAwaitsScenario,
	theEssexCountyExpressScenario,
	theHouseAlwaysWinsScenario,
	theMiskatonicMuseumScenario,
	undimensionedAndUnseenScenario,
	whereDoomAwaitsScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
	{ from: null, to: extracurricularActivityScenario },
	{ from: null, to: theHouseAlwaysWinsScenario },

	{ from: extracurricularActivityScenario, to: theMiskatonicMuseumScenario },
	{ from: extracurricularActivityScenario, to: theHouseAlwaysWinsScenario },

	{ from: theHouseAlwaysWinsScenario, to: extracurricularActivityScenario },
	{ from: theHouseAlwaysWinsScenario, to: theMiskatonicMuseumScenario },

	{ from: theMiskatonicMuseumScenario, to: theEssexCountyExpressScenario },
	{ from: theEssexCountyExpressScenario, to: bloodOnTheAltarScenario },
	{ from: bloodOnTheAltarScenario, to: undimensionedAndUnseenScenario },
	{ from: undimensionedAndUnseenScenario, to: whereDoomAwaitsScenario },
	{ from: whereDoomAwaitsScenario, to: lostInTimeAndSpaceScenario },
]

export const returnToTransitions: ScenarioTransition[] = [
	{ from: null, to: returnToExtracurricularActivityScenario },
	{ from: null, to: returnToTheHouseAlwaysWinsScenario },

	{ from: returnToExtracurricularActivityScenario, to: returnToTheMiskatonicMuseumScenario },
	{ from: returnToExtracurricularActivityScenario, to: returnToTheHouseAlwaysWinsScenario },

	{ from: returnToTheHouseAlwaysWinsScenario, to: returnToExtracurricularActivityScenario },
	{ from: returnToTheHouseAlwaysWinsScenario, to: returnToTheMiskatonicMuseumScenario },

	{ from: returnToTheMiskatonicMuseumScenario, to: returnToTheEssexCountyExpressScenario },
	{ from: returnToTheEssexCountyExpressScenario, to: returnToBloodOnTheAltarScenario },
	{ from: returnToBloodOnTheAltarScenario, to: returnToUndimensionedAndUnseenScenario },
	{ from: returnToUndimensionedAndUnseenScenario, to: returnToWhereDoomAwaitsScenario },
	{ from: returnToWhereDoomAwaitsScenario, to: returnToLostInTimeAndSpaceScenario },
]
