<script lang="ts">
	import type { CardPack } from '$lib/core/card-pack'
	import { fetchFullDatabase, FullDatabase, type LazyFullDatabase } from '$lib/core/full-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import type { ExploreInput } from '$lib/explore/explore-input'
	import helpMd from '$lib/md/explore-ie.md?raw'
	import CardTableDoubleDisplay from './CardTableDoubleDisplay.svelte'
	import ExploreMenu from './ExploreMenu.svelte'

	export let pageTitle: string
	export let exploreInput: ExploreInput

	let toggleMap: { [cardId: string]: boolean } = {}

	// Copy from input, then allow changing these states in client side.
	let groupings: Grouping[] = exploreInput.groupings
	let sortings: Sorting[] = exploreInput.sortings
	let packs: CardPack[] = exploreInput.packs

	let showList: boolean = true
	let showScans: boolean = true

	function onGroupingsChanged(g: Grouping[]) {
		groupings = g
	}
	function onSortingsChanged(s: Sorting[]) {
		sortings = s
	}

	let fdbp: LazyFullDatabase = fetchFullDatabase()

	function getByPackFromFullDatabaseInvestigator(
		fdb: FullDatabase,
		ps: CardPack[],
	): DecklistEntry[] {
		const inPack = fdb.queryPack(ps)
		const investigator = inPack.filter((x) => {
			const r =
				x.original.type_code === 'investigator' || typeof x.original.restrictions === 'object'
			return r
		})
		return investigator.map<DecklistEntry>((x) => {
			return {
				amount: x.original.quantity,
				cardId: x.original.code,
				id: x.original.code,
			}
		})
	}
	function getByPackFromFullDatabase(fdb: FullDatabase, ps: CardPack[]): DecklistEntry[] {
		const inPack = fdb.queryPack(ps)
		const notInvestigator = inPack.filter((x) => {
			const r =
				x.original.type_code !== 'investigator' &&
				typeof x.original.restrictions !== 'object' &&
				x.original.subtype_code !== 'basicweakness'
			return r
		})
		return notInvestigator.map<DecklistEntry>((x) => {
			return {
				amount: x.original.quantity,
				cardId: x.original.code,
				id: x.original.code,
			}
		})
	}

	function getByPackFromFullDatabaseWeakness(fdb: FullDatabase, ps: CardPack[]): DecklistEntry[] {
		const inPack = fdb.queryPack(ps)
		const weakness = inPack.filter((x) => {
			const r = x.original.subtype_code === 'basicweakness'
			return r
		})
		return weakness.map<DecklistEntry>((x) => {
			return {
				amount: x.original.quantity,
				cardId: x.original.code,
				id: x.original.code,
			}
		})
	}
</script>

<PageTitle title={pageTitle} {helpMd} />

<ExploreMenu />

{#await fdbp}
	Loading...
{:then fdb}
	<div class="tab">
		<LimitedTab
			onChangeActive={(i) => {
				switch (i) {
					case 0: {
						showList = true
						showScans = true
						break
					}
					case 1: {
						showList = true
						showScans = false
						break
					}
					case 2: {
						showList = false
						showScans = true
						break
					}
				}
			}}
		>
			<div slot="tab1">List and Scans</div>
			<div slot="content1" />
			<div slot="tab2">List Only</div>
			<div slot="content2" />
			<div slot="tab3">Scans Only</div>
			<div slot="content3" />
		</LimitedTab>
	</div>
	<ListDivider label="Investigators" />
	<CardTableDoubleDisplay
		{toggleMap}
		singleRight
		entries={getByPackFromFullDatabaseInvestigator(fdb, packs)}
		groupings={[]}
		sortings={[Sorting.Number]}
		taboo={true}
		fullDatabase={fdb}
		onClickToggle={(c, t) => {
			toggleMap[c] = t
			toggleMap = { ...toggleMap }
		}}
		{showList}
		{showScans}
	/>

	<ListDivider label="Basic Weakness" />

	<CardTableDoubleDisplay
		{toggleMap}
		singleRight
		entries={getByPackFromFullDatabaseWeakness(fdb, packs)}
		groupings={[]}
		sortings={[Sorting.Number]}
		taboo={true}
		fullDatabase={fdb}
		onClickToggle={(c, t) => {
			toggleMap[c] = t
			toggleMap = { ...toggleMap }
		}}
		{showList}
		{showScans}
	/>

	<ListDivider label="The Rest of Player Cards" />

	<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

	<CardTableDoubleDisplay
		{toggleMap}
		singleRight
		entries={getByPackFromFullDatabase(fdb, packs)}
		{groupings}
		{sortings}
		taboo={true}
		fullDatabase={fdb}
		onClickToggle={(c, t) => {
			toggleMap[c] = t
			toggleMap = { ...toggleMap }
		}}
		{showList}
		{showScans}
	/>
{/await}

<style>
	.tab {
		margin-top: 8px;
	}
</style>
