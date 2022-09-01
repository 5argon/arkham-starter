import type { EncounterSet } from '$lib/core/campaign'

export function makeSetCountText(encounter: EncounterSet): string {
	return `(${encounter.count})`
}
