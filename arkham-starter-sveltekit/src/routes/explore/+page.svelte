<script lang="ts">
	import ExploreFreeLayout from '$lib/design/pages/explore/ExploreFreeLayout.svelte'
	import type { ExploreData } from './+page'
	export let data: ExploreData
	$: q = data.q
</script>

<svelte:head>
	<title>arkham-starter.com | Explore</title>
</svelte:head>

<ExploreFreeLayout />
