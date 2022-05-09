import type { CardInfo, GlobalSettings, PipStyle } from '../common/settings'

export interface ExportOptions {
	globalOptions: GlobalSettings
	card: CardInfo
	pipStyle: PipStyle
	classIcons: boolean
	color: boolean
	idLink: boolean
	tabooIcon: boolean
	exceptionalIcon: boolean
}
