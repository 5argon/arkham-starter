<script lang="ts" context="module">
	export const rowDragPrefix = 'row'
</script>

<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import { EditingLevel } from '$lib/design/components/basic/TextBox.svelte'
	import CardSpan from '$lib/design/components/card/CardSpan.svelte'
import { placeholderCard, type Row } from '$lib/tool/upgrade/interface'
	import type { RowActionEvents, RowEditEvents } from '$lib/tool/upgrade/upgrade-table/row-events'

	import CardBlockUpDown from './CardBlockUpDown.svelte'
	import EditableNumberCell from './EditableNumberCell.svelte'
	import EditableSmallCell from './EditableSmallCell.svelte'
	import GreyEmpty from './GreyEmpty.svelte'
	import HeaderRow from './HeaderRow.svelte'
	import RowActionBack from './RowActionBack.svelte'
	import RowActionFront from './RowActionFront.svelte'
	import UpgradeDivider from './UpgradeDivider.svelte'

	export let index: number
	export let singleMode: boolean = false
	export let popupDatabase: PopupDatabase
	export let useTaboo: boolean = true
	export let row: Row
	export let calculatedXp: number
	export let calculatedCumulativeXp: number
	export let rowActionEvents: RowActionEvents
	export let rowEditEvents: RowEditEvents
	export let rowDragging: boolean = false
	export let onRowDraggingChanged: (dragging: boolean) => void
	export let viewMode: boolean

	let leftCard: PopupDatabaseItem | null
	let rightCard: PopupDatabaseItem | null
	$: {
		leftCard = row.left !== null ? popupDatabase.getById(row.left) : null
	}
	$: {
		rightCard = row.right !== null ? popupDatabase.getById(row.right) : null
	}
	$: boldArrow =
		leftCard !== null &&
		rightCard !== null &&
		leftCard.original.n === rightCard.original.n &&
		(leftCard.original.xp ?? 0) < (rightCard.original.xp ?? 0)

	$: onlyRightCard = rightCard !== null && leftCard === null
	$: transitionCharacter = onlyRightCard ? '+' : '→'

	let customizationText: string = ''
	let customizationBoxes: number = 0
	$: {
		if (row.custom && rightCard !== null) {
			const cus = rightCard.original.cus
			if (cus !== undefined) {
				const removedZero = cus.filter((x) => x.xp > 0)
				if (row.customizationChoice < removedZero.length) {
					const selectedCus = removedZero[row.customizationChoice]
					customizationText = selectedCus.n
					customizationBoxes = selectedCus.xp
				}
			}
		}
	}

	// This gives a ghost image of an entire row.
	let rowDraggable = false

	function dragStartHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		// This drag start can override the individual card dragging EVEN THOUGH
		// "draggable" is on/off dynamically. We must on/off this one as well.
		if (e.dataTransfer !== null) {
			e.dataTransfer.setData('text/plain', rowDragPrefix + ',' + index)
		}
		onRowDraggingChanged(true)
	}

	function dragEndHander(e: DragEvent & { currentTarget: HTMLDivElement }) {
		onRowDraggingChanged(false)
	}
</script>

