<script lang="ts">
	import { CardClass, cardClassToBackgroundClass } from '$lib/core/card-class'

	import TextBox, { EditingLevel, NoticeLevel } from '../basic/TextBox.svelte'

	export let fixedLabelColor: boolean
	export let cardClass: CardClass 
	export let player: number
	export let deckUrl: string
	export let onDeckUrlChanged: (s: string) => void = () => {
		// do nothing
	}
	export let pulling: boolean
	export let pulledDeckName: string | null
	export let pullError: boolean
	export let mainCount: number = 0
	export let sideCount: number = 0
	export let ignoreCount: number = 0

	let noticeText: string | null = null
	let noticeLevel: NoticeLevel = NoticeLevel.Normal
	let spinning: boolean = false
	$: {
		if (pulling) {
			if (deckUrl !== '') {
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
					pulledDeckName +
					(mainCount > 0 ? ` [DECK: ${mainCount}] ` : '') +
					(sideCount > 0 ? ` [SIDE: ${sideCount}] ` : '') +
					(ignoreCount > 0 ? ` [IGNORE: ${ignoreCount}] ` : '')
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
	$: playerClass = 'player-' + (player + 1) + '-bg'
	$: classClass = cardClassToBackgroundClass(cardClass)
</script>

<div class="outer-flex">
	<div class={'inner-flex player ' + (fixedLabelColor ? playerClass : classClass)}>
		P{player + 1}
	</div>
	<div class="inner-flex deck">
		<TextBox
			editingLevel={EditingLevel.Editable}
			currentText={deckUrl}
			enableNotice={true}
			onEndEdit={onDeckUrlChanged}
			spinnerText={spinning ? 'Gathering...' : null}
			placeholderText={'Deck URL or deck ID. Prefix p: for published deck ID.'}
			{noticeLevel}
			{noticeText}
		/>
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
