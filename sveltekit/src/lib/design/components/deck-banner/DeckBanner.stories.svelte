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
	<Story name={'Compact'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[]}
			link={'https://arkhamdb.com/user/profile/61394/5argon'}
			deckName={'Compact Rendering'}
			investigatorCode="01001"
			compact
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
	<Story name={'Compact 2'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			seriesName="R.Core Starter Decks Mk II"
			seriesUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[]}
			deckName={'Vertically Expanded Compact Rendering'}
			investigatorCode="01001"
			compact
			parallelBack
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
	<Story name={'Non-Starter Deck'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[
				CardPack.TheDunwichLegacy,
				CardPack.ThePathToCarcosa,
				CardPack.HarveyWalters,
				CardPack.TheInnsmouthConspiracy,
				CardPack.ReturnToTheForgottenAge,
			]}
			deckName={'Non-Starter Deck'}
			investigatorCode="01001"
			compact
			parallelBack
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
	<Story name={'Using Starter'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheDunwichLegacy, CardPack.ThePathToCarcosa, CardPack.StellaClark]}
			deckName={'Using Starter'}
			investigatorCode="01001"
			compact
			parallelBack
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
	<Story name={'Normal Roland'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[]}
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
			packs={[]}
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
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Parallel Skids'}
			parallelFront
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

	<Story name={'Normal Agnes'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
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

	<Story name={'Parallel Back Agnes'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.ThePathToCarcosa]}
			deckName={'Parallel Back Agnes'}
			parallelBack
			investigatorCode="01004"
			previewCards={['03035', '03193', '03312']}
			chosenCards={[
				{ title: 'Occult (2)', cards: ['03025'] },
				{ title: 'Spell Upgrade (4)', cards: ['01569', '03270'] },
			]}
		/>
	</Story>

	<Story name={'Parallel Agnes'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.ThePathToCarcosa]}
			deckName={'Parallel Agnes'}
			parallelFront
			parallelBack
			investigatorCode="01004"
			previewCards={['03035', '03193', '03312']}
			chosenCards={[
				{ title: 'Spell Event (8)', cards: ['01569', '03270', '01566', '01565'] },
				{ title: 'Occult (2)', cards: ['03025'] },
				{ title: 'Spell Upgrade (4)', cards: ['01569', '03270'] },
			]}
		/>
	</Story>

	<Story name={'Normal Wendy'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Normal Wendy'}
			investigatorCode="01005"
			previewCards={['08096', '08123', '08074']}
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Survivor, amount: 11 },
					{ item: CardClass.Neutral, amount: 13 },
					{ item: CardClass.Rogue, amount: 6 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Survivor,
					level1: 3,
					level2: 1,
					level3: 5,
					level4: 1,
					level5: 0,
				},
				{
					title: '',
					item: CardClass.Rogue,
					level1: 4,
					level2: 0,
				},
			]}
			chosenCards={[
				{
					title: 'Event (16)',
					cards: ['08050', '08082', '08076', '08074', '01580', '08047', '01579'],
				},
			]}
		/>
	</Story>

	<Story name={'Parallel Front Wendy'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'Parallel Front Wendy'}
			parallelFront
			investigatorCode="01005"
			previewCards={['08096', '08123', '08074']}
			deckDistributions={{
				title: 'Starting Deck',
				distributions: [
					{ item: CardClass.Survivor, amount: 11 },
					{ item: CardClass.Neutral, amount: 13 },
					{ item: CardClass.Rogue, amount: 6 },
				],
			}}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Survivor,
					level1: 3,
					level2: 1,
					level3: 5,
					level4: 1,
					level5: 0,
				},
				{
					title: '',
					item: CardClass.Rogue,
					level1: 4,
					level2: 0,
				},
			]}
			chosenCards={[
				{
					title: 'Event (16)',
					cards: ['08050', '08082', '08076', '08074', '01580', '08047', '01579'],
				},
			]}
		/>
	</Story>

	<Story name={'Parallel Back Wendy'}>
		<DeckBanner
			authorName="ElseWhere"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheInnsmouthConspiracy, CardPack.TheForgottenAge]}
			deckName={'Parallel Back Wendy'}
			parallelBack
			investigatorCode="01005"
			previewCards={['07225', '07193', '07194']}
			chosenTraits={{ title: 'Trait Choice', traits: ['Blessed', 'Cursed'] }}
			chosenCards={[
				{
					title: 'Blessed/Cursed (16)',
					cards: ['07034', '07224', '07229', '07028', '07225', '07193', '07194'],
				},
				{
					title: 'Event (11)',
					cards: ['07028', '07034', '04200', '07193', '07037', '07161', '07157'],
				},
			]}
		/>
	</Story>

	<Story name={'Parallel Wendy'}>
		<DeckBanner
			authorName="ElseWhere"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheInnsmouthConspiracy, CardPack.TheForgottenAge]}
			deckName={'Parallel Wendy'}
			parallelFront
			parallelBack
			investigatorCode="01005"
			previewCards={['07225', '07193', '07194']}
			chosenTraits={{ title: 'Trait Choice', traits: ['Blessed', 'Cursed'] }}
			chosenCards={[
				{
					title: 'Blessed/Cursed (16)',
					cards: ['07034', '07224', '07229', '07028', '07225', '07193', '07194'],
				},
				{
					title: 'Event (11)',
					cards: ['07028', '07034', '04200', '07193', '07037', '07161', '07157'],
				},
			]}
		/>
	</Story>

	<Story name={'Zoey'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheDunwichLegacy, CardPack.EdgeOfTheEarth]}
			deckName={'Turkey Flambé'}
			investigatorCode="02001"
			previewCards={['08092', '08121', '01578']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['01578', '01578', '01550', '01550', '02024'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Guardian,
					level1: 2,
					level2: 3,
					level3: 2,
					level4: 5,
					level5: 0,
				},
			]}
		/>
	</Story>

	<Story name={'Rex'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheDunwichLegacy]}
			deckName={'Simple Dark Horse Rex Deck'}
			investigatorCode="02002"
			previewCards={['02234', '01534', '01543']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['02234', '02234', '01546', '01546', '01575'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Seeker,
					level1: 2,
					level2: 4,
					level3: 1,
					level4: 2,
					level5: 0,
				},
			]}
		/>
	</Story>

	<Story name={'Jenny'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheDunwichLegacy]}
			deckName={'News of Isabelle'}
			investigatorCode="02003"
			previewCards={['02155', '01533', '01587']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['02155', '02155', '01533', '01533', '01573'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Rogue,
					level1: 4,
					level2: 4,
					level3: 1,
					level4: 1,
					level5: 0,
				},
			]}
		/>
	</Story>

	<Story name={'Jim'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheDunwichLegacy]}
			deckName={'The Axe Arts'}
			investigatorCode="02004"
			previewCards={['02032', '01558', '02149']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['02032', '02032', '02149', '02149', '02184'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Mystic,
					level1: 2,
					level2: 4,
					level3: 3,
					level4: 2,
					level5: 2,
				},
			]}
		/>
	</Story>

	<Story name={'Pete'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheDunwichLegacy]}
			deckName={'Persistent Pete'}
			investigatorCode="02005"
			previewCards={['02309', '01539', '01525']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['01539', '01539', '01525', '01525', '02024'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Survivor,
					level1: 0,
					level2: 8,
					level3: 4,
					level4: 0,
					level5: 0,
				},
			]}
		/>
	</Story>

	<Story name={'Daniela'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.ThePathToCarcosa, CardPack.EdgeOfTheEarth]}
			deckName={'Actually quite smart Daniela'}
			investigatorCode="08001"
			previewCards={['03313', '08081', '03022']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['03114', '03114', '01572', '01572', '01573'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Survivor,
					level1: 4,
					level2: 3,
					level3: 4,
					level4: 0,
					level5: 0,
				},
			]}
		/>
	</Story>

	<Story name={'Norman'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheDunwichLegacy, CardPack.EdgeOfTheEarth]}
			deckName={'He is single'}
			investigatorCode="08004"
			previewCards={['08070', '02306', '02233']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['01559', '01559', '02232', '01563', '01563'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Mystic,
					level1: 3,
					level2: 5,
					level3: 2,
					level4: 1,
					level5: 2,
				},
			]}
		/>
	</Story>

	<Story name={'Monterey'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.EdgeOfTheEarth]}
			deckName={'The Underworld Bullwhip'}
			investigatorCode="08007"
			previewCards={['08046', '08086', '08107']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['08033', '08032', '01534', '01537', '01539'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Seeker,
					level1: 3,
					level2: 1,
					level3: 2,
					level4: 2,
					level5: 1,
				},
			]}
		/>
	</Story>

	<Story name={'Lily'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.TheDunwichLegacy, CardPack.EdgeOfTheEarth]}
			deckName={'Mortal Kombat'}
			investigatorCode="08010"
			previewCards={['08025', '08086', '02185']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['02147', '02147', '08020', '08020', '02184'],
				},
				{
					title: 'Discipline',
					cards: ['08014a', '08012a'],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Guardian,
					level1: 2,
					level2: 4,
					level3: 3,
					level4: 0,
					level5: 6,
				},
			]}
		/>
	</Story>

	<Story name={'Bob'}>
		<DeckBanner
			authorName="5argon"
			authorUrl="https://arkhamdb.com/user/profile/61394/5argon"
			popupDb={pdb}
			packs={[CardPack.ThePathToCarcosa, CardPack.EdgeOfTheEarth]}
			deckName={'Poor and horrified Bob'}
			investigatorCode="08016"
			previewCards={['08046', '03198', '08053']}
			chosenCards={[
				{
					title: 'Splash',
					cards: ['03028', '08046', '03030', '03267'],
				},
				{
					title: 'Item (10)',
					cards: [
						'01595',
						'03309',
						'08053',
						'03037',
						'03036',
						'03031',
						'01587',
						'03234',
						'03114',
						'01572',
					],
				},
			]}
			xpDistributions={[
				{
					title: 'XP Cards',
					item: CardClass.Rogue,
					level1: 1,
					level2: 1,
					level3: 5,
					level4: 0,
					level5: 2,
				},
			]}
		/>
	</Story>
{/await}
