import type { Scenario } from '$lib/core/campaign'
import {
    theGathering,
    theMidnightMasks,
    theDevourerBelow,
    ancientEvils,
    chillingCold,
    ghouls,
    rats,
    strikingFear,
    cultOfUmordhoth,
    darkCult,
    lockedDoors,
    nightgaunts,
    agentsOfCthulhu,
    agentsOfHastur,
    agentsOfShubNiggurath,
    agentsOfYogSothoth,
} from './encounter'


export const theGatheringScenario: Scenario = {
    name: 'The Gathering',
    encounterSets: [theGathering, ancientEvils, chillingCold, ghouls, rats, strikingFear],
}

export const theMidnightMasksScenario: Scenario = {
    name: 'The Midnight Masks',
    encounterSets: [theMidnightMasks, chillingCold, darkCult, lockedDoors, nightgaunts],
    encounterSetsSecondary: [cultOfUmordhoth],
}

export const theDevourerBelowScenario: Scenario = {
    name: 'The Devourer Below',
    encounterSets: [theDevourerBelow, ancientEvils, darkCult, ghouls, strikingFear],
    encounterSetsSecondary: [
        agentsOfCthulhu,
        agentsOfHastur,
        agentsOfShubNiggurath,
        agentsOfYogSothoth,
        cultOfUmordhoth,
    ],
}