export interface EncounterSet {
    name: string
    icon: string
    count: number
    flag?: EncounterSetFlag
    startingEncounterDeckCount?: number
}

export enum EncounterSetFlag {
    Core,
    ReturnTo,
    Scenario
}

export interface Campaign {
    name: string,
    scenarioTransitions: ScenarioTransition[]
    commonEncounterSets?: EncounterSet[]
    startingChaosBag?: PerDifficultySettings<GameComponent[]>
}

export interface Scenario {
    index: number
    name: string

    /**
     * First element assumed to be scenario's unique encounter set.
     */
    encounterSets: EncounterSetItem[]
    encounterSetsSecondary?: EncounterSetItem[]
    gameComponents?: GameComponent[]
    gameComponentsPerDifficulty?: PerDifficultySettings<GameComponent[]>
}

export type EncounterSetItem = EncounterSet | EncounterSetWithModification

export interface EncounterSetWithModification {
    encounterSet: EncounterSet,
    subtractCount?: number
    overwriteCount?: number
}

export function isEncounterSetWithModification(e: EncounterSetItem)
    : e is EncounterSetWithModification {
    return "encounterSet" in e
}

export interface PerDifficultySettings<T> {
    easy?: T
    standard?: T
    hard?: T
    expert?: T
}

export enum GameComponent {
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
    Seal1,
    Seal2,
    Seal3,
    Seal4,
    Seal5,
}

export interface ScenarioTransition {
    /**
     * Use `null` on the first scenario.
     */
    from: Scenario | null

    to: Scenario
}