<script lang="ts">
	import type { Row as TRow, AllColumns, GlobalSettings } from '$lib/doc-tools/upgrade/interface'
	import type { LazyPopupDatabase } from '$lib/popup-database'
	import HeaderRow from './header-row.svelte'
	import type { TableRowActionEvents, TableRowEditEvents } from './row-events'
	import Row from './row.svelte'
	import type { ToolbarEvents } from './table-events'
	import Toolbar from './toolbar.svelte'
	import { calculateXps } from './xp-calculate'

	export let rows: TRow[]
	export let columns: AllColumns
	export let toolbarEvents: ToolbarEvents
	export let rowActionEvents: TableRowActionEvents
	export let rowEditEvents: TableRowEditEvents
	export let db: LazyPopupDatabase
	export let gs: GlobalSettings
	$: cx = calculateXps(db, rows, gs)
</script>

<table>
	<Toolbar {toolbarEvents} />
	{#if rows.length > 0 && rows[0].divider === false}
		<HeaderRow cols={columns} />
	{/if}
	{#await cx}
		<div>Loading...</div>
	{:then acx}
		{#each rows as r, i (r)}
			<Row
				row={r}
				calculatedXp={acx.costs[i]}
				calculatedCumulativeXp={acx.cumulatives[i]}
				cols={columns}
				rowActionEvents={{
					onAddAbove: () => {
						rowActionEvents.onAddAbove(i)
					},
					onAddBelow: () => {
						rowActionEvents.onAddBelow(i)
					},
					onDelete: () => {
						rowActionEvents.onDelete(i)
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
					onXpLockChanged: (n) => {
						rowEditEvents.onXpLockChanged(i, n)
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
					onXpCumulativeLockChanged: (n) => {
						rowEditEvents.onXpCumulativeLockChanged(i, n)
					},
				}}
			/>
		{/each}
	{/await}
</table>
