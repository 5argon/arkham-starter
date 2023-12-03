<script>
	import Story from '$lib/design/story/story.svelte'
	import ParallelInfo from './ParallelInfo.svelte'
</script>

<Story name={'FB'}>
	<ParallelInfo front back />
</Story>
<Story name={'F'}>
	<ParallelInfo front />
</Story>
<Story name={'B'}>
	<ParallelInfo back />
</Story>
<Story name={'None'}>
	<ParallelInfo />
</Story>