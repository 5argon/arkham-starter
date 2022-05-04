<script>
	import Story from '../../story/story.svelte'
	import TextBox from './TextBox.svelte'
</script>

<Story name="Simple">
	<TextBox currentText={'Sample'} placeholderText={'Should not show this'} />
</Story>

<Story name="Label">
	<TextBox currentText={'Sample'} label="Label of the box" />
</Story>

<Story name="Placeholder">
	<TextBox currentText={''} placeholderText={'Should show this'} />
</Story>

<Story name="Submit button">
	<TextBox currentText={'Sample'} label="Has submit button" submitButtonText="Submit" />
</Story>
