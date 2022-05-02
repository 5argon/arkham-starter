<script lang="ts">
	import type { Row as TRow, AllColumns } from '$lib/doc-tools/upgrade/interface'
	import type { TableRowActionEvents, TableRowEditEvents } from './row-events'
	import Row from './row.svelte'
	import type { ToolbarEvents } from './table-events'
	import Toolbar from './toolbar.svelte'

	export let rows: TRow[]
	export let columns: AllColumns
	export let toolbarEvents: ToolbarEvents
	export let rowActionEvents: TableRowActionEvents
	export let rowEditEvents: TableRowEditEvents
</script>

<table>
	<Toolbar {toolbarEvents} />
	{#each rows as r, i (r)}
		<Row
			row={r}
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
				}
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
				}
			}}
		/>
	{/each}
</table>
