<script>
	import { fetchFullDatabase } from '$lib/core/full-database'
	import { Grouping } from '$lib/deck-table/grouping'

	import Story from '$lib/design/story/story.svelte'
	import CardTableGrouped from './CardTableGrouped.svelte'
	const fdbp = fetchFullDatabase()
</script>

{#await fdbp then fdb}
	<Story name={'Test'}>
		<CardTableGrouped
			taboo={true}
			fullDatabase={fdb}
			entries={[
				{ cardId: '01000', amount: 1 },
				{ cardId: '01032', amount: 2 },
				{ cardId: '01059', amount: 2 },
				{ cardId: '01060', amount: 2 },
				{ cardId: '01063', amount: 2 },
				{ cardId: '01064', amount: 2 },
				{ cardId: '01065', amount: 2 },
				{ cardId: '01073', amount: 1 },
				{ cardId: '01087', amount: 2 },
				{ cardId: '01088', amount: 2 },
				{ cardId: '01089', amount: 2 },
				{ cardId: '01090', amount: 2 },
				{ cardId: '01091', amount: 2 },
				{ cardId: '01093', amount: 2 },
				{ cardId: '01694', amount: 1 },
				{ cardId: '02012', amount: 1 },
				{ cardId: '02013', amount: 1 },
				{ cardId: '02028', amount: 2 },
				{ cardId: '02029', amount: 1 },
				{ cardId: '08074', amount: 2 },
				{ cardId: '01071', amount: 2 },
				{ cardId: '08070', amount: 2 },
				{ cardId: '08091', amount: 2 },
				{ cardId: '08101', amount: 2 },
				{ cardId: '08103', amount: 2 },
				{ cardId: '08109', amount: 1 },
				{ cardId: '08118', amount: 1 },
			]}
			groupings={[Grouping.Set]}
		/>
	</Story>
{/await}
