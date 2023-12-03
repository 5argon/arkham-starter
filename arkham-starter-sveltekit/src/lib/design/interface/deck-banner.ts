import type { CardClass } from '$lib/core/card-class'
import type { CommitIcon } from '$lib/core/commit-icon'

export interface ChosenCards {
	title: string
	cards: string[]
}

export interface ChosenSkills {
	title: string
	skills: CommitIcon[]
}

export interface ChosenClasses {
	title: string
	classes: CardClass[]
}

export interface ChosenNumber {
	title: string
	number: number
}

export interface ChosenTraits {
	title: string
	traits: string[]
}

export interface DeckDistribution {
	title: string
	distributions: DeckDistributionItem[]
}

export interface DeckDistributionItem {
	item: CardClass | string
	amount: number
}

export interface XpDistributionData {
	title: string
	item: CardClass | string
	level1?: number
	level2?: number
	level3?: number
	level4?: number
	level5?: number
}
