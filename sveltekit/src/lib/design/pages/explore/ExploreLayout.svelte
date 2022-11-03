<script lang="ts">
	import type { CardPack } from '$lib/core/card-pack'
	import { fetchFullDatabase, FullDatabase, type LazyFullDatabase } from '$lib/core/full-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import type { ExploreInput } from '$lib/explore/explore-input'
	import helpMd from '$lib/md/explore-ie.md?raw'
	import ExploreMenu from './ExploreMenu.svelte'

	export let pageTitle: string
	export let exploreInput: ExploreInput

	let toggleMap: { [cardId: string]: boolean } = {}

	// Copy from input, then allow changing these states in client side.
	let groupings: Grouping[] = exploreInput.groupings
	let sortings: Sorting[] = exploreInput.sortings
	let packs: CardPack[] = exploreInput.packs

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
	<ListDivider label="Investigators" />
	<CardTableGrouped
		{toggleMap}
		entries={getByPackFromFullDatabaseInvestigator(fdb, packs)}
		groupings={[]}
		sortings={[Sorting.Number]}
		taboo={true}
		fullDatabase={fdb}
		onClickToggle={(c, t) => {
			toggleMap[c] = t
			toggleMap = { ...toggleMap }
		}}
	/>

	<ListDivider label="Basic Weakness" />

	<CardTableGrouped
		{toggleMap}
		entries={getByPackFromFullDatabaseWeakness(fdb, packs)}
		groupings={[]}
		sortings={[Sorting.Number]}
		taboo={true}
		fullDatabase={fdb}
		onClickToggle={(c, t) => {
			toggleMap[c] = t
			toggleMap = { ...toggleMap }
		}}
	/>

	<ListDivider label="Player Cards" />

	<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

	<CardTableGrouped
		{toggleMap}
		entries={getByPackFromFullDatabase(fdb, packs)}
		{groupings}
		{sortings}
		taboo={true}
		fullDatabase={fdb}
		onClickToggle={(c, t) => {
			toggleMap[c] = t
			toggleMap = { ...toggleMap }
		}}
	/>
{/await}
