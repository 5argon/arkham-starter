<script>
	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import Story from '../../../story/story.svelte'
	import CardPopupControl from './CardPopupControl.svelte'
	const fpdb = fetchPopupDatabase()
</script>

{#await fpdb then pdb}
	<Story name="Test">
		<CardPopupControl title={'Example Title'} popupDatabase={pdb} onRowSelected={() => {}} />
	</Story>
{/await}
