<script lang="ts">
	import { Grouping, Sorting } from '$lib/deck-table/grouping'

	import Story from '$lib/design/story/story.svelte'
	import PlayerDeckInput from './PlayerDeckInput.svelte'
</script>

<Story name="Normal">
	<PlayerDeckInput
		player={0}
		deckUrl={'01234'}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={false}
	/>
	<PlayerDeckInput
		player={1}
		deckUrl={'01234'}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={false}
	/>
	<PlayerDeckInput
		player={2}
		deckUrl={'01234'}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={false}
	/>
	<PlayerDeckInput
		player={3}
		deckUrl={'01234'}
		pullError={true}
		pulledDeckName={'My Deck'}
		pulling={false}
	/>
</Story>

<Story name="Fetching">
	<PlayerDeckInput
		player={0}
		deckUrl={'01234'}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={true}
	/>
	<PlayerDeckInput
		player={0}
		deckUrl={""}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={true}
	/>
	<PlayerDeckInput
		player={0}
		deckUrl={""}
		pullError={true}
		pulledDeckName={'My Deck'}
		pulling={true}
	/>
</Story>
