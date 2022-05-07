<script lang="ts">
	import TextBox, { EditingLevel } from '$lib/design/components/basic/TextBox.svelte'
	import CardBlockButton from '$lib/design/components/card/CardBlockButton.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'

	import EditableNumberCell from './EditableNumberCell.svelte'
	export let text: string
	export let xpCarryover: number
	export let calculatedXpCarryover: number
	export let unlocked: boolean
	export let onTextChanged: (n: string) => void = () => {
		// do nothing
	}
	export let onXpCarryoverChanged: (n: number) => void = () => {
		// do nothing
	}
	export let onDelete: () => void = () => {
		// do nothing
	}

	$: showXp = unlocked ? xpCarryover : calculatedXpCarryover
</script>

<div class="flex-box">
	<div class="flex-item flex-text">
		<TextBox rightAlign currentText={text} onChange={onTextChanged} />
	</div>
	<div class="flex-item">
		<CardBlockButton label="Move Row Down" iconPath={allIcons.delete} onClick={onDelete} />
	</div>
	<div class="flex-item">
		<EditableNumberCell
			currentNumber={showXp}
			suffixText={'XP'}
			editingLevel={unlocked ? EditingLevel.Editable : EditingLevel.GreyedOut}
			onEndEdit={onXpCarryoverChanged}
		/>
	</div>
</div>

<style>
	.flex-box {
		display: flex;
		align-items: center;
	}

	.flex-text {
		flex: 1;
	}
</style>
