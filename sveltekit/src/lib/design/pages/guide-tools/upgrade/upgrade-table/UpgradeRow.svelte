<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'
	import { EditingLevel } from '$lib/design/components/basic/TextBox.svelte'

	import type { Row } from '$lib/guide-tools/upgrade/interface'

	import type {
		RowActionEvents,
		RowEditEvents,
	} from '$lib/guide-tools/upgrade/upgrade-table/row-events'
	import CardBlockUpDown from './CardBlockUpDown.svelte'
	import EditableNumberCell from './EditableNumberCell.svelte'
	import EditableSmallCell from './EditableSmallCell.svelte'
	import HeaderRow from './HeaderRow.svelte'
	import RowActionBack from './RowActionBack.svelte'
	import RowActionFront from './RowActionFront.svelte'
	import UpgradeDivider from './UpgradeDivider.svelte'

	export let popupDatabase: PopupDatabase
	export let row: Row
	export let calculatedXp: number
	export let calculatedCumulativeXp: number
	export let rowActionEvents: RowActionEvents
	export let rowEditEvents: RowEditEvents

	$: leftCard = row.left !== null ? popupDatabase.getById(row.left) : null
	$: rightCard = row.right !== null ? popupDatabase.getById(row.right) : null
</script>

{#if row.divider}
	<HeaderRow />
{/if}
<div class={'flex-row' + ' ' + (row.divider ? 'divider-row' : '')}>
	<div class="flex-item">
		<RowActionFront
			divider={row.divider}
			onInsertTop={rowActionEvents.onAddAbove}
			onInsertBottom={rowActionEvents.onAddBelow}
			onMoveRowDown={rowActionEvents.onMoveDown}
			onMoveRowUp={rowActionEvents.onMoveUp}
			onDelete={rowActionEvents.onDelete}
			onToggle={rowEditEvents.onDividerChanged}
		/>
	</div>
	{#if row.divider}
		<div class="flex-item upgrade-divider">
			<UpgradeDivider
				text={row.dividerText}
				xpCarryover={row.carryoverXp}
				calculatedXpCarryover={calculatedCumulativeXp}
				unlocked={row.dividerXpCumulativeUnlock}
				onTextChanged={(t) => {
					rowEditEvents.onDividerTextChanged(t)
				}}
				onXpCarryoverChanged={(xp) => {
					rowEditEvents.onCarryoverXpChanged(xp)
				}}
			/>
		</div>
	{:else}
		<div class="flex-item">
			<EditableSmallCell currentText={row.mark} onChange={rowEditEvents.onMarkChanged} />
		</div>
		<div class="flex-item card-block">
			{#if leftCard !== null}
				<CardBlockUpDown
					text={leftCard.n}
					class1={leftCard.c1}
					class2={leftCard.c2}
					class3={leftCard.c3}
					exceptional={leftCard.ex}
					xp={leftCard.xp}
					xpTaboo={leftCard.xpat}
				/>
			{:else}
				<div class="grey-empty" />
			{/if}
		</div>
		<div class="flex-item arrow">→</div>
		<div class="flex-item card-block">
			{#if rightCard !== null}
				<CardBlockUpDown
					text={rightCard.n}
					class1={rightCard.c1}
					class2={rightCard.c2}
					class3={rightCard.c3}
					exceptional={rightCard.ex}
					xp={rightCard.xp}
					xpTaboo={rightCard.xpat}
				/>
			{:else}
				<div class="grey-empty" />
			{/if}
		</div>
		<div class="flex-item">
			<EditableNumberCell
				currentNumber={row.xpUnlock ? row.xp : calculatedXp}
				editingLevel={row.xpUnlock ? EditingLevel.Editable : EditingLevel.GreyedOut}
				onEndEdit={rowEditEvents.onXpChanged}
				suffixText="XP"
			/>
		</div>
		<div class="flex-item">
			<EditableNumberCell
				currentNumber={calculatedCumulativeXp}
				editingLevel={EditingLevel.GreyedOut}
				suffixText="XP"
			/>
		</div>
	{/if}
	<div class="flex-item">
		{#if row.divider}
			<RowActionBack
				xpLock={row.dividerXpCumulativeUnlock}
				onXpLockChanged={(e) => rowEditEvents.onXpCumulativeLockChanged(e)}
			/>
		{:else}
			<RowActionBack
				xpLock={row.xpUnlock}
				onXpLockChanged={(e) => rowEditEvents.onXpLockChanged(e)}
			/>
		{/if}
	</div>
</div>

<style>
	.flex-row {
		display: flex;
		align-items: center;
	}

	.upgrade-divider {
		flex: 1;
	}

	.card-block {
		flex: 12;
	}

	.flex-item {
		margin: 0px 2px;
	}

	.arrow {
		flex: 1;
		text-align: center;
	}

	.grey-empty {
		height: 14px;
		background-color: rgba(0, 0, 0, 0.01);
		border: 1px dashed rgba(0, 0, 0, 0.1);
	}
</style>
