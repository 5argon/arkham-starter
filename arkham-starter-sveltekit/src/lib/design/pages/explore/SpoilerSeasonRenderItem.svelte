<script lang="ts">
	import { extractDeck } from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn } from '$lib/deck-table/grouping'
	import type { ExploreInput, ExploreLink } from '$lib/explore/explore-input'
	import CardTableDoubleDisplay from './CardTableDoubleDisplay.svelte'

	export let link: ExploreLink
	export let fdb: FullDatabase
	export let pdb: PopupDatabase

	const cards =
		link.cards?.map((card) => {
			return pdb.getByIdThrowNull(card)
		}) ?? []

	const decklistEntries: DecklistEntry[] = cards.map((card) => {
		return {
			id: card.original.id,
			amount: card.original.q,
			cardId: card.original.id,
		}
	})
</script>

<div class="frame">
	<div class="flex">
		<div class="left">
			<div class="date">{link.date}</div>
		</div>
		<div class="right">
			<a target="_blank" href={link.url}>
				<h1>{link.site}</h1>
				<h2>{link.name}</h2>
			</a>
		</div>
	</div>
	<div class="card-area">
		<CardTableDoubleDisplay
			entries={decklistEntries}
			singleRight
			groupings={[]}
			sortings={[]}
			toggleMap={{}}
			columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
			popupDatabase={pdb}
			fullDatabase={fdb}
			taboo={true}
			showList={true}
			showScans={true}
		/>
	</div>
</div>

<style>
	.frame {
		padding: 8px;
		border: 1px solid black;
		border-radius: 4px;
	}

	.flex {
		display: flex;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 4px 4px 0px 0px;
	}

	.left {
		flex:0 0 120px;
		padding: 16px 8px;
		align-items: center;
		justify-content: center;
		display: flex;
		align-items: center;
	}

	.date {
		font-weight: bold;
		background-color: rgba(0, 0, 0, 0.07);
		border-radius: 20px;
		padding: 2px 20px;
		text-align: center;
	}

	.right {
		padding: 16px 8px;
	}

	h1 {
		font-size: medium;
		margin: 0;
	}

	h2 {
		font-size: large;
		margin: 0;
	}

	.card-area {
		margin-top: 8px;
	}
</style>
