import { EncounterSetFlag, type EncounterSet } from '$lib/core/campaign'

const folder = 'The Dunwich Legacy/'
const scenarioFolder = 'Scenarios/'
const returnToFolder = 'Return to the Dunwich Legacy/'

export const badLuck: EncounterSet = {
	name: 'Bad Luck',
	icon: folder + 'Bad Luck',
	count: 6,
}

export const beastThralls: EncounterSet = {
	name: 'Beast Thralls',
	icon: folder + 'Beast-thralls',
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
	name: 'The Beyond',
	icon: folder + 'The Beyond',
	count: 6,
}

export const hideousAbominations: EncounterSet = {
	name: 'Hideous Abominations',
	icon: folder + 'Hideous Abominations',
	count: 3,
}

export const sorcery: EncounterSet = {
	name: 'Sorcery',
	icon: folder + 'Sorcery',
	count: 6,
}

export const dunwich: EncounterSet = {
	name: 'Dunwich',
	icon: folder + 'Dunwich',
	count: 4,
}

export const whippoorwills: EncounterSet = {
	name: 'Whippoorwills',
	icon: folder + 'Whippoorwills',
	count: 5,
}

export const extracurricularActivity: EncounterSet = {
	name: 'Extracurricular Activity',
	icon: folder + scenarioFolder + 'TDL 1A - Extracurricular Activity',
	flag: EncounterSetFlag.Scenario,
	count: 21,
}

export const theHouseAlwaysWins: EncounterSet = {
	name: 'The House Always Wins',
	icon: folder + scenarioFolder + 'TDL 1B - The House Always Wins',
	flag: EncounterSetFlag.Scenario,
	count: 23,
}

export const theMiskatonicMuseum: EncounterSet = {
	name: 'The Miskatonic Museum',
	icon: folder + scenarioFolder + 'TDL 2 - The Miskatonic Museum',
	flag: EncounterSetFlag.Scenario,
	count: 34,
}

export const theEssexCountyExpress: EncounterSet = {
	name: 'The Essex County Express',
	icon: folder + scenarioFolder + 'TDL 3 - The Essex County Express',
	flag: EncounterSetFlag.Scenario,
	count: 36,
}

export const bloodOnTheAltar: EncounterSet = {
	name: 'Blood on the Altar',
	icon: folder + scenarioFolder + 'TDL 4 - Blood on the Altar',
	flag: EncounterSetFlag.Scenario,
	count: 38,
}

export const undimensionedAndUnseen: EncounterSet = {
	name: 'Undimensioned and Unseen',
	icon: folder + scenarioFolder + 'TDL 5 - Undimensioned and Unseen',
	flag: EncounterSetFlag.Scenario,
	count: 38,
}

export const whereDoomAwaits: EncounterSet = {
	name: 'Where Doom Awaits',
	icon: folder + scenarioFolder + 'TDL 6 - Where Doom Awaits',
	flag: EncounterSetFlag.Scenario,
	count: 32,
}

export const lostInTimeAndSpace: EncounterSet = {
	name: 'Lost in Time and Space',
	icon: folder + scenarioFolder + 'TDL 7 - Lost in Time and Space',
	flag: EncounterSetFlag.Scenario,
	count: 36,
}

export const armitagesFate: EncounterSet = {
	name: "Armitage's Fate",
	icon: folder + "Armitage's Fate",
	count: 1,
}

export const beyondTheThreshold: EncounterSet = {
	name: 'Beyond the Threshold',
	icon: folder + returnToFolder + 'Beyond the Threshold',
	flag: EncounterSetFlag.ReturnTo,
	count: 6,
}

export const resurgentEvils: EncounterSet = {
	name: 'Resurgent Evils',
	icon: folder + returnToFolder + 'Resurgent Evils',
	flag: EncounterSetFlag.ReturnTo,
	count: 3,
}

export const secretDoors: EncounterSet = {
	name: 'Secret Doors',
	icon: folder + returnToFolder + 'Secret Doors',
	flag: EncounterSetFlag.ReturnTo,
	count: 2,
}

export const creepingCold: EncounterSet = {
	name: 'Creeping Cold',
	icon: folder + returnToFolder + 'Creeping Cold',
	flag: EncounterSetFlag.ReturnTo,
	count: 4,
}

export const erraticFear: EncounterSet = {
	name: 'Erratic Fear',
	icon: folder + returnToFolder + 'Erratic Fear',
	flag: EncounterSetFlag.ReturnTo,
	count: 7,
}

export const yogSothothsEmissaries: EncounterSet = {
	name: "Yog-Sothoth's Emissaries",
	icon: folder + returnToFolder + "Yog-Sothoth's Emissaries",
	flag: EncounterSetFlag.ReturnTo,
	count: 4,
}

export const returnToExtracurricularActivity: EncounterSet = {
	name: 'Return to Extracurricular Activity',
	icon: folder + returnToFolder + scenarioFolder + 'TDL R-1A - Extracurricular Activity',
	flag: EncounterSetFlag.Scenario,
	count: 4,
}

export const returnToTheHouseAlwaysWins: EncounterSet = {
	name: 'Return to the House Always Wins',
	icon: folder + returnToFolder + scenarioFolder + 'TDL R-1B - The House Always Wins',
	flag: EncounterSetFlag.Scenario,
	count: 7,
}

export const returnToTheMiskatonicMuseum: EncounterSet = {
	name: 'Return to the Miskatonic Museum',
	icon: folder + returnToFolder + scenarioFolder + 'TDL R-2 - The Miskatonic Museum',
	flag: EncounterSetFlag.Scenario,
	count: 7,
}

export const returnToTheEssexCountyExpress: EncounterSet = {
	name: 'Return to the Essex County Express',
	icon: folder + returnToFolder + scenarioFolder + 'TDL R-3 - The Essex County Express',
	flag: EncounterSetFlag.Scenario,
	count: 7,
}

export const returnToBloodOnTheAltar: EncounterSet = {
	name: 'Return to Blood on the Altar',
	icon: folder + returnToFolder + scenarioFolder + 'TDL R-4 - Blood on the Altar',
	flag: EncounterSetFlag.Scenario,
	count: 10,
}

export const returnToUndimensionedAndUnseen: EncounterSet = {
	name: 'Return to Undimensioned and Unseen',
	icon: folder + returnToFolder + scenarioFolder + 'TDL R-5 - Undimensioned and Unseen',
	flag: EncounterSetFlag.Scenario,
	count: 7,
}

export const returnToWhereDoomAwaits: EncounterSet = {
	name: 'Return to Where Doom Awaits',
	icon: folder + returnToFolder + scenarioFolder + 'TDL R-6 - Where Doom Awaits',
	flag: EncounterSetFlag.Scenario,
	count: 6,
}

export const returnToLostInTimeAndSpace: EncounterSet = {
	name: 'Return to Lost in Time and Space',
	icon: folder + returnToFolder + scenarioFolder + 'TDL R-7 - Lost in Time and Space',
	flag: EncounterSetFlag.Scenario,
	count: 8,
}
