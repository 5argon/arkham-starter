<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'
	import Button from '$lib/design/components/basic/Button.svelte'
	import TextBox, { EditingLevel, NoticeLevel } from '$lib/design/components/basic/TextBox.svelte'
	import StagingAreaSingle from './StagingAreaSingle.svelte'
	import { extractDeckFromUrl, getDeckCardIds } from '$lib/ahdb/public-api/high-level'

	export let onImportDeck: (cards1: string[], cards2: string[], cards3: string[]) => void = () => {
		// do nothing
	}

	export let collapse: boolean = false
	export let popupDatabase: PopupDatabase
	export let stagingCards1: string[] = []
	export let stagingCards2: string[] = []
	export let stagingCards3: string[] = []
	export let onCollapseChanged: (collapse: boolean) => void = () => {
		// do nothing
	}
	export let onAddStagingCards1: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddStagingCards2: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddStagingCards3: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToLeftSide: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToRightSide: (cardId: string) => void = () => {
		// do nothing
	}
	let gettingCards: boolean = false
	let noticeLevel: NoticeLevel = NoticeLevel.Normal
	let noticeText: string | null = null
	let importText: string = ''
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
	placeholderText={"ArkhamDB Deck ID or the deck's URL (if unpublished, it must be public)."}
	submitButtonText={'Import'}
	{noticeLevel}
	{noticeText}
	spinnerText={gettingCards ? 'Importing a deck...' : null}
	currentText={importText}
	editingLevel={EditingLevel.Editable}
	label={'Import Deck'}
	onChange={(t) => {
		importText = t
	}}
	onEndEdit={(t) => {
		importText = t
	}}
	onSubmit={async (n) => {
		gettingCards = true
		const deck = extractDeckFromUrl(n)
		console.log(deck)
		const cards = await getDeckCardIds(deck)
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
	}}
/>
<StagingAreaSingle
	{collapse}
	label={'Staging Area 1'}
	{popupDatabase}
	stagingCards={stagingCards1}
	onAddStagingCards={onAddStagingCards1}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
<StagingAreaSingle
	{collapse}
	label={'Staging Area 2'}
	{popupDatabase}
	stagingCards={stagingCards2}
	onAddStagingCards={onAddStagingCards2}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
<StagingAreaSingle
	{collapse}
	label={'Staging Area 3'}
	{popupDatabase}
	stagingCards={stagingCards3}
	onAddStagingCards={onAddStagingCards3}
	{onAddToLeftSide}
	{onAddToRightSide}
/>

<style>
	.expand-collapse-button {
		margin-bottom: 18px;
	}
</style>
