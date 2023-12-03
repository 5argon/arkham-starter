<script lang="ts">
	import { CardClass, classToBorderColorCss } from '$lib/design/interface/card-class'

	export let c1: CardClass | null
	export let c2: CardClass | null
	export let c3: CardClass | null
	export let cost: number | null
	$: costString = cost === -2 ? 'X' : cost?.toString() ?? ''
	$: borderColor = classToBorderColorCss(c1, c2, c3)
</script>

{#if cost !== null}
	<span class={'flex-outer ' + borderColor}>
		<span>
			{costString}
		</span>
	</span>
{/if}

<style>
	.flex-outer {
		display: flex;
		justify-content: center;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		text-align: center;
		user-select: none;
		font-size: x-small;
	}
</style>
