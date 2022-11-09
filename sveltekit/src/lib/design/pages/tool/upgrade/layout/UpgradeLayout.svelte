<script lang="ts">
	import { fetchPopupDatabase, PopupDatabase } from '$lib/core/popup-database'

	import BigRightSider from '$lib/design/components/layout/BigRightSider.svelte'

	import StagingArea from '../staging-area/StagingArea.svelte'
	import UpgradeTable from '../upgrade-table/UpgradeTable.svelte'
	import type { ToolbarEvents } from '$lib/tool/upgrade/upgrade-table/table-events'
	import type {
		TableRowActionEvents,
		TableRowEditEvents,
	} from '$lib/tool/upgrade/upgrade-table/row-events'
	import {
		oneSideMoveDown,
		oneSideMoveUp,
		rowMoveDown,
		rowMoveUp,
		createRow,
		addCardToList,
		rowMoveFromTo,
		customizationCycle,
	} from '$lib/tool/upgrade/upgrade-table/row-operations'
	import SpinnerSpan from '$lib/design/components/basic/SpinnerSpan.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import type { Row } from '$lib/tool/upgrade/interface'
	import Modal from '$lib/design/components/layout/Modal.svelte'
	import UpgradeExportModalContent from '../export/UpgradeExportModalContent.svelte'
	import { calculateXps, type CalculatedXp } from '$lib/tool/upgrade/upgrade-table/xp-calculate'
	import {
		UpgradeExportOptions_SimpleListOptions_BlockStyle,
		UpgradeExportOptions_UpgradeExportStyle,
		type UpgradeExportOptions,
	} from '$lib/proto/generated/upgrade_export'
	import { GlobalSettings, GlobalSettings_PipStyle } from '$lib/proto/generated/global_settings'
	import type { ExportOptions } from '$lib/proto/generated/export_options'
	import { CardInfo_CommitOptions_CommitIcon } from '$lib/proto/generated/card_info'
	import type { ExportCard, UpgradeExportRow } from '$lib/tool/script/export/export-tools-center'
	import { protoStringRestore } from '$lib/tool/script/export/proto-string-restore'
	import { isRandomBasicWeakness } from '$lib/ahdb/card'

	/**
	 * Make a new page with this as true so it is just a list instead of upgrade planner.
	 */
	export let singleMode: boolean = false
	export let pageTitle: string
	export let helpMd: string
	export let importProto: string | null = null

	let importText: string = ''
	let globalSettings: GlobalSettings
	$: globalSettings = {
		pipStyle: singleMode ? GlobalSettings_PipStyle.PipsReal : GlobalSettings_PipStyle.Pips,
		taboo: true,
	}
	let stagingCards1: string[] = []
	let stagingCards2: string[] = []
	let stagingCards3: string[] = []
	let stagingAmounts1: (number | null)[] = []
	let stagingAmounts2: (number | null)[] = []
	let stagingAmounts3: (number | null)[] = []

	function rowToExportRow(
		r: Row,
		i: number,
		pdb: PopupDatabase,
		c: CalculatedXp,
	): UpgradeExportRow {
		function mpdb(c: string | null, pdb: PopupDatabase): ExportCard | null {
			if (c === null) {
				return null
			}
			const ca = pdb.getById(c)
			if (ca === null) {
				return null
			}
			return {
				cardName: ca.original.n,
				class1: ca.class1,
				class2: ca.class2 ?? null,
				class3: ca.class3 ?? null,
				cost: ca.original.cs ?? null,
				exceptional: ca.original.ex,
				exceptionalTaboo: ca.original.ext,
				id: ca.original.id,
				skillAgility: ca.original.sag ?? null,
				skillCombat: ca.original.scm ?? null,
				skillIntellect: ca.original.sit ?? null,
				skillWild: ca.original.swl ?? null,
				skillWillpower: ca.original.swi ?? null,
				traits: ca.traits,
				xp: ca.original.xp ?? null,
				xpTaboo: ca.original.xpat,
				customizable: ca.original.cus !== undefined,
				showingCustomizableChoice: r.custom,
				customizableChoiceIndex: r.customizationChoice,
				customizableChoiceBoxes: ca.original.cus?.[r.customizationChoice].xp ?? 0,
				customizableChoiceName: ca.original.cus?.[r.customizationChoice].n ?? '',
			}
		}
		return {
			cardLeft: mpdb(r.left, pdb),
			cardRight: mpdb(r.right, pdb),
			divider: r.divider,
			dividerText: r.dividerText,
			mark: r.mark,
			xp: c.costs[i],
			xpCumulative: c.cumulatives[i],
			xpCumulativeUnlocked: r.dividerXpCumulativeUnlock,
			xpUnlocked: r.xpUnlock,
		}
	}

	let rows: Row[] = []
	let exportRows: UpgradeExportRow[] = []

	let showingExportModal: boolean = false

	const toolbarEvents: ToolbarEvents = {
		onAddCardRow: () => {
			rows = [...rows, createRow(false)]
		},
		onAddDividerRow: () => {
			rows = [...rows, createRow(true)]
		},
		onClear: () => {
			rows = []
		},
		onExportMarkdown: (pdb: PopupDatabase) => {
			const calc = calculateXps(pdb, rows, globalSettings)
			exportRows = rows.map((x, i) => rowToExportRow(x, i, pdb, calc))
			showingExportModal = true
		},
		onTabooToggle: (tabooOn: boolean) => {
			globalSettings = { ...globalSettings, taboo: tabooOn }
		},
	}
	const rowActionEvents: TableRowActionEvents = {
		onDelete: (i) => {
			rows.splice(i, 1)
			rows = [...rows]
		},
		onDeleteLeft: (i) => {
			rows[i].left = null
			rows = [...rows]
		},
		onDeleteRight: (i) => {
			rows[i].right = null
			rows = [...rows]
		},
		onMoveDown: (i) => {
			rows = rowMoveDown(rows, i)
		},
		onMoveUp: (i) => {
			rows = rowMoveUp(rows, i)
		},
		onMoveDownLeft: (i) => {
			rows = oneSideMoveDown(rows, i, false)
		},
		onMoveDownRight: (i) => {
			rows = oneSideMoveDown(rows, i, true)
		},
		onMoveUpLeft: (i) => {
			rows = oneSideMoveUp(rows, i, false)
		},
		onMoveUpRight: (i) => {
			rows = oneSideMoveUp(rows, i, true)
		},
	}
	let rowEditEvents: TableRowEditEvents = {
		onCarryoverXpChanged: (i, n) => {
			rows[i].carryoverXp = n
		},
		onDividerChanged: (i, n) => {
			rows[i].divider = n
		},
		onDividerTextChanged: (i, n) => {
			rows[i].dividerText = n
		},
		onLeftChanged: (i, n) => {
			rows[i].left = n
		},
		onRightChanged: (i, n) => {
			rows[i].right = n
		},
		onLoseFocus: (i) => {
			// do nothing
		},
		onMarkChanged: (i, n) => {
			rows[i].mark = n
		},
		onXpChanged: (i, n) => {
			rows[i].xp = n
		},
		onXpCumulativeLockChanged: (i, n, c) => {
			if (n) {
				rows[i].carryoverXp = c
			}
			rows[i].dividerXpCumulativeUnlock = n
		},
		onXpLockChanged: (i, n, c) => {
			if (n) {
				rows[i].xp = c
			}
			rows[i].xpUnlock = n
		},
		onDropSwap: (fi, fr, c, ti, tr) => {
			if (fi === -1) {
				// Add
				if (tr) {
					rows[ti].right = c
				} else {
					rows[ti].left = c
				}
			} else {
				// Swap
				if (fr) {
					if (tr) {
						{
							const take = rows[fi].right
							rows[fi].right = rows[ti].right
							rows[ti].right = take
						}

						// Right to right also swaps customizations
						{
							const take = rows[fi].custom
							rows[fi].custom = rows[ti].custom
							rows[ti].custom = take
						}
						{
							const take = rows[fi].customizationChoice
							rows[fi].customizationChoice = rows[ti].customizationChoice
							rows[ti].customizationChoice = take
						}
					} else {
						const take = rows[fi].right
						rows[fi].right = rows[ti].left
						rows[ti].left = take
					}
				} else {
					if (tr) {
						const take = rows[fi].left
						rows[fi].left = rows[ti].right
						rows[ti].right = take

						// Left to right resets customization options.
						rows[ti].custom = false
						rows[ti].customizationChoice = 0
					} else {
						const take = rows[fi].left
						rows[fi].left = rows[ti].left
						rows[ti].left = take
					}
				}
			}
			rows = rows
		},
		onCustomizationCycle: (i, pdb) => {
			// Customization cycling is always on the right side.
			const right = rows[i].right
			if (right !== null) {
				const rightCard = pdb.getById(right)
				if (rightCard !== null) {
					const customizationOptions = rightCard.original.cus
					if (customizationOptions !== undefined) {
						rows[i] = customizationCycle(rows[i], customizationOptions.length)
					}
				}
			}
		},
	}

	let popupDatabase = fetchPopupDatabase()
	let collapse: boolean = true

	let upgradeExportOptions: UpgradeExportOptions = {
		upgradeUrl: true,
		arrow: {
			character: '→',
			highlightUpgrade: true,
		},
		columns: {
			cumulativeColumn: true,
			markColumn: true,
			xpColumn: true,
		},
		headers: {
			costHeader: 'Cost',
			totalHeader: 'Total',
		},
		ignoreSmall: false,
		simpleList: singleMode,
		splitDivider: false,
		xpSuffix: 'XP',
		simpleListOptions: {
			blockStyle: UpgradeExportOptions_SimpleListOptions_BlockStyle.A,
		},
		showLink: true,
		showLinkText: '(View at arkham-starter.com)',
		upgradeExportStyle: UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb,
	}
	let exportOptions: ExportOptions
	$: exportOptions = {
		cardInfo: {
			cardInfoTypes: [],
			commitOptions: { highlight: CardInfo_CommitOptions_CommitIcon.Unknown },
			traitOptions: { highlight: '' },
		},
		cardOptions: {
			bold: singleMode ? true : false,
			classIcons: true,
			color: true,
			exceptionalIcon: true,
			link: true,
			tabooIcon: true,
		},
		globalSettings: globalSettings,
	}
	let onChangeUpgradeExportOptions: (n: UpgradeExportOptions) => void = (n) => {
		upgradeExportOptions = n
	}
	let onChangeExportOptions: (n: ExportOptions) => void = (n) => {
		exportOptions = n
	}

	$: {
		if (importProto !== null) {
			const restoreResult = protoStringRestore(importProto)
			importText = restoreResult.importDeckUrl
			rows = restoreResult.rows
			if (restoreResult.exportOptions.globalSettings !== undefined) {
				globalSettings = restoreResult.exportOptions.globalSettings
			}
			exportOptions = restoreResult.exportOptions
			upgradeExportOptions = restoreResult.upgradeExportOptions
		}
	}
