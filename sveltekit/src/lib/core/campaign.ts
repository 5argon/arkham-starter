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
    startingChaosBag?: PerDifficultySettings<CoreGameComponent[]>
}

export interface Scenario {
    name: string

    /**
     * First element assumed to be scenario's unique encounter set.
     */
    encounterSets: EncounterSet[]
    encounterSetsSecondary?: EncounterSet[]
    coreGameComponents?: CoreGameComponent[]
    coreGameComponentsPerDifficulty?: PerDifficultySettings<CoreGameComponent[]>
}

export interface PerDifficultySettings<T> {
    easy?: T
    standard?: T
    hard?: T
    expert?: T
}

export enum CoreGameComponent {
    TokenP1,
    Token0,
    TokenM1,
    TokenM2,
    TokenM3,
    TokenM4,
    TokenM5,
    TokenM6,
    TokenM7,
    TokenM8,
    TokenSkull,
    TokenCultist,
    TokenTablet,
    TokenElderThing,
    TokenAutofail,
    TokenElderSign,
    TokenFrost,
}

export interface ScenarioTransition {
    /**
     * Use `null` on the first scenario.
     */
    from: Scenario | null

    to: Scenario
}