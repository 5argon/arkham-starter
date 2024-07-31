<script lang="ts">
	import type { ArkhamStarterDeckData, FetchDeckResult } from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'

	import DeckViewerInner from './DeckViewerInner.svelte'

	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let deck: FetchDeckResult
	export let ahst: ArkhamStarterDeckData
</script>

<svelte:head>
	<title>arkham-starter.com | Deck Viewer</title>
</svelte:head>

<PageTitle title={'Starter Deck'} />

<DeckViewerInner {fullDatabase} {popupDatabase} deckInput={deck} {ahst} />
