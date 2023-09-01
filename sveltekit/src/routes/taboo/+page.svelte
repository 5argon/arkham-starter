<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'
	import mdText from '$lib/md/taboo.md?raw'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import tb from '$lib/data/taboo.json'
	import type { AhdbTaboo, AhdbTabooProcessing } from '$lib/ahdb/taboo'
	import CardSpan from '$lib/design/components/card/CardSpan.svelte'
	import CardTable from '$lib/design/components/deck-table/CardTable.svelte'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { PageData } from './$types'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import { coreToRcore } from '$lib/ahdb/conversion'

	export let data: PageData

	const c = tb as AhdbTaboo[]
	const firstTaboo = c[0].cards
	const cards = firstTaboo.map<DecklistEntry>((x) => {
		const rCoreCode = coreToRcore(x.code)
		const g = data.pdb.getByIdThrowNull(rCoreCode)
		return {
			amount: g.original.q,
			cardId: rCoreCode,
			id: rCoreCode,
		}
	})
</script>

<svelte:head>
	<title>arkham-starter.com | Taboo</title>
</svelte:head>

<PageTitle title={'Taboo'} />

<SvelteMarkdown source={mdText} />

<CardTableGrouped
	taboo
	fullDatabase={data.fdb}
	popupDatabase={data.pdb}
	entries={cards}
	groupings={[Grouping.Set]}
	sortings={[Sorting.Number]}
	toggleMap={{}}
/>
