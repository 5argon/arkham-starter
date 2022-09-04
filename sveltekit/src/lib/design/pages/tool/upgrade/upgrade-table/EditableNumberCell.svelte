<script lang="ts">
	import { EditingLevel } from '$lib/design/components/basic/TextBox.svelte'
	export let currentNumber: number
	export let prefixText: string = ''
	export let suffixText: string = ''
	export let editingLevel: EditingLevel = EditingLevel.Editable
	export let onEndEdit: (n: number) => void = () => {
		// do nothing
	}

	function inputKeyboardHandler(e: KeyboardEvent & { currentTarget: HTMLInputElement }) {
		if (e.key === 'Enter') {
			e.currentTarget.blur()
			const parsed = parseInt(e.currentTarget.value, 10)
			if (!isNaN(parsed)) {
				onEndEdit(parsed)
			} else {
				onEndEdit(0)
			}
		}
	}

	function inputCommitHandler(e: Event & { currentTarget: HTMLInputElement }) {
		const parsed = parseInt(e.currentTarget.value, 10)
		if (!isNaN(parsed)) {
			onEndEdit(parsed)
		} else {
			onEndEdit(0)
		}
	}

	const rightAlignClass = 'right-align'
</script>

<span class="prefix-suffix">{prefixText}</span>{#if editingLevel === EditingLevel.JustText}<span
		class="arkham-number">{currentNumber}</span
	>{:else}<span
		><input
			disabled={editingLevel === EditingLevel.GreyedOut}
			class={'input-box-small' + ' ' + rightAlignClass + ' ' + 'arkham-number'}
			type="text"
			on:change={inputCommitHandler}
			on:keyup={inputKeyboardHandler}
			value={currentNumber}
		/>
	</span>{/if}<span class="prefix-suffix">{suffixText}</span>

<style>
	.arkham-number {
		font-family: 'ArkhamNumber';
	}

	.prefix-suffix {
		font-size: x-small;
		color: rgba(1, 1, 1, 0.2);
		margin: 0px 2px;
		user-select: none;
	}

	.input-box-small {
		width: 20px;
	}

	.right-align {
		text-align: right;
	}
</style>
