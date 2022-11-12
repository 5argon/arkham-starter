<script lang="ts">
	import { Grouping, Sorting } from '$lib/deck-table/grouping'

	import Story from '$lib/design/story/story.svelte'
	import PlayerDeckInput from './PlayerDeckInput.svelte'
</script>

<Story name="Normal">
	<PlayerDeckInput
		player={0}
		deckInput={'01234'}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={false}
	/>
	<PlayerDeckInput
		player={1}
		deckInput={'01234'}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={false}
	/>
	<PlayerDeckInput
		player={2}
		deckInput={'01234'}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={false}
	/>
	<PlayerDeckInput
		player={3}
		deckInput={'01234'}
		pullError={true}
		pulledDeckName={'My Deck'}
		pulling={false}
	/>
</Story>

<Story name="Fetching">
	<PlayerDeckInput
		player={0}
		deckInput={'01234'}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={true}
	/>
	<PlayerDeckInput
		player={0}
		deckInput={""}
		pullError={false}
		pulledDeckName={'My Deck'}
		pulling={true}
	/>
	<PlayerDeckInput
		player={0}
		deckInput={""}
		pullError={true}
		pulledDeckName={'My Deck'}
		pulling={true}
	/>
</Story>
