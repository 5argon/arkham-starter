import {
	EncounterSetFlag,
	EncounterSetSorting,
	isEncounterSetWithModification,
	type Campaign,
	type EncounterSet,
	type Scenario,
} from '$lib/core/campaign'

export function findCoreEncounters(c: Campaign): EncounterSet[] {
	return findUniqueEncounters(c).filter((x) => {
		return x.flag === EncounterSetFlag.Core
	})
}

export function findUniqueScenarios(c: Campaign): Scenario[] {
	const unique = new Set<Scenario>()
	c.scenarios.forEach((x) => {
		unique.add(x)
	})
	return Array.from(unique).sort((a, b) => {
		return a.index - b.index
	})
}

export function findUniqueEncounters(c: Campaign): EncounterSet[] {
	const encounterSets = c.scenarios.flatMap(x=>mergeEncounters(x))
	const unique = new Set<EncounterSet>()
	encounterSets.forEach((x) => {
		unique.add(x)
	})
	return Array.from(unique)
}

export interface TransitionInfo {
	keep: EncounterSet[]
	add: EncounterSet[]
	remove: EncounterSet[]
	removeToForesight: EncounterSet[]
	addToForesight: EncounterSet[]
}

export function findFrequencies(scenarios: Scenario[]): EncounterSetFrequencies {
	const freq: EncounterSetFrequencies = {}
	scenarios.forEach((x) => {
		const encounters = mergeEncounters(x)
		encounters.forEach((y) => {
			if (y.name in freq === false) {
				freq[y.name] = 0
			}
			freq[y.name] = freq[y.name] + 1
		})
	})
	return freq
}

export function mergeEncounters(s: Scenario | null): EncounterSet[] {
	if (s === null) {
		return []
	}
	const es = new Set<EncounterSet>()
	s.setups.forEach((setup) => {
		setup.shuffles.forEach((x) => {
			if (isEncounterSetWithModification(x)) {
				es.add(x.encounterSet)
			} else {
				es.add(x)
			}
		})
		if (setup.remaining !== undefined) {
			setup.remaining.forEach((x) => {
				if (isEncounterSetWithModification(x)) {
					es.add(x.encounterSet)
				} else {
					es.add(x)
				}
			})
		}
	})
	return Array.from(es)
}

export function mergeEncountersPure(encounters: EncounterSet[]): EncounterSet[] {
	const es = new Set<EncounterSet>()
	encounters.forEach((x) => {
		es.add(x)
	})
	return Array.from(es)
}

export type EncounterSetFrequencies = { [setName: string]: number }

export function sortEncounters(
	es: EncounterSet[],
	sorting: EncounterSetSorting,
	frequency: EncounterSetFrequencies,
): EncounterSet[] {
	const sorted = [...es]
	sorted.sort((a, b) => sortEncountersScore(a, b, sorting, frequency))
	return sorted
}

export function sortEncountersScore(
	a: EncounterSet,
	b: EncounterSet,
	sorting: EncounterSetSorting,
	frequency: EncounterSetFrequencies,
): number {
	switch (sorting) {
		case EncounterSetSorting.Alphabetical: {
			return a.name.localeCompare(b.name)
		}
		case EncounterSetSorting.Frequency: {
			const countA = a.name in frequency ? frequency[a.name] : 0
			const countB = b.name in frequency ? frequency[b.name] : 0
			return countB - countA
		}
		default: {
			console.trace()
			throw new Error('Unsupported sorting')
		}
	}
}

export function makeLongScenarioName(s: Scenario): string {
	return s.shortName !== undefined ? `(${s.shortName}) ${s.name}` : s.name
}