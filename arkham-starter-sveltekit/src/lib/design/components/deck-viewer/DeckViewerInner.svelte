<script lang='ts'>
  import {
    type ArkhamStarterDeckData,
    type CardAndAmount,
    type CustomizableMeta,
    forwardDeckToRcore,
    type GetDeckCardIdReturns,
  } from '$lib/ahdb/public-api/high-level'
  import { type BondedEntries, makeBondedDecklistEntries } from '$lib/core/bonded'
  import type { FullDatabase } from '$lib/core/full-database'
  import type { PopupDatabase } from '$lib/core/popup-database'
  import { getExtraName } from '$lib/deck/deck'
  import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
  import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
  import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
  import DeckBannerHigher from '$lib/design/components/deck-banner/DeckBannerHigher.svelte'
  import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
  import CardTableDoubleDisplay from '$lib/design/pages/explore/CardTableDoubleDisplay.svelte'

  import Checkbox from '../basic/Checkbox.svelte'
  import InvestigatorFrontBack from '../card/InvestigatorFrontBack.svelte'

  export let fullDatabase: FullDatabase
  export let popupDatabase: PopupDatabase
  export let deckInput: GetDeckCardIdReturns
  export let ahst: ArkhamStarterDeckData | null = null

  let rcoreDeck: GetDeckCardIdReturns
  let entries: DecklistEntry[] = []
  let sideEntries: DecklistEntry[] = []
  let optionalEntries: DecklistEntry[] = []
  let extraEntries: DecklistEntry[] = []
  let bondedEntriesMain: DecklistEntry[] = []
  let bondedEntriesSide: DecklistEntry[] = []

  let allEntries: DecklistEntry[] = []
  $: {
    allEntries = [
      ...entries,
      ...sideEntries,
      ...optionalEntries,
      ...extraEntries,
      ...bondedEntriesMain,
      ...bondedEntriesSide,
    ]
  }

  let groupings: Grouping[] = [Grouping.Type]
  let sortings: Sorting[] = [Sorting.Class, Sorting.Set]
  let toggleMap: { [cardId: string]: boolean[] } = {}
  let sideToggleMap: { [cardId: string]: boolean[] } = {}
  let optionalToggleMap: { [cardId: string]: boolean[] } = {}
  let extraToggleMap: { [cardId: string]: boolean[] } = {}
  let bondedToggleMap: { [cardId: string]: boolean[] } = {}
  let sideBondedToggleMap: { [cardId: string]: boolean[] } = {}
  let allToggleMap: { [cardId: string]: boolean[] } = {}
  let coalesce: boolean = false

  let customizableMetas: CustomizableMeta[] = []

  $: extraNameInvestigator = deckInput.decodedMeta.alternateBack ?? deckInput.investigatorCode
  $: extraName = getExtraName(extraNameInvestigator)

  function onGroupingsChanged(g: Grouping[]) {
    groupings = g
  }

  function onSortingsChanged(s: Sorting[]) {
    sortings = s
  }

  deckProcess(deckInput)

  function deckProcess(d: GetDeckCardIdReturns) {
    rcoreDeck = forwardDeckToRcore(d)
    entries = rcoreDeck.cards1.map<DecklistEntry>((x) => {
      return {
        amount: x.amount,
        cardId: x.cardId,
        id: 'Main' + x.cardId,
      }
    })

    // Side is both ArkhamDB's side deck and Arkham Starter's optional cards.
    const side = rcoreDeck.cards2.map<DecklistEntry>((x) => {
      return {
        amount: x.amount,
        cardId: x.cardId,
        id: 'Side' + x.cardId,
        labels: [
          { color: '#EEEEEE', text: ahst?.extraCards.includes(x.cardId) ? 'Optional' : 'Side' },
        ],
      }
    })

    sideEntries = side.filter((x) => {
      return !ahst?.extraCards.includes(x.cardId) ?? true
    })
    optionalEntries = side.filter((x) => {
      return ahst?.extraCards.includes(x.cardId) ?? false
    })

    const bonded = makeBondedDecklistEntries(popupDatabase, rcoreDeck.cards1, rcoreDeck.cards2)
    bondedEntriesMain = bonded.bondedToMain.map<DecklistEntry>((x) => {
      return {
        amount: x.amount,
        cardId: x.cardId,
        id: 'MainLinked' + x.cardId,
        labels: [{ color: '#EEEEEE', text: 'Linked' }],
      }
    })
    bondedEntriesSide = bonded.bondedToSide.map<DecklistEntry>((x) => {
      return {
        amount: x.amount,
        cardId: x.cardId,
        id: 'SideLinked' + x.cardId,
        labels: [{ color: '#EEEEEE', text: 'Side-LK' }],
      }
    })

    const extraNameInvestigator = deckInput.decodedMeta.alternateBack ?? deckInput.investigatorCode
    const extraName = getExtraName(extraNameInvestigator)
    extraEntries =
      deckInput.decodedMeta.extraDeck?.map<DecklistEntry>((x) => {
        return {
          amount: 1,
          cardId: x,
          id: 'Extra' + x,
          labels: [{ color: '#EEEEEE', text: extraName }],
        }
      }) ?? []
    customizableMetas = rcoreDeck.decodedMeta.customizableMetas ?? []
  }
