<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'
	import { classToBorderColorCss } from '$lib/design/interface/card-class'

	export let title: string
	export let cardClass: CardClass

	let borderColorClass: string
	$: {
		borderColorClass = classToBorderColorCss(cardClass, null, null)
	}
</script>

<div>
	<span class={'title ' + borderColorClass + ' ' + (title === '' ? 'hide-title' : '')}>
		{title}
	</span>
	<span class="slot">
		<slot />
	</span>
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin: 2px 0px;
	}

	.title {
		font-size: x-small;
		font-weight: bold;
		border-style: solid;
		width: 97px;
		border-width: 0px 0px 1px 0px;
	}

	.hide-title {
		border-width: 0px;
	}

	.slot {
		flex: auto;
		padding: 0px 4px;
	}
</style>
