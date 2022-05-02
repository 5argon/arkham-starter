<script lang="ts">
	import {
		ColumnSpecial,
		type AllColumns,
		type Column,
		type Row
	} from '$lib/doc-tools/upgrade/interface'
	import EditableCell from './editable-cell.svelte'
	import Divider from './divider.svelte'
	import RowActionUpDown from './row-action-up-down.svelte'
	import RowActionFront from './row-action-front.svelte'
	import RowActionBack from './row-action-back.svelte'
	import type { RowActionEvents, RowEditEvents } from './row-events'

	export let row: Row
	export let rowActionEvents: RowActionEvents
	export let rowEditEvents: RowEditEvents
	export let cols: AllColumns

	function shouldDisableEditing(c: Column): boolean {
		switch (c.special) {
			case ColumnSpecial.Arrow:
			case ColumnSpecial.XpCumulative:
				return true
			default:
				return false
		}
	}

	function shouldHaveSmallBox(c: Column): boolean {
		switch (c.special) {
			case ColumnSpecial.Mark:
			case ColumnSpecial.Xp:
			case ColumnSpecial.XpCumulative:
				return true
			default:
				return false
		}
	}
</script>

<tr>
	<RowActionFront
		divider={row.divider}
		onInsertTop={rowActionEvents.onAddAbove}
		onInsertBottom={rowActionEvents.onAddBelow}
		onDelete={rowActionEvents.onDelete}
	/>
	{#if row.divider}
		<td colspan={8}>
			<Divider />
		</td>
	{:else}
		<td>
			<EditableCell
				currentText={row.mark}
				prefixText={cols.mark.prefix}
				suffixText={cols.mark.suffix}
				disableEditing={shouldDisableEditing(cols.mark)}
				smallBox={shouldHaveSmallBox(cols.mark)}
				greyOutEditing={false}
				onChange={(e) => {}}
				onEndEdit={(e) => {
					rowEditEvents.onMarkChanged(e)
				}}
			/>
		</td>
		<td>
			<EditableCell
				currentText={row.left}
				prefixText={cols.left.prefix}
				suffixText={cols.left.suffix}
				disableEditing={shouldDisableEditing(cols.left)}
				smallBox={shouldHaveSmallBox(cols.left)}
				greyOutEditing={false}
				onChange={(e) => {}}
				onEndEdit={(e) => {
					rowEditEvents.onLeftChanged(e)
				}}
			/>
		</td>
		<RowActionUpDown />
		<td>
			<EditableCell
				currentText={''}
				prefixText={cols.arrow.prefix}
				suffixText={cols.arrow.suffix}
				disableEditing={shouldDisableEditing(cols.arrow)}
				smallBox={shouldHaveSmallBox(cols.arrow)}
				greyOutEditing={false}
				onChange={(e) => {}}
				onEndEdit={(e) => {}}
			/>
		</td>
		<td>
			<EditableCell
				currentText={row.right}
				prefixText={cols.right.prefix}
				suffixText={cols.right.suffix}
				disableEditing={shouldDisableEditing(cols.right)}
				smallBox={shouldHaveSmallBox(cols.right)}
				greyOutEditing={false}
				onChange={(e) => {}}
				onEndEdit={(e) => {
					rowEditEvents.onRightChanged(e)
				}}
			/>
		</td>
		<RowActionUpDown />
		<td>
			<EditableCell
				currentText={row.xp.toString()}
				prefixText={cols.xp.prefix}
				suffixText={cols.xp.suffix}
				disableEditing={shouldDisableEditing(cols.xp)}
				smallBox={shouldHaveSmallBox(cols.xp)}
				greyOutEditing={!row.xpUnlock}
				onChange={(e) => {}}
				onEndEdit={(e) => {}}
			/>
		</td>
		<td>
			<EditableCell
				currentText={"0"}
				prefixText={cols.xpCumulative.prefix}
				suffixText={cols.xpCumulative.suffix}
				disableEditing={shouldDisableEditing(cols.xpCumulative)}
				smallBox={shouldHaveSmallBox(cols.xpCumulative)}
				greyOutEditing={false}
				onChange={(e) => {}}
				onEndEdit={(e) => {}}
			/>
		</td>
		<RowActionBack
			xpLock={row.xpUnlock}
			onXpLockChanged={(e) => rowEditEvents.onXpLockChanged(e)}
		/>
	{/if}
</tr>
