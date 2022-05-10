import type { CardInfo, CardOptions, GlobalSettings } from '../common/settings'

export interface UpgradeExportOptions {
	simpleList: boolean
	splitDivider: boolean
	xpSuffix: string
	ignoreSmall: boolean
	arrow: {
		character: string
		boldUpgrade: boolean
	}
	headers: {
		costHeader: string
		totalHeader: string
	}
	columns: {
		markColumn: boolean
		xpColumn: boolean
		cumulativeXpColumn: boolean
	}
}

export interface ExportOptions {
	globalOptions: GlobalSettings
	cardInfo: CardInfo
	cardOptions: CardOptions
}
