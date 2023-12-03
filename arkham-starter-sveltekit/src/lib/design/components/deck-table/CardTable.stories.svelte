<script>
	import { fetchFullDatabase } from '$lib/core/full-database'
	import { ExtraColumn } from '$lib/deck-table/grouping'

	import Story from '$lib/design/story/story.svelte'
	import CardTable from './CardTable.svelte'
	const fdbp = fetchFullDatabase()
</script>

{#await fdbp then fdb}
	<Story name={'Test'}>
		<CardTable
			toggleMap={{}}
			taboo={true}
			totalLevels={2}
			fullDatabase={fdb}
			groupedCards={[
				{
					entries: [
						{ amount: 2, cardId: '08035', id: '08035' },
						{ amount: 2, cardId: '02023', id: '02023', labels: [{ text: 'P1', color: '#FEDCBA' }] },
						{ amount: 1, cardId: '01045', id: '01045' },
						{
							entries: [
								{ amount: 1, cardId: '08123', id: '08123' },
								{ amount: 2, cardId: '02187', id: '02187' },
								{ amount: 2, cardId: '02150', id: '02150' },
							],
							groupName: 'Second Level',
						},
					],
					groupName: 'First Level',
				},
			]}
			columns={[ExtraColumn.Label]}
		/>
	</Story>
{/await}
