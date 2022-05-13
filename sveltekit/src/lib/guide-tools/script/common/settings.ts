// import type {
// 	CardInfo_CardInfoType,
// 	CardInfo_CommitOptions_CommitIcon,
// } from '$lib/proto/generated/card_info'
// import { GlobalSettings_PipStyle } from '$lib/proto/generated/global_settings'

// /**
//  * Options that many place would like to know.
//  */
// export interface GlobalSettings {
// 	/**
// 	 * Implies using the latest taboo.
// 	 */
// 	taboo: boolean

// 	pipStyle: GlobalSettings_PipStyle
// }

// export interface CardInfo {
// 	/**
// 	 * The information appended is ordered the same as this array.
// 	 */
// 	cardInfoTypes: CardInfo_CardInfoType[]
// 	traitOptions: TraitOptions
// 	commitOptions: CommitOptions
// }

// export interface CardOptions {
// 	classIcons: boolean
// 	color: boolean
// 	bold: boolean
// 	link: boolean
// 	tabooIcon: boolean
// 	exceptionalIcon: boolean
// }

// export interface TraitOptions {
// 	/**
// 	 * If not `null`, this trait is sorted in front.
// 	 * All other traits are made less significant or may disappear.
// 	 */
// 	highlight: string | undefined
// }

// export interface CommitOptions {
// 	/**
// 	 * Highlight this icon followed by wild icons.
// 	 * All other icons are faded and ordered later.
// 	 */
// 	highlight: CardInfo_CommitOptions_CommitIcon | undefined
// }

// export const defaultGlobalSettings: GlobalSettings = {
// 	taboo: true,
// 	pipStyle: GlobalSettings_PipStyle.Pips,
// }
