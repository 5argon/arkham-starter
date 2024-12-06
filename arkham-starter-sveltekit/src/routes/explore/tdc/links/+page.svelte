<script lang="ts">
	import { CardPack } from '$lib/core/card-pack'
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import links from '$lib/explore/external-links/tdc.json'
	import ExploreLayout from '$lib/design/pages/explore/ExploreLayout.svelte'

	import type { PageData } from './$types'
	import ExploreLinksLayout from '$lib/design/pages/explore/ExploreLinksLayout.svelte'
	export let data: PageData
</script>

<svelte:head>
	<title>arkham-starter.com | Explore</title>
</svelte:head>

<ExploreLinksLayout
	pageTitle="Explore: The Drowned City"
	pdb={data.pdb}
	fdb={data.fdb}
	exploreInput={{
		groupings: [Grouping.Class],
		sortings: [Sorting.Number],
		packs: [CardPack.TheDrownedCity],
		links: links,
	}}
/>
