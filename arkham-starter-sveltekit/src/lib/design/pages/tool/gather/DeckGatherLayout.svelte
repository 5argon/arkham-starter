<script lang='ts'>
  import { LimitedTab } from '@5argon/arkham-ui'

  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import type { FetchDeckResult } from '$lib/ahdb/public-api/high-level'
  import { extractDeck, type ExtractResult, fetchDeckFromId } from '$lib/ahdb/public-api/high-level'
  import type { FullDatabase } from '$lib/core/full-database'
  import type { PopupDatabase } from '$lib/core/popup-database'
  import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
  import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
  import Button from '$lib/design/components/basic/Button.svelte'
  import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
  import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
  import PageShortDescription from '$lib/design/components/basic/PageShortDescription.svelte'
  import TextBox from '$lib/design/components/basic/TextBox.svelte'
  import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
  import CountSummary from '$lib/design/components/deck-table/CountSummary.svelte'
  import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
  import PlayerDeckInput from '$lib/design/components/deck-table/PlayerDeckInput.svelte'
  import NotificationNumber from '$lib/design/components/inline/NotificationNumber.svelte'
  import { newDeck, type Player, pushInCentralEntry } from '$lib/design/pages/tool/gather/gather-logic'
  import { checkOverlaps } from '$lib/tool/overlap/overlap-helpers'

  import CardTableDoubleDisplay from '../../explore/CardTableDoubleDisplay.svelte'

  export let pdb: PopupDatabase
  export let fdb: FullDatabase

  export let startingP1: string = ''
  export let startingP2: string = ''
  export let startingP3: string = ''
  export let startingP4: string = ''
  export let startingP5: string = ''
  export let startingP6: string = ''
  export let startingP7: string = ''
  export let startingP8: string = ''
  let showMainDeck: boolean = true
  let showSideDeck: boolean = true
  let forwardRcore: boolean = true
  let sharingUrl: string = ''
  let entries: DecklistEntry[] = []
  let toggleMap: { [cardId: string]: boolean[] } = {}
  let overlappingEntries: DecklistEntry[] = []
  let p1: Player = newDeck(startingP1)
  let p2: Player = newDeck(startingP2)
  let p3: Player = newDeck(startingP3)
  let p4: Player = newDeck(startingP4)
  let p5: Player = newDeck(startingP5)
  let p6: Player = newDeck(startingP6)
  let p7: Player = newDeck(startingP7)
  let p8: Player = newDeck(startingP8)
  let p1r: FetchDeckResult | null = null
  let p2r: FetchDeckResult | null = null
  let p3r: FetchDeckResult | null = null
  let p4r: FetchDeckResult | null = null
  let p5r: FetchDeckResult | null = null
  let p6r: FetchDeckResult | null = null
  let p7r: FetchDeckResult | null = null
  let p8r: FetchDeckResult | null = null
  let pulling: boolean = false
  let eightMode: boolean =
    startingP5 !== '' || startingP6 !== '' || startingP7 !== '' || startingP8 !== ''
  $: overlapping = overlappingEntries.length > 0
  var overlappingCount: number

  gather()

  async function gather() {
    if (p1.deckUrl === '' && p2.deckUrl === '' && p3.deckUrl === '' && p4.deckUrl === '') {
      return
    }
    if (pulling) {
      return
    }
    pulling = true
    overlapping = false
    p1r = null
    p2r = null
    p3r = null
    p4r = null
    p5r = null
    p6r = null
    p7r = null
    p8r = null
    const p1x = extractDeck(p1.deckUrl)
    const p2x = extractDeck(p2.deckUrl)
    const p3x = extractDeck(p3.deckUrl)
    const p4x = extractDeck(p4.deckUrl)
    const p5x = extractDeck(p5.deckUrl)
    const p6x = extractDeck(p6.deckUrl)
    const p7x = extractDeck(p7.deckUrl)
    const p8x = extractDeck(p8.deckUrl)

    async function fetchDeck(x: ExtractResult): Promise<FetchDeckResult | null> {
      if (x.deck === '') {
        return null
      }
      return await fetchDeckFromId(x.deck, x.source)
    }

    const promises: Promise<FetchDeckResult | null>[] = [
      fetchDeck(p1x),
      fetchDeck(p2x),
      fetchDeck(p3x),
      fetchDeck(p4x),
      fetchDeck(p5x),
      fetchDeck(p6x),
      fetchDeck(p7x),
      fetchDeck(p8x),
    ]
    const awaited = await Promise.all(promises)
    p1r = awaited[0]
    p2r = awaited[1]
    p3r = awaited[2]
    p4r = awaited[3]
    p5r = awaited[4]
    p6r = awaited[5]
    p7r = awaited[6]
    p8r = awaited[7]

    p1 = {
      ...p1,
      deck: p1r ? p1r.deck : '',
      error: !p1r && p1.deckUrl !== '' ? true : false,
    }
    p2 = {
      ...p2,
      deck: p2r ? p2r.deck : '',
      error: !p2r && p2.deckUrl !== '' ? true : false,
    }
    p3 = {
      ...p3,
      deck: p3r ? p3r.deck : '',
      error: !p3r && p3.deckUrl !== '' ? true : false,
    }
    p4 = {
      ...p4,
      deck: p4r ? p4r.deck : '',
      error: !p4r && p4.deckUrl !== '' ? true : false,
    }
    p5 = {
      ...p5,
      deck: p5r ? p5r.deck : '',
      error: !p5r && p5.deckUrl !== '' ? true : false,
    }
    p6 = {
      ...p6,
      deck: p6r ? p6r.deck : '',
      error: !p6r && p6.deckUrl !== '' ? true : false,
    }
    p7 = {
      ...p7,
      deck: p7r ? p7r.deck : '',
      error: !p7r && p7.deckUrl !== '' ? true : false,
    }
    p8 = {
      ...p8,
      deck: p8r ? p8r.deck : '',
      error: !p8r && p8.deckUrl !== '' ? true : false,
    }
    sharingUrl = 'https://arkham-starter.com/tool/gather'
    reactFill(p1r, p2r, p3r, p4r, p5r, p6r, p7r, p8r)
    const su: string[] = []
    if (p1r) {
      su.push('p1=' + (p1x.source ? 'p-' : '') + p1x.deck)
    }
    if (p2r) {
      su.push('p2=' + (p2x.source ? 'p-' : '') + p2x.deck)
    }
    if (p3r) {
      su.push('p3=' + (p3x.source ? 'p-' : '') + p3x.deck)
    }
    if (p4r) {
      su.push('p4=' + (p4x.source ? 'p-' : '') + p4x.deck)
    }
    if (p5r) {
      su.push('p5=' + (p5x.source ? 'p-' : '') + p5x.deck)
    }
    if (p6r) {
      su.push('p6=' + (p6x.source ? 'p-' : '') + p6x.deck)
    }
    if (p7r) {
      su.push('p7=' + (p7x.source ? 'p-' : '') + p7x.deck)
    }
    if (p8r) {
      su.push('p8=' + (p8x.source ? 'p-' : '') + p8x.deck)
    }
    if (su.length > 0) {
      sharingUrl += '?' + su.join('&')
    }
    goto('/tool/gather' + '?' + su.join('&'), { replaceState: true })
    pulling = false
  }

  async function reactFill(
    p1rr: FetchDeckResult | null,
    p2rr: FetchDeckResult | null,
    p3rr: FetchDeckResult | null,
    p4rr: FetchDeckResult | null,
    p5rr: FetchDeckResult | null,
    p6rr: FetchDeckResult | null,
    p7rr: FetchDeckResult | null,
    p8rr: FetchDeckResult | null,
  ) {
    entries = []
    toggleMap = {}
    overlappingEntries = []
    if (p1rr) {
      pushInCentralEntry(p1rr, 0, entries, forwardRcore, showMainDeck, showSideDeck, pdb)
    }
    if (p2rr) {
      pushInCentralEntry(p2rr, 1, entries, forwardRcore, showMainDeck, showSideDeck, pdb)
    }
    if (p3rr) {
      pushInCentralEntry(p3rr, 2, entries, forwardRcore, showMainDeck, showSideDeck, pdb)
    }
    if (p4rr) {
      pushInCentralEntry(p4rr, 3, entries, forwardRcore, showMainDeck, showSideDeck, pdb)
    }
    if (p5rr) {
      pushInCentralEntry(p5rr, 4, entries, forwardRcore, showMainDeck, showSideDeck, pdb)
    }
    if (p6rr) {
      pushInCentralEntry(p6rr, 5, entries, forwardRcore, showMainDeck, showSideDeck, pdb)
    }
    if (p7rr) {
      pushInCentralEntry(p7rr, 6, entries, forwardRcore, showMainDeck, showSideDeck, pdb)
    }
    if (p8rr) {
      pushInCentralEntry(p8rr, 7, entries, forwardRcore, showMainDeck, showSideDeck, pdb)
    }
    const checkResult = checkOverlaps(entries, (c) => fdb.getCard(c).original.quantity)
    overlappingEntries.push(...checkResult.overlapReports)
    overlappingCount = checkResult.uniqueOverlapCount
    entries = [...entries]
    overlappingEntries = [...overlappingEntries]
  }

  let groupings: Grouping[] = [Grouping.Set]
  let sortings: Sorting[] = [Sorting.Number]

  function onGroupingsChanged(g: Grouping[]) {
    groupings = g
  }

  function onSortingsChanged(s: Sorting[]) {
    sortings = s
  }

  async function fastForwardAll() {
  }
