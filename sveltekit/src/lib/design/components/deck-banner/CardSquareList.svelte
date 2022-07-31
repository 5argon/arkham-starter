<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import ImageVert from '../card/ImageVert.svelte'

	export let previewCards: string[]
	export let popupDb: PopupDatabase

	const maxCards = 5
	const moreCards = previewCards.length - maxCards

	let previewCardsReal: PopupDatabaseItem[] = []
	$: {
		previewCardsReal = []
		for (let i = 0; i < previewCards.length && i < maxCards; i += 1) {
			const card = popupDb.getById(previewCards[i])
			if (card !== null) {
				previewCardsReal.push(card)
			}
		}
	}
</script>

<div class="preview-cards">
	{#each previewCardsReal as pc}
		<span class="preview-card-each">
			<ImageVert
				cardId={pc.original.id}
				show
				class1={pc.class1}
				class2={pc.class2}
				class3={pc.class3}
				name={pc.original.esn === false ? pc.original.n : pc.original.n + ' : ' + pc.original.sn}
				xp={pc.original.xp}
				packIcon={pc.packIcon}
				packNumber={pc.original.ps}
			/>
		</span>
	{/each}
	{#if moreCards > 0}
		<span class="more">...</span>
	{/if}
</div>

<style>
	.preview-cards {
		display: flex;
		align-items: center;
		justify-items: center;
	}

	.more {
		font-size: small;
		padding: 0px 4px;
	}

	.preview-card-each {
		height: 27px; /* why we need this lol */
		margin-right: 2px;
	}
</style>
