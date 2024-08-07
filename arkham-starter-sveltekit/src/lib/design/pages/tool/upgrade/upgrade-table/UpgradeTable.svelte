<script lang="ts">
	import { flip } from 'svelte/animate'

	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { GlobalSettings } from '$lib/proto/generated/global_settings'
	import type { Row } from '$lib/tool/upgrade/interface'
	import type {
		TableRowActionEvents,
		TableRowEditEvents,
	} from '$lib/tool/upgrade/upgrade-table/row-events'
	import type { ToolbarEvents } from '$lib/tool/upgrade/upgrade-table/table-events'
	import { calculateXps } from '$lib/tool/upgrade/upgrade-table/xp-calculate'

	import RowDropTarget from './RowDropTarget.svelte'
	import UpgradeRow from './UpgradeRow.svelte'
	import UpgradeToolbar from './UpgradeToolbar.svelte'
	export let rows: Row[]
	export let toolbarEvents: ToolbarEvents
	export let rowActionEvents: TableRowActionEvents
	export let rowEditEvents: TableRowEditEvents
	export let db: PopupDatabase
	export let gs: GlobalSettings
	export let singleMode: boolean = false
	export let onRowDragMove: (from: number, to: number) => void
	export let viewMode: boolean
	let rowDragging = false
	$: cx = calculateXps(db, rows, gs)
</script>

<div class:view-wrapper={viewMode} class:wrapper={!viewMode}>
	{#if !viewMode}
		<UpgradeToolbar pdb={db} {toolbarEvents} {gs} />
	{/if}
	{#if rows.length > 0}
		<RowDropTarget
			showDropTarget={rowDragging}
			onDropSwap={(from) => {
				onRowDragMove(from, 0)
			}}
		/>
	{/if}
	{#each rows as r, i (r)}
		<div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
			<UpgradeRow
				index={i}
				{viewMode}
				{rowDragging}
				onRowDraggingChanged={(d) => {
					rowDragging = d
				}}
				popupDatabase={db}
				{singleMode}
				useTaboo={gs.taboo}
				row={r}
				calculatedXp={cx.costs[i]}
				calculatedCumulativeXp={cx.cumulatives[i]}
				rowActionEvents={{
					onDelete: () => {
						rowActionEvents.onDelete(i)
					},
					onDeleteLeft: () => {
						rowActionEvents.onDeleteLeft(i)
					},
					onDeleteRight: () => {
						rowActionEvents.onDeleteRight(i)
					},
					onMoveUp: () => {
						rowActionEvents.onMoveUp(i)
					},
					onMoveDown: () => {
						rowActionEvents.onMoveDown(i)
					},
					onMoveUpLeft: () => {
						rowActionEvents.onMoveUpLeft(i)
					},
					onMoveDownLeft: () => {
						rowActionEvents.onMoveDownLeft(i)
					},
					onMoveUpRight: () => {
						rowActionEvents.onMoveUpRight(i)
					},
					onMoveDownRight: () => {
						rowActionEvents.onMoveDownRight(i)
					},
				}}
				rowEditEvents={{
					onMarkChanged: (n) => {
						rowEditEvents.onMarkChanged(i, n)
					},
					onLeftChanged: (n) => {
						rowEditEvents.onLeftChanged(i, n)
					},
					onRightChanged: (n) => {
						rowEditEvents.onRightChanged(i, n)
					},
					onXpChanged: (n) => {
						rowEditEvents.onXpChanged(i, n)
					},
					onCarryoverXpChanged: (n) => {
						rowEditEvents.onCarryoverXpChanged(i, n)
					},
					onXpLockChanged: (n, c) => {
						rowEditEvents.onXpLockChanged(i, n, c)
					},
					onLoseFocus: () => {
						rowEditEvents.onLoseFocus(i)
					},
					onDividerChanged: (n) => {
						rowEditEvents.onDividerChanged(i, n)
					},
					onDividerTextChanged: (n) => {
						rowEditEvents.onDividerTextChanged(i, n)
					},
					onXpCumulativeLockChanged: (n, c) => {
						rowEditEvents.onXpCumulativeLockChanged(i, n, c)
					},
					onDropSwap: (a, b, c, d) => {
						rowEditEvents.onDropSwap(a, b, c, i, d)
					},
					onCustomizableCycle: (pdb) => {
						rowEditEvents.onCustomizationCycle(i, pdb)
					},
				}}
			/>
			<RowDropTarget
				showDropTarget={rowDragging}
				onDropSwap={(from) => {
					if (from > i) {
						onRowDragMove(from, i + 1)
					} else {
						onRowDragMove(from, i)
					}
				}}
			/>
		</div>
	{/each}
</div>

<style>
	.wrapper {
		max-width: 900px;
	}

	.view-wrapper {
		max-width: 700px;
	}
</style>
