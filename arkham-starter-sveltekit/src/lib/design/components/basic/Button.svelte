<script lang="ts">
	export let label: string
	export let onClick: () => void
	export let block: boolean = false
	export let big: boolean = false
	export let center: boolean = false
	export let labelAfterSlot: boolean = false
	export let disabled: boolean = false
</script>

<!-- <input type="button" class="button-span" value={label} on:click={onClick} /> -->
<button
	type="button"
	{disabled}
	class={(center ? 'center' : '') +
		' ' +
		'content-flex' +
		' ' +
		(block ? 'button-block' : 'button-span') +
		' ' +
		(big ? 'big' : '')}
	title={label}
	on:click={onClick}
>
	<span class:greyout={disabled}><slot>{label}</slot></span>
	{#if labelAfterSlot}
		{label}
	{/if}
</button>

<style>
	.center {
		justify-content: center;
	}

	.content-flex {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
	}

	.big {
		height: 32px;
	}

	.button-span {
		display: inline-flex;
		margin: 2px 2px;
		padding: 2px 4px;
	}

	.button-block {
		display: flex;
		width: calc(100% - 4px);
		margin: 2px 2px;
		padding: 2px 4px;
	}

	.greyout {
		opacity: 0.2;
	}
</style>
