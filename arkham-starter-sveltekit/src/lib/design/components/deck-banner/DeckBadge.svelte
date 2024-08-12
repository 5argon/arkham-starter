<script lang="ts">
	import { iconToNameConversion } from '$lib/ahdb/conversion'
import {
		type CardPack,
		CardPackIconColor,
		getPackStaticUrl,
	} from '$lib/design/interface/card-pack'

	import HoverFrame from '../inline/HoverFrame.svelte'
	import { createPackRequirementText } from './pack-requirement-text'

	export let packs: CardPack[]
	let badgeText: string = createPackRequirementText(packs)
	let hovering = false
	function mouseEnterHandler(e: MouseEvent & { currentTarget: EventTarget }) {
		hovering = true
	}
	function mouseLeaveHandler(e: MouseEvent & { currentTarget: EventTarget }) {
		hovering = false
	}
</script>

<div>
	{#if hovering && packs.length > 0}
		<div class="hover">
			<HoverFrame>
				{#each packs as p}
					<div class="each-pack">
						<span class="pack-block">
							<img
								class="pack-icon"
								src={getPackStaticUrl(p, CardPackIconColor.Black)}
								alt={iconToNameConversion(p)}
							/>
						</span>
						{iconToNameConversion(p)}
					</div>
				{/each}
			</HoverFrame>
		</div>
	{/if}
	<span
		on:mouseenter={mouseEnterHandler}
		on:mouseleave={mouseLeaveHandler}
		class="deck-badge"
		class:non-starter={packs.length > 3}>{badgeText}</span
	>
</div>

<style>
	.hover {
		position: absolute;
		transform: translateX(-100%);
		z-index: 1;
	}

	.each-pack {
		display: flex;
		align-items: center;
	}

	.pack-block {
		width: 25px;
	}

	.pack-icon {
		max-width: 16px;
		max-height: 16px;
		margin: 0px auto;
	}

	.deck-badge {
		display: inline-block;
		width: 80px;
		margin: 0px 4px;
		user-select: none;
		font-size: x-small;
		text-align: center;
	}

	.non-starter {
		font-weight: bold;
	}
</style>
