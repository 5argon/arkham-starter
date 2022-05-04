<script>
	import Story from '$lib/design/story/story.svelte'
	import CardBlockUpDown from './CardBlockUpDown.svelte'
	import { CardClass } from '$lib/core/card-class'
</script>

<Story name="Test">
	<CardBlockUpDown
		text={'Sample Card'}
		class1={CardClass.Rogue}
		class2={null}
		class3={null}
		exceptional={false}
		xp={5}
		xpTaboo={2}
	/>
</Story>
