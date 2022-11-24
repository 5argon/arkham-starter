<script lang="ts">
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import HomepageTopMenu from '$lib/design/pages/HomepageTopMenu.svelte'
</script>

<h1>arkham-starter.com</h1>

<svelte:head>
	<title>arkham-starter.com</title>
</svelte:head>

<HomepageTopMenu />

<p>
	arkham-starter.com is an <a href="https://arkhamdb.com" target="_blank" rel="noreferrer"
		>arkhamdb.com</a
	>
	deck aggregator site, highlighting selection of <b>starter decks</b> suitable for new players to get
	start with the game as soon as possible right at the homepage. Starter decks are decks which requires
	low amount of purchases and come with a helpful play guide.
</p>
<p>
	This site is in development. For now you can try out my <a href="/resource">resources and tools</a
	>, the finished site would depends on them.
</p>

<ListDivider label="Random" />

<p>(Decks are listed here once the site development is complete...)</p>

<ListDivider label="Browse" />

<p>(Decks are listed here once the site development is complete...)</p>

<style>
	p {
		max-width: 800px;
		margin: 8px auto;
	}
</style>
