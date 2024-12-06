<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import CardLaid from '$lib/design/components/deck-table/CardLaid.svelte'

	import type { ExploreLink } from './explore-input'

	export let links: ExploreLink[]
	export let popupDatabase: PopupDatabase
	export let fullDatabase: FullDatabase

	function hashString(str: string): number {
		let hash = 0
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i)
			hash = (hash << 5) - hash + char
			hash |= 0 // Convert to 32bit integer
		}
		return hash
	}

	function assignRandomColorToSite(site: string): string {
		const baseColor = 200 // Base hue value
		const hashValue = Math.abs(hashString(site))
		const hueShift = hashValue % 360 // Ensure hue shift is within 0-359
		return `hsl(${(baseColor + hueShift) % 360}, 70%, 25%)`
	}

	function linkCardsToEntries(cards: string[]): DecklistEntry[] {
		return cards.map<DecklistEntry>((x) => {
			return {
				amount: 1,
				cardId: x,
				id: x,
			}
		})
	}

	let selectedSite: string = '';
	const siteCounts = links.reduce<{ [k: string]: number }>((acc, link) => {
		acc[link.site] = (acc[link.site] || 0) + 1;
		return acc;
	}, {});

	function filterLinksBySite(site: string) {
		selectedSite = site;
	}

	function resetFilter() {
		selectedSite = '';
	}
</script>

<div class="controls">
	<select bind:value={selectedSite} on:change="{(e) => filterLinksBySite(e.currentTarget.value)}">
		<option value="">All Sites</option>
		{#each Object.entries(siteCounts) as [site, count]}
			<option value="{site}">{site} ({count})</option>
		{/each}
	</select>
	<button on:click="{resetFilter}">Reset</button>
</div>

<div class="link-list">
	{#each links.filter(link => selectedSite === '' || link.site === selectedSite) as link}
		{@const formattedDate = link.date !== undefined ? new Date(link.date).toLocaleDateString() : ''}
		<div class="link-item">
			<a href={link.url} target="_blank" rel="noopener noreferrer">
				<div class="site" style="color: {assignRandomColorToSite(link.site)};">
					<span>{link.site}</span>
					<span class="date">{formattedDate}</span>
				</div>
				<div class="title">{link.name}</div>
				<div class="link">
					{link.url}
				</div>
			</a>
			{#if link.cards !== undefined}
				<div class="cards">
					<CardLaid
						entries={linkCardsToEntries(link.cards)}
						groupings={[]}
						sortings={[]}
						{fullDatabase}
						{popupDatabase}
						toggleMap={{}}
						small
					/>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.link-list {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.link-item {
		padding: 1em;
		border: solid;
		border-color: rgba(0, 0, 0, 0.1);
		border-width: 1px 0;
	}

	.site {
		font-weight: bold;
	}

	.title {
		font-size: 1.2em;
		font-weight: bold;
	}

	.date {
		font-size: x-small;
	}

	.link {
		font-size: x-small;
	}

	.link a {
		line-break: anywhere;
		text-decoration: none;
		color: inherit;
	}

	.cards {
		margin-top: 0.5em;
	}

	dt {
		font-weight: bold;
	}

	dd {
		margin: 0 0 1em 0;
	}

	.controls {
		margin-bottom: 1em;
		display: flex;
		gap: 1em;
	}
</style>
