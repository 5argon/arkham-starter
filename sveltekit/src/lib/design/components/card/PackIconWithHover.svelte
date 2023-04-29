<script lang="ts">
	import { isReturnToPack, isStarterPack } from '$lib/core/card-pack'
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
	let packReturnTo = isReturnToPack(pack)
	let packStarter = isStarterPack(pack)
	$: packColored = packReturnTo || packStarter
	switch (pack) {
		case CardPackIcon.ParallelInvestigator: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2020/5/5/beyond-our-dimension/'
			break
		}
		case CardPackIcon.TheDunwichLegacy: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2021/11/18/reliving-the-legacy/'
			break
		}
		case CardPackIcon.ThePathToCarcosa: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2022/2/24/retreading-the-path/'
			break
		}
		case CardPackIcon.TheForgottenAge: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2022/12/1/an-unforgettable-quest/'
			break
		}
		case CardPackIcon.TheCircleUndone: {
			packLink = 'https://www.fantasyflightgames.com/en/news/2023/3/9/breaking-the-spell/'
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

<div class="all-div" on:mouseenter={mouseEnterHandler} on:mouseleave={mouseLeaveHandler}>
	{#if hovering}
		<span class="pack-icon-popup">
			<PackIconHover packIcon={pack} />
		</span>
	{/if}
	<a href={packLink} target="_blank" rel="noreferrer">
		<img
			class="pack-icon"
			class:pack-icon-return-to={packReturnTo}
			class:pack-icon-starter={packStarter}
			src={getPackStaticUrl(pack, packColored ? CardPackIconColor.White : CardPackIconColor.Black)}
			alt="Pack icon"
			draggable="false"
		/>
	</a>
</div>
{#if count !== null}
	<span class="count">{count}</span>
{/if}

<style>
	div {
		position: relative;
		width: 20px;
		height: 15px;
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
		display: block;
		color: grey;
	}

	.pack-icon-return-to {
		filter: brightness(20%) sepia(100%) hue-rotate(100deg) saturate(6);
	}

	.pack-icon-starter {
		filter: brightness(20%) sepia(100%) hue-rotate(300deg) saturate(6);
	}
</style>
