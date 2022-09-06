<script>
	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import Story from '../../../story/story.svelte'
	import CardPopupDrawing from './CardPopupDrawing.svelte'
	const fpdb = fetchPopupDatabase()
</script>

{#await fpdb then pdb}
	<Story name="Test">
		<CardPopupDrawing
			title={'Example Title'}
			popupDatabase={pdb}
			cardIds={['01516', '01527', '01525', '01525', '01559', '01560', '01561', '01562', '01563']}
			selectedIndex={3}
			bottomText="Hello world"
		/>
	</Story>
{/await}
