<script lang="ts">
	import EditableCell from './editable-cell.svelte'
	export let text: string
	export let xpCarryover: number
	export let prefix: string
	export let suffix: string
	export let unlocked: boolean
	export let onChange: (n: string) => void
	export let onEndEdit: (n: string) => void

	function inputCommitHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onEndEdit(e.currentTarget.value)
	}

	function inputChangeHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onChange(e.currentTarget.value)
	}
</script>

<td colspan={6}>
	<input
		type="text"
		class="full-text-box"
		on:change={inputCommitHandler}
		on:input={inputChangeHandler}
		value={text}
	/>
</td>
<td />
<td>
	<EditableCell
		currentText={xpCarryover.toString()}
		prefixText={prefix}
		suffixText={suffix}
		disableEditing={false}
		smallBox={true}
		greyOutEditing={!unlocked}
		onChange={(e) => {}}
		onEndEdit={(e) => {}}
		rightAlign={true}
	/>
</td>

<style>
	.full-text-box {
		width: 99%;
		text-align: right;
	}
</style>
