import { CardClass } from '$lib/core/card-class'
import { makePips } from '$lib/design/interface/string-util'
import { PipStyle } from '../common/settings'
import { ahdbIcons, prefixClassIcons, wrapCard, wrapColor, wrapPips } from './ahdb-syntax'
import type { ExportOptions, UpgradeExportOptions } from './options'

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
	upgradeExportOptions: UpgradeExportOptions
	exportOptions: ExportOptions
	exportRows: UpgradeExportRow[]
}

export function upgradeExport(
	upgradeExportOptions: UpgradeExportOptions,
	exportOptions: ExportOptions,
	exportRows: UpgradeExportRow[],
): string {
	const upgradeCode = makeUpgradeCode(exportRows)
	let meat: string
	if (upgradeExportOptions.splitDivider) {
		const meats: string[] = []
		const agg: UpgradeExportRow[] = []
		for (let i = 0; i < exportRows.length; i++) {
			const r = exportRows[i]
			if (r.divider) {
				// When found a divider, perform generation of all the previous entries.
				const subMeat = upgradeExportSubdivided(upgradeExportOptions, exportOptions, agg)
				meats.push(subMeat)
				agg.length = 0
				// Then push this divider for the next round.
			}
			agg.push(r)
		}
		// Clear up all the remaining rows
		const subMeat = upgradeExportSubdivided(upgradeExportOptions, exportOptions, agg)
		meats.push(subMeat)
		meat = meats.join('\n')
	} else {
		meat = upgradeExportSubdivided(upgradeExportOptions, exportOptions, exportRows)
	}
	const all: string[] = [meat, upgradeCode, openClose]
	return all.join('\n')
}

export function upgradeExportSubdivided(
	upgradeExportOptions: UpgradeExportOptions,
	exportOptions: ExportOptions,
	exportRows: UpgradeExportRow[],
): string {
	const rows = exportRows.map((x, i) => {
		if (x.divider) {
			return dividerRow(x.dividerText, x.xpCumulative, upgradeExportOptions.xpSuffix, i === 0)
		} else {
			return upgradeExportRow(x, upgradeExportOptions, exportOptions)
		}
	})
	const all: string[] = [
		openClose,
		tableHeader(upgradeExportOptions),
		mdColumns,
		...rows,
		emptyRow,
		openClose,
	]
	return all.join('\n')
}

function upgradeExportRow(
	row: UpgradeExportRow,
	ueo: UpgradeExportOptions,
	eo: ExportOptions,
): string {
	if (row.cardLeft === null || row.cardRight === null) {
		return ''
	}
	const mark = mdMarkColumn(row.mark)
	const leftCard = mdCardAndInfo(row.cardLeft, eo)
	const arrow = arrowColumn(row.cardLeft.cardName === row.cardRight.cardName, ueo)
	const rightCard = mdCardAndInfo(row.cardRight, eo)
	const xp = xpColumn(row.xp, ueo.xpSuffix)
	const xpCumulative = xpColumn(row.xpCumulative, ueo.xpSuffix)
	const all: string[] = ['', mark, leftCard, arrow, rightCard, xp, xpCumulative, '']
	return all.join('|')
}

const nbsp = '　'

const openClose = '[//]: # (==========================================)'
const mdColumns = '|:-:|:--|:-:|:--|--:|--:|'
const emptyRow = '|　||||||'

function mdMarkColumn(mark: string): string {
	return nbsp + mark + nbsp
}

function arrowColumn(isUpgrade: boolean, opt: UpgradeExportOptions): string {
	const arrow = isUpgrade
		? wrapColor(opt.arrow.character, CardClass.Survivor, null, null)
		: opt.arrow.character
	return nbsp + arrow + nbsp
}

function xpColumn(xp: number, xpSuffix: string): string {
	return xp.toString() + ' ' + xpSuffix
}

function dividerRow(
	text: string,
	xpCumulative: number,
	xpSuffix: string,
	topmost: boolean,
): string {
	return (topmost ? '' : emptyRow + '\n') + `||||**${text}**||${xpCumulative} ${xpSuffix}|`
}

function tableHeader(opt: UpgradeExportOptions): string {
	return `|||||${nbsp + opt.headers.costHeader}|${nbsp + opt.headers.totalHeader}|`
}

/**
 * Only a part of one row about the card.
 */
function mdCardAndInfo(card: ExportCard, opt: ExportOptions): string {
	// WIP
	const justCard = mdJustcard(card, opt)
	return justCard
}

function mdJustcard(card: ExportCard, opt: ExportOptions): string {
	let cardName = card.cardName
	cardName = opt.cardOptions.bold ? `**${cardName}**` : cardName
	cardName = opt.cardOptions.color
		? wrapColor(cardName, card.class1, card.class2, card.class3)
		: cardName
	cardName = opt.cardOptions.link ? wrapCard(cardName, card.id) : cardName
	cardName =
		opt.globalOptions.pipStyle === PipStyle.Pips
			? `${cardName} ${wrapPips(makePips(card.xp ?? 0))}`
			: cardName
	cardName =
		opt.globalOptions.taboo && card.xpTaboo > 0
			? `${cardName} ${wrapPips(makePips(card.xpTaboo))}${ahdbIcons.tablet}`
			: cardName
	cardName =
		opt.cardOptions.exceptionalIcon &&
		((!opt.globalOptions.taboo && card.exceptional) ||
			(opt.globalOptions.taboo && card.exceptionalTaboo))
			? `${cardName}${ahdbIcons.elderSign}`
			: cardName
	cardName = opt.cardOptions.classIcons
		? prefixClassIcons(cardName, card.class1, card.class2, card.class3)
		: cardName
	return cardName
}

function makeUpgradeCode(exportRows: UpgradeExportRow[]): string {
	const rows = exportRows.map<string>((x) => {
		const n = !x.divider
		return [
			n ? x.mark : '',
			n ? '' : x.cardLeft?.id ?? '',
			n ? '' : x.cardRight?.id ?? '',
			n ? (x.xpUnlocked ? 1 : 0).toString() : 0,
			n ? 0 : (x.xpCumulativeUnlocked ? 1 : 0).toString(),
			x.xp.toString(),
			x.xpCumulative.toString(),
			n ? '' : x.dividerText,
		].join(',')
	})
	const joined = rows.join('|')
	return `[//]: # (https://arkham-starters.com/guide-tools/upgrade?import=${encodeURIComponent(
		joined,
	)})`
}
