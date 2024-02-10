<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import CardLaid from '$lib/design/components/deck-table/CardLaid.svelte'
	import type { ExploreLink } from './explore-input'

	export let links: ExploreLink[]
	export let popupDatabase: PopupDatabase
	export let fullDatabase: FullDatabase

	function linkCardsToEntries(cards: string[]): DecklistEntry[] {
		return cards.map<DecklistEntry>((x) => {
			return {
				amount: 1,
				cardId: x,
				id: x,
			}
		})
	}
</script>

<table>
	<thead>
		<tr>
			<th class="site">Site</th>
			<th class="title">Title</th>
			<th></th>
			<th>Link</th>
		</tr>
	</thead>
	<tbody>
		{#each links as link}
			<tr>
				<td class="site">{link.site}</td>
				<td>{link.name}</td>
				<td>
					{#if link.cards !== undefined}
						<CardLaid
							entries={linkCardsToEntries(link.cards)}
							groupings={[]}
							sortings={[]}
							{fullDatabase}
							{popupDatabase}
							toggleMap={{}}
							small
						/>
					{/if}
				</td>
				<td class="link"
					><a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></td
				>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}
	.site {
		font-weight: bold;
	}
	tr {
		border: solid;
		border-color: rgba(0, 0, 0, 0.1);
		border-width: 1px 0;
	}
	td {
		padding: 1em;
	}

	.link {
		line-break: anywhere;
	}
</style>
