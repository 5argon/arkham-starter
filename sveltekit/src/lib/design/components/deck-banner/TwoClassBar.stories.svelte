<script>
	import { CardClass } from '$lib/core/card-class'

	import Story from '$lib/design/story/story.svelte'
	import TwoClassBar from './TwoClassBar.svelte'
</script>

<Story name={'Test'}>
	<TwoClassBar
		class1={CardClass.Guardian}
		class2={CardClass.Seeker}
		class1Amount={19}
		class2Amount={7}
		neutralAmount={5}
	/>
</Story>
