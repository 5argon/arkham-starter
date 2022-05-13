<script context="module" lang="ts">
	export interface RadioChoice {
		label: string
		value: string
	}
</script>

<script lang="ts">
	export let radioId: string
	export let label: string
	export let current: string
	export let choices: RadioChoice[]
	export let onValueChanged: (n: string) => void
	$: selectedIndex = choices.findIndex((x) => x.value === current)

	function onChangeHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onValueChanged(e.currentTarget.value)
	}
</script>

<fieldset>
	<legend>{label}</legend>

	{#each choices as c, i}
		<div>
			<input
				type="radio"
				id={c.value}
				name={radioId}
				value={c.value}
				checked={i === selectedIndex}
				on:change={onChangeHandler}
			/>
			<label for={c.value}>{c.label}</label>
		</div>
	{/each}
</fieldset>
