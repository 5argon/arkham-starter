import type { ScenarioTransition } from '$lib/core/campaign'
import {
    bloodOnTheAltarScenario,
    extracurricularActivityScenario,
    lostInTimeAndSpaceScenario,
    theEssexCountyExpressScenario,
    theHouseAlwaysWinsScenario,
    theMiskatonicMuseumScenario,
    undimensionedAndUnseenScenario,
    whereDoomAwaitsScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
    { from: null, to: theHouseAlwaysWinsScenario },
    { from: theHouseAlwaysWinsScenario, to: theMiskatonicMuseumScenario },

    { from: null, to: extracurricularActivityScenario },
    { from: extracurricularActivityScenario, to: theMiskatonicMuseumScenario },

    { from: theMiskatonicMuseumScenario, to: theEssexCountyExpressScenario },
    { from: theEssexCountyExpressScenario, to: bloodOnTheAltarScenario },
    { from: bloodOnTheAltarScenario, to: undimensionedAndUnseenScenario },
    { from: undimensionedAndUnseenScenario, to: whereDoomAwaitsScenario },
    { from: whereDoomAwaitsScenario, to: lostInTimeAndSpaceScenario },
]
