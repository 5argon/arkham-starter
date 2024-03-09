<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'
	import { makePips } from '$lib/design/interface/string-util'

	import ClassIcon from '../inline/ClassIcon.svelte'
	export let cardClass: CardClass | null
	export let level: number
	export let amount: number
	$: pips = makePips(level)
</script>

<span class="level">
	{pips}
</span>
{#if cardClass !== null}
	<span class="icon">
		<ClassIcon {cardClass} />
	</span>
{/if}
<span class="amount" class:greyed={amount === 0}>
	{amount}
</span>

<style>
	.level {
		position: absolute;
		margin-top: 11px;
		font-size: 0.5em;
		user-select: none;
	}

	.icon {
		display: inline-block;
		width: 14px;
	}

	.amount {
		width: 18px;
		display: inline-block;
	}

	.greyed {
		color: rgb(171, 171, 171);
	}
</style>
