import { CardClass } from '$lib/core/card-class'
import { makePips, makePipsStyle } from '$lib/design/interface/string-util'
import type { ExportOptions } from '$lib/proto/generated/export_options'
import { GlobalSettings_PipStyle } from '$lib/proto/generated/global_settings'
import {
	UpgradeExportProto,
	UpgradeExportRow as UpgradeExportRowProto,
	type UpgradeExportOptions,
} from '$lib/proto/generated/upgrade_export'
import { ahdbIcons, prefixClassIcons, wrapCard, wrapColor, wrapSmall } from './ahdb-syntax'
import { binaryToUrlString } from './options'
import { makeSimpleList } from './simple-list'

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

export interface UpgradeExportRow {
	mark: string
	cardLeft: ExportCard | null
	cardRight: ExportCard | null
	xp: number
	xpUnlocked: boolean
	xpCumulative: number
	xpCumulativeUnlocked: boolean
	divider: boolean
	dividerText: string
}

export interface UpgradeExport {
	/**
	 * This is not in the protobuf, since we need to only remember card IDs left and right.
	 */
	upgradeRows: UpgradeExportRow[]

	upgradeExportOptions: UpgradeExportOptions
	exportOptions: ExportOptions
	importDeckUrl: string
}

export function upgradeExportToProtoString(eo: UpgradeExport): string {
	const pp: UpgradeExportProto = {
		importDeckUrl: eo.importDeckUrl,
		exportOptions: eo.exportOptions,
		upgradeExportOptions: eo.upgradeExportOptions,
		upgradeRows: eo.upgradeRows.map<UpgradeExportRowProto>((x) => {
			return {
				cardLeft: x.cardLeft?.id ?? '',
				cardRight: x.cardRight?.id ?? '',
				cumulativeXp: x.xpCumulative,
				cumulativeXpUnlocked: x.xpCumulativeUnlocked,
				divider: x.divider,
				dividerText: x.dividerText,
				mark: x.mark,
				xp: x.xp,
				xpUnlocked: x.xpUnlocked,
			}
		}),
	}
	const p = UpgradeExportProto.create(pp)
	const uint = UpgradeExportProto.toBinary(p)
	return binaryToUrlString(uint)
}

function trimEndingEmpty(exportRows: UpgradeExportRow[]): UpgradeExportRow[] {
	let trimStart: number | null = null
	for (let i = exportRows.length - 1; i > 0; i--) {
		const r = exportRows[i]
		if (r.divider === false && r.cardLeft === null && r.cardRight === null) {
			trimStart = i
		} else {
			break
		}
	}
	if (trimStart !== null) {
		return [...exportRows].slice(0, trimStart)
	}
	return [...exportRows]
}

export function upgradeExport(uex: UpgradeExport): string {
	if (uex.upgradeExportOptions === undefined) {
		return ''
	}
	if (uex.exportOptions === undefined) {
		return ''
	}
	if (uex.upgradeRows === undefined) {
		return ''
	}
	const upgradeExportOptions: UpgradeExportOptions = uex.upgradeExportOptions
	const exportOptions: ExportOptions = uex.exportOptions
	let exportRows: UpgradeExportRow[] = uex.upgradeRows

	exportRows = trimEndingEmpty(exportRows)
	const upgradeCode = makeUpgradeCode(uex)
	let meat: string
	if (upgradeExportOptions.simpleList) {
		meat = makeSimpleList(upgradeExportOptions, exportOptions, exportRows)
	} else if (upgradeExportOptions.splitDivider) {
		const meats: string[] = []
		const agg: UpgradeExportRow[] = []
		for (let i = 0; i < exportRows.length; i++) {
			const r = exportRows[i]
			if (r.divider) {
				// When found a divider, perform generation of all the previous entries.
				if (agg.length > 0) {
					const subMeat = upgradeExportSubdivided(upgradeExportOptions, exportOptions, agg)
					meats.push(subMeat)
					agg.length = 0
				}
			}
			agg.push(r)
		}
		// Clear up all the remaining rows
		if (agg.length > 0) {
			const subMeat = upgradeExportSubdivided(upgradeExportOptions, exportOptions, agg)
			meats.push(subMeat)
			agg.length = 0
		}
		meat = meats.join('\n')
	} else {
		meat = upgradeExportSubdivided(upgradeExportOptions, exportOptions, exportRows)
	}
	const all: string[] = [meat, upgradeCode]
	if (!uex.upgradeExportOptions.simpleList) {
		all.push(comment)
	}
	return all.join('\n')
}

