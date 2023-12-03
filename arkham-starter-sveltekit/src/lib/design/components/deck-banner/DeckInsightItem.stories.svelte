<script>
	import { CardClass } from '$lib/core/card-class'

	import Story from '$lib/design/story/story.svelte'
	import DeckInsightItem from './DeckInsightItem.svelte'
</script>

<Story name={'Test'}>
	<DeckInsightItem title="Secondary Class" cardClass={CardClass.Guardian}>
		Hello world
	</DeckInsightItem>
	<DeckInsightItem title="Side Deck" cardClass={CardClass.Guardian}>Hello world</DeckInsightItem>
</Story>
