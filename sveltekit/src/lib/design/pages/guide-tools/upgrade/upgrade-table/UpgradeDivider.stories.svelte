<script lang="ts">
	import { EditingLevel } from '$lib/design/components/basic/TextBox.svelte'

	import Story from '$lib/design/story/story.svelte'
	import UpgradeDivider from './UpgradeDivider.svelte'

	let test: number = 0
</script>

<Story name="Try">
	<table style="width: 100%;">
		<tr>
			<UpgradeDivider text={'Sample'} xpCarryover={12} unlocked={false} />
		</tr>
	</table>
</Story>
