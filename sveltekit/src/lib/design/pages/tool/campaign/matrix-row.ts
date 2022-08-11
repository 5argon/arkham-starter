import type { Scenario, EncounterSet } from '$lib/core/campaign'
import { mergeEncounters } from './campaign-analyze'

export interface MatrixRow {
	scenario: Scenario
	specificSets: EncounterSet[]
	/**
	 * Must manually match with the header. `null` will left it blank.
	 */
	orderedEncounterSets: (EncounterSet | null)[]
}

export function createMatrixRows(
	scenarios: Scenario[],
	reused: EncounterSet[],
	returnTo: EncounterSet[],
	core: EncounterSet[],
): MatrixRow[] {
	return scenarios.map<MatrixRow>((x) => {
		const ordered: (EncounterSet | null)[] = []
		const encounters = mergeEncounters(x)
		reused.forEach((y) => {
			ordered.push(encounters.includes(y) ? y : null)
		})
		returnTo.forEach((y) => {
			ordered.push(encounters.includes(y) ? y : null)
		})
		core.forEach((y) => {
			ordered.push(encounters.includes(y) ? y : null)
		})

		const specificSets: EncounterSet[] = []
		encounters.forEach((y) => {
			if (!ordered.includes(y)) {
				specificSets.push(y)
			}
		})
		return {
			scenario: x,
			specificSets: specificSets,
			orderedEncounterSets: ordered,
		}
	})
}
