<script lang="ts">
	import { browser } from '$app/environment'
	import Button from '$lib/design/components/basic/Button.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import DeckBannerHigher from '$lib/design/components/deck-banner/DeckBannerHigher.svelte'
	import HomepageTopMenu from '$lib/design/pages/HomepageTopMenu.svelte'
	import type { PageData } from './$types'
	import { fly } from 'svelte/transition'
	import type { DeckEntry } from '$lib/deck/deck'

	export let data: PageData

	let shuffledEntries: DeckEntry[] = []

	function shuffle(a: DeckEntry[]) {
		const array = [...a]
		let currentIndex = array.length,
			randomIndex

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--

			// And swap it with the current element.
			;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
		}

		return array
	}

	function randomize() {
		shuffledEntries = shuffle([...data.deckEntries]).slice(0, 6)
		// shuffledEntries = data.deckEntries
	}

	if (browser) {
		randomize()
	}
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
	deck aggregator site. "Starter decks" requires low amount of Investigator Expansion purchases to build.
	No matter which expansion you choose to start with first, I hope there is something to get started
	with right away in this site.
</p>
<p>
	I'm currently testing the deck listing UI (below). The search and filter tool is in development.
	For now decks are completely randomized from the database with no way to browse them. You can also
	try out my standalone <a href="/resource">resources and tools</a>.
</p>

<ListDivider label="Random Six Starter Decks" />

<div class="help">
	<div>
		<Button
			label={'Randomize Again'}
			block
			center
			onClick={() => {
				randomize()
			}}
		/>
	</div>
</div>

<div class="flex">
	{#each shuffledEntries as d, i (d.deck.id + i.toString())}
		<div class="flex-inner" in:fly={{ x: 18, duration: 100 }}>
			<DeckBannerHigher
				popupDatabase={data.pdb}
				deck={d.deck}
				ahst={{
					rename: d.modifiedDeckName,
					excerpt: d.raw.excerpt,
					authorId: d.raw.arkhamdbUserId,
					authorName: d.raw.user,
					authorUsername: d.raw.userUrl,
					series: d.raw.series,
				}}
			/>
		</div>
	{/each}
</div>

<style>
	p {
		max-width: 800px;
		margin: 8px auto;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		row-gap: 12px;
		column-gap: 24px;
	}

	.flex-inner {
		flex-basis: 660px;
	}

	.help {
		margin: 8px auto;
	}
</style>
