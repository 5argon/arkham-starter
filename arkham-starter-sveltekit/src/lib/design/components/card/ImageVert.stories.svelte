<script>
	import { CardClass } from '$lib/core/card-class'
import { CardPack } from '$lib/core/card-pack';

	import Story from '../../story/story.svelte'
	import ImageVert from './ImageVert.svelte'
</script>

<Story name="Test">
	<ImageVert cardId="01029" show class1={CardClass.Guardian} name="Shotgun" xp={4} />
</Story>

<Story name="Test Multi">
	<ImageVert
		cardId="08102"
		show
		class1={CardClass.Seeker}
		class2={CardClass.Mystic}
		name="Protecting the Anirniq"
		xp={2}
	/>
</Story>

<Story name="Test Multi">
	<ImageVert
		cardId="08102"
		show
		class1={CardClass.Seeker}
		class2={CardClass.Mystic}
		class3={CardClass.Survivor}
		packIcon={CardPack.EdgeOfTheEarth}
		packNumber={123}
		name="Protecting the Anirniq"
		xp={2}
	/>
</Story>
