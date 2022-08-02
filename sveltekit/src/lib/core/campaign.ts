export interface EncounterSet {
    name: string
    icon: string
    count: number
    flag?: EncounterSetFlag
    startingEncounterDeckCount?: number
}

export enum EncounterSetFlag {
    Core,
    ReturnTo
}

export interface Campaign {
    name: string,
    scenarioTransitions: ScenarioTransition[]
    commonEncounterSets?: EncounterSet[]
}

export interface Scenario {
    name: string

    /**
     * First element assumed to be scenario's unique encounter set.
     */
    encounterSets: EncounterSet[]
    encounterSetsSecondary?: EncounterSet[]
}

export interface ScenarioTransition {
    /**
     * Use `null` on the first scenario.
     */
    from: Scenario | null

    to: Scenario
}