</script>

<div class='head-flex'>
  <div class='head-flex-banner'>
    <DeckBannerHigher {popupDatabase} deck={deckInput} {ahst} viewerPage {customizableMetas} />
  </div>
  <div class='head-flex-inv'>
    <InvestigatorFrontBack {popupDatabase} {fullDatabase} deck={deckInput} />
    {#if deckInput.published}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class='ahdb-button'
        on:click={() => {
					window.open('https://arkhamdb.com/decklist/view/' + deckInput.id)
				}}
      >
        <div class='ahdb-button-read'>Read full deck guide or leave comment at arkhamdb.com</div>
        <div class='ahdb-button-like'>
          Press the like button (♥) there to show the author some love.
        </div>
      </div>
    {/if}
  </div>
</div>

<Checkbox
  label={'Gather View'}
  checked={coalesce}
  onCheckChanged={(t) => {
		coalesce = t
	}}
/>
<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

{#if !coalesce}
  <ListDivider label={'Deck ( ' + entries.reduce((a, b) => a + b.amount, 0) + ' Cards )'} />
  <CardTableDoubleDisplay
    {toggleMap}
    {entries}
    {groupings}
    {sortings}
    onClickToggle={(id, newToggles) => {
			toggleMap[id] = newToggles
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

  {#if bondedEntriesMain.length > 0}
    <ListDivider
      label={'Linked ( ' + bondedEntriesMain.reduce((a, b) => a + b.amount, 0) + ' Cards )'}
    />
    <CardTableDoubleDisplay
      toggleMap={bondedToggleMap}
      entries={bondedEntriesMain}
      {groupings}
      {sortings}
      onClickToggle={(id, newToggles) => {
				bondedToggleMap[id] = newToggles
				bondedToggleMap = { ...bondedToggleMap }
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

  {#if extraEntries.length > 0}
    <ListDivider
      label={extraName + ' Deck ( ' + extraEntries.reduce((a, b) => a + b.amount, 0) + ' Cards )'}
    />
    <CardTableDoubleDisplay
      toggleMap={extraToggleMap}
      entries={extraEntries}
      {groupings}
      {sortings}
      onClickToggle={(id, newToggles) => {
				extraToggleMap[id] = newToggles
				extraToggleMap = { ...extraToggleMap }
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

  {#if sideEntries.length > 0}
    <ListDivider
      label={'Side Deck ( ' + sideEntries.reduce((a, b) => a + b.amount, 0) + ' Cards )'}
    />
    <CardTableDoubleDisplay
      toggleMap={sideToggleMap}
      entries={sideEntries}
      {groupings}
      {sortings}
      onClickToggle={(id, newToggles) => {
				sideToggleMap[id] = newToggles
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

  {#if bondedEntriesSide.length > 0}
    <ListDivider
      label={'Side Deck : Linked ( ' +
      bondedEntriesSide.reduce((a, b) => a + b.amount, 0) +
				' Cards )'}
    />
    <CardTableDoubleDisplay
      toggleMap={sideBondedToggleMap}
      entries={bondedEntriesSide}
      {groupings}
      {sortings}
      onClickToggle={(id, newToggles) => {
				sideBondedToggleMap[id] = newToggles
				sideBondedToggleMap = { ...sideBondedToggleMap }
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

  {#if optionalEntries.length > 0}
    <ListDivider
      label={'Optional ( ' + optionalEntries.reduce((a, b) => a + b.amount, 0) + ' Cards )'}
    />
    <CardTableDoubleDisplay
      toggleMap={optionalToggleMap}
      entries={optionalEntries}
      {groupings}
      {sortings}
      onClickToggle={(id, newToggles) => {
				optionalToggleMap[id] = newToggles
				optionalToggleMap = { ...optionalToggleMap }
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

{#if coalesce}
  <ListDivider label={'Combined ( ' + allEntries.reduce((a, b) => a + b.amount, 0) + ' Cards )'} />
  <CardTableDoubleDisplay
    toggleMap={allToggleMap}
    entries={allEntries}
    {groupings}
    {sortings}
    onClickToggle={(id, newToggles) => {
			allToggleMap[id] = newToggles
			allToggleMap = { ...allToggleMap }
		}}
    taboo={true}
    {fullDatabase}
    {popupDatabase}
    showList
    showScans
    small
    {customizableMetas}
    columns={[ExtraColumn.Cost, ExtraColumn.Icons, ExtraColumn.Label]}
    showLabelOnScans
  />
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

    .ahdb-button {
        margin: 4px 32px;
        padding: 8px;
        cursor: pointer;
        border: 2px solid black;
        text-align: center;
        user-select: none;
    }

    .ahdb-button-read {
        font-size: large;
        font-weight: bold;
    }

    .ahdb-button-like {
        font-size: small;
    }

    .ahdb-button:hover {
        color: rgb(158, 158, 158);
        border-color: rgb(158, 158, 158);
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
