import { EncounterSetFlag, type EncounterSet } from '$lib/core/campaign'

const folder = 'Core Set (Night of the Zealot)/'
const scenarioFolder = 'Scenarios/'
const returnToFolder = 'Return to the Night of the Zealot/'

export const rats: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Rats',
	icon: folder + 'Rats',
	count: 3,
}

export const strikingFear: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Striking Fear',
	icon: folder + 'Striking Fear',
	count: 7,
}

export const nightgaunts: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Nightgaunts',
	icon: folder + 'Nightgaunts',
	count: 4,
}

export const lockedDoors: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Locked Doors',
	icon: folder + 'Locked Doors',
	count: 2,
}

export const ghouls: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Ghouls',
	icon: folder + 'Ghouls',
	count: 7,
}

export const darkCult: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Dark Cult',
	icon: folder + 'Dark Cult',
	count: 6,
}

export const cultOfUmordhoth: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Cult of Umôrdhoth',
	icon: folder + 'Cult of Umordhoth',
	count: 5,
}

export const chillingCold: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Chilling Cold',
	icon: folder + 'Chilling Cold',
	count: 4,
}

export const ancientEvils: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Ancient Evils',
	icon: folder + 'Ancient Evils',
	count: 3,
}

export const agentsOfYogSothoth: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Agents of Yog-Sothoth',
	icon: folder + 'Agents of Yog-Sothoth',
	count: 4,
}

export const agentsOfShubNiggurath: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Agents of Shub-Niggurath',
	icon: folder + 'Agents of Shub-Niggurath',
	count: 4,
}

export const agentsOfHastur: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Agents of Hastur',
	icon: folder + 'Agents of Hastur',
	count: 4,
}

export const agentsOfCthulhu: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'Agents of Cthulhu',
	icon: folder + 'Agents of Cthulhu',
	count: 4,
}

export const theGathering: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'The Gathering',
	icon: folder + scenarioFolder + 'NotZ 1 - The Gathering',
	count: 16,
}

export const theMidnightMasks: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'The Midnight Masks',
	icon: folder + scenarioFolder + 'NotZ 2 - The Midnight Masks',
	count: 20,
}

export const theDevourerBelow: EncounterSet = {
	flag: EncounterSetFlag.Core,
	name: 'The Devourer Below',
	icon: folder + scenarioFolder + 'NotZ 3 - The Devourer Below',
	count: 18,
}

export const returnToTheGathering: EncounterSet = {
	flag: EncounterSetFlag.Scenario,
	name: 'Return to The Gathering',
	icon: folder + returnToFolder + scenarioFolder + 'NotZ R-1 - The Gathering',
	count: 0,
}

export const returnToTheMidnightMasks: EncounterSet = {
	flag: EncounterSetFlag.Scenario,
	name: 'Return to The Midnight Masks',
	icon: folder + returnToFolder + scenarioFolder + 'NotZ R-2 - The Midnight Masks',
	count: 0,
}

export const returnToTheDevourerBelow: EncounterSet = {
	flag: EncounterSetFlag.Scenario,
	name: 'Return to The Devourer Below',
	icon: folder + returnToFolder + scenarioFolder + 'NotZ R-3 - The Devourer Below',
	count: 0,
}

export const returnToCultOfUmordhoth: EncounterSet = {
	flag: EncounterSetFlag.ReturnTo,
	name: 'Return to Cult of Umôrdhoth',
	icon: folder + returnToFolder + 'Return Cult of Umordhoth',
	count: 0,
}

export const ghoulsOfUmordhoth: EncounterSet = {
	flag: EncounterSetFlag.ReturnTo,
	name: 'Ghouls of Umôrdhoth',
	icon: folder + returnToFolder + 'Ghouls of Umordhoth',
	count: 0,
}

export const theDevourersCult: EncounterSet = {
	flag: EncounterSetFlag.ReturnTo,
	name: "The Devourer's Cult",
	icon: folder + returnToFolder + "The Devourer's Cult",
	count: 0,
}
