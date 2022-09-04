<script lang="ts">
	import FaIcon from '$lib/design/icons/FaIcon.svelte'

	export let checked: boolean
	export let label: string | null = null
	export let iconImagePath: string | null = null
	export let onCheckChanged: (n: boolean) => void = () => {
		// do nothing
	}
	function handler(e: Event & { currentTarget: HTMLInputElement }) {
		onCheckChanged(e.currentTarget.checked)
	}

	let beforeCss: string
	// $: beforeCss = '{::before { content: url(' + iconImagePath + ')}}'
</script>

<!-- <span>
	<input type="checkbox" {checked} on:change={handler} />
	{#if label !== null}
		<span class="label-span">{label}</span>
	{/if}
</span> -->

<label>
	<input
		type="checkbox"
		class={iconImagePath !== null ? 'hidden-for-icon' : ''}
		style={beforeCss}
		{checked}
		on:change={handler}
	/>{#if iconImagePath !== null}<FaIcon path={iconImagePath} />{:else if label !== null}<span
			class="label-span">{label}</span
		>{/if}
</label>

<style>
	.label-span {
		user-select: none;
	}
</style>
