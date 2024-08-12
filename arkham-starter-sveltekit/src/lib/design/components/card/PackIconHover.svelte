<script lang="ts">
	import { iconToNameConversion, packCodeToIconConversion } from '$lib/ahdb/conversion'
	import {
		type CardPack,
		CardPackIconColor,
		getPackStaticUrl,
	} from '$lib/design/interface/card-pack'

	import HoverFrame from '../inline/HoverFrame.svelte'

	export let packIcon: CardPack
	$: name = iconToNameConversion(packIcon)
	$: packStaticUrl = getPackStaticUrl(packIcon, CardPackIconColor.Black)
</script>

<HoverFrame>
	<div class="flex"><img src={packStaticUrl} alt={name} /><span class="name">{name}</span></div>
</HoverFrame>

<style>
	.flex {
		display: flex;
	}

	img {
		max-width: 16px;
		max-height: 16px;
		margin-right: 8px;
	}

	.name {
		white-space: nowrap;
	}
</style>
