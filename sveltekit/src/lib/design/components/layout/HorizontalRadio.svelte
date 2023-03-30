<script lang="ts">
	export let title: string = ''
	export let items: {
		text: string
		icon?: string | undefined
	}[]
	export let selectedIndex: number
	export let onSelectedIndexChanged: (newIndex: number) => void

	export let handleClick: (i: number) => void = (i) => {
		onSelectedIndexChanged(i)
	}
</script>

<div class="title">{title}</div>
<div class="flex">
	{#each items as item, i}
		<div class="flex-item" class:selected={i === selectedIndex} on:click={() => handleClick(i)}>
			{item.text}
		</div>
	{/each}
</div>

<style>
	.title {
		font-weight: bold;
		padding-right: 8px;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.selected {
		background-color: red;
	}

	.flex-item {
		flex: initial;
		padding: 4px 8px;
		cursor: pointer;
	}
</style>
