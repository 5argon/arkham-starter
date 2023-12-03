<script>
	import Story from '../../story/story.svelte'
	import BigRightSider from './BigRightSider.svelte'
</script>

<Story name="Viewing Right">
	<BigRightSider viewingLeft={false}>
		<div class="left-test" slot="left">Left</div>
		<div class="right-test" slot="right">Right</div>
	</BigRightSider>
</Story>

<Story name="Viewing Left">
	<BigRightSider viewingLeft={true}>
		<div class="left-test" slot="left">Left</div>
		<div class="right-test" slot="right">Right</div>
	</BigRightSider>
</Story>
