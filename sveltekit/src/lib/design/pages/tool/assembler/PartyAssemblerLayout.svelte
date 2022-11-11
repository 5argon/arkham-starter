<script lang="ts" context="module">
	enum PartyAssemblerSorting {
		Overlaps,
		CombinationOrder,
	}

	enum PartyAssemblerFilter {
		NoSameClass,
	}
</script>

<script lang="ts">
	import {
		extractDeckFromUrl,
		forwardDeckToOldCore,
		forwardDeckToRcore,
		getDeckCardIds,
		type GetDeckCardIdReturns,
	} from '$lib/ahdb/public-api/high-level'
	import Button from '$lib/design/components/basic/Button.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import TextBox from '$lib/design/components/basic/TextBox.svelte'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import NotificationNumber from '$lib/design/components/inline/NotificationNumber.svelte'
	import {
		PartyAssemblerProto,
		PartyAssemblerProto_InputDeck,
	} from '$lib/proto/generated/party_assembler'
	import { exhaustiveCheckOverlaps, type Party } from '$lib/tool/overlap/overlap-helpers'
	import { base64ToBinary, binaryToUrlString } from '$lib/tool/script/export/options'
	import PartyTable from './PartyTable.svelte'
	import { fetchFullDatabase, FullDatabase } from '$lib/core/full-database'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import FramedTextSpan from '$lib/design/components/inline/FramedTextSpan.svelte'
	import { xlink_attr } from 'svelte/internal'

	export let protoString: string | null = null

	let forwardRcore: boolean = true
	let decksText: string = ''
	let decksTextSplit: string[] = []
	let fetchingDecks = false
	let fetchingPdb = false
	let advanced = false
	let exportProto: string = ''
	let parties: Party[] = []
	let sorting: PartyAssemblerSorting = PartyAssemblerSorting.Overlaps
	let filterNoSameClass: boolean = false
	let filterZeroOverlapOnly: boolean = false
	let filterNoSameUser: boolean = false

	let groupings: Grouping[] = [Grouping.Set]
	let sortings: Sorting[] = [Sorting.Number]
	function onGroupingsChanged(g: Grouping[]) {
		groupings = g
	}
	function onSortingsChanged(s: Sorting[]) {
		sortings = s
	}

	let twoPlayerParties: Party[] = []
	let threePlayerParties: Party[] = []
	let fourPlayerParties: Party[] = []

	function customFilters(p: Party, fdb: FullDatabase): boolean {
		const invs = p.decks.map((x) => fdb.getCard(x.investigatorCode))
		const sameInv: { [n: string]: boolean } = {}
		for (let i = 0; i < invs.length; i++) {
			const x = invs[i]
			if (!(x.original.name in sameInv)) {
				sameInv[x.original.name] = true
			} else {
				return false
			}
		}

		if (filterNoSameClass) {
			const exist: { [n: number]: boolean } = {}
			for (let i = 0; i < invs.length; i++) {
				const x = invs[i]
				if (!(x.class1 in exist)) {
					exist[x.class1] = true
				} else {
					return false
				}
			}
		}
		if (filterZeroOverlapOnly && p.overlapCount > 0) {
			return false
		}
		if (filterNoSameUser) {
			const users = p.decks.map((x) => x.userId)
			const exist: { [n: number]: boolean } = {}
			for (let i = 0; i < users.length; i++) {
				const x = users[i]
				if (x !== null) {
					if (!(x in exist)) {
						exist[x] = true
					} else {
						return false
					}
				}
			}
		}
		return true
	}

	function customSorter(a: Party, b: Party, fdb: FullDatabase): number {
		if (sorting === PartyAssemblerSorting.Overlaps) {
			return a.overlapCount - b.overlapCount
		}
		return 0
	}

	let fdbPromise = fetchFullDatabase()

	$: deckCount = decksTextSplit.length
	$: notReady = fetchingDecks || fetchingPdb

	let decks: GetDeckCardIdReturns[] = []
	startingProtoProcessing()
	async function startingProtoProcessing() {
		if (protoString !== null) {
			try {
				const pap = PartyAssemblerProto.fromBinary(base64ToBinary(protoString))
				const mapped = pap.inputDecks1.map((x) => {
					return x.published ? 'p:' + x.id : x.id
				})
				advanced = pap.advanced
				decksTextSplit = mapped
				decksText = mapped.join('\n')
				const pdb = await fdbPromise
				process(pdb)
			} catch {}
		}
	}

	function textAreaChangeHandler(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
		decksText = e.currentTarget.value
		decksTextSplit = e.currentTarget.value.split('\n').filter((x) => x.trim().length > 0)
	}

	async function process(fdb: FullDatabase) {
		const extracts = decksTextSplit.map((x) => extractDeckFromUrl(x))
		const getPromises = extracts.map((x) => getDeckCardIds(x.deck, x.published))
		fetchingDecks = true
		const awaited = await Promise.all(getPromises)
		fetchingDecks = false
		decks = []
		for (let deck of awaited) {
			if (deck !== null) {
				decks.push(forwardRcore ? forwardDeckToRcore(deck) : forwardDeckToOldCore(deck))
			}
		}
		const pap: PartyAssemblerProto = {
			inputDecks1: decks.map<PartyAssemblerProto_InputDeck>((x) => {
				return { id: x.id, published: x.published }
			}),
			inputDecks2: [],
			inputDecks3: [],
			inputDecks4: [],
			pickedAssembly: [],
			userPatches: [],
			advanced: advanced,
		}
		exportProto = binaryToUrlString(PartyAssemblerProto.toBinary(pap))
		const unfiltered = exhaustiveCheckOverlaps(decks, fdb)
		parties = unfiltered
		manualFilterSorter(fdb)
	}

	function manualFilterSorter(fdb: FullDatabase) {
		const filtered = parties.filter((x) => customFilters(x, fdb))
		const sorted = filtered.sort((a, b) => customSorter(a, b, fdb))
		twoPlayerParties = sorted.filter((x) => x.decks.length === 2)
		threePlayerParties = sorted.filter((x) => x.decks.length === 3)
		fourPlayerParties = sorted.filter((x) => x.decks.length === 4)
	}

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }, fdb: FullDatabase) {
		const value = e.currentTarget.value
		sorting = parseInt(value)
		manualFilterSorter(fdb)
	}
