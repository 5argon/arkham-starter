import { makePipsStyle } from '$lib/design/interface/string-util'
import type { ExportOptions } from '$lib/proto/generated/export_options'
import { GlobalSettings_PipStyle } from '$lib/proto/generated/global_settings'
import { ahdbIcons, prefixClassIcons, wrapCard, wrapColor, wrapSmall } from './ahdb-syntax'
import type { ExportCard } from './export-tools'

/**
 * Only a part of one row about the card.
 */
export function mdCardAndInfo(card: ExportCard, opt: ExportOptions, ignoreSmall: boolean): string {
	// WIP
	const justCard = mdJustcard(card, opt, ignoreSmall)
	return justCard
}

function mdJustcard(card: ExportCard, opt: ExportOptions, ignoreSmall: boolean): string {
	let cardName = card.cardName
	cardName = opt.cardOptions?.bold ?? false ? `**${cardName}**` : cardName
	cardName =
		opt.cardOptions?.color ?? true
			? wrapColor(cardName, card.class1, card.class2, card.class3, !ignoreSmall)
			: cardName
	cardName = opt.cardOptions?.link ?? true ? wrapCard(cardName, card.id) : cardName
	const normalPips = makePipsStyle(
		card.xp ?? 0,
		opt.globalSettings?.pipStyle ?? GlobalSettings_PipStyle.PipsReal,
		true,
		ignoreSmall,
	)
	const tabooPips = makePipsStyle(
		card.xpTaboo,
		opt.globalSettings?.pipStyle ?? GlobalSettings_PipStyle.PipsReal,
		true,
		ignoreSmall,
	)
	cardName =
		(opt.globalSettings?.pipStyle ?? GlobalSettings_PipStyle.PipsReal) !==
		GlobalSettings_PipStyle.None
			? `${cardName} ${normalPips}`
			: cardName
	cardName =
		(opt.globalSettings?.taboo ?? true) && card.xpTaboo > 0
			? `${cardName} ${tabooPips}${ahdbIcons.tablet}`
			: cardName
	cardName =
		(opt.cardOptions?.exceptionalIcon ?? true) &&
		((!(opt.globalSettings?.taboo ?? true) && card.exceptional) ||
			((opt.globalSettings?.taboo ?? true) && card.exceptionalTaboo))
			? `${cardName}${ahdbIcons.elderSign}`
			: cardName
	cardName =
		opt.cardOptions?.classIcons ?? true
			? prefixClassIcons(cardName, card.class1, card.class2, card.class3)
			: cardName
	return cardName
}
