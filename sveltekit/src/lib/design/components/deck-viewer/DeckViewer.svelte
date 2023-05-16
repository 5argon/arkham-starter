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
	import DeckViewerInner from './DeckViewerInner.svelte'

	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let published: boolean

	let deck: GetDeckCardIdReturns | null = null
	let loading: boolean = true
	let failed: boolean = false
	let fallback: boolean = false

	let entries: DecklistEntry[] = []
	let sideEntries: DecklistEntry[] = []
	let groupings: Grouping[] = [Grouping.Type]
	let sortings: Sorting[] = [Sorting.Class, Sorting.Set]
	let toggleMap: { [cardId: string]: boolean[] } = {}
	let sideToggleMap: { [cardId: string]: boolean[] } = {}
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
		deck = d
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

<PageTitle title={'Alternate arkhamdb Deck Viewer'} {helpMd} />

{#if loading}
	Loading
{:else if deck === null}
	{#if failed}
		Deck loading failed.
	{/if}
	<AhdbDeckTextbox {onExtractDeck} noImport />
{:else}
	<DeckViewerInner {fullDatabase} {popupDatabase} deckInput={deck} />
{/if}
