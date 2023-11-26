<script lang="ts">
	import { CardClass, cardClassToBackgroundClass } from '$lib/core/card-class'
	import Button from '../basic/Button.svelte'

	import TextBox, { EditingLevel, NoticeLevel } from '../basic/TextBox.svelte'
	import PartyDeckEntry from '../card/PartyDeckEntry.svelte'

	export let fixedLabelColor: boolean
	export let cardClass: CardClass
	export let investigatorCode: string | undefined
	export let player: number
	export let deckInput: string
	export let actualDeckUrl: string | undefined
	export let onDeckUrlChanged: (s: string) => void = () => {
		// do nothing
	}
	export let nextDeck: string | undefined = undefined
	export let previousDeck: string | undefined = undefined
	export let onNextDeck: (s: string) => void = () => {
		// do nothing
	}
	export let onPreviousDeck: (s: string) => void = () => {
		// do nothing
	}
	export let pulling: boolean
	export let pulledDeckName: string | null
	export let pullError: boolean
	export let mainCount: number = 0
	export let sideCount: number = 0

	$: nextPrevAvailable = nextDeck !== undefined || previousDeck !== undefined

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
					'Download successful.' +
					(mainCount > 0 ? ` [Deck Count: ${mainCount} Cards] ` : '') +
					(sideCount > 0 ? ` [Side Deck Count: ${sideCount} Cards] ` : '')
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
	$: playerClass = 'player-' + ((player % 4) + 1) + '-bg'
	$: classClass = cardClassToBackgroundClass(cardClass)
</script>

<div class="outer-flex">
	<div class={'inner-flex player ' + (fixedLabelColor ? playerClass : classClass)}>
		P{player + 1}
	</div>
	<div class="inner-flex deck">
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
		{#if nextPrevAvailable}
			<Button
				label="Prev"
				disabled={previousDeck === undefined}
				onClick={() => {
					if (previousDeck !== undefined) {
						onPreviousDeck(previousDeck)
					}
				}}
			/>
			<Button
				label="Next"
				disabled={nextDeck === undefined}
				onClick={() => {
					if (nextDeck !== undefined) {
						onNextDeck(nextDeck)
					}
				}}
			/>
		{/if}
		{#if actualDeckUrl !== undefined && investigatorCode !== undefined}
			<PartyDeckEntry
				deckLink={actualDeckUrl}
				deckName={pulledDeckName ?? ''}
				investigatorClass={cardClass}
				{investigatorCode}
			/>
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
