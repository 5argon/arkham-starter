<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'
	import CardSpan from '$lib/design/components/card/CardSpan.svelte'

	export let investigatorCode: string
	export let investigatorClass: CardClass
	export let deckName: string
	export let deckLink: string
</script>

<div>
	<a href={deckLink} target="_blank" rel="noreferrer"
		><CardSpan
			showImageStrip
			cardId={investigatorCode}
			text={deckName}
			class1={investigatorClass}
		/></a
	>
</div>

<style>
</style>
