<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	import TextBox, { EditingLevel, NoticeLevel } from '$lib/design/components/basic/TextBox.svelte'
	import UnknownCardBlock from '$lib/design/components/card/UnknownCardBlock.svelte'
	import CardBlockLeftRight from './CardBlockLeftRight.svelte'
	import { fly } from 'svelte/transition'
	import type { GlobalSettings } from '$lib/proto/generated/global_settings'

	export let singleMode: boolean = false
	export let collapse: boolean = false
	export let globalSettings: GlobalSettings
	export let label: string
	export let popupDatabase: PopupDatabase
	export let stagingCards: string[] = []
	export let stagingAmounts: (number | null)[] = []

	let addCardTextboxText: string = ''

	let cards: (PopupDatabaseItem | null)[]
	$: {
		cards = stagingCards.map((x) => popupDatabase.getById(x))
	}
	export let onAddStagingCards: (cardId: string, amount: number | null) => void = () => {
		// do nothing
	}
	export let onDelete: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToLeftSide: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToRightSide: (cardId: string) => void = () => {
		// do nothing
	}

	let cardNoticeString: string | null = null
	let noticeLevel: NoticeLevel = NoticeLevel.Normal
	function addCardInputHandling(s: string) {
		s = s.trim()
		if (s.length === 0) {
			return
		}
		const card = popupDatabase.getById(s)
		if (card !== null) {
			cardNoticeString = 'Found and added a card : ' + card.original.n
			noticeLevel = NoticeLevel.Success
			onAddStagingCards(card.original.id, null)
			addCardTextboxText = ''
		} else {
			cardNoticeString = 'Card with ID ' + s + ' not found.'
			noticeLevel = NoticeLevel.Error
		}
	}
</script>

<div class="stack-padding">
	<ListDivider {label} level={ListDividerLevel.One} />
	{#if !collapse}
		<div class="add-card">
			<TextBox
				currentText={addCardTextboxText}
				editingLevel={EditingLevel.Editable}
				label={'Manually add a card to this list'}
				onChange={(n) => (addCardTextboxText = n)}
				onSubmit={(n) => addCardInputHandling(n)}
				{noticeLevel}
				enableNotice
				noticeText={cardNoticeString}
				placeholderText={'Use ArkhamDB card ID, for example 01016'}
				rightAlign={false}
				submitButtonText={'Add'}
			/>
		</div>
	{/if}
	{#each cards as c, i (c?.original.id ?? 0)}
		{#if c !== null}
			{#if collapse}
				<div in:fly={{ y: -20, duration: 300 }}>
					<CardBlockLeftRight
						{singleMode}
						cardId={c.original.id}
						amount={stagingAmounts[i]}
						showImageStrip={true}
						collapse={true}
						text={c.original.n}
						class1={c.class1}
						class2={c.class2 ?? null}
						class3={c.class3 ?? null}
						exceptional={globalSettings.taboo ? c.original.ext : c.original.ex}
						restriction={c.original.ir}
						weakness={c.original.wk}
						xp={c.original.xp}
						xpTaboo={globalSettings.taboo ? c.original.xpat : null}
						onClickLeft={() => onAddToLeftSide(c.original.id)}
						onClickRight={() => onAddToRightSide(c.original.id)}
					/>
				</div>
			{:else}
				<div in:fly={{ x: -20, duration: 300 }}>
					<CardBlockLeftRight
						{singleMode}
						cardId={c.original.id}
						amount={stagingAmounts[i]}
						showImageStrip={true}
						text={c.original.n}
						class1={c.class1}
						class2={c.class2 ?? null}
						class3={c.class3 ?? null}
						exceptional={globalSettings.taboo ? c.original.ext : c.original.ex}
						restriction={c.original.ir}
						weakness={c.original.wk}
						xp={c.original.xp}
						xpTaboo={globalSettings.taboo ? c.original.xpat : null}
						packNumber={c.original.ps}
						packIcon={c.packIcon}
						onClickDelete={() => onDelete(c.original.id)}
						onClickLeft={() => onAddToLeftSide(c.original.id)}
						onClickRight={() => onAddToRightSide(c.original.id)}
					/>
				</div>
			{/if}
		{:else}
			<UnknownCardBlock cardId={stagingCards[i]} />
		{/if}
	{/each}
</div>

<style>
	.stack-padding {
		margin-bottom: 16px;
	}
	.add-card {
		margin-bottom: 8px;
	}
</style>
