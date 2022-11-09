<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'
	import Button from '$lib/design/components/basic/Button.svelte'
	import TextBox, { EditingLevel, NoticeLevel } from '$lib/design/components/basic/TextBox.svelte'
	import StagingAreaSingle from './StagingAreaSingle.svelte'
	import { extractDeckFromUrl, getDeckCardIds } from '$lib/ahdb/public-api/high-level'
	import { onMount } from 'svelte'
	import type { GlobalSettings } from '$lib/proto/generated/global_settings'
	import { isRandomBasicWeakness, randomBasicWeakness } from '$lib/ahdb/card'

	export let onImportDeck: (
		cards1: string[],
		amounts1: (number | null)[],
		cards2: string[],
		amounts2: (number | null)[],
		cards3: string[],
		amounts3: (number | null)[],
	) => void = () => {
		// do nothing
	}

	export let singleMode: boolean = false
	export let collapse: boolean = false
	export let popupDatabase: PopupDatabase
	export let globalSettings: GlobalSettings
	export let stagingCards1: string[] = []
	export let stagingCards2: string[] = []
	export let stagingCards3: string[] = []
	export let stagingAmounts1: (number | null)[] = []
	export let stagingAmounts2: (number | null)[] = []
	export let stagingAmounts3: (number | null)[] = []
	export let onCollapseChanged: (collapse: boolean) => void = () => {
		// do nothing
	}
	export let onAddStagingCards1: (cardId: string, amount: number | null) => void = () => {
		// do nothing
	}
	export let onAddStagingCards2: (cardId: string, amount: number | null) => void = () => {
		// do nothing
	}
	export let onAddStagingCards3: (cardId: string, amount: number | null) => void = () => {
		// do nothing
	}
	export let onAddToLeftSide: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToRightSide: (cardId: string) => void = () => {
		// do nothing
	}
	let exportedOnce: boolean = false
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
		onImportDeck(
			cards.cards1.filter((x) => !isRandomBasicWeakness(x)),
			cards.amounts1,
			cards.cards2.filter((x) => !isRandomBasicWeakness(x)),
			cards.amounts2,
			cards.cards3.filter((x) => !isRandomBasicWeakness(x)),
			cards.amounts3,
		)
		noticeLevel = NoticeLevel.Success
		noticeText = 'Import successful : ' + cards.deck
		exportedOnce = true
	}

	onMount(async () => {
		submit(importText)
	})
</script>

<div class="expand-collapse-button">
	<Button
		big
		center
		label={collapse ? 'Expand' : 'Collapse'}
		block={true}
		onClick={() => onCollapseChanged(!collapse)}
	/>
</div>
<TextBox
	enableNotice
	placeholderText={'Deck ID (prefix p: if published) or Deck URL.'}
	submitButtonText={'Import'}
	{noticeLevel}
	{noticeText}
	spinnerText={gettingCards ? 'Importing a deck...' : null}
	currentText={importText}
	editingLevel={EditingLevel.Editable}
	label={'Import Deck'}
	onChange={onChangeImportText}
	onEndEdit={onChangeImportText}
	onSubmit={submit}
/>
<StagingAreaSingle
	{singleMode}
	{collapse}
	{globalSettings}
	label={exportedOnce ? 'Deck' : 'Staging Area 1'}
	{popupDatabase}
	stagingCards={stagingCards1}
	stagingAmounts={stagingAmounts1}
	onAddStagingCards={onAddStagingCards1}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
<StagingAreaSingle
	{singleMode}
	{collapse}
	{globalSettings}
	label={exportedOnce ? 'Side Deck' : 'Staging Area 2'}
	{popupDatabase}
	stagingCards={stagingCards2}
	stagingAmounts={stagingAmounts2}
	onAddStagingCards={onAddStagingCards2}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
<StagingAreaSingle
	{singleMode}
	{collapse}
	{globalSettings}
	label={exportedOnce ? 'Ignore Deck Limit' : 'Staging Area 3'}
	{popupDatabase}
	stagingCards={stagingCards3}
	stagingAmounts={stagingAmounts3}
	onAddStagingCards={onAddStagingCards3}
	{onAddToLeftSide}
	{onAddToRightSide}
/>

<style>
	.expand-collapse-button {
		margin-bottom: 18px;
	}
</style>
