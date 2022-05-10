import type { CardClass } from '$lib/core/card-class'
import { makePips } from '$lib/design/interface/string-util'
import { PipStyle } from '../common/settings'
import { ahdbIcons, prefixClassIcons, wrapCard, wrapColor } from './ahdb-syntax'
import type { ExportOptions } from './options'

export interface ExportCard {
	cardName: string
	id: string
	class1: CardClass
	class2: CardClass | null
	class3: CardClass | null
	xp: number | null
	xpTaboo: number
	exceptional: boolean
	exceptionalTaboo: boolean
	cost: number | null
	skillCombat: number | null
	skillIntellect: number | null
	skillAgility: number | null
	skillWillpower: number | null
	skillWild: number | null
	traits: string[]
}

/**
 * Only a part of one row about the card.
 */
export function mdCardAndInfo(card: ExportCard, opt: ExportOptions): string {
	// WIP
	const justCard = mdJustcard(card, opt)
	return justCard
}

export function mdJustcard(card: ExportCard, opt: ExportOptions): string {
	let cardName = card.cardName
	cardName = opt.bold ? `**${cardName}**` : cardName
	cardName =
		opt.pipStyle === PipStyle.Pips
			? ` ${makePips(card.xp ?? 0)} ${makePips(card.xpTaboo)}`
			: cardName
	cardName =
		opt.globalOptions.taboo && card.xpTaboo > 0
			? ` ${makePips(card.xpTaboo)}${ahdbIcons.tablet}`
			: cardName
	cardName =
		opt.exceptionalIcon &&
		((!opt.globalOptions.taboo && card.exceptional) ||
			(opt.globalOptions.taboo && card.exceptionalTaboo))
			? `${ahdbIcons.elderSign}`
			: cardName
	cardName = opt.color ? wrapColor(cardName, card.class1, card.class2, card.class3) : cardName
	cardName = opt.link ? wrapCard(cardName, card.id) : cardName
	cardName = opt.classIcons
		? prefixClassIcons(cardName, card.class1, card.class2, card.class3)
		: cardName
	return cardName
}
