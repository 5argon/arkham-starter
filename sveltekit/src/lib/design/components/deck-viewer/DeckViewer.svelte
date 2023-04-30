<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import {
		getDeckCardIds,
		type GetDeckCardIdReturns,
		forwardDeckToRcore,
	} from '$lib/ahdb/public-api/high-level'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import CardTableDoubleDisplay from '$lib/design/pages/explore/CardTableDoubleDisplay.svelte'
	import DeckBannerHigher from '$lib/design/components/deck-banner/DeckBannerHigher.svelte'
	import helpMd from '$lib/md/deck-viewer.md?raw'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'

	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let published: boolean

	interface BigDeck {
		getReturn: GetDeckCardIdReturns
	}
	let deck: BigDeck | null = null
	let loading: boolean = true

	let entries: DecklistEntry[] = []
	let sideEntries: DecklistEntry[] = []
	let groupings: Grouping[] = [Grouping.Type]
	let sortings: Sorting[] = [Sorting.Class, Sorting.Set]
	let toggleMap: { [cardId: string]: boolean } = {}
	let sideToggleMap: { [cardId: string]: boolean } = {}
	function onGroupingsChanged(g: Grouping[]) {
		groupings = g
	}
	function onSortingsChanged(s: Sorting[]) {
		sortings = s
	}
	onMount(async () => {
		const deckId = $page.url.searchParams.get('id')
		if (deckId === null) {
			return
		}
		const d = await getDeckCardIds(deckId, published)
		loading = false
		if (d === null) {
			return
		}
		const rcoreDeck = forwardDeckToRcore(d)
		deck = { getReturn: d }
		entries = rcoreDeck.cards1.map<DecklistEntry>((x) => {
			return {
				amount: x.amount,
				cardId: x.cardId,
				id: x.cardId,
			}
		})
		sideEntries = rcoreDeck.cards2.map<DecklistEntry>((x) => {
			return {
				amount: x.amount,
				cardId: x.cardId,
				id: x.cardId,
			}
		})
	})
</script>

<svelte:head>
	<title>arkham-starter.com | Deck Viewer</title>
</svelte:head>

<PageTitle title={'Alternate arkhamdb.com Deck Viewer'} {helpMd} />

{#if loading}
	Loading
{:else if deck === null}
	Deck loading failed.
{:else}
	<DeckBannerHigher {popupDatabase} deck={deck.getReturn} />
	<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

	<CardTableDoubleDisplay
		{toggleMap}
		{entries}
		{groupings}
		{sortings}
		onClickToggle={(c, t) => {
			toggleMap[c] = t
			toggleMap = { ...toggleMap }
		}}
		taboo={true}
		{fullDatabase}
		{popupDatabase}
		showList
		showScans
		small
	/>

	{#if sideEntries.length > 0}
		<ListDivider label={'Side Deck'} />
		<CardTableDoubleDisplay
			toggleMap={sideToggleMap}
			entries={sideEntries}
			{groupings}
			{sortings}
			onClickToggle={(c, t) => {
				sideToggleMap[c] = t
				sideToggleMap = { ...sideToggleMap }
			}}
			taboo={true}
			{fullDatabase}
			{popupDatabase}
			showList
			showScans
			small
		/>
	{/if}
{/if}
