<script lang='ts' context='module'>
  import { DeckSource, type FetchDeckResult } from '$lib/ahdb/public-api/high-level'
</script>

<script lang='ts'>
  import { LimitedTab } from '@5argon/arkham-ui'

  import { extractDeck, fetchUntilLatest } from '$lib/ahdb/public-api/high-level'
  import { fetchFullDatabaseStatic } from '$lib/core/full-database'
  import { fetchPopupDatabaseStatic } from '$lib/core/popup-database'
  import { type GoToGatherInputArgs, openGatherInNewTab } from '$lib/deck/open-gather-in-new-tab'
  import type { DecklistEntry, DecklistLabel } from '$lib/deck-table/decklist-entry'
  import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
  import Button from '$lib/design/components/basic/Button.svelte'
  import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
  import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
  import TextBox from '$lib/design/components/basic/TextBox.svelte'
  import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
  import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
  import PlayerDeckInput from '$lib/design/components/deck-table/PlayerDeckInput.svelte'
  import {
    type BothDatabase,
    doSide,
    getPon, oneSide,
    type PlayerOrNull,
    tempDis,
  } from '$lib/design/pages/tool/switch/switch-logic'
  import {
    CampaignSwitchProto,
    CampaignSwitchProto_InputDeck,
  } from '$lib/proto/generated/campaign_switch'
  import { intersect, type IntersectionResult } from '$lib/tool/overlap/overlap-helpers'
  import { base64ToBinary, binaryToUrlString } from '$lib/tool/script/export/options'

  export let protoString: string | null = null
  let sharingUrl = ''
  let pulling = false
  let pulledOnce = false
  let remainingTabIndex = 1
  let forwardRcore: boolean = true

  let toggleMapTransfer: { [cardId: string]: boolean[] } = {}
  let toggleMapRemainingActive: { [cardId: string]: boolean[] } = {}
  let toggleMapRemainingInactive: { [cardId: string]: boolean[] } = {}

  let groupings: Grouping[] = []
  let sortings: Sorting[] = []

  function onGroupingsChanged(g: Grouping[]) {
    groupings = g
  }

  function onSortingsChanged(s: Sorting[]) {
    sortings = s
  }

  let groupings2: Grouping[] = [Grouping.Set]
  let sortings2: Sorting[] = [Sorting.Number]

  function onGroupingsChanged2(g: Grouping[]) {
    groupings2 = g
  }

  function onSortingsChanged2(s: Sorting[]) {
    sortings2 = s
  }

  let activeCampaignDecks: PlayerOrNull[] = new Array<PlayerOrNull>(4).fill(null)
  let inactiveCampaignDecks: PlayerOrNull[] = new Array<PlayerOrNull>(4).fill(null)

  let remainingActiveEntries: DecklistEntry[] = []
  let remainingInactiveEntries: DecklistEntry[] = []
  let transferEntries: DecklistEntry[] = []

  let fdbPromise = fetchFullDatabaseStatic()
  let pdbDatabase = fetchPopupDatabaseStatic()
  let bothPromises: Promise<BothDatabase> = Promise.all([fdbPromise, pdbDatabase]).then((x) => {
    return {
      fdb: x[0],
      pdb: x[1],
    }
  })
  startingProtoProcessing()

  async function startingProtoProcessing() {
    if (protoString !== null) {
      try {
        function makePon(input: CampaignSwitchProto_InputDeck | undefined): PlayerOrNull {
          if (input === undefined) {
            return {
              deck: '',
              deckUrl: '',
              fetchResult: undefined,
              nextDeck: undefined,
              previousDeck: undefined,
              error: false,
              investigator: null,
              source: DeckSource.ArkhamDbPublic,
            }
          }
          return {
            deck: '',
            deckUrl: (input.published ? 'p:' : '') + input.id,
            fetchResult: undefined,
            nextDeck: undefined,
            previousDeck: undefined,
            error: false,
            investigator: null,
            source: input.published ? DeckSource.ArkhamDbPublished : DeckSource.ArkhamDbPublic,
          }
        }

        const tap = CampaignSwitchProto.fromBinary(base64ToBinary(protoString))
        if (tap.campaigns.length > 0) {
          const activeCampaign = tap.campaigns[0]
          activeCampaignDecks[0] = makePon(activeCampaign.deck1)
          activeCampaignDecks[1] = makePon(activeCampaign.deck2)
          activeCampaignDecks[2] = makePon(activeCampaign.deck3)
          activeCampaignDecks[3] = makePon(activeCampaign.deck4)
          activeCampaignDecks = [...activeCampaignDecks]
        }
        if (tap.campaigns.length > 1) {
          const inactiveCampaign = tap.campaigns[1]
          inactiveCampaignDecks[0] = makePon(inactiveCampaign.deck1)
          inactiveCampaignDecks[1] = makePon(inactiveCampaign.deck2)
          inactiveCampaignDecks[2] = makePon(inactiveCampaign.deck3)
          inactiveCampaignDecks[3] = makePon(inactiveCampaign.deck4)
          inactiveCampaignDecks = [...inactiveCampaignDecks]
        }
        changeSharingUrl()
        const bdb = await bothPromises
        process(bdb)
      } catch {
      }
    }
  }

  function changeSharingUrl() {
    function toProtoInputDeck(pon: PlayerOrNull): CampaignSwitchProto_InputDeck | undefined {
      if (pon !== null) {
        const extract = extractDeck(pon.deckUrl)
        return {
          id: extract.deck,
          published: extract.source === DeckSource.ArkhamDbPublished,
        }
      }
      return undefined
    }

    const newProto: CampaignSwitchProto = {
      campaigns: [
        {
          name: '',
          deck1: toProtoInputDeck(activeCampaignDecks[0]),
          deck2: toProtoInputDeck(activeCampaignDecks[1]),
          deck3: toProtoInputDeck(activeCampaignDecks[2]),
          deck4: toProtoInputDeck(activeCampaignDecks[3]),
        },
        {
          name: '',
          deck1: toProtoInputDeck(inactiveCampaignDecks[0]),
          deck2: toProtoInputDeck(inactiveCampaignDecks[1]),
          deck3: toProtoInputDeck(inactiveCampaignDecks[2]),
          deck4: toProtoInputDeck(inactiveCampaignDecks[3]),
        },
      ],
    }
    const binary = CampaignSwitchProto.toBinary(newProto)
    const urlString = binaryToUrlString(binary)
    const url = 'https://arkham-starter.com/tool/switch?i=' + urlString
    sharingUrl = url
  }

  function onDeckChanged(d: PlayerOrNull, s: string, i: number, inactiveCampaign: boolean) {
    const extracted = extractDeck(s)
    let neww: PlayerOrNull = null
    if (d !== null) {
      neww = { ...d, deckUrl: s, source: extracted.source }
    } else {
      neww = {
        deck: '',
        fetchResult: undefined,
        nextDeck: undefined,
        previousDeck: undefined,
        error: false,
        investigator: null,
        source: extracted.source,
        deckUrl: s,
      }
    }
    if (inactiveCampaign) {
      inactiveCampaignDecks[i] = neww
      inactiveCampaignDecks = [...inactiveCampaignDecks]
    } else {
      activeCampaignDecks[i] = neww
      activeCampaignDecks = [...activeCampaignDecks]
    }
  }

  function openInGather(inactiveCampaign: boolean) {
    const campaignDecks = inactiveCampaign ? inactiveCampaignDecks : activeCampaignDecks
    const inputArgs: GoToGatherInputArgs[] = []
    for (let i = 0; i < campaignDecks.length; i++) {
      const d = campaignDecks[i]
      if (d !== null) {
        const url = d.deckUrl
        const extracted = extractDeck(url)
        inputArgs.push({
          id: extracted.deck,
          source: extracted.source,
        })
      }
    }
    openGatherInNewTab(inputArgs)
  }

  function swap(bdb: BothDatabase) {
    swapOne(0)
    swapOne(1)
    swapOne(2)
    swapOne(3)

    function swapOne(i: number) {
      const temp = activeCampaignDecks[i]
      activeCampaignDecks[i] = inactiveCampaignDecks[i]
      inactiveCampaignDecks[i] = temp
    }

    activeCampaignDecks = [...activeCampaignDecks]
    inactiveCampaignDecks = [...inactiveCampaignDecks]
    process(bdb)
  }

  async function process(bdb: BothDatabase) {
    pulling = true

    activeCampaignDecks[0] = tempDis(activeCampaignDecks[0])
    activeCampaignDecks[1] = tempDis(activeCampaignDecks[1])
    activeCampaignDecks[2] = tempDis(activeCampaignDecks[2])
    activeCampaignDecks[3] = tempDis(activeCampaignDecks[3])
    inactiveCampaignDecks[0] = tempDis(inactiveCampaignDecks[0])
    inactiveCampaignDecks[1] = tempDis(inactiveCampaignDecks[1])
    inactiveCampaignDecks[2] = tempDis(inactiveCampaignDecks[2])
    inactiveCampaignDecks[3] = tempDis(inactiveCampaignDecks[3])
    const activeSide = oneSide(activeCampaignDecks)
    const inactiveSide = oneSide(inactiveCampaignDecks)
    changeSharingUrl()

    const activeSideResult = await activeSide
    const inactiveSideResult = await inactiveSide

    activeCampaignDecks[0] = getPon(bdb, activeSideResult[0])
    activeCampaignDecks[1] = getPon(bdb, activeSideResult[1])
    activeCampaignDecks[2] = getPon(bdb, activeSideResult[2])
    activeCampaignDecks[3] = getPon(bdb, activeSideResult[3])
    inactiveCampaignDecks[0] = getPon(bdb, inactiveSideResult[0])
    inactiveCampaignDecks[1] = getPon(bdb, inactiveSideResult[1])
    inactiveCampaignDecks[2] = getPon(bdb, inactiveSideResult[2])
    inactiveCampaignDecks[3] = getPon(bdb, inactiveSideResult[3])

    const activeEntries = doSide(bdb, forwardRcore, activeSideResult, false)
    const inactiveEntries = doSide(bdb, forwardRcore, inactiveSideResult, true)
    const intersectionResult = intersect(activeEntries, inactiveEntries)
    transferEntries = makeTransferEntries(intersectionResult)
    remainingActiveEntries = intersectionResult.remainsLeft
    remainingInactiveEntries = intersectionResult.remainsRight
    pulledOnce = true
    pulling = false
    toggleMapRemainingActive = {}
    toggleMapRemainingInactive = {}
    toggleMapTransfer = {}
  }

  function makeTransferEntries(intersectionResult: IntersectionResult): DecklistEntry[] {
    return intersectionResult.intersects.map<DecklistEntry>((x) => {
      const mergedLabels: DecklistLabel[] = []
      if (x.left.labels !== undefined) {
        mergedLabels.push(...x.left.labels)
      }
      mergedLabels.push({
        text: '→',
        color: '',
      })
      if (x.right.labels !== undefined) {
        mergedLabels.push(...x.right.labels)
      }
      const de: DecklistEntry = {
        amount: x.left.amount,
        cardId: x.left.cardId,
        id: x.left.id + x.right.id,
        labels: mergedLabels,
      }
      return de
    })
  }

  async function performFastForwardAll(bdb: BothDatabase) {

    function one(pon: PlayerOrNull): Promise<FetchDeckResult | null> {
      if (pon !== null && pon.fetchResult !== undefined) {
        return fetchUntilLatest(pon.fetchResult)
      }
      return Promise.resolve(null)
    }

    const promises: Promise<FetchDeckResult | null>[] = [
      one(activeCampaignDecks[0]),
      one(activeCampaignDecks[1]),
      one(activeCampaignDecks[2]),
      one(activeCampaignDecks[3]),
      one(inactiveCampaignDecks[0]),
      one(inactiveCampaignDecks[1]),
      one(inactiveCampaignDecks[2]),
      one(inactiveCampaignDecks[3]),
    ]

    activeCampaignDecks[0] = tempDis(activeCampaignDecks[0])
    activeCampaignDecks[1] = tempDis(activeCampaignDecks[1])
    activeCampaignDecks[2] = tempDis(activeCampaignDecks[2])
    activeCampaignDecks[3] = tempDis(activeCampaignDecks[3])
    inactiveCampaignDecks[0] = tempDis(inactiveCampaignDecks[0])
    inactiveCampaignDecks[1] = tempDis(inactiveCampaignDecks[1])
    inactiveCampaignDecks[2] = tempDis(inactiveCampaignDecks[2])
    inactiveCampaignDecks[3] = tempDis(inactiveCampaignDecks[3])
    pulling = true

    const results = await Promise.all(promises)

    activeCampaignDecks[0] = getPon(bdb, results[0])
    activeCampaignDecks[1] = getPon(bdb, results[1])
    activeCampaignDecks[2] = getPon(bdb, results[2])
    activeCampaignDecks[3] = getPon(bdb, results[3])
    inactiveCampaignDecks[0] = getPon(bdb, results[4])
    inactiveCampaignDecks[1] = getPon(bdb, results[5])
    inactiveCampaignDecks[2] = getPon(bdb, results[6])
    inactiveCampaignDecks[3] = getPon(bdb, results[7])
    changeSharingUrl()

    const activeEntries = doSide(bdb, forwardRcore, results.slice(0, 4), false)
    const inactiveEntries = doSide(bdb, forwardRcore, results.slice(4, 8), true)
    const intersectionResult = intersect(activeEntries, inactiveEntries)
    transferEntries = makeTransferEntries(intersectionResult)
    remainingActiveEntries = intersectionResult.remainsLeft
    remainingInactiveEntries = intersectionResult.remainsRight
    pulledOnce = true
    pulling = false
    toggleMapRemainingActive = {}
    toggleMapRemainingInactive = {}
    toggleMapTransfer = {}
  }
