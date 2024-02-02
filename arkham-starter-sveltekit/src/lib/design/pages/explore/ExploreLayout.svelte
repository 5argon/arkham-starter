<script lang="ts">
	import { iconToNameConversion } from '$lib/ahdb/conversion'
	import type { CardPack } from '$lib/core/card-pack'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import { packToFile } from '$lib/design/components/expansion/pack-to-file'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import type { ExploreInput } from '$lib/explore/explore-input'
	import CardTableDoubleDisplay from './CardTableDoubleDisplay.svelte'
	import ExploreMenu from './ExploreMenu.svelte'

	export let fdb: FullDatabase
	export let pdb: PopupDatabase
	export let pageTitle: string
	export let exploreInput: ExploreInput

	$: packBanner = packToFile(exploreInput.packs[0])

	let toggleMap: { [cardId: string]: boolean[] } = {}

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

	function getByPackFromFullDatabaseInvestigator(
		fdb: FullDatabase,
		ps: CardPack[],
	): DecklistEntry[] {
		const inPack = fdb.queryPack(ps)
		const investigator = inPack.filter((x) => {
			const r =
				(x.original.type_code === 'investigator' ||
					typeof x.original.restrictions === 'string' ||
					typeof x.original.restrictions === 'object') &&
				x.original.spoiler === undefined
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
				x.original.subtype_code !== 'basicweakness' &&
				x.original.spoiler === undefined
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

<a href="/explore">Back to Explore Home</a>

{#if packBanner !== null}
	<img
		class="pack-banner"
		src={'/image/expansion/investigator/' + packBanner + '.png'}
		alt="pack banner"
	/>
{/if}

<h1><center>{iconToNameConversion(exploreInput.packs[0])}</center></h1>

<ExploreMenu />

<!-- <ListDivider label="External Links" /> -->

<p>
	<b>Tips : </b> If you are organizing your collection, the card is clickable as a checklist.
</p>

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
	popupDatabase={pdb}
	onClickToggle={(id, newToggles) => {
		toggleMap[id] = newToggles
		toggleMap = { ...toggleMap }
	}}
	{showList}
	{showScans}
/>

<ListDivider label="Basic Weakness" />

<CardTableDoubleDisplay
	{toggleMap}
	singleRight
	columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
	entries={getByPackFromFullDatabaseWeakness(fdb, packs)}
	groupings={[]}
	sortings={[Sorting.Number]}
	taboo={true}
	fullDatabase={fdb}
	popupDatabase={pdb}
	onClickToggle={(id, newToggles) => {
		toggleMap[id] = newToggles
		toggleMap = { ...toggleMap }
	}}
	{showList}
	{showScans}
/>

<ListDivider label="The Rest of Player Cards" />

<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

<CardTableDoubleDisplay
	{toggleMap}
	columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
	singleRight
	entries={getByPackFromFullDatabase(fdb, packs)}
	{groupings}
	{sortings}
	taboo={true}
	fullDatabase={fdb}
	popupDatabase={pdb}
	onClickToggle={(id, newToggles) => {
		toggleMap[id] = newToggles
		toggleMap = { ...toggleMap }
	}}
	{showList}
	{showScans}
/>

<style>
	.pack-banner {
		max-width: 400px;
		margin: 0 auto;
	}

	.tab {
		margin-top: 8px;
	}
</style>
