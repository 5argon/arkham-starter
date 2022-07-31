<script lang="ts" context="module">
	import { CardClass, cardClassToBackgroundClass } from '$lib/core/card-class'
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import { classToBorderColorCss } from '$lib/design/interface/card-class'
	import {
		CardPackIconColor,
		getPackStaticUrl,
		type CardPackIcon,
	} from '$lib/design/interface/card-pack'
	import ClassIcon from '../inline/ClassIcon.svelte'
</script>

<script lang="ts">
	import ParallelInfo from './ParallelInfo.svelte'
	import type {
		ChosenCards,
		ChosenClasses,
		ChosenNumber,
		ChosenTraits,
		DeckDistribution,
		XpDistributionData,
	} from '$lib/design/interface/deck-banner'
	import XpDistribution from './XpDistribution.svelte'
	import DeckInsightItem from './DeckInsightItem.svelte'
	import TwoClassBar from './TwoClassBar.svelte'
	import ChosenCardRender from './ChosenCardRender.svelte'
	import CardSquareList from './CardSquareList.svelte'
	import { coreToRcore } from '$lib/ahdb/conversion'
	import { sortIcons } from './deck-banner-sort-icons'
	import { createPackRequirementText } from './pack-requirement-text'

	export let authorName: string
	export let authorUrl: string
	export let seriesName: string | null = null
	export let seriesUrl: string | null = null
	export let investigatorCode: string
	export let parallelFront: boolean = false
	export let parallelBack: boolean = false
	export let deckName: string
	export let packs: CardPackIcon[]
	export let popupDb: PopupDatabase
	export let compact: boolean = false

	export let previewCards: string[]

	export let chosenCards: ChosenCards[] = []
	export let chosenClasses: ChosenClasses | null = null
	export let chosenTraits: ChosenTraits | null = null
	export let chosenNumber: ChosenNumber | null = null
	export let deckDistributions: DeckDistribution | null = null
	export let xpDistributions: XpDistributionData[] | null = null

	// $: {
	// 	if (xpDistributions !== null) {
	// 		for (let i = 0; i < xpDistributions.length; i += 1) {
	//             const xd = xpDistributions[i]
	//             xd.
	//         }
	// 	}
	// }

	let investigatorName: string
	let investigatorSubtitle: string
	let investigatorClass: CardClass
	let investigatorPack: CardPackIcon
	$: investigatorCodeRCore =
		!parallelFront && !parallelBack ? coreToRcore(investigatorCode) : investigatorCode
	$: {
		const card = popupDb.getById(investigatorCodeRCore)
		if (card !== null) {
			investigatorName = card.original.n
			investigatorSubtitle = card.original.sn ?? ''
			investigatorClass = card.class1
			investigatorPack = card.packIcon
		}
	}

	$: packsSorted = sortIcons(packs, investigatorPack)
	let packStaticUrls: string[]
	$: {
		packStaticUrls = []
		for (let i = 0; i < packs.length; i += 1) {
			packStaticUrls.push(getPackStaticUrl(packsSorted[i], CardPackIconColor.Black))
		}
	}

	let borderColorClass: string
	$: {
		borderColorClass = classToBorderColorCss(investigatorClass, null, null)
	}

	let backgroundColorClass: string
	$: {
		backgroundColorClass = cardClassToBackgroundClass(investigatorClass)
	}

	let badgeText: string = createPackRequirementText(packs)
	let previewCardsReal: PopupDatabaseItem[] = []
	$: {
		previewCardsReal = []
		for (let i = 0; i < previewCards.length; i += 1) {
			const card = popupDb.getById(previewCards[i])
			if (card !== null) {
				previewCardsReal.push(card)
			}
		}
	}
</script>

