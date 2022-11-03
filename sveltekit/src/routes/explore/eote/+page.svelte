<script lang="ts">
	import { CardPack } from '$lib/core/card-pack'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import ExploreLayout from '$lib/design/pages/explore/ExploreLayout.svelte'
</script>

<svelte:head>
	<title>arkham-starter.com | Explore</title>
</svelte:head>

<ExploreLayout
	pageTitle="Explore: Edge of the Earth Investigator Expansion"
	exploreInput={{
		groupings: [Grouping.Class],
		sortings: [Sorting.Number],
		packs: [CardPack.EdgeOfTheEarth],
	}}
/>
