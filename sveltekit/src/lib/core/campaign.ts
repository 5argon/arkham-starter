export interface EncounterSet {
	name: string
	icon: string
	count: number
	flag?: EncounterSetFlag
}

export enum EncounterSetSorting {
	Default,
	Frequency,
	Alphabetical,
}

export enum EncounterSetFlag {
	Core,
	ReturnTo,
	Scenario,
}

export interface Campaign {
	name: string
	scenarioTransitions: ScenarioTransition[]
	commonEncounterSets?: EncounterSet[]
	startingChaosBag?: PerDifficultySettings<GameComponent[]>
	basicWeaknessTraits?: string[]
}

export interface Scenario {
	index: number
	name: string

	shuffles: EncounterSetItem[]
	setAsides?: EncounterSetItem[]
	gameComponents?: GameComponent[]
	gameComponentsPerDifficulty?: PerDifficultySettings<GameComponent[]>
}

export type EncounterSetItem = EncounterSet | EncounterSetWithModification

export interface EncounterSetWithModification {
	encounterSet: EncounterSet
	overwriteCount?: number
}

export function isEncounterSetWithModification(
	e: EncounterSetItem,
): e is EncounterSetWithModification {
	return 'encounterSet' in e
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