</script>

{#await bothPromises}
  Loading...
{:then bdb}
  <p>
    This tool shows intersection of cards (and also non-intersecting cards) between two campaigns.
    One campaign can contain up to 4 decks. It helps you move just the intersecting cards back and
    forth when you have multiple on-going campaigns instead of disassembling everything back to
    collection. Deck progresses while you play, so make sure the decks are their latest upgraded
    version.
  </p>
  <Checkbox
    label='Forward to Revised Core Set'
    checked={forwardRcore}
    onCheckChanged={() => {
			forwardRcore = !forwardRcore
			process(bdb)
		}}
  />
  <div class='flex-wrap'>
    <div class='flex-item'>
      <ListDivider label='Active Campaign' />
      {#each activeCampaignDecks as d, i}
        <PlayerDeckInput
          player={i}
          popupDatabase={bdb.pdb}
          fetchResult={d?.fetchResult ?? undefined}
          deckInput={d?.deckUrl ?? ''}
          pullError={d?.error ?? false}
          {pulling}
          pulledDeckName={d?.deck ?? null}
          onDeckUrlChanged={(s) => {
						onDeckChanged(d, s, i, false)
					}}
          onNextDeck={() => {
						performFastForwardAll(bdb)
					}}
        />
      {/each}
      <Button onClick={() => openInGather(false)} block label='Gather This Campaign' center />
    </div>
    <div class='flex-item'>
      <ListDivider label='Switch to this Inactive Campaign' />
      {#each inactiveCampaignDecks as d, i}
        <PlayerDeckInput
          player={i}
          popupDatabase={bdb.pdb}
          fetchResult={d?.fetchResult ?? undefined}
          deckInput={d?.deckUrl ?? ''}
          pullError={d?.error ?? false}
          {pulling}
          pulledDeckName={d?.deck ?? null}
          onDeckUrlChanged={(s) => {
						onDeckChanged(d, s, i, true)
					}}
          onNextDeck={() => {
						performFastForwardAll(bdb)
					}}
        />
      {/each}
      <Button onClick={() => openInGather(true)} block label='Gather This Campaign' center />
    </div>
  </div>
  <Button onClick={() => swap(bdb)} block label='Swap' big center disabled={pulling} />
  <Button
    onClick={() => process(bdb)}
    block
    label={pulling ? 'Processing...' : 'Process'}
    disabled={pulling}
    big
    center
  />
  {#if !pulling && pulledOnce}
    <ListDivider label='Sharing URL' />
    <TextBox currentText={sharingUrl} />
    <p>
      Bookmark this URL so you can come to switch your campaign back later, using the Swap button.
    </p>

    <ListDivider label='Intersection' />
    <GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

    <CardTableGrouped
      toggleMap={toggleMapTransfer}
      entries={transferEntries}
      {groupings}
      {sortings}
      onClickToggle={(id, copy, t) => {
				toggleMapTransfer[id] = new Array(copy).fill(t)
				toggleMapTransfer = { ...toggleMapTransfer }
			}}
      taboo={true}
      fullDatabase={bdb.fdb}
      popupDatabase={bdb.pdb}
      columns={[ExtraColumn.Label]}
      centered
    />

    <ListDivider label='Gather From Collection' />
    <GrouperSorter
      groupings={groupings2}
      sortings={sortings2}
      onGroupingsChanged={onGroupingsChanged2}
      onSortingsChanged={onSortingsChanged2}
    />
    <LimitedTab
      active={remainingTabIndex}
      onChangeActive={(x) => {
				remainingTabIndex = x
			}}
    >
      <div slot='tab1'>Active Campaign</div>
      <div slot='content1'>
        <CardTableGrouped
          toggleMap={toggleMapRemainingActive}
          entries={remainingActiveEntries}
          groupings={groupings2}
          sortings={sortings2}
          onClickToggle={(id, copy, t) => {
						toggleMapRemainingActive[id] = new Array(copy).fill(t)
						toggleMapRemainingActive = { ...toggleMapRemainingActive }
					}}
          taboo={true}
          fullDatabase={bdb.fdb}
          popupDatabase={bdb.pdb}
          columns={[ExtraColumn.Label]}
          centered
        />
      </div>
      <div slot='tab2'>Inactive Campaign</div>
      <div slot='content2'>
        <CardTableGrouped
          toggleMap={toggleMapRemainingInactive}
          entries={remainingInactiveEntries}
          groupings={groupings2}
          sortings={sortings2}
          onClickToggle={(id, copy, t) => {
						toggleMapRemainingInactive[id] = new Array(copy).fill(t)
						toggleMapRemainingInactive = { ...toggleMapRemainingInactive }
					}}
          taboo={true}
          fullDatabase={bdb.fdb}
          popupDatabase={bdb.pdb}
          columns={[ExtraColumn.Label]}
          centered
        />
      </div>
    </LimitedTab>
  {/if}
{/await}

<style>
    .flex-wrap {
        display: flex;
    }

    @media screen and (max-width: 800px) {
        .flex-wrap {
            display: flex;
            flex-direction: column;
        }
    }

    .flex-item {
        flex: 1;
        padding: 0px 8px;
    }
</style>
