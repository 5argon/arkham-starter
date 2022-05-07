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

export const defaultGlobalSettings: GlobalSettings = {
	taboo: true,
}
