<script lang="ts">
	import type { Tree } from './storybook-states';
	import TreeFoldout from './TreeFoldout.svelte';
	import TreeStory from './TreeStory.svelte';
	export let tree: Tree;
	export let level: number;
	export let path: string[];
	export let navigatorOffset: number;
</script>

{#if tree !== undefined}
	{#each Object.entries(tree) as [k, v]}
		{#if v !== null}
			<TreeFoldout text={k} level={level + 1} {navigatorOffset} />
			<svelte:self tree={v} level={level + 1} path={[...path, k]} {navigatorOffset} />
		{:else}
			<TreeStory text={k} level={level + 1} path={[...path, k]} {navigatorOffset} />
		{/if}
	{/each}
{/if}