<div class={'frame ' + borderColorClass}>
	<div class={'head ' + backgroundColorClass}>
		<span class="deck-name">{deckName}</span>
		<div class="packs">
			{#if packs.length <= 3}
				{#each packStaticUrls as p}
					<img class="pack-icon" src={p} alt="Pack icon" draggable="false" />
				{/each}
			{/if}
		</div>
		<span class="deck-badge" class:non-starter={packs.length > 3}>{badgeText}</span>
	</div>
	<div class={'content'}>
		<div class="first-block" class:first-block-compact={compact}>
			{#if compact}
				<div class="compact-investigator">
					<img
						class={'investigator-img-compact ' + borderColorClass}
						src={'/image/card/strip/' + investigatorCodeRCore + '.png'}
						alt={''}
						draggable="false"
					/>
					<div class="parallel-compact">
						<ParallelInfo compact front={parallelFront} back={parallelBack} {investigatorCode} />
					</div>
				</div>
			{:else}
				<img
					class={'investigator-img ' + borderColorClass}
					src={'/image/card/square/' + investigatorCodeRCore + '.png'}
					alt={''}
					draggable="false"
				/>
			{/if}
			<div class="main-info">
				<div class="main-info-top">
					{#if !compact}
						<div class="investigator-name">
							<ClassIcon cardClass={investigatorClass} />
							<span class="investigator-title">
								{investigatorName}
							</span>
							<span class="investigator-subtitle">{investigatorSubtitle}</span>
						</div>
						<div class="parallel-info">
							<ParallelInfo front={parallelFront} back={parallelBack} {investigatorCode} />
						</div>
					{/if}
					<div class="author">
						<span>Author: <a href={authorUrl} target="_blank">{authorName}</a></span>
						{#if seriesName !== null}
							<span class="series"
								>(Series: <a href={seriesUrl} target="_blank">{seriesName}</a>)</span
							>
						{/if}
					</div>
				</div>
				{#if !compact}
					<CardSquareList {popupDb} {previewCards} />
				{/if}
			</div>
		</div>
		<div class={'second-block ' + borderColorClass} class:second-block-compact={compact}>
			{#if compact}
				<CardSquareList {popupDb} {previewCards} />
			{:else}
				{#if chosenTraits !== null}
					<DeckInsightItem title={chosenTraits.title} cardClass={investigatorClass}>
						{#each chosenTraits.traits as t}
							<span class={'trait-label ' + backgroundColorClass}>
								{t}
							</span>
						{/each}
					</DeckInsightItem>
				{/if}
				{#if deckDistributions !== null}
					<DeckInsightItem title={deckDistributions.title} cardClass={investigatorClass}>
						{#if deckDistributions.distributions.length === 3}
							<TwoClassBar
								class1={typeof deckDistributions.distributions[0].item !== 'string'
									? deckDistributions.distributions[0].item
									: CardClass.Neutral}
								class2={typeof deckDistributions.distributions[2].item !== 'string'
									? deckDistributions.distributions[2].item
									: CardClass.Neutral}
								class1Amount={deckDistributions.distributions[0].amount}
								neutralAmount={deckDistributions.distributions[1].amount}
								class2Amount={deckDistributions.distributions[2].amount}
							/>
						{/if}
					</DeckInsightItem>
				{/if}
				{#if xpDistributions !== null}
					{#each xpDistributions as x}
						<DeckInsightItem title={x.title} cardClass={investigatorClass}>
							<XpDistribution
								topic={x.item}
								level1={x.level1}
								level2={x.level2}
								level3={x.level3}
								level4={x.level4}
								level5={x.level5}
							/>
						</DeckInsightItem>
					{/each}
				{/if}
				{#each chosenCards as cc}
					<ChosenCardRender {popupDb} cardClass={investigatorClass} chosenCards={cc} />
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.frame {
		border-width: 2px 2px 2px 10px;
		border-style: solid;
		box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.1);
		border-radius: 6px 0px 0px 6px;
		max-width: 750px;
	}

	.content {
		padding: 4px 8px;
		display: flex;
		flex-wrap: wrap;
	}

	.parallel-info {
		font-size: smaller;
	}

	.first-block {
		flex-basis: 350px;
		flex-grow: 1;
		display: flex;
		align-items: center;
		margin: 4px 0px;
	}

	.parallel-compact {
		margin-top: 2px;
	}

	.compact-investigator {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.investigator-title {
		white-space: nowrap;
	}

	.investigator-subtitle {
		font-size: small;
		color: grey;
		white-space: nowrap;
	}

	.main-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 8px;
	}

	.investigator-name {
		font-size: large;
	}

	.author {
		margin: 4px 0px;
	}

	.series {
		font-size: xx-small;
		white-space: nowrap;
	}

	.second-block {
		border-width: 0px 0px 0px 1px;
		border-style: solid;
		flex-basis: 310px;
		flex-grow: 2;
		margin: 4px 0px;
		padding-left: 4px;
	}

	.first-block-compact {
		flex-basis: 250px;
		flex-grow: initial;
	}

	.second-block-compact {
		display: flex;
		align-items: center;
		border: none;
		flex: content;
	}

	.investigator-img {
		width: 100px;
		height: 100px;
		border-width: 1px;
		border-style: solid;
		user-select: none;
	}

	.investigator-img-compact {
		width: 72px;
		height: 24px;
		border-width: 1px;
		border-style: solid;
		user-select: none;
	}

	.head {
		min-height: 28px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}

	.deck-badge {
		width: 80px;
		margin: 0px 4px;
		user-select: none;
		font-size: x-small;
		text-align: center;
	}

	.non-starter {
		font-weight: bold;
	}

	.deck-name {
		font-size: large;
		font-weight: bold;
		background-color: white;
		padding: 0px 8px;
		margin-left: 8px;
		border-radius: 4px;
		flex: auto;
	}

	.packs {
		display: flex;
		align-items: center;
		justify-items: center;
		width: 30px;
		border-radius: 2px;
		margin: 0px 4px;
		padding: 0px 4px;
	}

	.trait-label {
		font-size: small;
		border-radius: 2px;
		padding: 0px 4px;
		margin-right: 2px;
	}

	.pack-icon {
		max-width: 15px;
		max-height: 15px;
		margin: 0px 1px;
		user-select: none;
	}
</style>
