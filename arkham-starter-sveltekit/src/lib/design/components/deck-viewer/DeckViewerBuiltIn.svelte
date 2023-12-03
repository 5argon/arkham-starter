<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { ArkhamStarterDeckData, GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
	import DeckViewerInner from './DeckViewerInner.svelte'

	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let deck: GetDeckCardIdReturns
	export let ahst: ArkhamStarterDeckData
</script>

<svelte:head>
	<title>arkham-starter.com | Deck Viewer</title>
</svelte:head>

<PageTitle title={'Deck Viewer'} />

<DeckViewerInner {fullDatabase} {popupDatabase} deckInput={deck} {ahst} />
