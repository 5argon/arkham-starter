<script>
	import { allIcons } from '$lib/design/icons/all-icons'

	import Story from '../../story/story.svelte'
	import Checkbox from './Checkbox.svelte'
</script>

<Story name="Not checked">
	<Checkbox checked={false} />
</Story>

<Story name="Checked">
	<Checkbox checked={true} />
</Story>

<Story name="Label not checked">
	<Checkbox label="With Label" checked={false} />
</Story>

<Story name="Label checked">
	<Checkbox label="With Label" checked={true} />
</Story>

<Story name="Icon not checked">
	<Checkbox label="With Label" iconImagePath={allIcons.unlock} checked={false} />
</Story>

<Story name="Icon checked">
	<Checkbox label="With Label" iconImagePath={allIcons.unlock} checked={true} />
</Story>