export function upgradeExportSubdivided(
	upgradeExportOptions: UpgradeExportOptions,
	exportOptions: ExportOptions,
	exportRows: UpgradeExportRow[],
): string {
	const rows = exportRows
		.filter((x) => x.divider || x.cardLeft !== null || x.cardRight !== null)
		.map((x, i) => {
			if (x.divider) {
				return dividerRow(x.dividerText, x.xpCumulative, upgradeExportOptions.xpSuffix, i === 0)
			} else {
				return upgradeExportRow(x, upgradeExportOptions, exportOptions)
			}
		})
	const all: string[] = [
		openComment,
		tableHeader(upgradeExportOptions),
		mdColumns,
		...rows,
		emptyRow,
		closeComment,
	]
	return all.join('\n')
}

function upgradeExportRow(
	row: UpgradeExportRow,
	ueo: UpgradeExportOptions,
	eo: ExportOptions,
): string {
	const mark = mdMarkColumn(row.mark)
	const leftCard = row.cardLeft !== null ? mdCardAndInfo(row.cardLeft, eo, ueo.ignoreSmall) : null
	const rightCard =
		row.cardRight !== null ? mdCardAndInfo(row.cardRight, eo, ueo.ignoreSmall) : null
	const arrow =
		row.cardLeft !== null && row.cardRight !== null
			? arrowColumn(row.cardLeft.cardName === row.cardRight.cardName, ueo)
			: arrowColumn(false, ueo)
	const xp = xpColumn(row.xp, ueo.xpSuffix)
	const xpCumulative = xpColumn(row.xpCumulative, ueo.xpSuffix)
	const all: string[] = ['', mark, leftCard ?? '', arrow, rightCard ?? '', xp, xpCumulative, '']
	return all.join('|')
}

const nbsp = '　'

const openComment = '[//]: # (==================== TABLE START ====================)'
const closeComment = '[//]: # (===================== TABLE END =====================)'
const comment = '[//]: # (=====================================================)'
const mdColumns = '|:-:|:--|:-:|:--|--:|--:|'
const emptyRow = '|　|  |  |  |  |  |'

function mdMarkColumn(mark: string): string {
	return nbsp + mark + nbsp
}

function arrowColumn(isUpgrade: boolean, opt: UpgradeExportOptions): string {
	const arrow = isUpgrade
		? wrapColor(opt.arrow?.character ?? '', CardClass.Survivor, null, null)
		: opt.arrow?.character ?? ''
	return nbsp + arrow + nbsp
}

function xpColumn(xp: number, xpSuffix: string): string {
	return wrapSmall(xp.toString() + ' ' + xpSuffix)
}

function dividerRow(
	text: string,
	xpCumulative: number,
	xpSuffix: string,
	topmost: boolean,
): string {
	return (
		(topmost ? '' : emptyRow + '\n') + `|  | **${text}** |  |  |  | ${xpCumulative} ${xpSuffix} |`
	)
}

function tableHeader(opt: UpgradeExportOptions): string {
	return `|  |  |  |  | ${nbsp + opt.headers?.costHeader ?? ''} | ${
		nbsp + opt.headers?.totalHeader ?? ''
	} |`
}

/**
 * Only a part of one row about the card.
 */
function mdCardAndInfo(card: ExportCard, opt: ExportOptions, ignoreSmall: boolean): string {
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
	const normalPips = wrapSmall(
		makePipsStyle(
			card.xp ?? 0,
			opt.globalSettings?.pipStyle ?? GlobalSettings_PipStyle.PipsReal,
			true,
			ignoreSmall,
		),
	)
	const tabooPips = wrapSmall(
		makePipsStyle(
			card.xpTaboo,
			opt.globalSettings?.pipStyle ?? GlobalSettings_PipStyle.PipsReal,
			true,
			ignoreSmall,
		),
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

function makeUpgradeCode(uex: UpgradeExport): string {
	if (uex.upgradeExportOptions.simpleList) {
		return ''
	}
	const proto = upgradeExportToProtoString(uex)

	// const rows = exportRows.map<string>((x) => {
	// 	const n = !x.divider
	// 	return [
	// 		n ? x.mark : '',
	// 		n ? '' : x.cardLeft?.id ?? '',
	// 		n ? '' : x.cardRight?.id ?? '',
	// 		n ? (x.xpUnlocked ? 1 : 0).toString() : 0,
	// 		n ? 0 : (x.xpCumulativeUnlocked ? 1 : 0).toString(),
	// 		x.xp.toString(),
	// 		x.xpCumulative.toString(),
	// 		n ? '' : x.dividerText,
	// 	].join(',')
	// })
	// const joined = rows.join('|')
	return `[//]: # (https://arkham-starters.com/guide-tools/upgrade?i=${proto})`
}
