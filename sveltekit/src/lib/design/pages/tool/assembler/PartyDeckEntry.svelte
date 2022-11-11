<script lang="ts">
	import type { GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import CardSpan from '$lib/design/components/card/CardSpan.svelte'

	export let deck: GetDeckCardIdReturns
	export let fullDatabase: FullDatabase

	$: inv = fullDatabase.getCard(deck.investigatorCode)
</script>

<div>
	<a href={deck.link} target="_blank" rel="noreferrer"
		><CardSpan
			showImageStrip
			cardId={deck.investigatorCode}
			text={deck.deck}
			class1={inv?.class1 ?? null}
		/></a
	>
</div>

<style>
</style>
