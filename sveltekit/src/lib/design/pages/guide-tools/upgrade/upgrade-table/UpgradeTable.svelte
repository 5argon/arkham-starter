<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'
import type { GlobalSettings } from '$lib/guide-tools/script/common/settings';

	import type { Row } from '$lib/guide-tools/upgrade/interface'
	import type {
		TableRowActionEvents,
		TableRowEditEvents,
	} from '$lib/guide-tools/upgrade/upgrade-table/row-events'
	import type { ToolbarEvents } from '$lib/guide-tools/upgrade/upgrade-table/table-events'
	import { calculateXps } from '$lib/guide-tools/upgrade/upgrade-table/xp-calculate'
	import UpgradeRow from './UpgradeRow.svelte'
	import UpgradeToolbar from './UpgradeToolbar.svelte'
	export let rows: Row[]
	export let toolbarEvents: ToolbarEvents
	export let rowActionEvents: TableRowActionEvents
	export let rowEditEvents: TableRowEditEvents
	export let db: PopupDatabase
	export let gs: GlobalSettings
	export let singleMode: boolean = false

	$: cx = calculateXps(db, rows, gs)
</script>

<div class="wrapper">
	<UpgradeToolbar {toolbarEvents} />
	{#each rows as r, i (i)}
		<UpgradeRow
			popupDatabase={db}
			{singleMode}
			row={r}
			calculatedXp={cx.costs[i]}
			calculatedCumulativeXp={cx.cumulatives[i]}
			rowActionEvents={{
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
				onXpLockChanged: (n, c) => {
					console.log(n)
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
			}}
		/>
	{/each}
</div>

<style>
	.wrapper {
		margin: 0 auto;
		max-width: 950px;
	}
</style>
