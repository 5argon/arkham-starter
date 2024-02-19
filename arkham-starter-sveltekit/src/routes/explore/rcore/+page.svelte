<script lang="ts">
	import { CardPack } from '$lib/core/card-pack'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import ExploreLayout from '$lib/design/pages/explore/ExploreLayout.svelte'
	import type { PageData } from './$types'
	import links from '$lib/explore/external-links/rcore.json'
	export let data: PageData
</script>

<svelte:head>
	<title>arkham-starter.com | Explore</title>
</svelte:head>

<ExploreLayout
	pageTitle="Explore: Revised Core Set"
	pdb={data.pdb}
	fdb={data.fdb}
	exploreInput={{
		groupings: [],
		sortings: [Sorting.Number],
		packs: [CardPack.RevisedCoreSet],
		links: links,
	}}
/>
