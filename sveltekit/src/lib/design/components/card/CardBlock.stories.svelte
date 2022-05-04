<script>
	import { CardPackIcon } from '$lib/design/interface/card-pack'

	import { CardClass } from '../../interface/card-class'
	import Story from '../../story/story.svelte'
	import CardBlock from './CardBlock.svelte'
	import UnknownCardBlock from './UnknownCardBlock.svelte'
</script>

<Story name="Block stacking">
	<CardBlock
		text={'Sample Card'}
		class1={CardClass.Mystic}
		class2={CardClass.Survivor}
		class3={null}
		exceptional={true}
		xp={1}
		xpTaboo={3}
		packIcon={CardPackIcon.HarveyWalters}
		packNumber={94}
	/>
	<CardBlock
		text={'Sample Card'}
		class1={CardClass.Mystic}
		class2={CardClass.Survivor}
		class3={null}
		exceptional={true}
		xp={1}
		xpTaboo={3}
		packIcon={CardPackIcon.HarveyWalters}
		packNumber={94}
	/>
	<CardBlock
		text={'Sample Card'}
		class1={CardClass.Mystic}
		class2={CardClass.Survivor}
		class3={null}
		exceptional={true}
		xp={1}
		xpTaboo={3}
		packIcon={CardPackIcon.HarveyWalters}
		packNumber={94}
	/>
</Story>

<Story name="With buttons">
	<CardBlock
		text={'Sample Card'}
		class1={CardClass.Guardian}
		class2={CardClass.Rogue}
		class3={null}
		exceptional={true}
		xp={2}
		xpTaboo={1}
		packIcon={CardPackIcon.EdgeOfTheEarth}
		packNumber={178}
		leftButtons={[
			{
				label: 'A',
				onClick: () => {
					// do nothing
				},
			},
		]}
		rightButtons={[
			{
				label: 'A',
				onClick: () => {
					// do nothing
				},
			},
			{
				label: 'B',
				onClick: () => {
					// do nothing
				},
			},
		]}
	/>
</Story>

<Story name="Unknown">
	<UnknownCardBlock cardId={12345}/>
</Story>
