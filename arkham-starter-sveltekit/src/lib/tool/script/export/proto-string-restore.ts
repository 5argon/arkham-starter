import type { ExportOptions } from '$lib/proto/generated/export_options'
import {
	type UpgradeExportOptions,
	UpgradeExportOptions_UpgradeExportStyle,
	UpgradeExportProto,
} from '$lib/proto/generated/upgrade_export'
import type { Row } from '$lib/tool/upgrade/interface'

import { base64ToBinary } from './options'

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
				showLinkText: '(View at arkham-starter.com)',
				upgradeExportStyle: UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb,
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
			showLinkText: '(View at arkham-starter.com)',
			upgradeExportStyle: UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb,
		},
		rows: pt.upgradeRows.map<Row>((x) => {
			const r: Row = {
				carryoverXp: x.cumulativeXp,
				divider: x.divider,
				dividerText: x.dividerText,
				dividerXpCumulativeUnlock: x.cumulativeXpUnlocked,
				left: x.cardLeft,
				mark: x.mark,
				right: x.cardRight,
				xp: x.xp,
				xpUnlock: x.xpUnlocked,
				custom: x.rightCustom,
				customizationChoice: x.rightCustomChoice,
			}
			return r
		}),
	}
}
