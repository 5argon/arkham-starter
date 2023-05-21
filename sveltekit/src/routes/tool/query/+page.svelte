<script lang="ts">
	import {
		cardClassToBackgroundClass,
		cardClassToName,
		classCodeToCardClass,
	} from '$lib/core/card-class'
	import type { DecklistEntry, DecklistLabel } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn } from '$lib/deck-table/grouping'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import CardForm from '$lib/design/components/form/CardForm.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { whoCanUse } from '$lib/tool/query/who-can-use'
	import type { PageData } from './$types'
	export let data: PageData
	let selected: string[] = []
	let investigatorResult: DecklistEntry[] = []
	let error: boolean
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
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | Query</title>
</svelte:head>

<PageTitle title="Query" />

<p>
	Super niche query tool which takes a list of combo cards you are interested in then it shows which
	investigator can have them together in their deck.
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
			pdbi.original.inv === false &&
			pdbi.original.ir === false &&
			pdbi.original.sp !== true &&
			pdbi.original.wk !== true
		)
	}}
/>

{#if investigatorResult.length > 0}
	<ListDivider label="Result" />
	<div>
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
