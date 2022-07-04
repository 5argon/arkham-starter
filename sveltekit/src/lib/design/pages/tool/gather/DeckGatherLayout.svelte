<script context="module" lang="ts">
	import { isRandomBasicWeakness, type AhdbCard } from '$lib/ahdb/card'

	import { coreToRcore } from '$lib/ahdb/conversion'

	interface Player {
		deckUrl: string
		deck: string
		error: boolean
		mainCount: number
		sideCount: number
		ignoreCount: number
		investigator: FullDatabaseItem | null
	}
	function newDeck(startingUrl: string): Player {
		return {
			deck: '',
			deckUrl: startingUrl,
			error: false,
			mainCount: 0,
			sideCount: 0,
			ignoreCount: 0,
			investigator: null,
		}
	}
	function fillIn(
		g: GetDeckCardIdReturns,
		player: number,
		fixedColor: boolean,
		faction: CardClass,
		ents: DecklistEntry[],
	) {
		let colorHex: string
		if (fixedColor) {
			colorHex = 'player-0-bg'
			switch (player) {
				case 0:
					colorHex = 'player-1-bg'
					break
				case 1:
					colorHex = 'player-2-bg'
					break
				case 2:
					colorHex = 'player-3-bg'
					break
				case 3:
					colorHex = 'player-4-bg'
					break
			}
		} else {
			colorHex = cardClassToBackgroundClass(faction)
		}
		for (let i = 0; i < g.cards1.length; i++) {
			const c1 = coreToRcore(g.cards1[i])
			const a1 = g.amounts1[i]
			ents.push({
				id: 'd' + player + c1,
				amount: a1,
				cardId: c1,
				label: { text: 'P' + (player + 1), color: colorHex },
			})
		}
		for (let i = 0; i < g.cards2.length; i++) {
			const c2 = coreToRcore(g.cards2[i])
			const a2 = g.amounts2[i]
			ents.push({
				id: 's' + player + c2,
				amount: a2,
				cardId: c2,
				label: { text: 'P' + (player + 1) + '-S', color: colorHex },
			})
		}
		for (let i = 0; i < g.cards3.length; i++) {
			const c3 = coreToRcore(g.cards3[i])
			const a3 = g.amounts3[i]
			ents.push({
				id: 'i' + player + c3,
				amount: a3,
				cardId: c3,
				label: { text: 'P' + (player + 1) + '-I', color: colorHex },
			})
		}
	}

	function checkDupe(ents: DecklistEntry[], over: DecklistEntry[], fdb: FullDatabase) {
		const cardCount: { [k: string]: number } = {}
		function addCount(c: { [k: string]: number }, cn: string, n: number) {
			if (!(cn in c)) {
				c[cn] = 0
			}
			c[cn] += n
		}
		ents.forEach((x) => {
			addCount(cardCount, x.cardId, x.amount)
		})
		const overQuantityCards = Object.entries(cardCount)
			.map(([k, v]) => {
				const card = fdb.getCard(k)
				return { card: card, amount: v, quantity: card.original.quantity }
			})
			.filter((i) => {
				if (isRandomBasicWeakness(i.card.original.code)) {
					return false
				}
				return i.amount > i.quantity
			})
		const ov = ents.filter((x) => {
			const found = overQuantityCards.findIndex((y) => {
				return x.cardId === y.card.original.code
			})
			return found !== -1
		})
		const ovm = ov.map<DecklistEntry>((x) => {
			const found = overQuantityCards.find((y) => {
				return y.card.original.code === x.cardId
			})
			if (!found) {
				return x
			}
			const card = fdb.getCard(x.cardId)
			const nd: DecklistEntry = {
				...x,
				id: 'over' + x.label + x.id,
				label: x.label
					? {
							color: x.label.color,
							text: x.label.text + ' (' + (found.amount ?? 0) + '/' + card.original.quantity + ')',
					  }
					: undefined,
			}
			return nd
		})
		over.push(...ovm)
	}
</script>

