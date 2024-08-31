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
	import SpoilerSeasonRender from './SpoilerSeasonRender.svelte'

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

	let showSpoilerSeason: boolean = spoilerSeason ? true : false
	let showList: boolean = spoilerSeason ? false : true
	let showScans: boolean = spoilerSeason ? false : true
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
	<p>
		Fantasy Flight Games kindly provides content creators around the world with pre-release cards
		with objective to nurture fan content ecosystem, <b
			>increasing exposure to their content channel</b
		>
		once it is their turn to spoil the cards.
	</p>

	<p>
		Therefore to enjoy this festivity to the fullest,
		<b
			>I highly recommend following the link and read/listen to their presentation and their opinion
			about the card</b
		>. This page is designed to do so with cards paired with the source they came from. Click on the
		underlined header to visit that content creator. Newer spoilers are sorted to the top.
	</p>
{/if}

{#if !spoilerSeason && exploreInput.links !== undefined}
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
	{#if spoilerSeason}
		<div class="tab">
			<LimitedTab
				onChangeActive={(i) => {
					switch (i) {
						case 0: {
							showSpoilerSeason = true
							showList = false
							showScans = false
							break
						}
						case 1: {
							showSpoilerSeason = false
							showList = true
							showScans = true
							break
						}
						case 2: {
							showSpoilerSeason = false
							showList = false
							showScans = true
							break
						}
						case 3: {
							showSpoilerSeason = false
							showList = true
							showScans = false
							break
						}
					}
				}}
			>
				<div slot="tab1"><b> 🌟 Spoiler Season Links</b></div>
				<div slot="content1" />
				<div slot="tab2">List and Scans</div>
				<div slot="content2" />
				<div slot="tab3">Scans Only</div>
				<div slot="content3" />
				<div slot="tab4">List Only</div>
				<div slot="content4" />
			</LimitedTab>
		</div>
	{:else}
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
	{/if}
	{#if showSpoilerSeason}
		<SpoilerSeasonRender {fdb} {pdb} {exploreInput} />
	{:else}
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
{/if}

<style>
	.pack-banner {
		width: 400px;
		max-width: 100%;
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
