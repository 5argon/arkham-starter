<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import CardPopupDrawing from './CardPopupDrawing.svelte'

	export let popupDatabase: PopupDatabase
	export let fuzzySearch: string = ''
	// Limit to these cards instead of an entire database.
	export let cardFilter: string[] = []

	export let title: string | undefined = undefined

	// Selected by pressing enter or clicking. Usually the popup should disappear
	// and something happens.
	export let onRowSelected: (index: number, card: PopupDatabaseItem) => void

	let cards = ['01516', '01527', '01525', '01525', '01559', '01560', '01561', '01562', '01563']
	let selectedRow: number | null = 0
</script>

<svelte:window
	on:keydown={(k) => {
		if (k.code === 'ArrowDown') {
			k.preventDefault()
			if (selectedRow === null) {
				selectedRow = 0
			} else {
				selectedRow = Math.min(selectedRow + 1, cards.length - 1)
			}
		}
		if (k.code === 'ArrowUp') {
			k.preventDefault()
			if (selectedRow === null) {
				selectedRow = 0
			} else {
				selectedRow = Math.max(selectedRow - 1, 0)
			}
		}
		if (k.code === 'Enter') {
			if (selectedRow !== null) {
				const card = popupDatabase.getById(cards[selectedRow])
				if (card !== null) {
					onRowSelected(selectedRow, card)
				}
			}
		}
	}}
/>
<CardPopupDrawing {popupDatabase} {title} selectedIndex={selectedRow} cardIds={cards} />
