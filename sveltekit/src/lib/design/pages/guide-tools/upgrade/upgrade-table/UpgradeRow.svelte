<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
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

	export let singleMode: boolean = false
	export let popupDatabase: PopupDatabase
	export let row: Row
	export let calculatedXp: number
	export let calculatedCumulativeXp: number
	export let rowActionEvents: RowActionEvents
	export let rowEditEvents: RowEditEvents

	let leftCard: PopupDatabaseItem | null
	let rightCard: PopupDatabaseItem | null
	$: {
		leftCard = row.left !== null ? popupDatabase.getById(row.left) : null
	}
	$: {
		rightCard = row.right !== null ? popupDatabase.getById(row.right) : null
	}
</script>

{#if row.divider}
	<HeaderRow />
{/if}
<div class={'flex-row' + ' ' + (row.divider ? 'divider-row' : '')}>
	<div class="flex-item">
		<RowActionFront
			onDelete={rowActionEvents.onDelete}
			onMoveRowDown={rowActionEvents.onMoveDown}
			onMoveRowUp={rowActionEvents.onMoveUp}
		/>
	</div>
	{#if row.divider}
		<div class="flex-item upgrade-divider">
			<UpgradeDivider
				{singleMode}
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
					{singleMode}
					text={leftCard.n}
					class1={leftCard.c1}
					class2={leftCard.c2 ?? null}
					class3={leftCard.c3 ?? null}
					exceptional={leftCard.ex}
					xp={leftCard.xp}
					xpTaboo={leftCard.xpat}
					onClickDown={rowActionEvents.onMoveDownLeft}
					onClickUp={rowActionEvents.onMoveUpLeft}
				/>
			{:else}
				<div class="grey-empty-outer">
					<div class="grey-empty" />
				</div>
			{/if}
		</div>
		{#if !singleMode}
			<div class="flex-item arrow">→</div>
			<div class="flex-item card-block">
				{#if rightCard !== null}
					<CardBlockUpDown
						{singleMode}
						text={rightCard.n}
						class1={rightCard.c1}
						class2={rightCard.c2 ?? null}
						class3={rightCard.c3 ?? null}
						exceptional={rightCard.ex}
						xp={rightCard.xp}
						xpTaboo={rightCard.xpat}
						onClickDown={rowActionEvents.onMoveDownRight}
						onClickUp={rowActionEvents.onMoveUpRight}
					/>
				{:else}
					<div class="grey-empty-outer">
						<div class="grey-empty" />
					</div>
				{/if}
			</div>
		{/if}
		{#if !singleMode}
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
	{/if}
	{#if !singleMode}
		<div class="flex-item">
			{#if row.divider}
				<RowActionBack
					xpLock={row.dividerXpCumulativeUnlock}
					onXpLockChanged={(e) =>
						rowEditEvents.onXpCumulativeLockChanged(e, calculatedCumulativeXp)}
				/>
			{:else}
				<RowActionBack
					xpLock={row.xpUnlock}
					onXpLockChanged={(e) => rowEditEvents.onXpLockChanged(e, calculatedXp)}
				/>
			{/if}
		</div>
	{/if}
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

	.grey-empty-outer {
		height: 26.5px;
		display: flex;
		align-items: center;
	}

	.grey-empty {
		flex: 1;
		height: 12px;
		background-color: rgba(0, 0, 0, 0.01);
		border: 1px dashed rgba(0, 0, 0, 0.1);
	}
</style>
