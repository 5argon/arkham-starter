import { EncounterSetFlag, isEncounterSetWithModification, type Campaign, type EncounterSet, type Scenario, type ScenarioTransition } from "$lib/core/campaign"

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
            mergeEncounters(x.from).forEach(y => {
                result.push(y)
            })
        }
        if (x.to !== null) {
            mergeEncounters(x.to).forEach(y => {
                result.push(y)
            })
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
    removeToForesight: EncounterSet[]
    addToForesight: EncounterSet[]
}

function mergeEncounters(s: Scenario | null): EncounterSet[] {
    if (s === null) {
        return []
    }
    const es: EncounterSet[] = []
    s.encounterSets.forEach(x => {
        if (isEncounterSetWithModification(x)) {
            es.push(x.encounterSet)
        } else {
            es.push(x)
        }
    })
    if (s.encounterSetsSecondary !== undefined) {
        s.encounterSetsSecondary.forEach(x => {
            if (isEncounterSetWithModification(x)) {
                es.push(x.encounterSet)
            } else {
                es.push(x)
            }
        })
    }
    return es
}

export function filterPossibleTransitions(allTransitions: ScenarioTransition[], currentScenario: Scenario): ScenarioTransition[] {
    return allTransitions.filter(x => x.from === currentScenario)
}

export function makeTransitionInfo(from: Scenario | null, to: Scenario, foresight: Scenario | null): TransitionInfo {
    const fromEncounters = mergeEncounters(from)
    const toEncounters = mergeEncounters(to)
    const keep = fromEncounters.filter(x => toEncounters.includes(x));
    const add = toEncounters.filter(x => !keep.includes(x));
    let remove = fromEncounters.filter(x => !keep.includes(x));
    let addToForesight: EncounterSet[] = []
    let removeToForesight: EncounterSet[] = []
    if (foresight !== null) {
        const nextNextEncounters = mergeEncounters(foresight)
        const nextNextDiffKeep = nextNextEncounters.filter(x => !keep.includes(x));
        const nextNextDiffAdd = nextNextDiffKeep.filter(x => !add.includes(x));
        removeToForesight = nextNextDiffAdd.filter(x => remove.includes(x));
        remove = remove.filter(x => !removeToForesight.includes(x));
        addToForesight = nextNextDiffAdd.filter(x => !removeToForesight.includes(x));
    }
    const res: TransitionInfo = {
        add: add,
        remove: remove,
        keep: keep,
        addToForesight: addToForesight,
        removeToForesight: removeToForesight

    }
    return res
}

export function findForesightChoices(c: Campaign, t: ScenarioTransition): Scenario[] {
    const nextNextTransitions = c.scenarioTransitions.filter(x => x.from === t.to)
    const allForesights = nextNextTransitions.map(x => x.to)
    const dedupe = new Set<Scenario>()
    allForesights.forEach(x => dedupe.add(x))
    return Array.from(dedupe)
}