<script>
	import { CardClass } from '$lib/core/card-class'

	import { CardPack } from '$lib/core/card-pack'

	import { DeckBadge } from '$lib/core/deck-badge'

	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import Story from '$lib/design/story/story.svelte'
	import DeckBanner from './DeckBanner.svelte'
	const fpdb = fetchPopupDatabase()
</script>

{#await fpdb then pdb}
	<Story name={'Normal Roland'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.Core}
			packs={[CardPack.RevisedCoreSet]}
			deckName={'Normal Roland'}
			investigatorCode="01001"
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Guardian, amount: 18 },
					{ item: CardClass.Neutral, amount: 5 },
					{ item: CardClass.Seeker, amount: 7 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Guardian,
					level1: 10,
					level2: 6,
					level3: 0,
					level4: 2,
					level5: 0,
				},
				{
					title: '',
					item: CardClass.Seeker,
					level1: 0,
					level2: 2,
				},
			]}
			previewCards={['01016', '01017', '01018']}
		/>
	</Story>

	<Story name={'Parallel Front Roland'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.Core}
			packs={[CardPack.RevisedCoreSet]}
			deckName={'Parallel Front Roland'}
			investigatorCode="01001"
			parallelFront
			previewCards={['01016', '01017', '01018']}
			chosenCards={[{ title: 'Directive', cards: ['90025', '90026', '90027'] }]}
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Guardian, amount: 18 },
					{ item: CardClass.Neutral, amount: 5 },
					{ item: CardClass.Seeker, amount: 7 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Guardian,
					level1: 10,
					level2: 6,
					level3: 0,
					level4: 2,
					level5: 0,
				},
				{
					title: '',
					item: CardClass.Seeker,
					level1: 0,
					level2: 2,
				},
			]}
		/>
	</Story>

	<Story name={'Parallel Back Roland'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.ThePathToCarcosa]}
			deckName={'Parallel Back Roland'}
			investigatorCode="01001"
			parallelBack
			previewCards={['03038', '03264', '03158']}
			chosenCards={[
				{ title: 'Insight (6)', cards: ['03150', '03108', '01564', '03191', '03196', '01537'] },
				{ title: 'Tactic (3)', cards: ['03232', '03152', '03038'] },
			]}
		/>
	</Story>

	<Story name={'Parallel Roland'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.ThePathToCarcosa]}
			deckName={'Parallel Roland'}
			investigatorCode="01001"
			parallelFront
			parallelBack
			previewCards={['03038', '03264', '03158']}
			chosenCards={[
				{ title: 'Directive', cards: ['90025', '90026', '90027'] },
				{ title: 'Insight (6)', cards: ['03150', '03108', '01564', '03191', '03196', '01537'] },
				{ title: 'Tactic (3)', cards: ['03232', '03152', '03038'] },
			]}
		/>
	</Story>

	<Story name={'Normal Daisy'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.TwoEx}
			packs={[CardPack.TheDunwichLegacy, CardPack.EdgeOfTheEarth]}
			deckName={'Normal Daisy'}
			investigatorCode="01002"
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Seeker, amount: 13 },
					{ item: CardClass.Neutral, amount: 7 },
					{ item: CardClass.Mystic, amount: 10 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Seeker,
					level1: 0,
					level2: 4,
					level3: 1,
					level4: 0,
					level5: 0,
				},
				{
					title: '',
					item: CardClass.Mystic,
					level1: 6,
					level2: 4,
				},
			]}
			previewCards={['08066', '08064', '02232']}
			chosenCards={[{ title: 'Tome (3)', cards: ['01542', '01686', '01531'] }]}
		/>
	</Story>

	<Story name={'Parallel Front Daisy'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.TwoEx}
			packs={[CardPack.TheDunwichLegacy, CardPack.EdgeOfTheEarth]}
			deckName={'Parallel Front Daisy'}
			parallelFront
			investigatorCode="01002"
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Seeker, amount: 13 },
					{ item: CardClass.Neutral, amount: 7 },
					{ item: CardClass.Mystic, amount: 10 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Seeker,
					level1: 0,
					level2: 4,
					level3: 1,
					level4: 0,
					level5: 0,
				},
				{
					title: '',
					item: CardClass.Mystic,
					level1: 6,
					level2: 4,
				},
			]}
			previewCards={['08066', '08064', '02232']}
			chosenCards={[{ title: 'Tome (3)', cards: ['01542', '01686', '01531'] }]}
		/>
	</Story>

	<Story name={'Parallel Back Daisy'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Parallel Back Daisy'}
			investigatorCode="01002"
			parallelBack
			previewCards={['08045', '01516', '08040']}
			chosenCards={[
				{ title: 'Splash', cards: ['01516', '01516', '01525', '01525', '01559'] },
				{ title: 'Tome (4)', cards: ['08045', '01542', '01535'] },
			]}
		/>
	</Story>

	<Story name={'Parallel Daisy'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Parallel Daisy'}
			investigatorCode="01002"
			parallelFront
			parallelBack
			previewCards={['08045', '01516', '08040']}
			chosenCards={[
				{ title: 'Splash', cards: ['01516', '01516', '01525', '01525', '01559'] },
				{ title: 'Tome (4)', cards: ['08045', '01542', '01535'] },
			]}
		/>
	</Story>

	<Story name={'Normal Skids'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.ThePathToCarcosa]}
			deckName={'Normal Skids'}
			investigatorCode="01003"
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Rogue, amount: 17 },
					{ item: CardClass.Neutral, amount: 12 },
					{ item: CardClass.Guardian, amount: 4 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Rogue,
					level1: 0,
					level2: 12,
					level3: 0,
					level4: 0,
					level5: 1,
				},
				{
					title: '',
					item: CardClass.Guardian,
					level1: 3,
					level2: 5,
				},
			]}
			previewCards={['03028', '03195', '03151']}
		/>
	</Story>

	<Story name={'Parallel Front Skids'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.ThePathToCarcosa]}
			deckName={'Parallel Front Skids'}
			parallelFront
			investigatorCode="01003"
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Rogue, amount: 17 },
					{ item: CardClass.Neutral, amount: 12 },
					{ item: CardClass.Guardian, amount: 4 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Rogue,
					level1: 0,
					level2: 12,
					level3: 0,
					level4: 0,
					level5: 1,
				},
				{
					title: '',
					item: CardClass.Guardian,
					level1: 3,
					level2: 5,
				},
			]}
			previewCards={['03028', '03195', '03151']}
		/>
	</Story>

	<Story name={'Parallel Back Skids'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Parallel Back Skids'}
			parallelBack
			investigatorCode="01003"
			previewCards={['08046', '08053', '08114']}
			chosenCards={[
				{ title: 'Fortune (3)', cards: ['01580', '01579', '08112'] },
				{ title: 'Gambit (1)', cards: ['08054'] },
				{ title: 'Upgrade (2)', cards: ['01584', '60528'] },
			]}
		/>
	</Story>

	<Story name={'Parallel Skids'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Parallel Skids'}
			parallelFront
			parallelBack
			investigatorCode="01003"
			previewCards={['08046', '08053', '08114']}
			chosenCards={[
				{ title: 'Fortune (3)', cards: ['01580', '01579', '08112'] },
				{ title: 'Gambit (1)', cards: ['08054'] },
				{ title: 'Upgrades (2)', cards: ['01584', '60528'] },
			]}
		/>
	</Story>

	<Story name={'Normal Agnes'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Normal Agnes'}
			investigatorCode="01004"
			previewCards={['08118', '01569', '08120']}
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Mystic, amount: 13 },
					{ item: CardClass.Neutral, amount: 9 },
					{ item: CardClass.Survivor, amount: 8 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Mystic,
					level1: 1,
					level2: 7,
					level3: 2,
					level4: 2,
					level5: 0,
				},
				{
					title: '',
					item: CardClass.Survivor,
					level1: 0,
					level2: 2,
				},
			]}
		/>
	</Story>

	<Story name={'Parallel Front Agnes'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			deckBadge={DeckBadge.OneEx}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Parallel Front Agnes'}
			parallelFront
			investigatorCode="01004"
			previewCards={['08118', '01569', '08120']}
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Mystic, amount: 13 },
					{ item: CardClass.Neutral, amount: 9 },
					{ item: CardClass.Survivor, amount: 8 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Mystic,
					level1: 1,
					level2: 7,
					level3: 2,
					level4: 2,
					level5: 0,
				},
				{
					title: '',
					item: CardClass.Survivor,
					level1: 0,
					level2: 2,
				},
			]}
			chosenCards={[
				{ title: 'Spell Event (7)', cards: ['01569', '01568', '08110', '01565', '08108', '01566'] },
			]}
		/>
	</Story>
{/await}
