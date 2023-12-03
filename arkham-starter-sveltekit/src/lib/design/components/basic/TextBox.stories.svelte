<script>
	import Story from '../../story/story.svelte'
	import TextBox, { NoticeLevel } from './TextBox.svelte'
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

<Story name="With notice nothing">
	<TextBox currentText={'Sample'} label="Show Notice" enableNotice submitButtonText="Submit" />
</Story>

<Story name="With notice normal">
	<TextBox
		currentText={'Sample'}
		label="Show Notice"
		enableNotice
		noticeText={'Hello World'}
		noticeLevel={NoticeLevel.Normal}
		submitButtonText="Submit"
	/>
</Story>

<Story name="With notice error">
	<TextBox
		currentText={'Sample'}
		label="Show Notice"
		enableNotice
		noticeText={'Hello World'}
		noticeLevel={NoticeLevel.Error}
		submitButtonText="Submit"
	/>
</Story>

<Story name="With notice success">
	<TextBox
		currentText={'Sample'}
		label="Show Notice"
		enableNotice
		noticeText={'Hello World'}
		noticeLevel={NoticeLevel.Success}
		submitButtonText="Submit"
	/>
</Story>

<Story name="With spinner">
	<TextBox
		currentText={'Sample'}
		label="Show Notice"
		enableNotice
		spinnerText={'Loading...'}
		submitButtonText="Submit"
	/>
</Story>
