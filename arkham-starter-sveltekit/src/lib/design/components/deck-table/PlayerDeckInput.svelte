<script lang='ts'>
  import type { FetchDeckResult } from '$lib/ahdb/public-api/high-level'
  import { CardClass, cardClassToBackgroundClass } from '$lib/core/card-class'
  import type { PopupDatabase } from '$lib/core/popup-database'
  import DeckBannerHigher from '$lib/design/components/deck-banner/DeckBannerHigher.svelte'

  import TextBox, { EditingLevel, NoticeLevel } from '../basic/TextBox.svelte'

  export let popupDatabase: PopupDatabase
  export let fetchResult: FetchDeckResult | undefined
  export let player: number
  export let deckInput: string
  export let onDeckUrlChanged: (s: string) => void = () => {
    // do nothing
  }
  export let onNextDeck: (() => void) | null = null
  export let pulling: boolean
  export let pulledDeckName: string | null
  export let pullError: boolean

  let noticeText: string | null = null
  let noticeLevel: NoticeLevel = NoticeLevel.Normal
  let spinning: boolean = false
  $: {
    if (pulling) {
      if (deckInput !== '') {
        noticeText = null
        noticeLevel = NoticeLevel.Normal
        spinning = true
      } else {
        noticeText = null
        noticeLevel = NoticeLevel.Normal
        spinning = false
      }
    } else {
      if (pulledDeckName && !pullError) {
        noticeText =
          'Download successful.'
        noticeLevel = NoticeLevel.Success
        spinning = false
      } else if (pullError) {
        noticeText = 'Failed importing this deck. See documentation for input syntax.'
        noticeLevel = NoticeLevel.Error
        spinning = false
      } else {
        noticeText = null
        noticeLevel = NoticeLevel.Normal
        spinning = false
      }
    }
  }
  let classClass: string = cardClassToBackgroundClass(CardClass.Neutral)
  $: {
    if (fetchResult !== undefined) {
      const investigatorCard = popupDatabase.getByIdThrowNull(fetchResult.investigatorCode)
      classClass = cardClassToBackgroundClass(investigatorCard.class1)
    }
  }
</script>

<div class='outer-flex'>
  <div class={'inner-flex player ' + (classClass)}>
    P{player + 1}
  </div>
  <div class='inner-flex deck'>
    <TextBox
      editingLevel={EditingLevel.Editable}
      currentText={deckInput}
      enableNotice={true}
      onEndEdit={onDeckUrlChanged}
      spinnerText={spinning ? 'Downloading...' : null}
      placeholderText={'Deck URL or deck ID. Prefix p: for published deck ID.'}
      {noticeLevel}
      {noticeText}
    />
    <!--{#if fetchResult && fetchResult.nextDeck !== null}-->
    <!--  <Button-->
    <!--    label='To Latest'-->
    <!--    onClick={() => {-->
    <!--      if( fetchResult && fetchResult.nextDeck !== null){-->
    <!--        onNextDeck(fetchResult.nextDeck)-->
    <!--      }-->
    <!--		}}-->
    <!--  />-->
    <!--{/if}-->
    {#if fetchResult !== undefined}
      <DeckBannerHigher linkToInternalViewer popupDatabase={popupDatabase} deck={fetchResult} compact
                        onNextDeck={onNextDeck} />
    {/if}
  </div>
</div>

<style>
    .outer-flex {
        display: flex;
        margin-bottom: 8px;
    }

    .player {
        padding: 4px;
        text-align: center;
        margin-right: 4px;
        width: 20px;
        border-radius: 4px;
    }

    .deck {
        flex: 1;
    }
</style>
