<script lang="ts">
	import type { GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
	import { CardClass } from '$lib/core/card-class'
	import type { FullDatabase } from '$lib/core/full-database'
	import PartyDeckEntry from '$lib/design/components/card/PartyDeckEntry.svelte'
	import TeamMemberItem from '$lib/design/components/layout/TeamMemberItem.svelte'

	export let player: number
	export let deck: GetDeckCardIdReturns | null
	export let fullDatabase: FullDatabase
	let cardClass: CardClass = CardClass.Neutral
	$: {
		cardClass = CardClass.Neutral
		if (deck !== null) {
			cardClass = fullDatabase.getCard(deck.investigatorCode).class1
		}
	}
</script>

<TeamMemberItem {player} {cardClass} fixedLabelColor={false}>
	{#if deck !== null}
		<PartyDeckEntry
			deckLink={deck.link}
			deckName={deck.deck}
			investigatorCode={deck.investigatorCode}
			investigatorClass={cardClass}
		/>
	{/if}
</TeamMemberItem>
