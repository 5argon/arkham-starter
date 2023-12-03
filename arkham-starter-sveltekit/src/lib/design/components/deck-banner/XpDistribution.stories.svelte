<script>
	import { CardClass } from '$lib/core/card-class'

	import Story from '$lib/design/story/story.svelte'
	import XpDistribution from './XpDistribution.svelte'
</script>

<Story name={'Test'}>
	<XpDistribution topic={CardClass.Guardian} level1={10} level2={6} level3={1} />
</Story>
<Story name={'Test'}>
	<XpDistribution topic={CardClass.Seeker} level1={10} level2={6} level3={1} />
</Story>
<Story name={'Test'}>
	<XpDistribution topic={CardClass.Rogue} level1={10} level2={6} level3={1} />
</Story>
<Story name={'Test'}>
	<XpDistribution topic={CardClass.Mystic} level1={10} level2={6} level3={1} />
</Story>
<Story name={'Test'}>
	<XpDistribution topic={CardClass.Survivor} level1={10} level2={6} level3={1} />
</Story>
