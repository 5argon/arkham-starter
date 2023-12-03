<script>
	import Story from '../../story/story.svelte'
	import LimitedTab from './LimitedTab.svelte'
	import Tab from './LimitedTab.svelte'
</script>

<Story name="Test">
	<LimitedTab>
		<span slot="tab1">Tab 1</span>
		<span slot="tab2">Tab 2</span>
		<span slot="tab3">Tab 3</span>
		<span slot="content1">Content 1</span>
		<span slot="content2">Content 2</span>
		<span slot="content3">Content 3</span>
	</LimitedTab>
</Story>
