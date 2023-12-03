<script>
	import { fetchFullDatabase } from '$lib/core/full-database'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'

	import Story from '$lib/design/story/story.svelte'
	import CardTableGrouped from './CardTableGrouped.svelte'
	const fdbp = fetchFullDatabase()
</script>

{#await fdbp then fdb}
	<Story name={'Test'}>
		<CardTableGrouped
			taboo={true}
			toggleMap={{}}
			fullDatabase={fdb}
			groupings={[Grouping.Type]}
			sortings={[Sorting.Set, Sorting.Number]}
			entries={[
				{ cardId: '01000', amount: 1, id: '01000' },
				{ cardId: '01032', amount: 2, id: '01032' },
				{ cardId: '01059', amount: 2, id: '01059' },
				{ cardId: '01060', amount: 2, id: '01060' },
				{ cardId: '01063', amount: 2, id: '01063' },
				{ cardId: '01064', amount: 2, id: '01064' },
				{ cardId: '01065', amount: 2, id: '01065' },
				{ cardId: '01073', amount: 1, id: '01073' },
				{ cardId: '01087', amount: 2, id: '01087' },
				{ cardId: '01088', amount: 2, id: '01088' },
				{ cardId: '01089', amount: 2, id: '01089' },
				{ cardId: '01090', amount: 2, id: '01090' },
				{ cardId: '01091', amount: 2, id: '01091' },
				{ cardId: '01093', amount: 2, id: '01093' },
				{ cardId: '01694', amount: 1, id: '01694' },
				{ cardId: '02012', amount: 1, id: '02012' },
				{ cardId: '02013', amount: 1, id: '02013' },
				{ cardId: '02028', amount: 2, id: '02028' },
				{ cardId: '02029', amount: 1, id: '02029' },
				{ cardId: '08074', amount: 2, id: '08074' },
				{ cardId: '01071', amount: 2, id: '01071' },
				{ cardId: '08070', amount: 2, id: '08070' },
				{ cardId: '08091', amount: 2, id: '08091' },
				{ cardId: '08101', amount: 2, id: '08101' },
				{ cardId: '08103', amount: 2, id: '08103' },
				{ cardId: '08109', amount: 1, id: '08109' },
				{ cardId: '08118', amount: 1, id: '08118' },
				{ cardId: '02263', amount: 1, id: '02263' },
			]}
		/>
	</Story>
{/await}
