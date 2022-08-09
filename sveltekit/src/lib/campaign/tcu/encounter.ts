import { EncounterSetFlag, type EncounterSet } from '$lib/core/campaign'

const folder = 'The Circle Undone/'
const scenario = 'Scenarios/'

export const theUntamedWilds: EncounterSet = {
	name: 'The Untamed Wilds',
	count: 0,
	icon: folder + scenario + 'TFA 1 - The Untamed Wilds',
	flag: EncounterSetFlag.Scenario,
}
