<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'

	import XpDistributionEach from './XpDistributionEach.svelte'
	export let topic: CardClass | string | null = null
	export let level1: number | null = null
	export let level2: number | null = null
	export let level3: number | null = null
	export let level4: number | null = null
	export let level5: number | null = null
	$: realTopic = typeof topic === 'string' ? null : topic
</script>

<span class="flex">
	{#if level1 !== null}
		<XpDistributionEach cardClass={realTopic} level={1} amount={level1} />
	{/if}
	{#if level2 !== null}
		<XpDistributionEach cardClass={realTopic} level={2} amount={level2} />
	{/if}
	{#if level3 !== null}
		<XpDistributionEach cardClass={realTopic} level={3} amount={level3} />
	{/if}
	{#if level4 !== null}
		<XpDistributionEach cardClass={realTopic} level={4} amount={level4} />
	{/if}
	{#if level5 !== null}
		<XpDistributionEach cardClass={realTopic} level={5} amount={level5} />
	{/if}
</span>
