<script lang="ts">
	import { ahdbToOurs, DeckSource } from '$lib/ahdb/public-api/high-level'
	import { CardClass } from '$lib/core/card-class'
	import { CardPack } from '$lib/core/card-pack'
	import { CommitIcon } from '$lib/core/commit-icon'
	import decks from '$lib/data/decks.json'
	import { type DeckEntry, decodeSideExtras } from '$lib/deck/deck'
	import { countPacksHigher } from '$lib/deck/deck-count'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import Foldout from '$lib/design/components/basic/Foldout.svelte'
	import InlineTopic from '$lib/design/components/basic/InlineTopic.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import DeckBannerHigher from '$lib/design/components/deck-banner/DeckBannerHigher.svelte'
	import ExpansionSpread from '$lib/design/components/expansion/ExpansionSpread.svelte'
	import ClassIcon from '$lib/design/components/inline/ClassIcon.svelte'
	import PackInfoSpan, { type PackInfoSpanItem } from '$lib/design/components/inline/PackInfoSpan.svelte'
	import SkillIcon from '$lib/design/components/inline/SkillIcon.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import helpMd from '$lib/md/starter-deck.md?raw'

	import type { PageData } from './$types'

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
	export let neutral = true
	export let highWillpower = false
	export let highIntellect = false
	export let highCombat = false
	export let highAgility = false
	export let fullCollection = false
	export let exactMatch = false
	export let data: PageData

	let deckEntries: DeckEntry[] = decks
	const getDeckPack = (deck: DeckEntry) => {
		const ourDeck = ahdbToOurs(deck.deck, DeckSource.ArkhamStarter)
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
			(survivor && investigator.class1 === CardClass.Survivor) ||
			(neutral && investigator.class1 === CardClass.Neutral)
		const packs = getDeckPack(deckEntry)
		const highWillpowerCheck = highWillpower ? (investigator.original.swi ?? 0) >= 4 : true
		const highIntellectCheck = highIntellect ? (investigator.original.sit ?? 0) >= 4 : true
		const highCombatCheck = highCombat ? (investigator.original.scm ?? 0) >= 4 : true
		const highAgilityCheck = highAgility ? (investigator.original.sag ?? 0) >= 4 : true
		let failFilter: boolean
		if (fullCollection) {
			failFilter = false
		} else if (exactMatch) {
			const fail1 = enabledExpansions.find((enabledExpansion) => {
				if (enabledExpansion === CardPack.ParallelInvestigator) {
					return false
				}
				return !packs.includes(enabledExpansion)
			})
				? true
				: false
			const fail2 = packs.find((pack) => !enabledExpansions.includes(pack)) ? true : false
			failFilter = fail1 || fail2
		} else {
			failFilter = packs.find((pack) => !enabledExpansions.includes(pack)) ? true : false
		}
		return (
			!failFilter &&
			classIncluded &&
			highWillpowerCheck &&
			highIntellectCheck &&
			highCombatCheck &&
			highAgilityCheck
		)
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

<PageTitle title={'Starter Decks'} {helpMd} />

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
	<InlineTopic label="Collection">
		<Checkbox
			label="Full Collection"
			checked={fullCollection}
			onCheckChanged={() => {
				fullCollection = !fullCollection
				if (fullCollection) {
					exactMatch = false
				}
			}}
		/>
		<Checkbox
			label="Exact Match"
			checked={exactMatch}
			onCheckChanged={() => {
				exactMatch = !exactMatch
				if (exactMatch) {
					fullCollection = false
				}
			}}
		/>
	</InlineTopic>
	<InlineTopic label="Investigator Class">
		<Checkbox
			label="Guardian"
			checked={guardian}
			onCheckChanged={() => {
				guardian = !guardian
			}}
		>
			<ClassIcon cardClass={CardClass.Guardian} />
			Guardian
		</Checkbox>
		<Checkbox
			label="Seeker"
			checked={seeker}
			onCheckChanged={() => {
				seeker = !seeker
			}}
		>
			<ClassIcon cardClass={CardClass.Seeker} />
			Seeker
		</Checkbox>
		<Checkbox
			label="Rogue"
			checked={rogue}
			onCheckChanged={() => {
				rogue = !rogue
			}}
		>
			<ClassIcon cardClass={CardClass.Rogue} />
			Rogue
		</Checkbox>
		<Checkbox
			label="Mystic"
			checked={mystic}
			onCheckChanged={() => {
				mystic = !mystic
			}}
		>
			<ClassIcon cardClass={CardClass.Mystic} />
			Mystic
		</Checkbox>
		<Checkbox
			label="Survivor"
			checked={survivor}
			onCheckChanged={() => {
				survivor = !survivor
			}}
		>
			<ClassIcon cardClass={CardClass.Survivor} />
			Survivor
		</Checkbox>
		<Checkbox
			label="Neutral"
			checked={neutral}
			onCheckChanged={() => {
				neutral = !neutral
			}}
		>
			Neutral
		</Checkbox>
	</InlineTopic>

	<InlineTopic label="Base Skill Value">
		<Checkbox
			label="High Willpower"
			checked={highWillpower}
			onCheckChanged={() => {
				highWillpower = !highWillpower
			}}
		>
			<span>High</span>
			<SkillIcon icon={CommitIcon.Willpower} />
		</Checkbox>

		<Checkbox
			label="High Intellect"
			checked={highIntellect}
			onCheckChanged={() => {
				highIntellect = !highIntellect
			}}
		>
			<span>High</span>
			<SkillIcon icon={CommitIcon.Intellect} />
		</Checkbox>

		<Checkbox
			label="High Combat"
			checked={highCombat}
			onCheckChanged={() => {
				highCombat = !highCombat
			}}
		>
			<span>High</span>
			<SkillIcon icon={CommitIcon.Combat} />
		</Checkbox>

		<Checkbox
			label="High Agility"
			checked={highAgility}
			onCheckChanged={() => {
				highAgility = !highAgility
			}}
		>
			<span>High</span>
			<SkillIcon icon={CommitIcon.Agility} />
		</Checkbox>
	</InlineTopic>
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
				deck={ahdbToOurs(d.deck, DeckSource.ArkhamStarter)}
				linkToInternalViewer
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
