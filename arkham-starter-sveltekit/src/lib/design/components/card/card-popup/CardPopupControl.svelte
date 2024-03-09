<script lang="ts">
	import { isOldCore } from '$lib/ahdb/conversion'
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'

	import CardPopupDrawing from './CardPopupDrawing.svelte'

	export let popupDatabase: PopupDatabase
	export let fuzzySearch: string = ''
	export let cardFilter: (pdbi: PopupDatabaseItem) => boolean = (i) => {
		return true
	}

	export let title: string | undefined = undefined

	// Selected by pressing enter or clicking. Usually the popup should disappear
	// and something happens.
	export let onRowChange: (index: number) => void
	export let onRowSelected: (index: number, card: PopupDatabaseItem) => void
	export let onEscape: () => void = () => {}

	$: cards = popupDatabase.fuzzySearch(fuzzySearch).filter((i) => {
		return !isOldCore(i.original.id) && cardFilter(i)
	})
	export let selectedRow: number | null
</script>

<svelte:window
	on:keydown={(k) => {
		if (k.code === 'ArrowDown') {
			k.preventDefault()
			if (selectedRow === null) {
				onRowChange(0)
			} else {
				onRowChange(Math.min(selectedRow + 1, cards.length - 1))
			}
		}
		if (k.code === 'ArrowUp') {
			k.preventDefault()
			if (selectedRow === null) {
				onRowChange(0)
			} else {
				onRowChange(Math.max(selectedRow - 1, 0))
			}
		}
		if (k.code === 'Enter') {
			if (selectedRow !== null && selectedRow < cards.length) {
				const card = cards[selectedRow]
				if (card !== null) {
					onRowSelected(selectedRow, card)
				}
			}
		}
		if (k.code === 'Escape') {
			onEscape()
		}
	}}
/>
<CardPopupDrawing
	onClick={(i, c) => {
		onRowSelected(i, c)
	}}
	{popupDatabase}
	{title}
	selectedIndex={selectedRow}
	{cards}
/>
