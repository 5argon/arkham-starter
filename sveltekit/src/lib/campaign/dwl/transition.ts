import type { ScenarioTransition } from '$lib/core/campaign'
import {
    bloodOnTheAltarScenario,
    extracurricularActivity2Scenario,
    extracurricularActivityScenario,
    lostInTimeAndSpaceScenario,
    theEssexCountyExpressScenario,
    theHouseAlwaysWins2Scenario,
    theHouseAlwaysWinsScenario,
    theMiskatonicMuseumScenario,
    undimensionedAndUnseenScenario,
    whereDoomAwaitsScenario,
} from './scenario'

export const transitions: ScenarioTransition[] = [
    { from: null, to: extracurricularActivityScenario },
    { from: extracurricularActivityScenario, to: theHouseAlwaysWins2Scenario },
    { from: theHouseAlwaysWins2Scenario, to: theMiskatonicMuseumScenario },

    { from: null, to: theHouseAlwaysWinsScenario },
    { from: theHouseAlwaysWinsScenario, to: extracurricularActivity2Scenario },
    { from: extracurricularActivity2Scenario, to: theMiskatonicMuseumScenario },

    { from: theMiskatonicMuseumScenario, to: theEssexCountyExpressScenario },
    { from: theEssexCountyExpressScenario, to: bloodOnTheAltarScenario },
    { from: bloodOnTheAltarScenario, to: undimensionedAndUnseenScenario },
    { from: undimensionedAndUnseenScenario, to: whereDoomAwaitsScenario },
    { from: whereDoomAwaitsScenario, to: lostInTimeAndSpaceScenario },
]
