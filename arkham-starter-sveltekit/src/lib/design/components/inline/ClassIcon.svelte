<script lang="ts">
	import { CardClass } from '$lib/design/interface/card-class'
	import { imageIconClassPath } from '$lib/design/interface/path'
	export let cardClass: CardClass
	let imagePath: string
	let iconAlt: string
	$: {
		switch (cardClass) {
			case CardClass.Neutral:
				imagePath = ''
				iconAlt = ''
				break
			case CardClass.Guardian:
				imagePath = imageIconClassPath + 'guardian.png'
				iconAlt = 'Guardian class icon'
				break
			case CardClass.Seeker:
				imagePath = imageIconClassPath + 'seeker.png'
				iconAlt = 'Seeker class icon'
				break
			case CardClass.Rogue:
				imagePath = imageIconClassPath + 'rogue.png'
				iconAlt = 'Rogue class icon'
				break
			case CardClass.Mystic:
				imagePath = imageIconClassPath + 'mystic.png'
				iconAlt = 'Mystic class icon'
				break
			case CardClass.Survivor:
				imagePath = imageIconClassPath + 'survivor.png'
				iconAlt = 'Survivor class icon'
				break
		}
	}
</script>

{#if cardClass !== CardClass.Neutral}
	<div class="outer-square">
		<img draggable={false} class="class-icon" src={imagePath} alt={iconAlt} />
	</div>
{/if}

<style>
	.outer-square {
		display: inline-block;
		width: 14px;
		height: 14px;
	}

	.class-icon {
		user-select: none;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
