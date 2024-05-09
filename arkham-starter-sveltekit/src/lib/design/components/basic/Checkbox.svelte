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

<span>
	<span class="slot-span">
		<label>
			<input
				type="checkbox"
				class={iconImagePath !== null ? 'hidden-for-icon' : ''}
				style={beforeCss}
				{checked}
				on:change={handler}
			/>
			<span class="slot-span">
				<slot
					>{#if iconImagePath !== null}<FaIcon path={iconImagePath} />{:else if label !== null}<span
							class="label-span">{label}</span
						>{/if}</slot
				>
			</span>
		</label>
	</span>
</span>

<style>
	.label-span {
		user-select: none;
	}

	label {
		padding: 2px 4px;
		margin: 2px 4px;
		border-width: 1px;
		border-style: solid;
		border-radius: 2px;
		display: inline-flex;
		justify-content: center;
		border-color: rgba(0, 0, 0, 0.1);
	}

	label:hover {
		border-color: rgba(0, 0, 0, 0.3);
	}

	label:active {
		border-color: rgba(0, 0, 0, 0.5);
	}

	input {
		margin-right: 8px;
	}

	.slot-span {
		display: inline-flex;
		justify-content: center;
		user-select: none;
	}
</style>
