<script lang='ts'>
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import {
    DeckSource, extractDeck,
    type ExtractResult,
    fetchDeckFromId,
    type FetchDeckResult,
  } from '$lib/ahdb/public-api/high-level'
  import type { FullDatabase } from '$lib/core/full-database'
  import type { PopupDatabase } from '$lib/core/popup-database'
  import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
  import helpMd from '$lib/md/deck-viewer.md?raw'

  import AhdbDeckTextbox from '../deck-table/AhdbDeckTextbox.svelte'
  import DeckViewerInner from './DeckViewerInner.svelte'

  export let fullDatabase: FullDatabase
  export let popupDatabase: PopupDatabase

  let deck: FetchDeckResult | null = null
  let loading: boolean = true
  let failed: boolean = false

  $: {
    if (browser) {
      const idParamString = $page.url.searchParams.get('id')
      urlFunc(idParamString)
    }
  }

  const urlFunc = async (idParamString: string | null) => {
    if (idParamString === null) {
      loading = false
      failed = false
      deck = null
      return
    }
    loading = true
    const extractResult = extractDeck(idParamString)
    const d = await fetchDeckFromId(idParamString, extractResult.source)
    loading = false
    if (d === null) {
      failed = true
      return
    }
    deck = d
  }

  async function onExtractDeck(gd: ExtractResult) {
    switch (gd.source) {
      case DeckSource.ArkhamDbPublic:
      case DeckSource.ArkhamBuildShared:
        await goto('/deck/view?id=' + gd.deck)
        break
      case DeckSource.ArkhamDbPublished:
        await goto('/decklist/view?id=' + gd.deck)
        break
      default:
        throw new Error('Unknown deck source')
    }
  }
</script>

<svelte:head>
  <title>arkham-starter.com | Deck Viewer</title>
</svelte:head>

<PageTitle title={'Deck Viewer'} {helpMd} />

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
