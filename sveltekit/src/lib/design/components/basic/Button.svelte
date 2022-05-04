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

<input type="button" class="button-span" value={label} on:click={onClick} />

<style>
	.button-span {
		margin: 0px 2px;
	}
</style>
