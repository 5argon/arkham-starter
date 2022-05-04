<script lang="ts">
	import { CardClass } from '$lib/design/interface/card-class'
	import { imageIconPath } from '$lib/design/interface/path'
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
				imagePath = imageIconPath + 'guardian.png'
				iconAlt = 'Guardian class icon'
				break
			case CardClass.Seeker:
				imagePath = imageIconPath + 'seeker.png'
				iconAlt = 'Seeker class icon'
				break
			case CardClass.Rogue:
				imagePath = imageIconPath + 'rogue.png'
				iconAlt = 'Rogue class icon'
				break
			case CardClass.Mystic:
				imagePath = imageIconPath + 'mystic.png'
				iconAlt = 'Mystic class icon'
				break
			case CardClass.Survivor:
				imagePath = imageIconPath + 'survivor.png'
				iconAlt = 'Survivor class icon'
				break
		}
	}
</script>

<img src={imagePath} alt={iconAlt} />
