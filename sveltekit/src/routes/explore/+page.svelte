<script lang="ts">
	import ExploreLayout from '$lib/design/pages/explore/ExploreLayout.svelte'
	import help from '$lib/md/explore.md?raw'
	import type { ExploreData } from './+page'
	export let data: ExploreData
	$: q = data.q
</script>

<svelte:head>
	<title>arkham-starter.com | Explore</title>
</svelte:head>

<ExploreLayout pageTitle="Explore" helpMd={help} queryString={q} />
