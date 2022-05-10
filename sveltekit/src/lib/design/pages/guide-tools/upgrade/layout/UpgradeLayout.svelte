<script lang="ts">
	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import BigRightSider from '$lib/design/components/layout/BigRightSider.svelte'

	import StagingArea from '../staging-area/StagingArea.svelte'
	import UpgradeTable from '../upgrade-table/UpgradeTable.svelte'
	import type { ToolbarEvents } from '$lib/guide-tools/upgrade/upgrade-table/table-events'
	import type {
		TableRowActionEvents,
		TableRowEditEvents,
	} from '$lib/guide-tools/upgrade/upgrade-table/row-events'
	import {
		oneSideMoveDown,
		oneSideMoveUp,
		rowMoveDown,
		rowMoveUp,
		createRow,
		addCardToList,
	} from '$lib/guide-tools/upgrade/upgrade-table/row-operations'
	import SpinnerSpan from '$lib/design/components/basic/SpinnerSpan.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import {
		defaultGlobalSettings,
		type GlobalSettings,
	} from '$lib/guide-tools/script/common/settings'
	import type { Row } from '$lib/guide-tools/upgrade/interface'

	/**
	 * Make a new page with this as true so it is just a list instead of upgrade planner.
	 */
	export let singleMode: boolean = false

	let globalSettings: GlobalSettings = defaultGlobalSettings
	let stagingCards1: string[] = []
	let stagingCards2: string[] = []
	let stagingCards3: string[] = []
	let stagingAmounts1: (number | null)[] = []
	let stagingAmounts2: (number | null)[] = []
	let stagingAmounts3: (number | null)[] = []

	let rows: Row[] = []

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
		onExportMarkdown: () => {},
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
	}

	let popupDatabase = fetchPopupDatabase()
	let collapse: boolean = true
</script>

<PageTitle title="Upgrade Planner" />
{#await popupDatabase}
	<SpinnerSpan text="Loading..." />
{:then pdb}
	<BigRightSider viewingLeft={!collapse}>
		<div slot="left">
			<div class="vertical-scroll">
				<StagingArea
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
