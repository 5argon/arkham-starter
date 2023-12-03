import { CardClass } from '$lib/core/card-class'
import type { ExportOptions } from '$lib/proto/generated/export_options'
import { wrapColor, wrapSmall } from './ahdb-syntax'
import { mdCardAndInfo } from './md-card'
import { makeSimpleList } from './simple-list'
import {
	makeUpgradePlannerUrl,
	upgradeExportToProtoString,
	type UpgradeExport,
	type UpgradeExportRow,
} from './export-tools-center'
import type { UpgradeExportOptions } from '$lib/proto/generated/upgrade_export'

export function upgradeExportArkhamDb(
	uex: UpgradeExport,
	exportRows: UpgradeExportRow[],
	upgradeCode: string,
): string {
	const upgradeExportOptions: UpgradeExportOptions = uex.upgradeExportOptions
	const exportOptions: ExportOptions = uex.exportOptions
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
	const link = `<span class="small">[${upgradeExportOptions.showLinkText}](${makeUpgradePlannerUrl(
		upgradeExportToProtoString(uex),
	)})</span>`
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
	const noText = text.trim() === ''
	return (
		(topmost ? '' : emptyRow + '\n') +
		`|  | ${!noText ? '**' + text + '**' : ''} |  |  |  | ${xpCumulative} ${xpSuffix} |`
	)
}

function tableHeader(opt: UpgradeExportOptions): string {
	return `|  |  |  |  | ${nbsp + opt.headers?.costHeader ?? ''} | ${
		nbsp + opt.headers?.totalHeader ?? ''
	} |`
}
