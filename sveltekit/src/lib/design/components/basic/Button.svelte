<script context="module" lang="ts">
	export interface ButtonProp {
		label: string
		onClick: () => void
	}
</script>

<script lang="ts">
	export let label: string
	export let onClick: () => void
</script>

<!-- <input type="button" class="button-span" value={label} on:click={onClick} /> -->
<button type="button" class="button-span" title={label} on:click={onClick}
	><slot>{label}</slot></button
>

<style>
	.button-span {
		display: inline-flex;
		margin: 0px 2px;
		padding: 4px 4px;
	}
</style>
