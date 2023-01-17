<script lang="ts" context="module">
	interface Player {
		deckUrl: string
		deck: string
		nextDeck: string | undefined
		previousDeck: string | undefined
		published: boolean
		error: boolean
		investigator: FullDatabaseItem | null
	}
	interface BothDatabase {
		fdb: FullDatabase
		cdb: CampaignDatabase
	}
	type PlayerOrNull = Player | null
</script>

<script lang="ts">
	import { fetchFullDatabase, FullDatabase, type FullDatabaseItem } from '$lib/core/full-database'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import {
		CampaignSwitchProto,
		CampaignSwitchProto_InputDeck,
	} from '$lib/proto/generated/campaign_switch'
	import { base64ToBinary, binaryToUrlString } from '$lib/tool/script/export/options'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import PlayerDeckInput from '$lib/design/components/deck-table/PlayerDeckInput.svelte'
	import { CardClass, cardClassToBackgroundClass } from '$lib/core/card-class'
	import Button from '$lib/design/components/basic/Button.svelte'
	import {
		extractDeckFromUrl,
		getDeckCardIds,
		type CardAndAmount,
		type GetDeckCardIdReturns,
	} from '$lib/ahdb/public-api/high-level'
	import { intersect } from '$lib/tool/overlap/overlap-helpers'
	import type { DecklistEntry, DecklistLabel } from '$lib/deck-table/decklist-entry'
	import TextBox from '$lib/design/components/basic/TextBox.svelte'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import { coreToRcore } from '$lib/ahdb/conversion'
	import { CampaignDatabase, fetchCampaignDatabase } from '$lib/core/campaign-database'
	import { goToGather } from '$lib/deck/go-to-gather'

	export let protoString: string | null = null
	let sharingUrl = ''
	let pulling = false
	let pulledOnce = false
	let remainingTabIndex = 1
	let forwardRcore: boolean = true

	let toggleMapTransfer: { [cardId: string]: boolean } = {}
	let toggleMapRemainingActive: { [cardId: string]: boolean } = {}
	let toggleMapRemainingInactive: { [cardId: string]: boolean } = {}

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

	let fixedLabelColor = false
	let fdbPromise = fetchFullDatabase()
	let cdbPromise = fetchCampaignDatabase()
	let bothPromises: Promise<BothDatabase> = Promise.all([fdbPromise, cdbPromise]).then((x) => {
		return {
			fdb: x[0],
			cdb: x[1],
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
							nextDeck: undefined,
							previousDeck: undefined,
							error: false,
							investigator: null,
							published: false,
						}
					}
					return {
						deck: '',
						deckUrl: (input.published ? 'p:' : '') + input.id,
						nextDeck: undefined,
						previousDeck: undefined,
						error: false,
						investigator: null,
						published: input.published,
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
			} catch {}
		}
	}

	function changeSharingUrl() {
		function toProtoInputDeck(pon: PlayerOrNull): CampaignSwitchProto_InputDeck | undefined {
			if (pon !== null) {
				const extract = extractDeckFromUrl(pon.deckUrl)
				return {
					id: extract.deck,
					published: extract.published,
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
		const extracted = extractDeckFromUrl(s)
		let neww: PlayerOrNull = null
		if (d !== null) {
			neww = { ...d, deckUrl: s, published: extracted.published }
		} else {
			neww = {
				deck: '',
				nextDeck: undefined,
				previousDeck: undefined,
				error: false,
				investigator: null,
				published: extracted.published,
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
		const aaa = inactiveCampaign ? inactiveCampaignDecks : activeCampaignDecks
		goToGather(
			aaa.map((x) => {
				const url = x?.deckUrl ?? ''
				const extracted = extractDeckFromUrl(url)
				return {
					id: extracted.deck,
					published: extracted.published,
				}
			}),
		)
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
		function tempDis(pon: PlayerOrNull): PlayerOrNull {
			if (pon === null) {
				return null
			}
			return {
				...pon,
				investigator: null,
				nextDeck: undefined,
				previousDeck: undefined,
				error: false,
			}
		}
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
		async function oneSide(decks: PlayerOrNull[]) {
			const extracted = decks.map((x) => {
				if (x !== null) {
					return extractDeckFromUrl(x?.deckUrl)
				} else {
					return null
				}
			})
			const awaitables = extracted.map<Promise<GetDeckCardIdReturns | null>>((x) => {
				if (x !== null && x.deck !== '') {
					return getDeckCardIds(x.deck, x.published)
				}
				return Promise.resolve(null)
			})
			const awaited = await Promise.all(awaitables)
			return awaited
		}
		const activeSideResult = await activeSide
		const inactiveSideResult = await inactiveSide
		function doSide(sr: (GetDeckCardIdReturns | null)[]) {
			const activeAll = sr.flatMap<DecklistEntry>((x) => {
				if (x !== null) {
					const allProcessed = [
						...sideProcess(x.cards1, '', x.investigatorCode),
						...sideProcess(x.cards2, '-S', x.investigatorCode),
					]
					return allProcessed
				}
				return []
			})
			return activeAll
			function sideProcess(sr: CardAndAmount[], t: string, invCode: string) {
				return sr.map<DecklistEntry>((x) => {
					const fdb = bdb.fdb
					const effectiveId = forwardRcore ? coreToRcore(x.cardId) : x.cardId
					const cd = fdb.getCard(effectiveId)
					const inv = fdb.getCard(invCode)
					const shortName = fdb.getShortName(inv)
					const c = cd.class1
					return {
						amount: x.amount,
						cardId: effectiveId,
						id: shortName + effectiveId + t,
						labels: [
							{
								text: shortName + t,
								color: cardClassToBackgroundClass(inv.class1),
							},
						],
					}
				})
			}
		}

		function getPon(prev: PlayerOrNull, aaa: GetDeckCardIdReturns | null): PlayerOrNull {
			if (aaa === null) {
				return null
			}
			const inv = bdb.fdb.getCard(aaa.investigatorCode)
			return {
				deck: aaa.deck,
				investigator: inv,
				nextDeck: aaa.nextDeck?.toString(),
				previousDeck: aaa.previousDeck?.toString(),
				error: false,
				published: aaa.published,
				deckUrl: aaa.link,
			}
		}

		activeCampaignDecks[0] = getPon(activeCampaignDecks[0], activeSideResult[0])
		activeCampaignDecks[1] = getPon(activeCampaignDecks[1], activeSideResult[1])
		activeCampaignDecks[2] = getPon(activeCampaignDecks[2], activeSideResult[2])
		activeCampaignDecks[3] = getPon(activeCampaignDecks[3], activeSideResult[3])
		inactiveCampaignDecks[0] = getPon(inactiveCampaignDecks[0], inactiveSideResult[0])
		inactiveCampaignDecks[1] = getPon(inactiveCampaignDecks[1], inactiveSideResult[1])
		inactiveCampaignDecks[2] = getPon(inactiveCampaignDecks[2], inactiveSideResult[2])
		inactiveCampaignDecks[3] = getPon(inactiveCampaignDecks[3], inactiveSideResult[3])

		const activeEntries = doSide(activeSideResult)
		const inactiveEntries = doSide(inactiveSideResult)
		const intersectionResult = intersect(activeEntries, inactiveEntries)
		transferEntries = intersectionResult.intersects.map<DecklistEntry>((x) => {
			let leftFirstLabel: DecklistLabel | undefined
			let rightFirstLabel: DecklistLabel | undefined
			if (x.left.labels !== undefined && x.left.labels.length > 0) {
				leftFirstLabel = x.left.labels[0]
			}
			if (x.right.labels !== undefined && x.right.labels.length > 0) {
				rightFirstLabel = x.right.labels[0]
			}
			const de: DecklistEntry = {
				amount: x.left.amount,
				cardId: x.left.cardId,
				id: x.left.id + x.right.id,
				labels: [
					{
						text: leftFirstLabel?.text ?? '',
						color: leftFirstLabel?.color ?? '',
					},
					{
						text: '→',
						color: '',
					},
					{
						text: rightFirstLabel?.text ?? '',
						color: rightFirstLabel?.color ?? '',
					},
				],
			}
			return de
		})
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
	<Checkbox
		label="Forward to Revised Core Set"
		checked={forwardRcore}
		onCheckChanged={() => {
			forwardRcore = !forwardRcore
			process(bdb)
		}}
	/>
	<div class="flex-wrap">
		<div class="flex-item">
			<ListDivider label="Active Campaign" />
			{#each activeCampaignDecks as d, i}
				<PlayerDeckInput
					player={i}
					cardClass={d?.investigator?.class1 ?? CardClass.Neutral}
					{fixedLabelColor}
					deckInput={d?.deckUrl ?? ''}
					investigatorCode={d?.investigator?.original.code ?? undefined}
					actualDeckUrl={d?.deckUrl ?? undefined}
					pullError={d?.error ?? false}
					{pulling}
					pulledDeckName={d?.deck ?? null}
					onDeckUrlChanged={(s) => {
						onDeckChanged(d, s, i, false)
					}}
					nextDeck={d?.nextDeck}
					previousDeck={d?.previousDeck}
					onNextDeck={(dn) => {
						if (d !== null) {
							activeCampaignDecks[i] = { ...d, deckUrl: dn }
							process(bdb)
						}
					}}
					onPreviousDeck={(dn) => {
						if (d !== null) {
							activeCampaignDecks[i] = { ...d, deckUrl: dn }
							process(bdb)
						}
					}}
				/>
			{/each}
			<Button onClick={() => openInGather(false)} block label="Go to Deck Gather" center />
		</div>
		<div class="flex-item">
			<ListDivider label="Switch to this Inactive Campaign" />
			{#each inactiveCampaignDecks as d, i}
				<PlayerDeckInput
					player={i}
					cardClass={d?.investigator?.class1 ?? CardClass.Neutral}
					{fixedLabelColor}
					deckInput={d?.deckUrl ?? ''}
					investigatorCode={d?.investigator?.original.code ?? undefined}
					actualDeckUrl={d?.deckUrl ?? undefined}
					pullError={d?.error ?? false}
					{pulling}
					pulledDeckName={d?.deck ?? null}
					onDeckUrlChanged={(s) => {
						onDeckChanged(d, s, i, true)
					}}
					nextDeck={d?.nextDeck}
					previousDeck={d?.previousDeck}
					onNextDeck={(dn) => {
						if (d !== null) {
							inactiveCampaignDecks[i] = { ...d, deckUrl: dn }
							process(bdb)
						}
					}}
					onPreviousDeck={(dn) => {
						if (d !== null) {
							inactiveCampaignDecks[i] = { ...d, deckUrl: dn }
							process(bdb)
						}
					}}
				/>
			{/each}
			<Button onClick={() => openInGather(true)} block label="Go to Deck Gather" center />
		</div>
	</div>
	<Button onClick={() => swap(bdb)} block label="Swap" big center disabled={pulling} />
	<Button
		onClick={() => process(bdb)}
		block
		label={pulling ? 'Processing...' : 'Process'}
		disabled={pulling}
		big
		center
	/>
	{#if !pulling && pulledOnce}
		<ListDivider label="Sharing URL" />
		<TextBox currentText={sharingUrl} />
		<p>
			Bookmark this URL so you can come to switch your campaign back later, using the Swap button.
		</p>

		<ListDivider label="Transfer (Intersection)" />
		<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

		<CardTableGrouped
			toggleMap={toggleMapTransfer}
			entries={transferEntries}
			{groupings}
			{sortings}
			onClickToggle={(c, t) => {
				toggleMapTransfer[c] = t
				toggleMapTransfer = { ...toggleMapTransfer }
			}}
			taboo={true}
			fullDatabase={bdb.fdb}
			campaignDatabase={bdb.cdb}
			columns={[ExtraColumn.Label]}
			centered
		/>

		<ListDivider label="Gather From Collection" />
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
			<div slot="tab1">Active Campaign</div>
			<div slot="content1">
				<CardTableGrouped
					toggleMap={toggleMapRemainingActive}
					entries={remainingActiveEntries}
					groupings={groupings2}
					sortings={sortings2}
					onClickToggle={(c, t) => {
						toggleMapRemainingActive[c] = t
						toggleMapRemainingActive = { ...toggleMapRemainingActive }
					}}
					taboo={true}
					fullDatabase={bdb.fdb}
					campaignDatabase={bdb.cdb}
					columns={[ExtraColumn.Label]}
					centered
				/>
			</div>
			<div slot="tab2">Inactive Campaign</div>
			<div slot="content2">
				<CardTableGrouped
					toggleMap={toggleMapRemainingInactive}
					entries={remainingInactiveEntries}
					groupings={groupings2}
					sortings={sortings2}
					onClickToggle={(c, t) => {
						toggleMapRemainingInactive[c] = t
						toggleMapRemainingInactive = { ...toggleMapRemainingInactive }
					}}
					taboo={true}
					fullDatabase={bdb.fdb}
					campaignDatabase={bdb.cdb}
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

	.flex-item {
		flex: 1;
		padding: 0px 8px;
	}
</style>
