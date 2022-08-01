import { CardClass } from '$lib/core/card-class'
import type { Row } from '$lib/tool/upgrade/interface'
import type { ExportOptions } from '$lib/proto/generated/export_options'
import {
	UpgradeExportProto,
	UpgradeExportRow as UpgradeExportRowProto,
	type UpgradeExportOptions,
} from '$lib/proto/generated/upgrade_export'
import { wrapColor, wrapSmall } from './ahdb-syntax'
import { mdCardAndInfo } from './md-card'
import { base64ToBinary, binaryToUrlString } from './options'
import { makeSimpleList } from './simple-list'
import { extractDeckFromUrl } from '$lib/ahdb/public-api/high-level'

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

export interface RestoreResult {
	rows: Row[]
	upgradeExportOptions: UpgradeExportOptions
	exportOptions: ExportOptions
	importDeckUrl: string
}

export function protoStringRestore(s: string): RestoreResult {
	let pt: UpgradeExportProto
	try {
		pt = UpgradeExportProto.fromBinary(base64ToBinary(s))
	} catch (e) {
		console.log(e)
		return {
			exportOptions: {},
			importDeckUrl: '',
			rows: [],
			upgradeExportOptions: {
				upgradeUrl: true,
				ignoreSmall: false,
				simpleList: false,
				splitDivider: false,
				xpSuffix: 'XP',
				showLink: true,
				showLinkText: "(View at arkham-starter.com)"
			},
		}
	}
	return {
		exportOptions: pt.exportOptions ?? {},
		importDeckUrl: pt.importDeckUrl,
		upgradeExportOptions: pt.upgradeExportOptions ?? {
			upgradeUrl: true,
			ignoreSmall: false,
			simpleList: false,
			splitDivider: false,
			xpSuffix: 'XP',
			showLink: true,
			showLinkText: "(View at arkham-starter.com)"
		},
		rows: pt.upgradeRows.map((x) => {
			return {
				carryoverXp: x.cumulativeXp,
				divider: x.divider,
				dividerText: x.dividerText,
				dividerXpCumulativeUnlock: x.cumulativeXpUnlocked,
				left: x.cardLeft,
				mark: x.mark,
				right: x.cardRight,
				xp: x.xp,
				xpUnlock: x.xpUnlocked,
			}
		}),
	}
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
				rightCustom: false,
				rightCustomText: "",
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
					const subMeat = upgradeExportSubdivided(uex, upgradeExportOptions, exportOptions, agg)
					meats.push(subMeat)
					agg.length = 0
				}
			}
			agg.push(r)
		}
		// Clear up all the remaining rows
		if (agg.length > 0) {
			const subMeat = upgradeExportSubdivided(uex, upgradeExportOptions, exportOptions, agg)
			meats.push(subMeat)
			agg.length = 0
		}
		meat = meats.join('\n')
	} else {
		meat = upgradeExportSubdivided(uex, upgradeExportOptions, exportOptions, exportRows)
	}
	const all: string[] = [meat]
	if (!uex.upgradeExportOptions.showLink) {
		all.push(upgradeCode)
		if (!uex.upgradeExportOptions.simpleList) {
			all.push(comment)
		}
	}
	return all.join('\n')
}

export function upgradeExportSubdivided(
	uex: UpgradeExport,
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
	const link = `<span class="small">[${upgradeExportOptions.showLinkText}](${makeUpgradePlannerUrl(upgradeExportToProtoString(uex))})</span>`
	const all: string[] = [
		openComment,
		tableHeader(upgradeExportOptions),
		mdColumns,
		...rows,
		upgradeExportOptions.showLink ? link : emptyRow,
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
	const all: string[] = ['', mark, leftCard ?? '  ', arrow, rightCard ?? '  ', xp, xpCumulative, '']
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
		(topmost ? '' : emptyRow + '\n') +
		`|  | ${text !== '' ? '**' + text + '**' : ''} |  |  |  | ${xpCumulative} ${xpSuffix} |`
	)
}

function tableHeader(opt: UpgradeExportOptions): string {
	return `|  |  |  |  | ${nbsp + opt.headers?.costHeader ?? ''} | ${nbsp + opt.headers?.totalHeader ?? ''
		} |`
}

function makeUpgradeCode(uex: UpgradeExport): string {
	if (uex.upgradeExportOptions.simpleList) {
		return ''
	}
	const extract = extractDeckFromUrl(uex.importDeckUrl)
	const uexd: UpgradeExport = {
		...uex,
		importDeckUrl: (extract.published ? 'p:' : '') + extract.deck,
	}
	const proto = upgradeExportToProtoString(uexd)

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
	return `[//]: # (${makeUpgradePlannerUrl(proto)})`
}

export function makeUpgradePlannerUrl(proto: string): string {
	return `https://arkham-starter.com/tool/upgrade?i=${proto}`
}
