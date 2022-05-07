<script lang="ts">
	import { EditingLevel } from '$lib/design/components/basic/TextBox.svelte'

	import Story from '$lib/design/story/story.svelte'
	import EditableNumberCell from './EditableNumberCell.svelte'

	let test: number = 0
</script>

<Story name="Try">
	<EditableNumberCell
		currentNumber={test}
		editingLevel={EditingLevel.Editable}
		onEndEdit={(n) => {
			test = n
		}}
	/>
</Story>

<Story name="Low number 1">
	<EditableNumberCell currentNumber={2} editingLevel={EditingLevel.Editable} />
</Story>

<Story name="Low number 2">
	<EditableNumberCell currentNumber={2} editingLevel={EditingLevel.GreyedOut} />
</Story>

<Story name="Low number 3">
	<EditableNumberCell currentNumber={2} editingLevel={EditingLevel.JustText} />
</Story>

<Story name="High number 1">
	<EditableNumberCell currentNumber={32} editingLevel={EditingLevel.Editable} />
</Story>

<Story name="High number 2">
	<EditableNumberCell currentNumber={32} editingLevel={EditingLevel.GreyedOut} />
</Story>

<Story name="High number 3">
	<EditableNumberCell currentNumber={32} editingLevel={EditingLevel.JustText} />
</Story>

<Story name="Negative number 1">
	<EditableNumberCell currentNumber={-4} editingLevel={EditingLevel.Editable} />
</Story>

<Story name="Negative number 2">
	<EditableNumberCell currentNumber={-4} editingLevel={EditingLevel.GreyedOut} />
</Story>

<Story name="Negative number 3">
	<EditableNumberCell currentNumber={-4} editingLevel={EditingLevel.JustText} />
</Story>

<Story name="Prefix">
	<EditableNumberCell currentNumber={12} prefixText="Cost" />
</Story>

<Story name="Suffix">
	<EditableNumberCell currentNumber={12} suffixText="XP" />
</Story>
