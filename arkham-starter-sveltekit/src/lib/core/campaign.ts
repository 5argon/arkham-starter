import type { CardPack } from './card-pack'

export interface EncounterSet {
	name: string
	icon: string
	count: number
	flag?: EncounterSetFlag
}

export enum EncounterSetSorting {
	Alphabetical,
	Frequency,
}

export enum EncounterSetFlag {
	Core,
	ReturnTo,
	Scenario,
}

export interface Campaign {
	name: string
	scenarios: Scenario[]
	commonEncounterSets?: EncounterSet[]
	startingChaosBag?: PerDifficultySettings<GameComponent[]>
	setupReferenceGraphic?: string
	investigatorExpansion?: CardPack
}

export interface Scenario {
	index: number
	name: string
	shortName?: string
	diagram?: string

	setups: ScenarioSetup[]
	commonSetup?: ScenarioSetupSub
}

export type ScenarioSetup = {
	name?: string
	shuffles: EncounterSetItem[]
	remaining?: EncounterSetItem[]
} & ScenarioSetupSub

export interface ScenarioSetupSub {
	notes?: ScenarioNote[]
	specialGather?: EncounterSetItem[]
	additionalWeakness?: AdditionalWeakness[]
	gameComponents?: GameComponent[]
	gameComponentsPerDifficulty?: PerDifficultySettings<GameComponent[]>
}

export interface ScenarioNote {
	encounterSet?: EncounterSet
	what: string
	topic?: string
}

export interface AdditionalWeakness {
	trait: string
}

export type EncounterSetItem = EncounterSet | EncounterSetWithModification

export interface EncounterSetWithModification {
	encounterSet: EncounterSet
	overwriteCount?: number
	what?: string[]
}

export function isEncounterSetWithModification(
	e: EncounterSetItem,
): e is EncounterSetWithModification {
	return 'encounterSet' in e
}

export function getEncounterInsideItem(e: EncounterSetItem) {
	if (isEncounterSetWithModification(e)) {
		return e.encounterSet
	} else {
		return e
	}
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
