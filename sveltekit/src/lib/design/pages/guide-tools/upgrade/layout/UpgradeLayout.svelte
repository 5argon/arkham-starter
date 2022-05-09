<script lang="ts">
	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import BigRightSider from '$lib/design/components/layout/BigRightSider.svelte'

	import StagingArea from '../staging-area/StagingArea.svelte'
	import UpgradeTable from '../upgrade-table/UpgradeTable.svelte'
	import {
		defaultGlobalSettings,
		type GlobalSettings,
		type Row,
	} from '$lib/guide-tools/upgrade/interface'
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
		addRow,
	} from '$lib/guide-tools/upgrade/upgrade-table/row-operations'
	import SpinnerSpan from '$lib/design/components/basic/SpinnerSpan.svelte'

	/**
	 * Make a new page with this as true so it is just a list instead of upgrade planner.
	 */
	export let singleMode: boolean = false

	let globalSettings: GlobalSettings = defaultGlobalSettings
	let stagingCards1: string[] = []
	let stagingCards2: string[] = []
	let stagingCards3: string[] = []

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
	}
	const rowActionEvents: TableRowActionEvents = {
		onDelete: (i) => {
			console.log(i)
			const neww = rows.splice(i)
			console.log(neww)
			rows = neww
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
		onXpCumulativeLockChanged: (i, n) => {
			rows[i].dividerXpCumulativeUnlock = n
		},
		onXpLockChanged: (i, n) => {
			rows[i].xpUnlock = n
		},
	}

	let popupDatabase = fetchPopupDatabase()
	let collapse: boolean = false
</script>

{#await popupDatabase}
	<SpinnerSpan text="Loading..." />
{:then pdb}
	<BigRightSider viewingLeft={!collapse}>
		<div slot="left">
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
					rows = addRow(rows, c, false)
				}}
				onAddToRightSide={(c) => {
					rows = addRow(rows, c, true)
				}}
				onImportDeck={(a, b, c) => {
					stagingCards1 = a
					stagingCards2 = b
					stagingCards3 = c
				}}
				{stagingCards1}
				{stagingCards2}
				{stagingCards3}
			/>
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
