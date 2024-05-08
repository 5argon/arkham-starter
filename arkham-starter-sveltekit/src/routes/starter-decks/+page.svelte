<script lang="ts">
	import { CardPack } from '$lib/core/card-pack'
	import Foldout from '$lib/design/components/basic/Foldout.svelte'
	import ExpansionSpread from '$lib/design/components/expansion/ExpansionSpread.svelte'
	import decks from '$lib/data/decks.json'
	import PackInfoSpan, {
		type PackInfoSpanItem,
	} from '$lib/design/components/inline/PackInfoSpan.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { decodeSideExtras, type DeckEntry } from '$lib/deck/deck'
	import { countPacksHigher } from '$lib/deck/deck-count'
	import type { PageData } from './$types'
	import { ahdbToOurs } from '$lib/ahdb/public-api/high-level'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import DeckBannerHigher from '$lib/design/components/deck-banner/DeckBannerHigher.svelte'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import { CardClass } from '$lib/core/card-class'

	export let enabledExpansions: CardPack[] = [
		CardPack.RevisedCoreSet,
		CardPack.ParallelInvestigator,
	]
	export let collectionFoldOut = true
	export let filtersFoldOut = true
	export let guardian = true
	export let seeker = true
	export let rogue = true
	export let mystic = true
	export let survivor = true
	export let data: PageData

	let deckEntries: DeckEntry[] = decks
	const getDeckPack = (deck: DeckEntry) => {
		const ourDeck = ahdbToOurs(deck.deck, true)
		const packsMap = countPacksHigher(ourDeck, decodeSideExtras(deck.raw.sideExtras), (c) => {
			return data.pdb.getByIdThrowNull(c).packIcon
		})
		const packs = Object.keys(packsMap).map<CardPack>((x) => parseInt(x))
		return packs
	}
	$: filterDeckEntry = (deckEntry: DeckEntry) => {
		const investigator = data.pdb.getByIdThrowNull(deckEntry.deck.investigator_code)
		const classIncluded =
			(guardian && investigator.class1 === CardClass.Guardian) ||
			(seeker && investigator.class1 === CardClass.Seeker) ||
			(rogue && investigator.class1 === CardClass.Rogue) ||
			(mystic && investigator.class1 === CardClass.Mystic) ||
			(survivor && investigator.class1 === CardClass.Survivor)
		const packs = getDeckPack(deckEntry)
		const failFilter = packs.find((pack) => !enabledExpansions.includes(pack))
		return !failFilter && classIncluded
	}
	$: sortDeckEntry = (a: DeckEntry, b: DeckEntry) => {
		const aPacks = getDeckPack(a)
		const bPacks = getDeckPack(b)
		const aCount = aPacks.filter((pack) => enabledExpansions.includes(pack)).length
		const bCount = bPacks.filter((pack) => enabledExpansions.includes(pack)).length
		if (aCount === bCount) {
			const aInvestigator = data.pdb.getByIdThrowNull(a.deck.investigator_code)
			const bInvestigator = data.pdb.getByIdThrowNull(b.deck.investigator_code)
			const aPack: number = aInvestigator.packIcon
			const bPack: number = bInvestigator.packIcon
			if (aPack < bPack) {
				return -1
			}
			if (aPack > bPack) {
				return 1
			}
			if (aInvestigator.original.ps < bInvestigator.original.ps) {
				return -1
			}
			if (aInvestigator.original.ps > bInvestigator.original.ps) {
				return 1
			}
			return 0
		}
		return bCount - aCount
	}
	$: deckEntriesFiltered = deckEntries.filter(filterDeckEntry).sort(sortDeckEntry)
	$: filteredDeckCount = deckEntriesFiltered.length
	$: totalDeckCount = deckEntries.length

	let packInfoSpanItem: PackInfoSpanItem[]
	$: {
		packInfoSpanItem = enabledExpansions
			.filter((pack) => pack !== CardPack.ParallelInvestigator)
			.map<PackInfoSpanItem>((pack) => ({ pack }))
	}
</script>

<svelte:head>
	<title>arkham-starter.com | Starter Decks</title>
</svelte:head>

<PageTitle title={'Starter Decks'} />

<p></p>

<Foldout
	title="Collection"
	expanded={collectionFoldOut}
	onToggle={() => {
		collectionFoldOut = !collectionFoldOut
	}}
>
	<svelte:fragment slot="default">
		<p>
			Click on Investigator Expansion or Investigator Starter Deck that you have purchased in
			addition to the Revised Core Set. Decks that matches the most selected packs are sorted up.
		</p>

		<ExpansionSpread
			{enabledExpansions}
			onClick={(pack) => {
				if (pack === CardPack.RevisedCoreSet || pack === CardPack.ParallelInvestigator) {
					return
				}
				enabledExpansions = enabledExpansions.includes(pack)
					? enabledExpansions.filter((p) => p !== pack)
					: [...enabledExpansions, pack]
			}}
		/>
	</svelte:fragment>
	<svelte:fragment slot="right"
		><span><PackInfoSpan items={packInfoSpanItem} /></span></svelte:fragment
	>
</Foldout>

<Foldout
	title="Filters"
	expanded={filtersFoldOut}
	onToggle={() => {
		filtersFoldOut = !filtersFoldOut
	}}
>
	<ListDivider label={'Investigator Class'} />
	<Checkbox
		label="Guardian"
		checked={guardian}
		onCheckChanged={() => {
			guardian = !guardian
		}}
	/>
	<Checkbox
		label="Seeker"
		checked={seeker}
		onCheckChanged={() => {
			seeker = !seeker
		}}
	/>
	<Checkbox
		label="Rogue"
		checked={rogue}
		onCheckChanged={() => {
			rogue = !rogue
		}}
	/>
	<Checkbox
		label="Mystic"
		checked={mystic}
		onCheckChanged={() => {
			mystic = !mystic
		}}
	/>
	<Checkbox
		label="Survivor"
		checked={survivor}
		onCheckChanged={() => {
			survivor = !survivor
		}}
	/>
</Foldout>

<ListDivider
	label={`Buildable Starter Decks ( ${filteredDeckCount} out of ${totalDeckCount} Decks )`}
/>

<div class="outer-flex">
	{#each deckEntriesFiltered as d (d.deck.id)}
		<div class="flex-item">
			<DeckBannerHigher
				popupDatabase={data.pdb}
				taboo={false}
				deck={ahdbToOurs(d.deck, true)}
				ahst={{
					rename: d.modifiedDeckName,
					excerpt: d.raw.excerpt,
					authorId: d.raw.arkhamdbUserId,
					authorName: d.raw.user,
					authorUsername: d.raw.userUrl,
					series: d.raw.series,
					extraCards: decodeSideExtras(d.raw.sideExtras),
				}}
			/>
		</div>
	{/each}
</div>

<style>
	.outer-flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.flex-item {
		width: 600px;
		height: 220px;
		margin: 5px 5px;
	}
</style>
