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
	deck aggregator site, highlighting selection of <b>starter decks</b> for new players to get start
	with the game as soon as possible right at the homepage. The focus is on simplified, upfront
	search and filter tools that let you specify your current collection easily. The deck viewer is
	also designed to be beginner-friendly.
	<b>There is no registration.</b>
</p>
<p>
	Not just an individual deck, it even help you start the game with the <b>Team Assembler</b> feature.
	Each deck has a button to add to the team. Once you have assembled an entire team, the tool will help
	you resolve card overlaps and gather cards from your collection.
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