</script>

<PageShortDescription>Collect all required cards of multiple decks into one freely sortable list. You can go through
  your collection just once to gather cards for everyone. It has a deck overlap analyzer that also checks the Side Deck.
</PageShortDescription>

<div class='sharing-url'>
  <TextBox label='Sharing URL' currentText={sharingUrl} />
</div>

<div class='options'>
  {#if browser && navigator.canShare?.()}
    <Button
      label='Share URL'
      onClick={() => {
				navigator.share({ url: sharingUrl })
			}}
    />
  {/if}
  <Button
    label='Reset Toggles'
    onClick={() => {
			toggleMap = {}
		}}
  />
  {#if !eightMode}
    <Button
      label='Expand to 8 Decks'
      onClick={() => {
				eightMode = true
			}}
    />
  {/if}
  <Checkbox
    label='Forward to Revised Core Set'
    checked={forwardRcore}
    onCheckChanged={() => {
			forwardRcore = !forwardRcore
			reactFill(p1r, p2r, p3r, p4r, p5r, p6r, p7r, p8r)
		}}
  />
  <Checkbox
    label='Show Main Deck'
    checked={showMainDeck}
    onCheckChanged={() => {
			showMainDeck = !showMainDeck
			reactFill(p1r, p2r, p3r, p4r, p5r, p6r, p7r, p8r)
		}}
  />
  <Checkbox
    label='Show Side Deck'
    checked={showSideDeck}
    onCheckChanged={() => {
			showSideDeck = !showSideDeck
			reactFill(p1r, p2r, p3r, p4r, p5r, p6r, p7r, p8r)
		}}
  />
</div>

<PlayerDeckInput
  player={0}
  popupDatabase={pdb}
  fetchResult={p1r ?? undefined}
  deckInput={p1.deckUrl}
  pullError={p1.error}
  {pulling}
  pulledDeckName={p1.deck}
  onDeckUrlChanged={(s) => {
		p1 = { ...p1, deckUrl: s }
	}}
  onNextDeck={() => {
		fastForwardAll()
	}}
/>
<PlayerDeckInput
  player={1}
  popupDatabase={pdb}
  fetchResult={p2r ?? undefined}
  deckInput={p2.deckUrl}
  pullError={p2.error}
  {pulling}
  pulledDeckName={p2.deck}
  onDeckUrlChanged={(s) => {
		p2 = { ...p2, deckUrl: s }
	}}
  onNextDeck={() => {
		fastForwardAll()
	}}
/>
<PlayerDeckInput
  player={2}
  popupDatabase={pdb}
  fetchResult={p3r ?? undefined}
  deckInput={p3.deckUrl}
  pullError={p3.error}
  {pulling}
  pulledDeckName={p3.deck}
  onDeckUrlChanged={(s) => {
		p3 = { ...p3, deckUrl: s }
	}}
  onNextDeck={() => {
		fastForwardAll()
	}}
/>
<PlayerDeckInput
  player={3}
  popupDatabase={pdb}
  fetchResult={p4r ?? undefined}
  deckInput={p4.deckUrl}
  pullError={p4.error}
  {pulling}
  pulledDeckName={p4.deck}
  onDeckUrlChanged={(s) => {
		p4 = { ...p4, deckUrl: s }
	}}
  onNextDeck={() => {
		fastForwardAll()
	}}
/>
{#if eightMode}
  <PlayerDeckInput
    player={4}
    popupDatabase={pdb}
    fetchResult={p5r ?? undefined}
    deckInput={p5.deckUrl}
    pullError={p5.error}
    {pulling}
    pulledDeckName={p5.deck}
    onDeckUrlChanged={(s) => {
			p5 = { ...p5, deckUrl: s }
		}}
    onNextDeck={() => {
			fastForwardAll()
		}}
  />
  <PlayerDeckInput
    player={5}
    popupDatabase={pdb}
    fetchResult={p6r ?? undefined}
    deckInput={p6.deckUrl}
    pullError={p6.error}
    {pulling}
    pulledDeckName={p6.deck}
    onDeckUrlChanged={(s) => {
			p6 = { ...p6, deckUrl: s }
		}}
    onNextDeck={() => {
			fastForwardAll()
		}}
  />
  <PlayerDeckInput
    player={6}
    popupDatabase={pdb}
    fetchResult={p7r ?? undefined}
    deckInput={p7.deckUrl}
    pullError={p7.error}
    {pulling}
    pulledDeckName={p7.deck}
    onDeckUrlChanged={(s) => {
			p7 = { ...p7, deckUrl: s }
		}}
    onNextDeck={() => {
			fastForwardAll()
		}}
  />
  <PlayerDeckInput
    player={7}
    popupDatabase={pdb}
    fetchResult={p8r ?? undefined}
    deckInput={p8.deckUrl}
    pullError={p8.error}
    {pulling}
    pulledDeckName={p8.deck}
    onDeckUrlChanged={(s) => {
			p8 = { ...p8, deckUrl: s }
		}}
    onNextDeck={() => {
			fastForwardAll()
		}}
  />
{/if}

<Button disabled={pulling} label='Gather All Cards' onClick={gather} big block center />

{#if !pulling && (entries.length !== 0 || overlappingEntries.length !== 0)}
  <div class='limited-tab'>
    <LimitedTab hide2={!overlapping}>
      <div slot='tab1'>Gathered Cards</div>
      <div slot='content1'>
        <ListDivider label='Gathered Cards' />
        <GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />
        <CardTableDoubleDisplay
          {toggleMap}
          {entries}
          {groupings}
          {sortings}
          taboo={true}
          onClickToggle={(id, newToggles) => {
						toggleMap[id] = newToggles
					}}
          small
          showLabelOnScans
          fullDatabase={fdb}
          popupDatabase={pdb}
          columns={[ExtraColumn.Label]}
          showList
          showScans
        />
      </div>
      <div slot='tab2'>
        <span class='deck-overlaps-tab-text'>Deck Overlaps</span>
        <NotificationNumber count={overlappingCount} attention />
      </div>
      <div slot='content2'>
        {#if overlapping}
          <ListDivider label={'Deck Overlaps'} />
          <p>Trobleshooting number "X/Y" on the label (X is higher than Y) means :</p>
          <ul>
            <li>X: Amount of this card contributed from all decks.</li>
            <li>Y: Amount of this card you have in your collection.</li>
          </ul>
          <GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />
          <CardTableGrouped
            {toggleMap}
            entries={overlappingEntries}
            {groupings}
            {sortings}
            taboo={true}
            fullDatabase={fdb}
            popupDatabase={pdb}
            columns={[ExtraColumn.Label]}
            centered
          />
        {/if}
      </div>
      <div slot='tab3'>Count Summary</div>
      <div slot='content3'>
        <ListDivider label={'Count Summary'} />
        <GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />
        <CountSummary {entries} {groupings} {sortings} fullDatabase={fdb} centered />
      </div>
    </LimitedTab>
  </div>
{/if}

<style>
    .options {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 12px;
    }

    .sharing-url {
        margin-bottom: 12px;
    }

    .deck-overlaps-tab-text {
        color: red;
        font-weight: bold;
    }

    .limited-tab {
        margin: 8px 0px;
    }
</style>
