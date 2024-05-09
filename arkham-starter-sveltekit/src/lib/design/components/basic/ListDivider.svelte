<script context="module" lang="ts">
	export enum ListDividerLevel {
		One,
		Two,
	}
</script>

<script lang="ts">
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'

	export let label: string
	export let level: ListDividerLevel = ListDividerLevel.One
</script>

<div class="outer">
	<div class={level === ListDividerLevel.One ? 'label-level-one' : 'label-level-two'}>
		{#if level === ListDividerLevel.One}
			<FaIcon path={allIcons.rightDouble} />
		{:else}
			<FaIcon path={allIcons.rightSingle} />
		{/if}
		{label}
	</div>
	<hr class={level === ListDividerLevel.One ? 'level-one' : 'level-two'} />
</div>

<style>
	.outer {
		margin: 8px 0px;
	}
	.label-level-one {
		font-weight: bold;
		color: #333;
	}

	.label-level-two {
		font-weight: normal;
		color: #666;
	}

	.level-one {
		border: 0;
		border-bottom: 1px dashed #ccc;
		background: #999;
	}

	.level-two {
		border: 0;
		height: 0;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}
</style>
