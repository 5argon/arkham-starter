<script>
import { CardClass } from '$lib/core/card-class';

	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import Story from '../../story/story.svelte'
	import CardHover from './CardHover.svelte'
	const fpdb = fetchPopupDatabase()
</script>

{#await fpdb then pdb}
	<Story name="Test">
		<CardHover cardId={'08088'} text={"Hello"} class1={CardClass.Guardian}/>
	</Story>
{/await}