</script>

<PageTitle subTitle="Tool" title={pageTitle} {helpMd} />
<Modal
	onClose={() => {
		showingExportModal = false
	}}
	show={showingExportModal}
	title="Export"
>
	<UpgradeExportModalContent
		{singleMode}
		{exportRows}
		{exportOptions}
		{onChangeExportOptions}
		{onChangeUpgradeExportOptions}
		{upgradeExportOptions}
		importDeckUrl={importText}
	/>
</Modal>
{#await popupDatabase}
	<SpinnerSpan text="Loading..." />
{:then pdb}
	<BigRightSider viewingLeft={!collapse}>
		<div slot="left">
			<div class="vertical-scroll">
				<StagingArea
					{singleMode}
					{globalSettings}
					{importText}
					onChangeImportText={(t) => {
						importText = t
					}}
					popupDatabase={pdb}
					onCollapseChanged={(c) => {
						collapse = c
					}}
					{collapse}
					onAddStagingCards1={(c) => {
						stagingCards1 = [...stagingCards1, c]
					}}
					onAddStagingCards2={(c) => {
						stagingCards2 = [...stagingCards2, c]
					}}
					onAddStagingCards3={(c) => {
						stagingCards3 = [...stagingCards3, c]
					}}
					onAddToLeftSide={(c) => {
						rows = addCardToList(rows, c, false)
					}}
					onAddToRightSide={(c) => {
						rows = addCardToList(rows, c, true)
					}}
					onImportDeck={(a, am, b, bm, c, cm) => {
						stagingCards1 = a
						stagingAmounts1 = am
						stagingCards2 = b
						stagingAmounts2 = bm
						stagingCards3 = c
						stagingAmounts3 = cm
					}}
					{stagingCards1}
					{stagingCards2}
					{stagingCards3}
					{stagingAmounts1}
					{stagingAmounts2}
					{stagingAmounts3}
				/>
			</div>
		</div>
		<div slot="right">
			<UpgradeTable
				{singleMode}
				db={pdb}
				gs={globalSettings}
				{rows}
				{rowActionEvents}
				{rowEditEvents}
				{toolbarEvents}
				onRowDragMove={(from, to) => {
					rows = rowMoveFromTo(rows, from, to)
				}}
			/>
		</div>
	</BigRightSider>
{/await}

<style>
	.vertical-scroll {
		height: calc(100vh - 220px);
		overflow: scroll;
		padding-right: 18px;
	}
</style>
