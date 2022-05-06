<script lang="ts">
	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import Story from '$lib/design/story/story.svelte'
	import StagingArea from './StagingArea.svelte'

	const pdbp = fetchPopupDatabase()
	const cards1: string[] = [
		'01000',
		'01550',
		'01553',
		'01572',
		'01573',
		'01574',
		'01575',
		'01579',
		'01580',
		'01586',
		'01587',
		'01593',
		'08017',
		'08018',
		'08047',
		'08071',
		'08072',
		'08073',
		'08074',
		'08097',
		'08104',
		'08112',
		'08116',
		'08126',
	]
	const cards2: string[] = [
		'01595',
		'01687',
		'01688',
		'01695',
		'08050',
		'08053',
		'08098',
		'08099',
		'08100',
		'08115',
	]
	const cards3: string[] = []
</script>

{#await pdbp then pdb}
	<Story name="Test">
		<StagingArea
			popupDatabase={pdb}
			stagingCards1={cards1}
			stagingCards2={cards2}
			stagingCards3={cards3}
		/>
	</Story>
{/await}
