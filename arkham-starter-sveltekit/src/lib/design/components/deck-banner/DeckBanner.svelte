<script lang='ts'>
  import { coreToRcore } from '$lib/ahdb/conversion'
  import { DeckSource } from '$lib/ahdb/public-api/high-level'
  import { cardClassToBackgroundClass, cardClassToName } from '$lib/core/card-class'
  import { CommitIcon } from '$lib/core/commit-icon'
  import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
  import ClassIcon from '$lib/design/components/inline/ClassIcon.svelte'
  import { allIcons } from '$lib/design/icons/all-icons'
  import FaIcon from '$lib/design/icons/FaIcon.svelte'
  import { CardClass, classToBorderColorCss } from '$lib/design/interface/card-class'
  import type {
    ChosenCards,
    ChosenClasses,
    ChosenNumber,
    ChosenSkills,
    ChosenTraits,
    DeckDistribution,
    XpDistributionData,
  } from '$lib/design/interface/deck-banner'

  import type { PackInfoSpanItem } from '../inline/PackInfoSpan.svelte'
  import PackInfoSpan from '../inline/PackInfoSpan.svelte'
  import SkillIcon from '../inline/SkillIcon.svelte'
  import CardSquareList from './CardSquareList.svelte'
  import ChosenCardRender from './ChosenCardRender.svelte'
  import DeckInsightItem from './DeckInsightItem.svelte'
  import ParallelInfo from './ParallelInfo.svelte'
  import TwoClassBar from './TwoClassBar.svelte'
  import XpDistribution from './XpDistribution.svelte'

  export let authorName: string | null = null
  export let authorUrl: string | null = null
  export let seriesName: string | null = null
  export let seriesUrl: string | null = null
  export let investigatorCode: string
  export let parallelFront: boolean = false
  export let parallelBack: boolean = false
  export let excerpt: string | null = null
  export let deckName: string
  export let packs: PackInfoSpanItem[]
  export let popupDb: PopupDatabase
  export let compact: boolean = false
  export let openInNewTab: boolean = false
  export let deckSource: DeckSource | null = null

  export let previewCards: string[]

  export let chosenCards: ChosenCards[] = []
  export let chosenSkills: ChosenSkills | null = null
  export let chosenClasses: ChosenClasses | null = null
  export let chosenTraits: ChosenTraits | null = null
  export let chosenNumber: ChosenNumber | null = null
  export let deckDistributions: DeckDistribution | null = null
  export let xpDistributions: XpDistributionData[] | null = null
  export let link: string | null = null
  export let xpCosted: number | null = null
  export let xp: number | null = null
  export let xpSpent: number | null = null
  export let xpAdjustment: number | null = null

  // $: {
  // 	if (xpDistributions !== null) {
  // 		for (let i = 0; i < xpDistributions.length; i += 1) {
  //             const xd = xpDistributions[i]
  //             xd.
  //         }
  // 	}
  // }
  let deckSourceString: string
  $:{
    if (deckSource === null) {
      deckSourceString = ''
    } else {
      switch (deckSource) {
        case DeckSource.ArkhamStarter:
          deckSourceString = ''
          break
        case DeckSource.ArkhamBuildShared:
          deckSourceString = 'arkham.build'
          break
        case DeckSource.ArkhamDbPublic:
          deckSourceString = 'arkhamdb'
          break
        case DeckSource.ArkhamDbPublished:
          deckSourceString = 'arkhamdb'
          break
        default:
          throw new Error('Unknown deck source')
      }
    }
  }

  let investigatorName: string
  let investigatorSubtitle: string
  let investigatorClass: CardClass
  let investigatorWillpower: number
  let investigatorCombat: number
  let investigatorIntellect: number
  let investigatorAgility: number
  $: investigatorCodeRCore =
    !parallelFront && !parallelBack ? coreToRcore(investigatorCode) : investigatorCode
  $: {
    const card = popupDb.getById(investigatorCodeRCore)
    if (card !== null) {
      investigatorName = card.original.n
      investigatorSubtitle = card.original.sn ?? ''
      investigatorClass = card.class1
      investigatorWillpower = card.original.swi ?? 0
      investigatorCombat = card.original.scm ?? 0
      investigatorIntellect = card.original.sit ?? 0
      investigatorAgility = card.original.sag ?? 0
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
    <a
      href={link}
      class:deck-name-with-link={link !== null}
      class:deck-name-without-link={link === null}
      class:deck-name={!compact}
      class:deck-name-compact={compact}
      target={openInNewTab ? '_blank' : '_self'}
    >
      <span>{deckName}</span>
    </a>
    {#if deckSource !== null && deckSource !== DeckSource.ArkhamStarter}
      <a
        href={link}
        target={openInNewTab ? '_blank' : '_self'}
      >
        <span class='deck-source'>{deckSourceString}</span>
      </a>
    {/if}
  </div>
  <div class={'content'}>
    <div class='first-block' class:first-block-compact={compact}>
      {#if compact}
        <div class='compact-investigator'>
          <img
            class={'investigator-img-compact ' + borderColorClass}
            src={'/image/card/strip/' + investigatorCodeRCore + '.webp'}
            alt={''}
            draggable='false'
          />
          <div class='parallel-compact'>
            <ParallelInfo compact front={parallelFront} back={parallelBack} {investigatorCode} />
          </div>
        </div>
      {:else}
        <img
          class={'investigator-img ' + borderColorClass}
          src={'/image/card/square/' + investigatorCodeRCore + '.webp'}
          alt={''}
          draggable='false'
        />
      {/if}
      <div class='main-info'>
        <div class='main-info-top'>
          {#if !compact}
            <div class='investigator-name'>
              <ClassIcon cardClass={investigatorClass} />
              <span class='investigator-title'>
								{investigatorName}
							</span>
              <span class='investigator-subtitle'>{investigatorSubtitle}</span>
            </div>
            <div class='parallel-info'>
              <ParallelInfo front={parallelFront} back={parallelBack} {investigatorCode} />
            </div>
          {/if}
          <div class='skill-icons'>
						<span class='skill-icon-one'>
							<span
                class='skill-value'
                class:skill-value-low={investigatorWillpower <= 2}
                class:skill-value-high={investigatorWillpower >= 4}>{investigatorWillpower}</span
              >
							<SkillIcon greyOut={investigatorWillpower <= 2} icon={CommitIcon.Willpower} />
						</span>
            <span class='skill-icon-one'>
							<span
                class='skill-value'
                class:skill-value-low={investigatorIntellect <= 2}
                class:skill-value-high={investigatorIntellect >= 4}>{investigatorIntellect}</span
              >
							<SkillIcon greyOut={investigatorIntellect <= 2} icon={CommitIcon.Intellect} />
						</span>
            <span class='skill-icon-one'>
							<span
                class='skill-value'
                class:skill-value-low={investigatorCombat <= 2}
                class:skill-value-high={investigatorCombat >= 4}>{investigatorCombat}</span
              >
							<SkillIcon greyOut={investigatorCombat <= 2} icon={CommitIcon.Combat} />
						</span>
            <span class='skill-icon-one'>
							<span
                class='skill-value'
                class:skill-value-low={investigatorAgility <= 2}
                class:skill-value-high={investigatorAgility >= 4}>{investigatorAgility}</span
              >
							<SkillIcon greyOut={investigatorAgility <= 2} icon={CommitIcon.Agility} />
						</span>
          </div>
          {#if authorName}
            <div class='author'>
              <div>
                Author: <a href={authorUrl} target='_blank'>{authorName}</a>
              </div>
              {#if seriesName !== null}
                <div class='series'>
                  (<a href={seriesUrl} target='_blank'>{seriesName}</a>)
                </div>
              {/if}
            </div>
          {/if}
        </div>
        {#if !compact}
          {#if chosenTraits !== null}
            <DeckInsightItem title={chosenTraits.title} cardClass={investigatorClass}>
              {#each chosenTraits.traits as t}
							<span class={'trait-label ' + backgroundColorClass}>
								{t}
							</span>
              {/each}
            </DeckInsightItem>
          {/if}
          {#if chosenNumber !== null}
            <DeckInsightItem title={chosenNumber.title} cardClass={investigatorClass}>
						<span class={'trait-label ' + backgroundColorClass}>
							{chosenNumber.number}
						</span>
            </DeckInsightItem>
          {/if}
          {#if chosenClasses !== null}
            <DeckInsightItem title={chosenClasses.title} cardClass={investigatorClass}>
              {#each chosenClasses.classes as t}
                <ClassIcon cardClass={t} />
                <span class='class-label'>
								{cardClassToName(t)}
							</span>
              {/each}
            </DeckInsightItem>
          {/if}
          {#if chosenSkills !== null}
            <DeckInsightItem title={chosenSkills.title} cardClass={investigatorClass}>
              {#each chosenSkills.skills as t}
                <SkillIcon icon={t} />
              {/each}
            </DeckInsightItem>
          {/if}
        {/if}
      </div>
    </div>
    <div class={'second-block ' + borderColorClass} class:second-block-compact={compact}>
      {#if !compact}
        <CardSquareList {popupDb} {previewCards} />
      {/if}
      <!-- <div class="packs">
        {#if packsSorted.length <= 3}
          {#each packsSorted as p}
            <PackIconWithHover pack={p} />
          {/each}
        {/if}
      </div>
      <DeckBadge packs={packsSorted} /> -->
      {#if xpCosted !== null && xpCosted > 0}
      <span class='xp-flex'>
          <span class='xp'><FaIcon path={allIcons.experience} />
            {#if !compact}Experience: {/if}
            {xpCosted} XP</span>
        {#if xp !== null && xpSpent !== null && xp - xpSpent > 0}
				<span class='xp-save'>
					( Left: {xp - xpSpent} )
				</span>
      {/if}
      </span>
      {/if}
      <PackInfoSpan items={packs} />
      <!-- {:else} -->
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
      <!-- {/if} -->
    </div>
  </div>
  {#if excerpt !== null}
    <div class={'excerpt'}>
      {excerpt}
    </div>
  {/if}
</div>

<style>
    .frame {
        border-width: 1px 1px 1px 4px;
        border-style: solid;
        box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.1);
    }

    .content {
        padding: 4px 8px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .parallel-info {
        font-size: smaller;
    }

    .first-block {
        flex-basis: 300px;
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
        font-size: x-small;
        color: grey;
        white-space: nowrap;
    }

    .main-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 8px;
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
        flex-basis: 250px;
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
        width: 70px;
        height: 70px;
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
        padding: 4px 0px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
    }

    .deck-name {
        font-size: large;
        font-weight: bold;
        background-color: white;
        padding: 0px 8px;
        margin: 0px 8px;
        border-radius: 2px;
        flex: auto;
    }

    .deck-source {
        font-size: x-small;
        padding-right: 8px;
    }

    .deck-name-compact {
        font-weight: bold;
        background-color: white;
        padding: 0px 8px;
        margin: 0px 8px;
        border-radius: 2px;
        flex: auto;
    }

    .deck-name-with-link {
        text-decoration: none;
    }

    .deck-name-without-link:hover {
        color: inherit;
    }

    .deck-name-with-link:hover {
        text-decoration: underline;
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

    .class-label {
        border-radius: 2px;
        padding: 0px 4px;
        margin-right: 2px;
    }

    .excerpt {
        display: flex;
        align-items: center;
        min-height: 50px;
        font-size: small;
        margin: 8px 8px;
        padding: 4px 8px;
        border: 1px solid rgba(0, 0, 0, 0.159);
        border-radius: 4px;
    }

    .xp-flex {
        display: flex;
        margin-right: 4px;
        flex-direction: column;
    }

    .xp {
        font-size: small;
        font-weight: bold;
    }

    .xp-save {
        font-size: x-small;
        margin: 0px 2px;
    }

    .skill-icon-one {
        margin-right: 2px;
        display: inline-flex;
        align-items: center;
    }

    .skill-value-low {
        color: grey;
    }

    .skill-value-high {
        font-weight: bold;
    }
</style>
