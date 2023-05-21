<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import TextBox from '../basic/TextBox.svelte'
	import CardPopupControl from '../card/card-popup/CardPopupControl.svelte'
	import CardFormSelectedItem from './CardFormSelectedItem.svelte'

	export let title: string | undefined = undefined
	export let placeholder: string | undefined = undefined
	export let popupDatabase: PopupDatabase
	export let filter: (pdbi: PopupDatabaseItem) => boolean = () => {
		return true
	}
	export let selected: string[]
	export let onSelectChanged: (newSelect: string[]) => void

	export let selectedRow: number | null = null
	let currentText: string = ''
	let showingPopup: boolean = false
</script>

{#if showingPopup}
	<CardPopupControl
		onRowChange={(i) => {
			selectedRow = i
		}}
		{selectedRow}
		onRowSelected={(index, card) => {
			const newSelected = [...selected, card.original.id]
			onSelectChanged(newSelected)
		}}
		fuzzySearch={currentText}
		cardFilter={filter}
		onEscape={() => {
			showingPopup = false
			currentText = ''
		}}
		{popupDatabase}
		{title}
	/>
{/if}

<TextBox
	{currentText}
	placeholderText={placeholder}
	onChange={(t) => {
		currentText = t
		showingPopup = true
		selectedRow = 0
	}}
	onEndEdit={() => {
		showingPopup = false
		currentText = ''
		selectedRow = 0
	}}
	onSubmit={() => {
		showingPopup = false
		currentText = ''
		selectedRow = 0
	}}
/>

{#each selected as s, i}
	<CardFormSelectedItem
		card={popupDatabase.getByIdThrowNull(s)}
		onRemove={() => {
			const copy = [...selected]
			copy.splice(i, 1)
			onSelectChanged(copy)
		}}
	/>
{/each}
