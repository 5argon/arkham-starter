<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import {
		type ExtractResult,
		type GetDeckCardIdReturns,
		getDeckCardIds,
	} from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import helpMd from '$lib/md/deck-viewer.md?raw'

	import AhdbDeckTextbox from '../deck-table/AhdbDeckTextbox.svelte'
	import DeckViewerInner from './DeckViewerInner.svelte'

	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let published: boolean

	let deck: GetDeckCardIdReturns | null = null
	let loading: boolean = true
	let failed: boolean = false

	$: {
		if (browser) {
			const deckId = $page.url.searchParams.get('id')
			urlFunc(deckId)
		}
	}

	const urlFunc = async (deckId: string | null) => {
		if (deckId === null) {
			loading = false
			failed = false
			deck = null
			return
		}
		loading = true
		const d = await getDeckCardIds(deckId, published)
		loading = false
		if (d === null) {
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

<PageTitle title={'arkhamdb Deck Viewer'} {helpMd} />

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
