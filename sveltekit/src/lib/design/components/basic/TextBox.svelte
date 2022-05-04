<script context="module" lang="ts">
	export enum EditingLevel {
		Editable,
		GreyedOut,
		JustText,
	}
</script>

<script lang="ts">
	import Button from './Button.svelte'

	export let currentText: string
	export let label: string | null = null
	export let placeholderText: string = ''
	export let rightAlign: boolean = false
	export let editingLevel: EditingLevel = EditingLevel.Editable
	export let working: boolean = false
	export let endEditAsSubmit: boolean = false
	export let submitButtonText: string | null = null
	export let onChange: (n: string) => void = () => {
		// do nothing
	}
	export let onEndEdit: (n: string) => void = () => {
		// do nothing
	}
	export let onSubmit: (n: string) => void = () => {
		// do nothing
	}

	function inputCommitHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onEndEdit(e.currentTarget.value)
		if (endEditAsSubmit) {
			onSubmit(e.currentTarget.value)
		}
	}

	function inputChangeHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onChange(e.currentTarget.value)
	}

	$: rightAlignClass = rightAlign ? 'right-align' : ''
</script>

{#if label !== null}
	<div class="label">{label}</div>
{/if}
<div class="outer-flex">
	{#if editingLevel === EditingLevel.JustText}
		<div>{currentText}</div>
	{:else}
		<input
			disabled={working || editingLevel === EditingLevel.GreyedOut}
			class={'text-box-input' + ' ' + rightAlignClass}
			type="text"
			placeholder={placeholderText}
			on:change={inputCommitHandler}
			on:input={inputChangeHandler}
			value={currentText}
		/>
	{/if}
	{#if submitButtonText !== null}
		<Button label={submitButtonText} onClick={() => onSubmit(currentText)} />
	{/if}
</div>

<style>
	.label {
		font-weight: bold;
	}

	.outer-flex {
		display: flex;
	}
	.text-box-input {
		width: 100%;
	}
	.prefix-suffix {
		font-size: 0.7em;
		color: rgba(1, 1, 1, 0.2);
	}

	.input-box {
		width: 200px;
	}

	.input-box-small {
		width: 20px;
	}

	.right-align {
		text-align: right;
	}
</style>
