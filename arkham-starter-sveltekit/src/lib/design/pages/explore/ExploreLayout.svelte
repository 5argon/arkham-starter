<script lang="ts">
	import { LimitedTab } from '@5argon/arkham-ui'

	import { iconToNameConversion } from '$lib/ahdb/conversion'
	import type { CardPack } from '$lib/core/card-pack'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import Button from '$lib/design/components/basic/Button.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import { packToFile } from '$lib/design/components/expansion/pack-to-file'
	import type { ExploreInput } from '$lib/explore/explore-input'
	import ExploreLinks from '$lib/explore/ExploreLinks.svelte'

	import CardTableDoubleDisplay from './CardTableDoubleDisplay.svelte'
	import ExploreMenu from './ExploreMenu.svelte'

	export let fdb: FullDatabase
	export let pdb: PopupDatabase
	export let pageTitle: string
	export let exploreInput: ExploreInput
	export let spoilerSeason: boolean = false

	$: packBanner = packToFile(exploreInput.packs[0])

	let toggleMap: { [cardId: string]: boolean[] } = {}

	// Copy from input, then allow changing these states in client side.
	let groupings: Grouping[] = exploreInput.groupings
	let sortings: Sorting[] = exploreInput.sortings
	let packs: CardPack[] = exploreInput.packs

	let showList: boolean = true
	let showScans: boolean = true
	let showingLinks: boolean = false

	function onGroupingsChanged(g: Grouping[]) {
		groupings = g
	}
	function onSortingsChanged(s: Sorting[]) {
		sortings = s
	}

	function getByPackFromPdbInvestigator(pdb: PopupDatabase, ps: CardPack[]): DecklistEntry[] {
		const inPack = pdb.queryPack(ps)
		const investigator = inPack
			.filter((x) => {
				return (x.original.sp === undefined || x.original.sp === false) && !x.original.hd
			})
			.filter((x) => {
				return x.original.inv || x.original.ir
			})
		return investigator.map<DecklistEntry>((x) => {
			return {
				amount: x.original.q,
				cardId: x.original.id,
				id: x.original.id,
			}
		})
	}

	function getByPackFromPdb(pdb: PopupDatabase, ps: CardPack[]): DecklistEntry[] {
		const inPack = pdb.queryPack(ps)
		const notInvestigator = inPack
			.filter((x) => {
				return (x.original.sp === undefined || x.original.sp === false) && !x.original.hd
			})
			.filter((x) => {
				// Allow bonded weakness that is not for investigator here.
				return (
					!x.original.inv && !x.original.ir && (!x.original.wk || (x.original.wk && x.original.bd))
				)
			})
		return notInvestigator.map<DecklistEntry>((x) => {
			return {
				amount: x.original.q,
				cardId: x.original.id,
				id: x.original.id,
			}
		})
	}

	function getByPackFromPdbWeakness(pdb: PopupDatabase, ps: CardPack[]): DecklistEntry[] {
		const inPack = pdb.queryPack(ps)
		const weakness = inPack
			.filter((x) => {
				return (
					(x.original.sp === undefined || x.original.sp === false) &&
					!x.original.hd &&
					!x.original.bd
				)
			})
			.filter((x) => {
				return !x.original.inv && !x.original.ir && x.original.wk
			})
		return weakness.map<DecklistEntry>((x) => {
			return {
				amount: x.original.q,
				cardId: x.original.id,
				id: x.original.id,
			}
		})
	}
</script>

<a href="/explore">Back to Explore Home</a>

{#if packBanner !== null}
	<img
		class="pack-banner"
		src={'/image/expansion/investigator/' + packBanner + '.webp'}
		alt="pack banner"
	/>
{/if}

<h1><center>{iconToNameConversion(exploreInput.packs[0])}</center></h1>

{#if !showingLinks}
	<ExploreMenu />
{/if}

<!-- <ListDivider label="External Links" /> -->
{#if spoilerSeason}
	<h1 class="spoiler-season">Spoiler Season Incoming!</h1>
	<p>
		I'll keep adding links to spoiler cards from various content creators throughout the spoiler
		season here. For now, let's patiently waiting for the first official announcement article...
	</p>
{/if}

{#if exploreInput.links !== undefined}
	<Button
		label={showingLinks
			? 'Back to Gallery'
			: `Show ${exploreInput.links.length} Community Content Links`}
		center
		big
		onClick={() => {
			showingLinks = !showingLinks
		}}
	/>
{/if}

{#if showingLinks && exploreInput.links !== undefined}
	<ExploreLinks popupDatabase={pdb} fullDatabase={fdb} links={exploreInput.links} />
{/if}

{#if !showingLinks}
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
						showList = false
						showScans = true
						break
					}
					case 2: {
						showList = true
						showScans = false
						break
					}
				}
			}}
		>
			<div slot="tab1">List and Scans</div>
			<div slot="content1" />
			<div slot="tab2">Scans Only</div>
			<div slot="content2" />
			<div slot="tab3">List Only</div>
			<div slot="content3" />
		</LimitedTab>
	</div>
	<ListDivider label="Investigators" />
	<CardTableDoubleDisplay
		{toggleMap}
		singleRight
		big={!showList && showScans}
		entries={getByPackFromPdbInvestigator(pdb, packs)}
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

	<ListDivider label="Weakness" />

	<CardTableDoubleDisplay
		{toggleMap}
		big={!showList && showScans}
		singleRight
		columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
		entries={getByPackFromPdbWeakness(pdb, packs)}
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
		big={!showList && showScans}
		columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
		singleRight
		entries={getByPackFromPdb(pdb, packs)}
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
{/if}

<style>
	.pack-banner {
		max-width: 400px;
		margin: 0 auto;
	}

	.tab {
		margin-top: 8px;
	}

	.spoiler-season {
		color: red;
		animation:
			color-change 2s infinite,
			excite 0.4s infinite;
		display: inline-block;
		transform-origin: center left;
	}

	@keyframes color-change {
		0% {
			color: red;
		}
		50% {
			color: blue;
		}
		100% {
			color: red;
		}
	}

	@keyframes excite {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
