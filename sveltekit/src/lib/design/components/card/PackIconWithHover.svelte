<script lang="ts">
	import {
		CardPackIcon,
		CardPackIconColor,
		getPackStaticUrl,
	} from '$lib/design/interface/card-pack'
	import PackIconHover from './PackIconHover.svelte'

	export let pack: CardPackIcon
	export let count: number | null = null
	let hovering = false
	function mouseEnterHandler(e: MouseEvent & { currentTarget: EventTarget }) {
		hovering = true
	}
	function mouseLeaveHandler(e: MouseEvent & { currentTarget: EventTarget }) {
		hovering = false
	}

	let packLink: string | null = null
	switch (pack) {
		case CardPackIcon.TheDunwichLegacy: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2021/11/18/reliving-the-legacy/'
			break
		}
		case CardPackIcon.ThePathToCarcosa: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2022/2/24/retreading-the-path/'
			break
		}
		case CardPackIcon.EdgeOfTheEarth: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2021/6/3/to-edge-of-the-earth/'
			break
		}
		case CardPackIcon.NathanielCho:
		case CardPackIcon.HarveyWalters:
		case CardPackIcon.WinifredHabbamock:
		case CardPackIcon.JacquelineFine:
		case CardPackIcon.StellaClark: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2020/3/24/your-investigation-begins/'
			break
		}
	}
</script>

<div on:mouseenter={mouseEnterHandler} on:mouseleave={mouseLeaveHandler}>
	{#if count !== null}
		<span class="count">{count}</span>
	{/if}
	{#if hovering}
		<span class="pack-icon-popup">
			<PackIconHover packIcon={pack} />
		</span>
	{/if}
	<a href={packLink} target="_blank" rel="noreferrer">
		<img
			class="pack-icon"
			src={getPackStaticUrl(pack, CardPackIconColor.Black)}
			alt="Pack icon"
			draggable="false"
		/>
	</a>
</div>

<style>
	div {
		position: relative;
	}

	.pack-icon {
		max-width: 15px;
		max-height: 15px;
		margin: 0px 1px;
		user-select: none;
	}

	.pack-icon-popup {
		position: absolute;
		margin-top: -25px;
	}

	.count {
		user-select: none;
		font-size: xx-small;
		position: absolute;
		margin-top: 14px;
		color: grey;
	}
</style>
