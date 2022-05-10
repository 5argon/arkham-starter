import type { CommitIcon } from '$lib/core/commit-icon'

export enum PipStyle {
	None,
	Number,
	Pips,
}

/**
 * Options that many place would like to know.
 */
export interface GlobalSettings {
	/**
	 * Implies using the latest taboo.
	 */
	taboo: boolean

	pipStyle: PipStyle
}

/**
 * Total kind of information that could be appended to the right of card span in
 * tabular fashion.
 */
export enum CardInfoType {
	PlayCost,
	CommitIcons,
	Traits,
}

export interface CardInfo {
	/**
	 * The information appended is ordered the same as this array.
	 */
	cardInfoTypes: CardInfo[]
	traitOptions: TraitOptions
	commitOptions: CommitOptions
}

export interface CardOptions {
	classIcons: boolean
	color: boolean
	bold: boolean
	link: boolean
	tabooIcon: boolean
	exceptionalIcon: boolean
}

export interface TraitOptions {
	/**
	 * If not `null`, this trait is sorted in front.
	 * All other traits are made less significant or may disappear.
	 */
	highlight: string | null
}

export interface CommitOptions {
	/**
	 * Highlight this icon followed by wild icons.
	 * All other icons are faded and ordered later.
	 */
	highlight: CommitIcon | null
}

export const defaultGlobalSettings: GlobalSettings = {
	taboo: true,
	pipStyle: PipStyle.Pips,
}