<script lang="ts">
	import {
		extractDeckFromUrl,
		getDeckCardIds,
		type ExtractResult,
		type GetDeckCardIdReturns,
	} from '$lib/ahdb/public-api/high-level'
	import { CardClass, cardClassToBackgroundClass } from '$lib/core/card-class'
	import { fetchFullDatabase, FullDatabase, type FullDatabaseItem } from '$lib/core/full-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'

	import Button from '$lib/design/components/basic/Button.svelte'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import TextBox from '$lib/design/components/basic/TextBox.svelte'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import PlayerDeckInput from '$lib/design/components/deck-table/PlayerDeckInput.svelte'
	import NotificationNumber from '$lib/design/components/inline/NotificationNumber.svelte'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import LimitedTabTab from '$lib/design/components/layout/LimitedTabTab.svelte'

	export let startingP1: string = ''
	export let startingP2: string = ''
	export let startingP3: string = ''
	export let startingP4: string = ''
	export let fixedLabelColor: boolean = false

	let sharingUrl: string = ''
	let entries: DecklistEntry[] = []
	let toggleMap: { [cardId: string]: boolean }
	$: {
		// Entries are always replaced as a whole,
		// so this reactive assignment always correctly reset toggle to all false.
		toggleMap = {}
		entries.forEach((x) => {
			if (!(x.id in toggleMap)) {
				toggleMap[x.id] = false
			}
		})
	}
	let overlappingEntries: DecklistEntry[] = []
	let p1: Player = newDeck(startingP1)
	let p2: Player = newDeck(startingP2)
	let p3: Player = newDeck(startingP3)
	let p4: Player = newDeck(startingP4)
	let p1r: GetDeckCardIdReturns | null = null
	let p2r: GetDeckCardIdReturns | null = null
	let p3r: GetDeckCardIdReturns | null = null
	let p4r: GetDeckCardIdReturns | null = null
	let pulling: boolean = false
	$: overlapping = overlappingEntries.length > 0
	var overlappingCount: number
	$: {
		const uniqueCards = new Set<string>()
		for (let i = 0; i < overlappingEntries.length; i++) {
			uniqueCards.add(overlappingEntries[i].cardId)
		}
		overlappingCount = Array.from(uniqueCards).length
	}
	let fdbp = fetchFullDatabase()

	gather()

	async function gather() {
		if (p1.deckUrl === '' && p2.deckUrl === '' && p3.deckUrl === '' && p4.deckUrl === '') {
			return
		}
		if (pulling) {
			return
		}
		const fdb = await fdbp
		pulling = true
		overlapping = false
		p1r = null
		p2r = null
		p3r = null
		p4r = null
		const p1x = extractDeckFromUrl(p1.deckUrl)
		const p2x = extractDeckFromUrl(p2.deckUrl)
		const p3x = extractDeckFromUrl(p3.deckUrl)
		const p4x = extractDeckFromUrl(p4.deckUrl)
		async function getDeck(p: Player, x: ExtractResult): Promise<GetDeckCardIdReturns | null> {
			if (x.deck === '') {
				return null
			}
			const cards = await getDeckCardIds(x.deck, x.published)
			return cards
		}
		const p1p = getDeck(p1, p1x)
		const p2p = getDeck(p2, p2x)
		const p3p = getDeck(p3, p3x)
		const p4p = getDeck(p4, p4x)
		p1r = await p1p
		p2r = await p2p
		p3r = await p3p
		p4r = await p4p
		function sum(a: number[]): number {
			return a.reduce((p, c) => {
				return p + c
			}, 0)
		}
		p1 = {
			...p1,
			deck: p1r ? p1r.deck : '',
			error: !p1r && p1.deckUrl !== '' ? true : false,
			mainCount: p1r ? sum(p1r.amounts1) : 0,
			sideCount: p1r ? sum(p1r.amounts2) : 0,
			ignoreCount: p1r ? sum(p1r.amounts3) : 0,
			investigator: p1r ? fdb.getCard(p1r.investigatorCode) : null,
		}
		p2 = {
			...p2,
			deck: p2r ? p2r.deck : '',
			error: !p2r && p2.deckUrl !== '' ? true : false,
			mainCount: p2r ? sum(p2r.amounts1) : 0,
			sideCount: p2r ? sum(p2r.amounts2) : 0,
			ignoreCount: p2r ? sum(p2r.amounts3) : 0,
			investigator: p2r ? fdb.getCard(p2r.investigatorCode) : null,
		}
		p3 = {
			...p3,
			deck: p3r ? p3r.deck : '',
			error: !p3r && p3.deckUrl !== '' ? true : false,
			mainCount: p3r ? sum(p3r.amounts1) : 0,
			sideCount: p3r ? sum(p3r.amounts2) : 0,
			ignoreCount: p3r ? sum(p3r.amounts3) : 0,
			investigator: p3r ? fdb.getCard(p3r.investigatorCode) : null,
		}
		p4 = {
			...p4,
			deck: p4r ? p4r.deck : '',
			error: !p4r && p4.deckUrl !== '' ? true : false,
			mainCount: p4r ? sum(p4r.amounts1) : 0,
			sideCount: p4r ? sum(p4r.amounts2) : 0,
			ignoreCount: p4r ? sum(p4r.amounts3) : 0,
			investigator: p4r ? fdb.getCard(p4r.investigatorCode) : null,
		}
		sharingUrl = 'https://arkham-starter.com/tool/gather'
		reactFill(p1r, p2r, p3r, p4r)
		const su: string[] = []
		if (p1r) {
			su.push('p1=' + (p1x.published ? 'p-' : '') + p1x.deck)
		}
		if (p2r) {
			su.push('p2=' + (p2x.published ? 'p-' : '') + p2x.deck)
		}
		if (p3r) {
			su.push('p3=' + (p3x.published ? 'p-' : '') + p3x.deck)
		}
		if (p4r) {
			su.push('p4=' + (p4x.published ? 'p-' : '') + p4x.deck)
		}
		if (su.length > 0) {
			sharingUrl += '?' + su.join('&')
		}

		pulling = false
	}

	async function reactFill(
		p1rr: GetDeckCardIdReturns | null,
		p2rr: GetDeckCardIdReturns | null,
		p3rr: GetDeckCardIdReturns | null,
		p4rr: GetDeckCardIdReturns | null,
	) {
		const fdb = await fdbp
		entries = []
		overlappingEntries = []
		if (p1rr) {
			fillIn(p1rr, 0, fixedLabelColor, p1.investigator?.class1 ?? CardClass.Neutral, entries)
		}
		if (p2rr) {
			fillIn(p2rr, 1, fixedLabelColor, p2.investigator?.class1 ?? CardClass.Neutral, entries)
		}
		if (p3rr) {
			fillIn(p3rr, 2, fixedLabelColor, p3.investigator?.class1 ?? CardClass.Neutral, entries)
		}
		if (p4rr) {
			fillIn(p4rr, 3, fixedLabelColor, p4.investigator?.class1 ?? CardClass.Neutral, entries)
		}
		checkDupe(entries, overlappingEntries, fdb)
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
</script>

<div class="sharing-url">
	<TextBox label="Sharing URL" currentText={sharingUrl} />
</div>

<div class="options">
	<Button
		label="Reset Toggles"
		onClick={() => {
			toggleMap = {}
		}}
	/>
	<Checkbox
		label="Fixed Label Color"
		checked={fixedLabelColor}
		onCheckChanged={() => {
			fixedLabelColor = !fixedLabelColor
			reactFill(p1r, p2r, p3r, p4r)
		}}
	/>
</div>

<PlayerDeckInput
	player={0}
	cardClass={p1.investigator?.class1 ?? CardClass.Neutral}
	{fixedLabelColor}
	deckUrl={p1.deckUrl}
	pullError={p1.error}
	mainCount={p1.mainCount}
	sideCount={p1.sideCount}
	ignoreCount={p1.ignoreCount}
	{pulling}
	pulledDeckName={p1.deck}
	onDeckUrlChanged={(s) => {
		p1 = { ...p1, deckUrl: s }
	}}
/>
<PlayerDeckInput
	player={1}
	cardClass={p2.investigator?.class1 ?? CardClass.Neutral}
	{fixedLabelColor}
	deckUrl={p2.deckUrl}
	pullError={p2.error}
	mainCount={p2.mainCount}
	sideCount={p2.sideCount}
	ignoreCount={p2.ignoreCount}
	{pulling}
	pulledDeckName={p2.deck}
	onDeckUrlChanged={(s) => {
		p2 = { ...p2, deckUrl: s }
	}}
/>
<PlayerDeckInput
	player={2}
	cardClass={p3.investigator?.class1 ?? CardClass.Neutral}
	{fixedLabelColor}
	deckUrl={p3.deckUrl}
	pullError={p3.error}
	mainCount={p3.mainCount}
	sideCount={p3.sideCount}
	ignoreCount={p3.ignoreCount}
	{pulling}
	pulledDeckName={p3.deck}
	onDeckUrlChanged={(s) => {
		p3 = { ...p3, deckUrl: s }
	}}
/>
<PlayerDeckInput
	player={3}
	cardClass={p4.investigator?.class1 ?? CardClass.Neutral}
	{fixedLabelColor}
	deckUrl={p4.deckUrl}
	pullError={p4.error}
	mainCount={p4.mainCount}
	sideCount={p4.sideCount}
	ignoreCount={p4.ignoreCount}
	{pulling}
	pulledDeckName={p4.deck}
	onDeckUrlChanged={(s) => {
		p4 = { ...p4, deckUrl: s }
	}}
/>

<Button disabled={pulling} label="Gather All Cards" onClick={gather} big block center />

{#await fdbp then fdb}
	{#if !pulling && (entries.length !== 0 || overlappingEntries.length !== 0)}
		<div class="limited-tab">
			<LimitedTab hide2={!overlapping}>
				<div slot="tab1">Gathered Cards</div>
				<div slot="content1">
					<ListDivider label="Gathered Cards" />
					<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

					<!-- For some reason just add to div make the table not stretch... -->
					<div class="card-table">
						<CardTableGrouped
							{toggleMap}
							{entries}
							{groupings}
							{sortings}
							taboo={true}
							fullDatabase={fdb}
							columns={[ExtraColumn.Label]}
						/>
					</div>
				</div>
				<div slot="tab2">
					<span class="deck-overlaps-tab-text">Deck Overlaps</span><NotificationNumber
						count={overlappingCount}
					/>
				</div>
				<div slot="content2">
					{#if overlapping}
						<ListDivider label={'Deck Overlaps'} />
						<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />
						<div class="card-table">
							<CardTableGrouped
								{toggleMap}
								entries={overlappingEntries}
								{groupings}
								{sortings}
								taboo={true}
								fullDatabase={fdb}
								columns={[ExtraColumn.Label]}
							/>
						</div>
					{/if}
				</div>
			</LimitedTab>
		</div>
	{/if}
{/await}

<style>
	.options {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 12px;
	}

	.card-table {
		margin: 0 auto;
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
