import type { Campaign } from "$lib/core/campaign";
import { armitagesFate } from "./encounter";
import { transitions } from "./transition";

export const theDunwichLegacyCampaign: Campaign = {
    name: "The Dunwich Legacy",
    scenarioTransitions: transitions,
    commonEncounterSets: [armitagesFate],
}