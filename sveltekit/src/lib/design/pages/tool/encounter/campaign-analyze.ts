import { EncounterSetFlag, type Campaign, type EncounterSet, type Scenario } from "$lib/core/campaign"

export function findCoreEncounters(c: Campaign): EncounterSet[] {
    return findUniqueEncounters(c).filter(x => {
        return x.flag === EncounterSetFlag.Core
    })
}

export function findUniqueScenarios(c: Campaign): Scenario[] {
    const t = c.scenarioTransitions.flatMap<Scenario>(x => {
        const s: Scenario[] = []
        if (x.from !== null) {
            s.push(x.from)
        }
        if (x.to !== null) {
            s.push(x.to)
        }
        return s
    })
    const unique = new Set<Scenario>()
    t.forEach(x => {
        unique.add(x)
    })
    return Array.from(unique)
}

export function findUniqueEncounters(c: Campaign): EncounterSet[] {
    const t = c.scenarioTransitions.flatMap<EncounterSet>(x => {
        const result: EncounterSet[] = []
        if (x.from !== null) {
            proc(x.from).forEach(y => {
                result.push(y)
            })
        }
        if (x.to !== null) {
            proc(x.to).forEach(y => {
                result.push(y)
            })
        }
        function proc(s: Scenario): EncounterSet[] {
            const e = [...s.encounterSets]
            if (s.encounterSetsSecondary !== undefined) {
                s.encounterSetsSecondary.forEach(y => {
                    if (Array.isArray(y)) {
                        e.push(...y)
                    } else {
                        e.push(y)
                    }
                })
            }
            return e
        }
        return result
    })
    const unique = new Set<EncounterSet>()
    t.forEach(x => {
        unique.add(x)
    })
    return Array.from(unique)
}


export interface TransitionInfo {
    keep: EncounterSet[]
    add: EncounterSet[]
    remove: EncounterSet[]
}

function mergeEncounters(s: Scenario | null): EncounterSet[] {
    if (s === null) {
        return []
    }
    const es: EncounterSet[] = [...s.encounterSets]
    if (s.encounterSetsSecondary !== undefined) {
        s.encounterSetsSecondary.forEach(x => {
            es.push(x)
        })
    }
    return es
}

export function makeTransitionInfo(from: Scenario | null, to: Scenario): TransitionInfo {
    const fromEncounters = mergeEncounters(from)
    const toEncounters = mergeEncounters(to)
    const keep = fromEncounters.filter(value => toEncounters.includes(value));
    const add = toEncounters.filter(x => !keep.includes(x));
    const remove = fromEncounters.filter(x => !keep.includes(x));
    return {
        add: add,
        remove: remove,
        keep: keep
    }

}