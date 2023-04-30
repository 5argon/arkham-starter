<script lang="ts">
	import { CardPack } from '$lib/core/card-pack'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import ExploreLayout from '$lib/design/pages/explore/ExploreLayout.svelte'
	import type { PageData } from './$types'
	export let data: PageData
</script>

<svelte:head>
	<title>arkham-starter.com | Explore</title>
</svelte:head>

<ExploreLayout
	pageTitle="Explore: The Circle Undone Investigator Expansion"
	pdb={data.pdb}
	fdb={data.fdb}
	exploreInput={{
		groupings: [Grouping.Class],
		sortings: [Sorting.Number],
		packs: [CardPack.TheCircleUndone],
	}}
/>
