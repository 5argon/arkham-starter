export interface ExportOptions {
	card: CardOptions
}

export interface ImportOptions {
	arrow: string
	suffix1Regex: string
	suffix2Regex: string
}

export interface CardOptions {
	taboo: boolean
	pips: boolean
	classIcon: boolean
	pipStyle: PipStyle
}

export enum PipStyle {
	None,
	Number,
	Pips,
}

export interface UpgradeTableData {
	rows: Row[]
	importOptions: ImportOptions
	exportOptions: ExportOptions
}

export interface Row {
	mark: string
	left: string | null
	right: string | null
	xp: number
	divider: boolean
	dividerText: string
	carryoverXp: number
	xpUnlock: boolean
	dividerXpCumulativeUnlock: boolean
}

export interface GlobalSettings {
	taboo: boolean
}

export interface TableSettings {
	/**
	 * Hides the arrow, right column, and both XP calculation columns.
	 * Button to add to left right turns into a single button.
	 * Automatically turn on card image due to increased space.
	 */
	singleColumnMode: boolean

	cardInfos: CardInfo[]
}

export enum CardInfo {
	PlayCost,
	CommitIcons,
	Traits,
}

export const defaultGlobalSettings: GlobalSettings = {
	taboo: true,
}
