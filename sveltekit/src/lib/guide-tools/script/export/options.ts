import type { CardInfo, GlobalSettings, PipStyle } from '../common/settings'

export interface UpgradeExportOptions {
	costHeader: string
	totalHeader: string
	simpleList: boolean
	markColumn: boolean
	arrowCharacter: string
	xpColumn: boolean
	cumulativeXpColumn: boolean
}

export interface ExportOptions {
	globalOptions: GlobalSettings
	card: CardInfo
	pipStyle: PipStyle
	classIcons: boolean
	color: boolean
	bold: boolean
	link: boolean
	tabooIcon: boolean
	exceptionalIcon: boolean
}