</script>

{#await fdbPromise}
	Loading...
{:then fdb}
	<Checkbox
		label="Forward to Revised Core Set"
		checked={forwardRcore}
		onCheckChanged={() => {
			forwardRcore = !forwardRcore
			process(fdb)
		}}
	/>

	<ListDivider label="Input Decks" />

	<textarea
		placeholder="One deck per line. Can be either arkhamdb.com deck URL or deck's ID. If it is deck ID, prefix p: for published deck."
		class="decks"
		on:change={textAreaChangeHandler}>{decksText}</textarea
	>

	<Button
		big
		center
		disabled={fetchingDecks}
		label={fetchingDecks ? 'Please Wait...' : 'Analyze ' + deckCount + ' Decks'}
		onClick={() => {
			process(fdb)
		}}
	/>

	{#if !notReady && decks.length > 0}
		<div class="sharing-url">
			<TextBox
				label="Sharing URL"
				currentText={`https://arkham-starter.com/tool/assembly?i=${exportProto}`}
			/>
		</div>
	{/if}

	{#if !notReady && decks.length > 0}
		<ListDivider label="Analysis Result" />
		<span class="flex-item">
			<FramedTextSpan text="Team Composition Filters" />
			<Checkbox
				label="No Same Class"
				checked={filterNoSameClass}
				onCheckChanged={(c) => {
					filterNoSameClass = c
					manualFilterSorter(fdb)
				}}
			/>
			<Checkbox
				label="Zero Overlap Only"
				checked={filterZeroOverlapOnly}
				onCheckChanged={(c) => {
					filterZeroOverlapOnly = c
					manualFilterSorter(fdb)
				}}
			/>
			<Checkbox
				label="No Same User"
				checked={filterNoSameUser}
				onCheckChanged={(c) => {
					filterNoSameUser = c
					manualFilterSorter(fdb)
				}}
			/>
		</span>
		<span class="flex-item">
			<FramedTextSpan text="Team Composition Sorting" />
			<select name="pets" value={sorting} on:change={(e) => onChangeHandler(e, fdb)}>
				<option value={PartyAssemblerSorting.Overlaps}>Less Overlaps First</option>
				<option value={PartyAssemblerSorting.CombinationOrder}>Combination Order</option>
			</select>
		</span>
		<GrouperSorter
			text={'Overlaps Display'}
			{groupings}
			{sortings}
			{onGroupingsChanged}
			{onSortingsChanged}
		/>
		<LimitedTab>
			<div slot="tab1">
				Two Players <NotificationNumber count={twoPlayerParties.length} />
			</div>
			<div slot="content1">
				<PartyTable parties={twoPlayerParties} fullDatabase={fdb} {groupings} {sortings} />
			</div>
			<div slot="tab2">
				Three Players <NotificationNumber count={threePlayerParties.length} />
			</div>
			<div slot="content2">
				<PartyTable parties={threePlayerParties} fullDatabase={fdb} {groupings} {sortings} />
			</div>
			<div slot="tab3">
				Four Players <NotificationNumber count={fourPlayerParties.length} />
			</div>
			<div slot="content3">
				<PartyTable parties={fourPlayerParties} fullDatabase={fdb} {groupings} {sortings} />
			</div>
		</LimitedTab>
	{/if}
{/await}

<style>
	.flex-item {
		margin: 4px 0px;
	}

	.decks {
		height: 100px;
	}
</style>
