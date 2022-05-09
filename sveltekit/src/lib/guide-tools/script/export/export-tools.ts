import type { CardClass } from '$lib/core/card-class'
import type { ExportOptions } from './options'

export interface ExportCard {
	cardName: string
	class1: CardClass
	class2: CardClass | null
	class3: CardClass | null
	xp: number
	xpTaboo: number
	exceptional: boolean
}

export function MdRow(card: ExportCard, opt: ExportOptions): string {}
