<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	import TextBox, { EditingLevel } from '$lib/design/components/basic/TextBox.svelte'
	import UnknownCardBlock from '$lib/design/components/card/UnknownCardBlock.svelte'
	import { defaultGlobalSettings, type GlobalSettings } from '$lib/guide-tools/upgrade/interface'
	import CardBlockLeftRight from './CardBlockLeftRight.svelte'

	export let collapse: boolean = false
	export let globalSettings: GlobalSettings = defaultGlobalSettings
	export let label: string
	export let popupDatabase: PopupDatabase
	export let stagingCards: string[] = []

	let addCardTextboxText: string = ''

	let cards: (PopupDatabaseItem | null)[]
	$: {
		cards = stagingCards.map((x) => popupDatabase.getById(x))
	}
	export let onAddStagingCards: (cardId: string) => void = () => {
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
</script>

<div class="stack-padding">
	<ListDivider {label} level={ListDividerLevel.One} />
	{#if !collapse}
		<div class="add-card">
			<TextBox
				currentText={addCardTextboxText}
				editingLevel={EditingLevel.Editable}
				endEditAsSubmit={true}
				label={'Add a card to this list'}
				onChange={(n) => (addCardTextboxText = n)}
				onEndEdit={(n) => onAddStagingCards(n)}
				onSubmit={(n) => onAddStagingCards(n)}
				placeholderText={'Use ArkhamDB card ID, for example 01016'}
				rightAlign={false}
				submitButtonText={'Add'}
			/>
		</div>
	{/if}
	{#each cards as c, i (c?.id ?? 0)}
		{#if c !== null}
			{#if collapse}
				<CardBlockLeftRight
					collapse={true}
					class1={c.c1}
					class2={c.c2 ?? null}
					class3={c.c3 ?? null}
					xp={c.xp}
					onClickLeft={() => onAddToLeftSide(c.id)}
					onClickRight={() => onAddToRightSide(c.id)}
				/>
			{:else}
				<CardBlockLeftRight
					text={c.n}
					class1={c.c1}
					class2={c.c2 ?? null}
					class3={c.c3 ?? null}
					exceptional={globalSettings.taboo ? c.ext : c.ex}
					restriction={c.ir}
					xp={c.xp}
					xpTaboo={globalSettings.taboo ? c.xpat : 0}
					onClickDelete={() => onDelete(c.id)}
					onClickLeft={() => onAddToLeftSide(c.id)}
					onClickRight={() => onAddToRightSide(c.id)}
				/>
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
