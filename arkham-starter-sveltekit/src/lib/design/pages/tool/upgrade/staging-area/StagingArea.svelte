<script lang="ts">
	import { onMount } from 'svelte'

	import {
		type CardAndAmount,
		extractDeckFromUrl,
		getDeckCardIds,
	} from '$lib/ahdb/public-api/high-level'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import TextBox, { EditingLevel, NoticeLevel } from '$lib/design/components/basic/TextBox.svelte'
	import type { GlobalSettings } from '$lib/proto/generated/global_settings'

	import CardBlockPlaceholder from './CardBlockPlaceholder.svelte'
	import StagingAreaSingle from './StagingAreaSingle.svelte'

	export let onImportDeck: (
		cards1: CardAndAmount[],
		cards2: CardAndAmount[],
		cards3: CardAndAmount[],
	) => void = () => {
		// do nothing
	}

	export let singleMode: boolean = false
	export let popupDatabase: PopupDatabase
	export let globalSettings: GlobalSettings
	export let stagingCards1: CardAndAmount[] = []
	export let stagingCards2: CardAndAmount[] = []
	export let stagingCards3: CardAndAmount[] = []
	export let onAddStagingCards1: (cardId: CardAndAmount) => void = () => {
		// do nothing
	}
	export let onAddStagingCards2: (cardId: CardAndAmount) => void = () => {
		// do nothing
	}
	export let onAddStagingCards3: (cardId: CardAndAmount) => void = () => {
		// do nothing
	}
	export let onAddToLeftSide: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToRightSide: (cardId: string) => void = () => {
		// do nothing
	}
	let importedOnce: boolean = false
	let gettingCards: boolean = false
	let noticeLevel: NoticeLevel = NoticeLevel.Normal
	let noticeText: string | null = null
	export let importText: string = ''
	export let onChangeImportText: (t: string) => void = () => {
		// do nothing
	}

	async function submit(n: string) {
		onChangeImportText(n)
		if (n.trim() === '') {
			return
		}
		gettingCards = true
		const extractResult = extractDeckFromUrl(n)
		const cards = await getDeckCardIds(extractResult.deck, extractResult.published)
		gettingCards = false
		if (cards === null) {
			noticeLevel = NoticeLevel.Error
			noticeText =
				'Deck not found. If importing an unpublished deck, check your user settings to make it public.'
			return
		}
		onImportDeck(cards.cards1, cards.cards2, cards.cards3)
		noticeLevel = NoticeLevel.Success
		noticeText = 'Import successful : ' + cards.deck
		importedOnce = true
	}

	onMount(async () => {
		submit(importText)
	})
</script>

<CardBlockPlaceholder {onAddToLeftSide} {onAddToRightSide} />

<div class="split" />

<TextBox
	enableNotice
	placeholderText={'Deck ID (prefix p: if published) or Deck URL.'}
	submitButtonText={'Import'}
	{noticeLevel}
	{noticeText}
	spinnerText={gettingCards ? 'Importing a deck...' : null}
	currentText={importText}
	editingLevel={EditingLevel.Editable}
	label={'Import Cards From ArkhamDB Deck'}
	onChange={onChangeImportText}
	onEndEdit={onChangeImportText}
	onSubmit={submit}
/>

{#if importedOnce}
	<StagingAreaSingle
		{singleMode}
		{globalSettings}
		label={'Deck'}
		{popupDatabase}
		stagingCards={stagingCards1}
		onAddStagingCards={onAddStagingCards1}
		{onAddToLeftSide}
		{onAddToRightSide}
	/>
	<StagingAreaSingle
		{singleMode}
		{globalSettings}
		label={'Side Deck'}
		{popupDatabase}
		stagingCards={stagingCards2}
		onAddStagingCards={onAddStagingCards2}
		{onAddToLeftSide}
		{onAddToRightSide}
	/>
	<StagingAreaSingle
		{singleMode}
		{globalSettings}
		label={'Ignore Deck Limit'}
		{popupDatabase}
		stagingCards={stagingCards3}
		onAddStagingCards={onAddStagingCards3}
		{onAddToLeftSide}
		{onAddToRightSide}
	/>
{/if}

<style>
	.split {
		height: 8px;
	}
</style>
