<script context="module" lang="ts">
	import type { SvelteComponent } from 'svelte'
	export interface ListItem {
		title: SvelteComponent
		content: SvelteComponent
	}
</script>

<script lang="ts">
	export let active: number = 0
	export let hide1 = false
	export let hide2 = false
	export let hide3 = false
	export let hide4 = false
	export let hide5 = false
	export let hide6 = false
	export let onChangeActive: (i: number) => void = () => {
		// do nothing
	}
	function handler(index: number) {
		active = index
		onChangeActive(index)
	}
</script>

<ul>
	{#if $$slots.tab1 && $$slots.content1 && !hide1}
		<li
			class="limited-tab-hack"
			class:inactive={active !== 0}
			on:click={() => {
				handler(0)
			}}
		>
			<slot name="tab1" />
		</li>
	{/if}
	{#if $$slots.tab2 && $$slots.content2 && !hide2}
		<li
			class="limited-tab-hack"
			class:inactive={active !== 1}
			on:click={() => {
				handler(1)
			}}
		>
			<slot name="tab2" />
		</li>
	{/if}
	{#if $$slots.tab3 && $$slots.content3 && !hide3}
		<li
			class="limited-tab-hack"
			class:inactive={active !== 2}
			on:click={() => {
				handler(2)
			}}
		>
			<slot name="tab3" />
		</li>
	{/if}
	{#if $$slots.tab4 && $$slots.content4 && !hide4}
		<li
			class="limited-tab-hack"
			class:inactive={active !== 3}
			on:click={() => {
				handler(3)
			}}
		>
			<slot name="tab4" />
		</li>
	{/if}
	{#if $$slots.tab5 && $$slots.content5 && !hide5}
		<li
			class="limited-tab-hack"
			class:inactive={active !== 4}
			on:click={() => {
				handler(4)
			}}
		>
			<slot name="tab5" />
		</li>
	{/if}
	{#if $$slots.tab6 && $$slots.content6 && !hide6}
		<li
			class="limited-tab-hack"
			class:inactive={active !== 5}
			on:click={() => {
				handler(5)
			}}
		>
			<slot name="tab6" />
		</li>
	{/if}
</ul>

<div class="content">
	{#if active === 0 && $$slots.content1}<slot name="content1" />{/if}
	{#if active === 1 && $$slots.content2}<slot name="content2" />{/if}
	{#if active === 2 && $$slots.content3}<slot name="content3" />{/if}
	{#if active === 3 && $$slots.content4}<slot name="content4" />{/if}
	{#if active === 4 && $$slots.content5}<slot name="content5" />{/if}
	{#if active === 5 && $$slots.content6}<slot name="content6" />{/if}
</div>

<style>
	ul {
		display: flex;
		padding: 0;
		margin: 0;
	}

	li {
		margin: 0 1px;
		list-style: none;
		cursor: pointer;
		user-select: none;
		border-top: 1px solid black;
		border-left: 1px solid black;
		border-right: 1px solid black;
		border-radius: 4px 4px 0px 0px;
		padding: 4px 8px;
	}

	li div:empty {
		display: none;
	}

	.inactive {
		background-color: rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid black;
	}

	.content {
		padding: 8px 0px;
	}
</style>
