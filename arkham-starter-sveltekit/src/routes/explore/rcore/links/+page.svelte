<script lang="ts">
	import { CardPack } from '$lib/core/card-pack'
	import { Sorting } from '$lib/deck-table/grouping'
	import ExploreLayout from '$lib/design/pages/explore/ExploreLayout.svelte'
	import ExploreLinksLayout from '$lib/design/pages/explore/ExploreLinksLayout.svelte'
	import links from '$lib/explore/external-links/rcore.json'

	import type { PageData } from './$types'
	export let data: PageData
</script>

<svelte:head>
	<title>arkham-starter.com | Explore</title>
</svelte:head>

<ExploreLinksLayout
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
