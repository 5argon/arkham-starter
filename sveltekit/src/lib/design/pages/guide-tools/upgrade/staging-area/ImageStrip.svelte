<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'
	import ClassIcon from '$lib/design/components/inline/ClassIcon.svelte'
	import { classToBorderColorCss, classToFontColorCss } from '$lib/design/interface/card-class'
	import { makePips } from '$lib/design/interface/string-util'

	export let showImageStrip: boolean
	export let xp: number | null = null
	export let class1: CardClass | null = null
	export let class2: CardClass | null = null
	export let class3: CardClass | null = null
	export let imageUrl: string | null = null
	export let imageBase64: string | null = null

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

{#if showImageStrip}
	<span class={'image-strip' + ' ' + colorClass}>
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
		<div class="image-strip-inner" />
	</span>
{/if}

<style>
	.image-strip {
		flex-shrink: 0;
		width: 48px;
		height: 16px;
		background-color: rgba(0, 0, 0, 0.05);
		margin-right: 4px;
		border-width: 1px;
		border-style: solid;
		border-left-width: 3px;
		border-left-style: solid;
		/* Make absolute position of multi-class icon works. */
		position: relative;
	}

	.image-strip-inner {
		width: 100%;
		height: 100%;
	}

	.multi-icons {
		user-select: none;
		position: absolute;
		top: 100%;
		right: 0;
		display: flex;
		width: 14px;
		transform: translateY(-11px);
	}

	.pips {
		user-select: none;
		line-height: 3px;
		font-size: 0.5em;
		text-align: left;
	}
</style>
