import type { CardInfoType } from '../script/common/settings'

export interface Row {
	rowId: number
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

export interface TableSettings {
	/**
	 * Hides the arrow, right column, and both XP calculation columns.
	 * Button to add to left right turns into a single button.
	 * Automatically turn on card image due to increased space.
	 */
	singleColumnMode: boolean

	cardInfos: CardInfoType[]
}
