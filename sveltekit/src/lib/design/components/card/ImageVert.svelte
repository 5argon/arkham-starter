<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'
	import ClassIcon from '$lib/design/components/inline/ClassIcon.svelte'
	import { classToBorderColorCss, classToFontColorCss } from '$lib/design/interface/card-class'
	import { makePips } from '$lib/design/interface/string-util'

	export let name: string | null = null
	export let show: boolean
	export let xp: number | null = null
	export let class1: CardClass | null = null
	export let class2: CardClass | null = null
	export let class3: CardClass | null = null
	export let cardId: string | null = null
	// export let imageBase64: string | null = null

	let showClasses: boolean
	$: showClasses =
		(class1 !== null && class2 !== null) || (class1 !== null && class2 !== null && class3 !== null)

	let colorClass: string
	$: {
		colorClass = classToBorderColorCss(class1, class2, class3)
	}

	let pips: string
	$: {
		if (xp !== null) {
			pips = makePips(xp)
		}
	}
</script>

{#if show}
	<span class={'image-strip' + ' ' + colorClass} title={name}>
		<img
			draggable={false}
			class="image-in-strip"
			src={'/image/card/square-small/' + cardId + '.png'}
			alt={''}
		/>
		{#if xp !== null}
			<div class="pips">{pips}</div>
		{/if}
		{#if showClasses}
			<div class="multi-icons">
				{#if class1 !== null}<ClassIcon cardClass={class1} />{/if}{#if class2 !== null}<ClassIcon
						cardClass={class2}
					/>{/if}{#if class3 !== null}<ClassIcon cardClass={class3} />{/if}
			</div>
		{/if}
	</span>
{/if}

<style>
	.image-strip {
		display: inline-block;
		width: 24px;
		height: 24px;
		border-width: 1.5px;
		border-style: solid;
		position: relative;
	}

	.image-in-strip {
		user-select: none;
		width: 22px;
		height: 22px;
		border: solid 1px white;
		position: relative;
	}

	.multi-icons {
		user-select: none;
		position: absolute;
		top: 100%;
		right: 0;
		display: flex;
		width: 14px;
		transform: translateY(-10px) translateX(1px);
	}

	.pips {
		position: absolute;
		top: 2px;
		left: 2px;
		color: white;
		text-shadow: 0.3px 0.3px 1px black;
		position: absolute;
		user-select: none;
		line-height: 3px;
		font-size: 0.5em;
		text-align: left;
	}
</style>
