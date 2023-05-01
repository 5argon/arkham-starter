<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { browser } from '$app/environment'
	import {
		getDeckCardIds,
		type GetDeckCardIdReturns,
		forwardDeckToRcore,
		type CustomizableMeta,
		type ExtractResult,
	} from '$lib/ahdb/public-api/high-level'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import CardTableDoubleDisplay from '$lib/design/pages/explore/CardTableDoubleDisplay.svelte'
	import DeckBannerHigher from '$lib/design/components/deck-banner/DeckBannerHigher.svelte'
	import helpMd from '$lib/md/deck-viewer.md?raw'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import AhdbDeckTextbox from '../deck-table/AhdbDeckTextbox.svelte'
	import InvestigatorFrontBack from '../card/InvestigatorFrontBack.svelte'

	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let published: boolean

	interface BigDeck {
		getReturn: GetDeckCardIdReturns
	}
	let deck: BigDeck | null = null
	let loading: boolean = true
	let failed: boolean = false
	let fallback: boolean = false

	let entries: DecklistEntry[] = []
	let sideEntries: DecklistEntry[] = []
	let groupings: Grouping[] = [Grouping.Type]
	let sortings: Sorting[] = [Sorting.Class, Sorting.Set]
	let toggleMap: { [cardId: string]: boolean } = {}
	let sideToggleMap: { [cardId: string]: boolean } = {}
	let customizableMetas: CustomizableMeta[] = []
	function onGroupingsChanged(g: Grouping[]) {
		groupings = g
	}
	function onSortingsChanged(s: Sorting[]) {
		sortings = s
	}

	$: {
		if (browser) {
			const deckId = $page.url.searchParams.get('id')
			urlFunc(deckId)
		}
	}

	const urlFunc = async (deckId: string | null) => {
		if (deckId === null) {
			loading = false
			fallback = true
			failed = false
			deck = null
			return
		}
		loading = true
		const d = await getDeckCardIds(deckId, published)
		loading = false
		if (d === null) {
			fallback = true
			failed = true
			return
		}
		deckProcess(d)
	}

	function deckProcess(d: GetDeckCardIdReturns) {
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
		customizableMetas = rcoreDeck.decodedMeta.customizableMetas ?? []
	}

	async function onExtractDeck(gd: ExtractResult) {
		if (gd.published) {
			await goto('/decklist/view?id=' + gd.deck)
		} else {
			await goto('/deck/view?id=' + gd.deck)
		}
	}
</script>

<svelte:head>
	<title>arkham-starter.com | Deck Viewer</title>
</svelte:head>

<PageTitle title={'Alternate arkhamdb.com Deck Viewer'} {helpMd} />

{#if loading}
	Loading
{:else if deck === null}
	{#if failed}
		Deck loading failed.
	{/if}
	<AhdbDeckTextbox {onExtractDeck} noImport />
{:else}
	<div class="head-flex">
		<div class="head-flex-banner">
			<DeckBannerHigher {popupDatabase} deck={deck.getReturn} />
		</div>
		<div class="head-flex-inv">
			<InvestigatorFrontBack {fullDatabase} deck={deck.getReturn} />
		</div>
	</div>
	<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

	<ListDivider label={'Deck ( ' + entries.reduce((a, b) => a + b.amount, 0) + ' Cards )'} />
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
		{customizableMetas}
		columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
	/>

	{#if sideEntries.length > 0}
		<ListDivider
			label={'Side Deck ( ' + sideEntries.reduce((a, b) => a + b.amount, 0) + ' Cards )'}
		/>
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
			columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
		/>
	{/if}
{/if}

<style>
	.head-flex {
		display: flex;
	}

	.head-flex-banner {
		flex: 4;
		max-width: 750px;
	}

	.head-flex-inv {
		flex: 2;
	}

	@media (max-width: 1000px) {
		.head-flex {
			flex-direction: column;
			align-items: center;
		}

		.head-flex-banner {
			flex: 1;
		}

		.head-flex-inv {
			flex: 1;
		}
	}
</style>
