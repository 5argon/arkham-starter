<script lang="ts">
	import { CardPack } from '$lib/core/card-pack'
	import { Sorting } from '$lib/deck-table/grouping'
	import ExploreLayout from '$lib/design/pages/explore/ExploreLayout.svelte'
	import links from '$lib/explore/external-links/rcore.json'

	import type { PageData } from './$types'
	export let data: PageData
</script>

<svelte:head>
	<title>arkham-starter.com | การ์ดผู้เล่น</title>
</svelte:head>

<ExploreLayout
	pageTitle="การ์ดผู้เล่น: กล่องหลัก Revised"
	pdb={data.pdb}
	fdb={data.fdb}
	exploreInput={{
		groupings: [],
		sortings: [Sorting.Number],
		packs: [CardPack.RevisedCoreSet],
		links: links,
	}}
	thai={true}
/>
