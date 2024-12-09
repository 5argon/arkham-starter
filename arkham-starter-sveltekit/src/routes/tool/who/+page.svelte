<script lang="ts">
	import {
		CardClass,
		cardClassToBackgroundClass,
		cardClassToName,
		classCodeToCardClass,
	} from '$lib/core/card-class'
	import { CardPack } from '$lib/core/card-pack'
	import type { DecklistEntry, DecklistLabel } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn } from '$lib/deck-table/grouping'
	import Button from '$lib/design/components/basic/Button.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import CardLaid from '$lib/design/components/deck-table/CardLaid.svelte'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import CardForm from '$lib/design/components/form/CardForm.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { whoCanUse } from '$lib/tool/query/who-can-use'

	import type { PageData } from './$types'
	export let data: PageData
	let selected: string[] = []
	let investigatorResult: DecklistEntry[] = []
	let showingEntries: DecklistEntry[] = []
	$: {
		showingEntries = selected.map((x) => {
			return {
				amount: 1,
				cardId: x,
				id: x,
				labels: [],
			}
		})
	}
	function query(t: string[]) {
		if (t.length === 0) {
			investigatorResult = []
			return
		}
		const whos = whoCanUse(data.fdb, t)
		investigatorResult = whos.map<DecklistEntry>((x) => {
			let labels = undefined
			if (x.factionSelect.length > 0) {
				labels = [
					...x.factionSelect.map<DecklistLabel>((x) => {
						const cardClass = classCodeToCardClass(x)
						const name = cardClassToName(cardClass)
						return { text: name, color: cardClassToBackgroundClass(cardClass) }
					}),
				]
			}
			if (x.optionSelect !== '') {
				labels = [{ text: x.optionSelect, color: '#EEEEEE' }]
			}
			return {
				amount: 1,
				cardId: x.investigator.original.code,
				id: x.investigator.original.code,
				labels: labels,
			}
		})
	}

	function copyToClipboard(withEmoji:boolean) {
		function cardClassToEmoji(cardClass: CardClass | undefined) {
			if(!withEmoji){
				return ''
			}
			switch (cardClass) {
				case CardClass.Guardian:
					return ':ClassGuardian:'
				case CardClass.Seeker:
					return ':ClassSeeker:'
				case CardClass.Rogue:
					return ':ClassRogue:'
				case CardClass.Mystic:
					return ':ClassMystic:'
				case CardClass.Survivor:
					return ':ClassSurvivor:'
				default:
					return ''
			}
		}

		const whoCanUse = 'Who Can Use :'
		const query = showingEntries.map((x) => {
			const card = data.pdb.getByIdThrowNull(x.cardId)
			const cardName = card.original.n
			const cardClass1 = card.class1
			const cardClass2 = card.class2
			const cardClass3 = card.class3
			const levelString =
				card.original.xp !== undefined && card.original.xp > 0 ? `(${card.original.xp})` : ''
			return `- ${cardClassToEmoji(cardClass1)}${cardClassToEmoji(cardClass2)}${cardClassToEmoji(
				cardClass3,
			)} ${cardName} ${levelString}`
		})
		const result = 'Result : '
		const resultList = investigatorResult.map((x) => {
			const investigator = data.fdb.getCard(x.cardId)
			const parallelStatus = investigator.packIcon === CardPack.ParallelInvestigator
			const investigatorName = parallelStatus
				? '⇅ ' + investigator.original.name
				: investigator.original.name
			const investigatorClass = cardClassToEmoji(investigator.class1)
			let labelString = ''
			if (x.labels) {
				labelString = '(' + x.labels.map((x) => x.text).join(', ') + ')'
			}
			const final: string[] = ['-']
			if (investigatorClass.length > 0) {
				final.push(investigatorClass)
			}
			final.push(investigatorName)
			if (labelString.length > 0) {
				final.push(labelString)
			}
			return final.join(' ')
		})
		const final = [whoCanUse, ...query, '', result, ...resultList]
		navigator.clipboard.writeText(final.join('\n'))
	}
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | Who Can Use</title>
</svelte:head>

<PageTitle title="Who Can Use" />

<p>
	Query eligible investigators that could run combo cards you are interested in <b>together</b> in their
	deck. Essentially an inversed deckbuilder in a sense that regular arkhamdb deckbuilder have you select
	an investigator first, then it shows all eligible cards.
</p>

<p>
	Caveat is that it performs the check card-by-card. Therefore it can't account for amount limit on
	when all your query are combined. For example, if you list six Lv. 0 Survivor cards, it shows Zoey
	Samaras as one of the result despite she can only take five off-class cards.
</p>

<ListDivider label="Query" />

<CardForm
	popupDatabase={data.pdb}
	onSelectChanged={(s) => {
		selected = s
		query(selected)
	}}
	{selected}
	title={'Search Result'}
	placeholder={"Search by card's name"}
	filter={(pdbi) => {
		return (
			pdbi.original.inv !== true &&
			pdbi.original.sp !== true &&
			pdbi.original.wk !== true &&
			pdbi.original.hd !== true
		)
	}}
/>

<CardLaid
	entries={showingEntries}
	groupings={[]}
	sortings={[]}
	toggleMap={{}}
	fullDatabase={data.fdb}
	popupDatabase={data.pdb}
/>

{#if investigatorResult.length > 0}
	<ListDivider label="Result" />
	<div>
		<Button
			label="Copy Text"
			onClick={() => {
				copyToClipboard(false)
			}}
		/>
		<Button
			label="Copy Text with Discord Emoji"
			onClick={() => {
				copyToClipboard(true)
			}}
		/>
		<CardTableGrouped
			entries={investigatorResult}
			groupings={[]}
			sortings={[]}
			fullDatabase={data.fdb}
			popupDatabase={data.pdb}
			toggleMap={{}}
			taboo={false}
			hideAmount
			columns={[ExtraColumn.Label]}
		/>
	</div>
{/if}
