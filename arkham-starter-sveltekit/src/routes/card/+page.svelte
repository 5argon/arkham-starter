<script lang="ts">
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import Button from '$lib/design/components/basic/Button.svelte'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import CardLaid from '$lib/design/components/deck-table/CardLaid.svelte'
	import CardForm from '$lib/design/components/form/CardForm.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'

	import type { PageData } from './$types'
	export let data: PageData
	let singleModeCard: string | undefined = undefined
	let multiModeCards: string[] = []
	let multiMode: boolean = false
	let smaller: boolean = false

	let showing: string[] = []
	let showingEntries: DecklistEntry[] = []

	$: {
		if (multiMode) {
			showing = multiModeCards
		} else {
			showing = singleModeCard ? [singleModeCard] : []
		}
		showingEntries = showing.map((x) => {
			return { amount: 1, cardId: x, id: x, labels: [] }
		})
	}
</script>

<svelte:head>
	<title>arkham-starter.com | Player Card</title>
</svelte:head>

<PageTitle title="Player Card" />

<p>
	Search and take a look at the image of any player card as long as you know the name. Multi Mode
	let you lay down multiple cards side by side in any order, like on a physical table. This tool is
	fast and can handle fuzzy search!
</p>

<p>
	You can discuss about cards with your friends when you don't have the collection with you. If you
	are a content creator shooting live, you can use it to display cards you are talking about.
</p>

<div class="settings">
	<Checkbox
		label="Multi Mode"
		checked={multiMode}
		onCheckChanged={(c) => {
			multiMode = c
		}}
	/>
	<Checkbox
		label="Smaller"
		checked={smaller}
		onCheckChanged={(c) => {
			smaller = c
		}}
	/>

	{#if multiMode}
		<Button
			label="Clear"
			block
			onClick={() => {
				multiModeCards = []
			}}
		/>
	{/if}
</div>

<CardForm
	popupDatabase={data.pdb}
	onSelectChanged={(s) => {
		if (multiMode) {
			multiModeCards = s
		} else {
			if (s.length > 0) {
				singleModeCard = s[s.length - 1]
			} else {
				singleModeCard = undefined
			}
		}
	}}
	selected={showing}
	title={'Search Result'}
	placeholder={"Search by card's name"}
	filter={(pdbi) => {
		return pdbi.original.sp !== true && pdbi.original.hd !== true
	}}
/>

<div class="highlight">
	<CardLaid
		entries={showingEntries}
		groupings={[]}
		sortings={[]}
		toggleMap={{}}
		big={!smaller}
		fullDatabase={data.fdb}
		popupDatabase={data.pdb}
	/>
</div>

<style>
	.settings {
		margin: 8px 0px;
	}

	.highlight {
		margin: 0 auto;
	}
</style>
