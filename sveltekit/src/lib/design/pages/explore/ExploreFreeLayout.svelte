<script>
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import ExploreMenu from './ExploreMenu.svelte'
	import helpMd from '$lib/md/explore-ie.md?raw'
</script>

<PageTitle title={'Explore Investigator Expansions'} {helpMd} />

<ExploreMenu />

<p>
	Other than the menu, this page exists to host the explainer image below. You are free to hotlink
	to this image. It is such a commonly confused topic for newcomers.
</p>

<img src="/image/documentation/explore/expansion.png" alt="New repackaged format explainer" />

<style>
	img {
		width: 100%;
	}
</style>
