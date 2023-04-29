<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import {
		getDeckCardIds,
		type GetDeckCardIdReturns,
		forwardDeckToRcore,
	} from '$lib/ahdb/public-api/high-level'
	import DeckBanner from '$lib/design/components/deck-banner/DeckBanner.svelte'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import CardTableDoubleDisplay from '$lib/design/pages/explore/CardTableDoubleDisplay.svelte'
	import { getRepresentativeCards } from '$lib/deck/get-representative-cards'
	import { addPackCount, countPacks } from '$lib/deck/deck-count'
	import { CardPack } from '$lib/core/card-pack'
	import type { PackInfoSpanItem } from '$lib/design/components/inline/PackInfoSpan.svelte'
	import { CardClass } from '$lib/core/card-class'
	export let data: PageData
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
	let representativeCards: string[] = []
	let packInfoSpanItems: PackInfoSpanItem[]
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
		const d = await getDeckCardIds(deckId, false)
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
		representativeCards = getRepresentativeCards(
			rcoreDeck.cards1.map((x) => x.cardId),
			rcoreDeck.cards2.map((x) => x.cardId),
			data.pdb,
		)
		const a = countPacks(rcoreDeck.cards1, (c) => data.pdb.getById(c)?.packIcon ?? CardPack.Unknown)
		const b = countPacks(rcoreDeck.cards2, (c) => data.pdb.getById(c)?.packIcon ?? CardPack.Unknown)
		const c = countPacks(rcoreDeck.cards3, (c) => data.pdb.getById(c)?.packIcon ?? CardPack.Unknown)
		const packCount = addPackCount(addPackCount(a, b), c)
		packInfoSpanItems = Object.entries(packCount).map<PackInfoSpanItem>(([packString, count]) => {
			return {
				pack: parseInt(packString),
				count: count,
			}
		})
	})
</script>

<svelte:head>
	<title>arkham-starter.com | Deck Viewer</title>
</svelte:head>

<PageTitle title={'Deck Viewer'} />

{#if loading}
	Loading
{:else if deck === null}
	Deck loading failed.
{:else}
	<DeckBanner
		popupDb={data.pdb}
		link={deck.getReturn.link}
		packs={packInfoSpanItems}
		deckName={deck.getReturn.deck}
		investigatorCode={deck.getReturn.investigatorCode}
		previewCards={representativeCards}
	/>
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
		fullDatabase={data.fdb}
		showList
		showScans
		small
		separateCount
	/>

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
		fullDatabase={data.fdb}
		showList
		showScans
		small
		separateCount
	/>
{/if}