{#if row.divider}
	<HeaderRow />
{/if}
<!-- Must not have preventDefault on the dragstart below, otherwise it disables dragging of the individual card
nested inside this div. -->
<div
	draggable={rowDraggable ? 'true' : false}
	on:dragstart={rowDraggable ? dragStartHandler : undefined}
	on:dragend={rowDraggable ? dragEndHander : undefined}
	class={'flex-row'}
	class:divider-row={row.divider}
	class:view-flex-row={viewMode}
	role="row"
	tabindex={index}
>
	{#if !viewMode}
		<div class="flex-item">
			<RowActionFront
				onDelete={rowActionEvents.onDelete}
				onMoveRowDown={rowActionEvents.onMoveDown}
				onMoveRowUp={rowActionEvents.onMoveUp}
				hoveringOnGrip={(hovering) => {
					rowDraggable = hovering
				}}
			/>
		</div>
	{/if}
	{#if row.divider}
		<div class="flex-item upgrade-divider">
			<UpgradeDivider
				{singleMode}
				{viewMode}
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
			<EditableSmallCell
				justText={viewMode}
				currentText={row.mark}
				onChange={rowEditEvents.onMarkChanged}
			/>
		</div>
		<div class="flex-item card-block">
			{#if leftCard !== null}
				{#if viewMode}
					<CardSpan
						cardId={leftCard.original.id}
						text={leftCard.original.n}
						subText={leftCard.original.esn ? leftCard.original.sn : null}
						class1={leftCard.class1}
						class2={leftCard.class2 ?? null}
						class3={leftCard.class3 ?? null}
						exceptional={useTaboo ? leftCard.original.ext : leftCard.original.ex}
						restriction={leftCard.original.ir ?? false}
						specialist={leftCard.original.restr !== undefined}
						weakness={leftCard.original.wk ?? false}
						permanent={leftCard.original.pe ?? false}
						bonded={leftCard.original.bd ?? false}
						myriad={leftCard.original.myr ?? false}
						customizable={leftCard.original.cus !== undefined}
						xp={leftCard.original.xp}
						xpTaboo={useTaboo ? leftCard.original.xpat : null}
						color
						showImageStrip
						packIcon={leftCard.packIcon}
						packNumber={leftCard.original.ps}
					/>
				{:else}
					<CardBlockUpDown
						{singleMode}
						cardId={leftCard.original.id}
						text={leftCard.original.n}
						subText={leftCard.original.esn ? leftCard.original.sn : null}
						class1={leftCard.class1}
						class2={leftCard.class2 ?? null}
						class3={leftCard.class3 ?? null}
						exceptional={useTaboo ? leftCard.original.ext : leftCard.original.ex}
						restriction={leftCard.original.ir ?? false}
						weakness={leftCard.original.wk ?? false}
						customizable={leftCard.original.cus !== undefined}
						bonded={leftCard.original.bd ?? false}
						myraid={leftCard.original.myr ?? false}
						xp={leftCard.original.xp}
						xpTaboo={useTaboo ? leftCard.original.xpat : null}
						onClickDelete={rowActionEvents.onDeleteLeft}
						onDropSwap={(fi, fr, fc) => {
							rowEditEvents.onDropSwap(fi, fr, fc, false)
						}}
						{index}
						right={false}
						disableHoverEffects={rowDragging}
					/>
				{/if}
			{:else if !viewMode}
				{#if row.left === placeholderCard}
					<CardBlockUpDown
						{singleMode}
						text=""
						cardId={placeholderCard}
						onClickDelete={rowActionEvents.onDeleteLeft}
						{index}
						right={false}
						onDropSwap={(fi, fr, fc) => {
							rowEditEvents.onDropSwap(fi, fr, fc, false)
						}}
						disableHoverEffects={rowDragging}
					/>
				{:else}
					<GreyEmpty
						onDropSwap={(fi, fr, fc) => {
							rowEditEvents.onDropSwap(fi, fr, fc, false)
						}}
						disableHoverEffects={rowDragging}
					/>
				{/if}
			{/if}
		</div>
		{#if !singleMode}
			<div class="flex-item arrow" class:bold-arrow={boldArrow}>{transitionCharacter}</div>
			<div class="flex-item card-block">
				{#if rightCard !== null}
					{#if viewMode}
						<CardSpan
							cardId={rightCard.original.id}
							text={row.custom ? customizationText : rightCard.original.n}
							subText={rightCard.original.esn ? rightCard.original.sn : null}
							class1={rightCard.class1}
							class2={rightCard.class2 ?? null}
							class3={rightCard.class3 ?? null}
							exceptional={useTaboo ? rightCard.original.ext : rightCard.original.ex}
							restriction={rightCard.original.ir ?? false}
							weakness={rightCard.original.wk ?? false}
							customizable={rightCard.original.cus !== undefined}
							permanent={rightCard.original.pe ?? false}
							bonded={rightCard.original.bd ?? false}
							myriad={rightCard.original.myr ?? false}
							checkedBoxes={row.custom ? customizationBoxes : 0}
							xp={rightCard.original.xp}
							xpTaboo={useTaboo ? rightCard.original.xpat : null}
							color
							showImageStrip
							packIcon={rightCard.packIcon}
							packNumber={rightCard.original.ps}
						/>
					{:else}
						<CardBlockUpDown
							{singleMode}
							cardId={rightCard.original.id}
							text={row.custom ? customizationText : rightCard.original.n}
							subText={rightCard.original.esn ? rightCard.original.sn : null}
							class1={rightCard.class1}
							class2={rightCard.class2 ?? null}
							class3={rightCard.class3 ?? null}
							exceptional={useTaboo ? rightCard.original.ext : rightCard.original.ex}
							restriction={rightCard.original.ir ?? false}
							weakness={rightCard.original.wk ?? false}
							customizable={rightCard.original.cus !== undefined}
							permanent={rightCard.original.pe ?? false}
							bonded={rightCard.original.bd ?? false}
							checkedBoxes={row.custom ? customizationBoxes : 0}
							xp={rightCard.original.xp}
							xpTaboo={useTaboo ? rightCard.original.xpat : null}
							onClickDelete={rowActionEvents.onDeleteRight}
							{index}
							right={true}
							onDropSwap={(fi, fr, fc) => {
								rowEditEvents.onDropSwap(fi, fr, fc, true)
							}}
							onCustomizableCycle={() => {
								rowEditEvents.onCustomizableCycle(popupDatabase)
							}}
							disableHoverEffects={rowDragging}
						/>
					{/if}
				{:else if !viewMode}
					{#if row.right === placeholderCard}
						<CardBlockUpDown
							{singleMode}
							text=""
							cardId={placeholderCard}
							onClickDelete={rowActionEvents.onDeleteRight}
							{index}
							right={true}
							onDropSwap={(fi, fr, fc) => {
								rowEditEvents.onDropSwap(fi, fr, fc, true)
							}}
							disableHoverEffects={rowDragging}
						/>
					{:else}
						<GreyEmpty
							onDropSwap={(fi, fr, fc) => {
								rowEditEvents.onDropSwap(fi, fr, fc, true)
							}}
							disableHoverEffects={rowDragging}
						/>
					{/if}
				{/if}
			</div>
		{/if}
		{#if !singleMode}
			<div class="flex-item">
				<EditableNumberCell
					currentNumber={row.xpUnlock ? row.xp : calculatedXp}
					editingLevel={viewMode
						? EditingLevel.JustText
						: row.xpUnlock
							? EditingLevel.Editable
							: EditingLevel.GreyedOut}
					onEndEdit={rowEditEvents.onXpChanged}
					suffixText="XP"
				/>
			</div>
			<div class="flex-item">
				<EditableNumberCell
					currentNumber={calculatedCumulativeXp}
					editingLevel={viewMode ? EditingLevel.JustText : EditingLevel.GreyedOut}
					suffixText="XP"
				/>
			</div>
		{/if}
	{/if}
	{#if !singleMode && !viewMode}
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

	.view-flex-row {
		padding: 2px 0px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
		user-select: none;
	}

	.bold-arrow {
		text-shadow:
			1px 0px 0px #ffffff,
			2px 0px 0px #ff0000;
		font-weight: bold;
	}
</style>
