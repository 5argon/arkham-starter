import { EncounterSetFlag, type EncounterSet } from "$lib/core/campaign";

const folder = "The Dunwich Legacy/"
const scenarioFolder = "Scenarios/"

export const badLuck: EncounterSet = {
    name: "Bad Luck",
    icon: folder + "Bad Luck",
    count: 6,
}

export const beastThralls: EncounterSet = {
    name: "Beast Thralls",
    icon: folder + "Beast-thralls",
    count: 6,
}

export const bishopsThralls: EncounterSet = {
    name: "Bishop's Thralls",
    icon: folder + "Bishop's Thralls",
    count: 6,
}

export const naomisCrew: EncounterSet = {
    name: "Naomi's Crew",
    icon: folder + "Naomi's Crew",
    count: 6,
}

export const theBeyond: EncounterSet = {
    name: "The Beyond",
    icon: folder + "The Beyond",
    count: 6,
}

export const hideousAbominations: EncounterSet = {
    name: "Hideous Abominations",
    icon: folder + "Hideous Abominations",
    count: 3,
}

export const sorcery: EncounterSet = {
    name: "Sorcery",
    icon: folder + "Sorcery",
    count: 6,
}

export const dunwich: EncounterSet = {
    name: "Dunwich",
    icon: folder + "Dunwich",
    count: 4,
}

export const whippoorwills: EncounterSet = {
    name: "Whippoorwills",
    icon: folder + "Whippoorwills",
    count: 5
}

export const extracurricularActivity: EncounterSet = {
    name: "Extracurricular Activity",
    icon: folder + scenarioFolder + "TDL 1A - Extracurricular Activity",
    flag: EncounterSetFlag.Scenario,
    count: 21,
}

export const theHouseAlwaysWins: EncounterSet = {
    name: "The House Always Wins",
    icon: folder + scenarioFolder + "TDL 1B - The House Always Wins",
    flag: EncounterSetFlag.Scenario,
    count: 23,
}


export const theMiskatonicMuseum: EncounterSet = {
    name: "The Miskatonic Museum",
    icon: folder + scenarioFolder + "TDL 2 - The Miskatonic Museum",
    flag: EncounterSetFlag.Scenario,
    count: 34,
}

export const theEssexCountyExpress: EncounterSet = {
    name: "The Essex County Express",
    icon: folder + scenarioFolder + "TDL 3 - The Essex County Express",
    flag: EncounterSetFlag.Scenario,
    count: 36,
}

export const bloodOnTheAltar: EncounterSet = {
    name: "Blood on the Altar",
    icon: folder + scenarioFolder + "TDL 4 - Blood on the Altar",
    flag: EncounterSetFlag.Scenario,
    count: 38,
}

export const undimensionedAndUnseen: EncounterSet = {
    name: "Undimensioned and Unseen",
    icon: folder + scenarioFolder + "TDL 5 - Undimensioned and Unseen",
    flag: EncounterSetFlag.Scenario,
    count: 38,
}

export const whereDoomAwaits: EncounterSet = {
    name: "Where Doom Awaits",
    icon: folder + scenarioFolder + "TDL 6 - Where Doom Awaits",
    flag: EncounterSetFlag.Scenario,
    count: 32,
}

export const lostInTimeAndSpace: EncounterSet = {
    name: "Lost in Time and Space",
    icon: folder + scenarioFolder + "TDL 7 - Lost in Time and Space",
    flag: EncounterSetFlag.Scenario,
    count: 36,
}

export const armitagesFate: EncounterSet = {
    name: "Armitage's Fate",
    icon: folder + "Armitage's Fate",
    count: 1,
}