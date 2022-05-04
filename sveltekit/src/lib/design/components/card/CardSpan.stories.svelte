<script>
	import { CardClass } from '../../interface/card-class'
	import Story from '../../story/story.svelte'
	import CardSpan from './CardSpan.svelte'
</script>

<Story name="No amount">
	<CardSpan
		amount={null}
		text={'No amount'}
		class1={CardClass.Neutral}
		class2={null}
		class3={null}
		exceptional={false}
		xp={0}
		xpTaboo={null}
	/>
</Story>

<Story name="Neutral">
	<CardSpan
		amount={2}
		text={'Neutral Card'}
		class1={CardClass.Neutral}
		color={true}
	/>
</Story>

<Story name="Guardian">
	<CardSpan
		amount={2}
		text={'Guardian Card'}
		class1={CardClass.Guardian}
		xpTaboo={null}
		color={true}
	/>
</Story>

<Story name="Seeker">
	<CardSpan
		amount={2}
		text={'Seeker Card'}
		class1={CardClass.Seeker}
		color={true}
	/>
</Story>

<Story name="Rogue">
	<CardSpan
		amount={2}
		text={'Rogue Card'}
		class1={CardClass.Rogue}
		color={true}
	/>
</Story>

<Story name="Mystic">
	<CardSpan
		amount={2}
		text={'Mystic Card'}
		class1={CardClass.Mystic}
		color={true}
	/>
</Story>

<Story name="Survivor">
	<CardSpan
		amount={2}
		text={'Survivor Card'}
		class1={CardClass.Survivor}
		color={true}
	/>
</Story>

<Story name="Two classes">
	<CardSpan
		amount={2}
		text={'Two Classes Card'}
		class1={CardClass.Guardian}
		class2={CardClass.Rogue}
		color={true}
	/>
</Story>

<Story name="Three classes">
	<CardSpan
		amount={2}
		text={'Three Classes Card'}
		class1={CardClass.Guardian}
		class2={CardClass.Rogue}
		class3={CardClass.Survivor}
		color={true}
	/>
</Story>

<Story name="XP">
	<CardSpan
		text={'XP Test'}
		class1={CardClass.Guardian}
		color={true}
		xp={4}
		xpTaboo={2}
		exceptional={true}
	/>
</Story>