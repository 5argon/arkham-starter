<script lang="ts">
	import TreeRecursive from '../storybook/TreeRecursive.svelte';
	import type { Tree } from './storybook-states';
	export let tree: Tree;
	export let navigatorOffset: number;
</script>

<div class="full-screen">
	<div class="flex-layout">
		<div class="tree-menu">
			<TreeRecursive {tree} level={-1} path={['storybook']} {navigatorOffset} />
		</div>
		<div class="stories">
			<slot />
		</div>
	</div>
</div>

<style>
	.full-screen {
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
	}

	.flex-layout {
		display: flex;
		height: 100%;
	}

	.tree-menu {
		flex: 1;
		margin:1em;
		padding-top: 1em;
		padding-left: 1em;
		border: 1px solid black;
	}

	.stories {
		padding: 18px;
		flex: 4;
	}
</style>
