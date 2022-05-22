<script>
	import { CardPackIcon } from '$lib/design/interface/card-pack'

	import { CardClass } from '../../interface/card-class'
	import Story from '../../story/story.svelte'
	import CardSpan from './CardSpan.svelte'
	import UnknownCardSpan from './UnknownCardSpan.svelte'
</script>

<Story name="No amount">
	<CardSpan
		cardId="12345"
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
		cardId="12345"
		amount={2}
		text={'Neutral Card'}
		class1={CardClass.Neutral}
		color={true}
	/>
</Story>

<Story name="Guardian">
	<CardSpan
		cardId="12345"
		amount={2}
		text={'Guardian Card'}
		class1={CardClass.Guardian}
		xpTaboo={null}
		color={true}
	/>
</Story>

<Story name="Seeker">
	<CardSpan cardId="12345" amount={2} text={'Seeker Card'} class1={CardClass.Seeker} color={true} />
</Story>

<Story name="Rogue">
	<CardSpan cardId="12345" amount={2} text={'Rogue Card'} class1={CardClass.Rogue} color={true} />
</Story>

<Story name="Mystic">
	<CardSpan cardId="12345" amount={2} text={'Mystic Card'} class1={CardClass.Mystic} color={true} />
</Story>

<Story name="Survivor">
	<CardSpan
		cardId="12345"
		amount={2}
		text={'Survivor Card'}
		class1={CardClass.Survivor}
		color={true}
	/>
</Story>

<Story name="Two classes">
	<CardSpan
		cardId="12345"
		amount={2}
		text={'Two Classes Card'}
		class1={CardClass.Guardian}
		class2={CardClass.Rogue}
		color={true}
	/>
</Story>

<Story name="Three classes">
	<CardSpan
		cardId="12345"
		amount={2}
		text={'Three Classes Card'}
		class1={CardClass.Guardian}
		class2={CardClass.Rogue}
		class3={CardClass.Survivor}
		color={true}
	/>
</Story>

<Story name="No color">
	<CardSpan
		cardId="12345"
		amount={2}
		text={'No Color'}
		class1={CardClass.Guardian}
		class2={CardClass.Rogue}
		class3={CardClass.Survivor}
	/>
</Story>

<Story name="XP">
	<CardSpan
		cardId="12345"
		text={'XP Test'}
		class1={CardClass.Guardian}
		color={true}
		xp={4}
		xpTaboo={2}
		exceptional={true}
	/>
</Story>

<Story name="Pack">
	<CardSpan
		cardId="12345"
		text={'From Edge of the Earth'}
		class1={CardClass.Guardian}
		color={true}
		packIcon={CardPackIcon.EdgeOfTheEarth}
		packNumber={123}
	/>
</Story>

<Story name="Restriction">
	<CardSpan
		cardId="12345"
		text={'Greed'}
		class1={CardClass.Neutral}
		restriction={true}
		packIcon={CardPackIcon.EdgeOfTheEarth}
		packNumber={123}
	/>
</Story>

<Story name="Unknown">
	<UnknownCardSpan cardId={'12345'} />
</Story>
