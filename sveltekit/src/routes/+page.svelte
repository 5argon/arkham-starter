<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'
	import mdText from '$lib/md/about.md?raw'
</script>

<h1>arkham-starter.com</h1>

<svelte:head>
	<title>arkham-starter.com</title>
</svelte:head>

<p>
	arkham-starter.com is an <a href="https://arkhamdb.com" target="_blank" rel="noreferrer"
		>arkhamdb.com</a
	>
	deck aggregator site, highlighting selection of <b>starter decks</b> suitable for new players to get
	start with the game as soon as possible right at the homepage. Starter decks are decks which requires
	low amount of purchases and come with a helpful play guide.
</p>
<p>
	The site also hosts
	<a href="/resource">additional resources and tools</a> to help with playing the game or writing your deck
	guide.
</p>
<p>
	Interested in submitting your starter decks for this site?
	<a href={'/submission'}>Read the Deck Submission guidelines here.</a>
</p>

<p>
	(Decks are listed here once the site developement is complete...)
</p>

<style>
	p {
		max-width: 800px;
		margin: 8px auto;
	}
</style>
