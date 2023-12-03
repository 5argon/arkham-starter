<script>
	import Story from '../../story/story.svelte'
	import ListDivider, { ListDividerLevel } from './ListDivider.svelte'
</script>

<Story name="Level 1">
	<ListDivider label="Something" level={ListDividerLevel.One} />
</Story>

<Story name="Level 2">
	<ListDivider label="Something" level={ListDividerLevel.Two} />
</Story>
