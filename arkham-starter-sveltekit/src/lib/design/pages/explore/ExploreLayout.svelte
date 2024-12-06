<script lang="ts">
	import { LimitedTab } from '@5argon/arkham-ui'

	import { iconToNameConversion, iconToNameConversionThai } from '$lib/ahdb/conversion'
	import { CardPack } from '$lib/core/card-pack'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import GrouperSorter from '$lib/design/components/deck-table/GrouperSorter.svelte'
	import { packToFile } from '$lib/design/components/expansion/pack-to-file'
	import type { ExploreInput } from '$lib/explore/explore-input'

	import CardTableDoubleDisplay from './CardTableDoubleDisplay.svelte'
	import ExploreMenu from './ExploreMenu.svelte'
	import SpoilerSeasonRender from './SpoilerSeasonRender.svelte'
	import NavigationButton from '$lib/design/components/basic/NavigationButton.svelte'
	import { page } from '$app/stores'
	import PageShortDescription from '$lib/design/components/basic/PageShortDescription.svelte'
	import Foldout from '$lib/design/components/basic/Foldout.svelte'

	export let fdb: FullDatabase
	export let pdb: PopupDatabase
	export let pageTitle: string
	export let exploreInput: ExploreInput
	export let spoilerSeason: boolean = false
	export let thai: boolean = false

	$: packBanner = packToFile(exploreInput.packs[0])
	$: nonSpoilerLinksCount = exploreInput?.links?.filter((link) => !link.spoilerCard).length ?? 0

	let toggleMap: { [cardId: string]: boolean[] } = {}

	// Copy from input, then allow changing these states in client side.
	let groupings: Grouping[] = exploreInput.groupings
	let sortings: Sorting[] = exploreInput.sortings
	let packs: CardPack[] = exploreInput.packs

	let showSpoilerSeason: boolean = spoilerSeason ? true : false
	let showList: boolean = spoilerSeason ? false : true
	let showScans: boolean = spoilerSeason ? false : true

	let errorExpanded: boolean = false
	function onToggleErrorExpanded() {
		errorExpanded = !errorExpanded
	}

	function onGroupingsChanged(g: Grouping[]) {
		groupings = g
	}
	function onSortingsChanged(s: Sorting[]) {
		sortings = s
	}

	function getByPackFromPdbInvestigator(pdb: PopupDatabase, ps: CardPack[]): DecklistEntry[] {
		const inPack = pdb.queryPack(ps)
		const investigator = inPack
			.filter((x) => {
				return (x.original.sp === undefined || x.original.sp === false) && !x.original.hd
			})
			.filter((x) => {
				return x.original.inv || x.original.ir
			})
		return investigator.map<DecklistEntry>((x) => {
			return {
				amount: x.original.q,
				cardId: x.original.id,
				id: x.original.id,
			}
		})
	}

	function getByPackFromPdb(pdb: PopupDatabase, ps: CardPack[]): DecklistEntry[] {
		const inPack = pdb.queryPack(ps)
		const notInvestigator = inPack
			.filter((x) => {
				return (x.original.sp === undefined || x.original.sp === false) && !x.original.hd
			})
			.filter((x) => {
				// Allow bonded weakness that is not for investigator here.
				return (
					!x.original.inv && !x.original.ir && (!x.original.wk || (x.original.wk && x.original.bd))
				)
			})
		const byPack = notInvestigator.map<DecklistEntry>((x) => {
			return {
				amount: x.original.q,
				cardId: x.original.id,
				id: x.original.id,
			}
		})
		return byPack
	}

	function getByPackFromPdbWeakness(pdb: PopupDatabase, ps: CardPack[]): DecklistEntry[] {
		const inPack = pdb.queryPack(ps)
		const weakness = inPack
			.filter((x) => {
				return (
					(x.original.sp === undefined || x.original.sp === false) &&
					!x.original.hd &&
					!x.original.bd
				)
			})
			.filter((x) => {
				return !x.original.inv && !x.original.ir && x.original.wk
			})
		return weakness.map<DecklistEntry>((x) => {
			return {
				amount: x.original.q,
				cardId: x.original.id,
				id: x.original.id,
			}
		})
	}

	$: pageHeader = thai
		? iconToNameConversionThai(exploreInput.packs[0])
		: iconToNameConversion(exploreInput.packs[0])

	$: metaDescription = thai
		? 'ฐานข้อมูลการ์ดผู้่เล่นทั้งหมดในกล่อง'
		: 'Explore all the player cards inside this product.'
</script>

<svelte:head>
	<meta property="og:title" content={pageHeader} />
	<meta
		property="og:image"
		content={'https://arkham-starter.com/image/expansion/investigator/' + packBanner + '.webp'}
	/>
	<meta property="og:description" content={metaDescription} />
</svelte:head>

<NavigationButton href="/explore" label="Back to Explore Home" />

{#if packBanner !== null}
	<img
		class="pack-banner"
		src={'/image/expansion/investigator/' + packBanner + '.webp'}
		alt="pack banner"
	/>
{/if}

<h1>
	<center>{pageHeader}</center>
</h1>

{#if thai}
	<PageShortDescription>
		ผมทำหน้าภาษาไทยนี้ขึ้นมาเป็นพิเศษ เพื่อเป็นแหล่งข้อมูลอ้างอิงของผู้เล่นอาถรรพ์แห่งอาร์คัมชาวไทย
		หรือประกอบการตัดสินใจซื้อ สำหรับคนที่ยังลังเลอยู่ หรือใช้ตรวจสอบการ์ดหายก็ได้ครับ
		(สามารถคลิกแต่ละใบเป็น Check List ได้) มีแต่การ์ดผู้เล่น
		ไม่ต้องกังวลจะโดนสปอยล์ส่วนเนื้อเรื่องครับ
	</PageShortDescription>
	<PageShortDescription
		>ใครทำคอนเทนต์เกี่ยวกับเกมนี้ลงช่องทางต่างๆ สามารถนำภาพเหล่านี้ไปใช้ได้ประกอบได้เลยครับ
		คอมมูนิตี้ของเกมนี้ในประเทศเราจะได้เติบโตขึ้นไวๆเนอะ
		ทุกภาพตัดมุมโค้งใสและเป็นรูปแบบไฟล์ที่กินพื้นที่ต่ำ (WEBP) เพราะไม่งั้นมันจะเข้าเนื้อผม
		ถ้าต้องการนามสกุลอื่นอย่าง PNG ก็เอาไปแปลงต่อในเครื่องเองนะ</PageShortDescription
	>
	<PageShortDescription>
		เรามีกลุ่มอยู่บน Facebook ชื่อ <a
			target="blank"
			href="https://web.facebook.com/share/g/18KiYDBeei/"
			>Arkham Horror : The Card Game — Thailand Fanclub</a
		> ด้วยครับ หลังจากที่เกมแปลไทยแล้วสมาชิกพุ่งทะลุ 1,000 ไปเรียบร้อยครึกครื้นขึ้นมากเลย เข้ามาพบปะหรือถามปัญหาต่างๆได้ตลอดครับ
	</PageShortDescription>
{/if}

<ExploreMenu />
<!-- <ListDivider label="External Links" /> -->
{#if spoilerSeason}
	<p>
		Fantasy Flight Games kindly provides content creators around the world with pre-release cards
		with objective to nurture fan content ecosystem, <b
			>increasing exposure to their content channel</b
		>
		once it is their turn to spoil the cards.
	</p>

	<p>
		Therefore to enjoy this festivity to the fullest,
		<b
			>I highly recommend following the link and read/listen to their presentation and their opinion
			about the card</b
		>. This page is designed to do so with cards paired with the source they came from. Click on the
		underlined header to visit that content creator. Newer spoilers are sorted to the top.
	</p>
{/if}

{#if !thai && nonSpoilerLinksCount > 0}
	<NavigationButton
		center
		label={`View ${nonSpoilerLinksCount} Community Content Links`}
		href={$page.url.pathname + '/links'}
	/>
{/if}

{#if !thai && exploreInput.packs[0] === CardPack.RevisedCoreSet}
	<NavigationButton
		center
		label={'ดูการ์ดภาษาไทย / View Thai Localization'}
		href={$page.url.pathname + '/th'}
	/>
{/if}

{#if thai}
	<Foldout
		title={'⚠️ รายการข้อผิดพลาดที่พบ'}
		expanded={errorExpanded}
		onToggle={onToggleErrorExpanded}
	>
		<svelte:fragment slot="default">
			<p>
				ทาง Tower Tactic Games ได้ออกมาประกาศเรื่องข้อผิดพลาดที่มีผลกับกลไกเกมทั้งหมดแล้ว
				และใครสั่งซื้อรอบที่มีข้อผิดพลาดไป จะมีการ์ดผลิตใหม่ที่แก้แล้วจัดส่งมาให้โดยไม่มีค่าใช้จ่าย <a
					target="_blank"
					href="https://web.facebook.com/towertacticgames/posts/pfbid02Wit8YrKKNtXirXXM4CdzXpGDNoV8rcLZrb6LXCf6UaJmyw5W8HfoHWhXcLtYLJEwl"
					>ดูรายละเอียดทั้งหมดได้ที่นี่ครับว่าใบไหนบ้าง</a
				> ถ้าผมได้รับการ์ดที่แก้ไขเรียบร้อยแล้ว ผมจะกลับมาอัพเดทภาพที่ถูกต้องที่นี่ด้วยครับ ตอนนี้เป็นแบบตามที่ผิดไปก่อนนะ
			</p>
		</svelte:fragment>
		<svelte:fragment slot="right">(ณ รอบพิมพ์รอบแรก)</svelte:fragment>
	</Foldout>
{/if}

{#if spoilerSeason}
	<div class="tab">
		<LimitedTab
			onChangeActive={(i) => {
				switch (i) {
					case 0: {
						showSpoilerSeason = true
						showList = false
						showScans = false
						break
					}
					case 1: {
						showSpoilerSeason = false
						showList = true
						showScans = true
						break
					}
					case 2: {
						showSpoilerSeason = false
						showList = false
						showScans = true
						break
					}
					case 3: {
						showSpoilerSeason = false
						showList = true
						showScans = false
						break
					}
				}
			}}
		>
			<div slot="tab1"><b> 🌟 Spoiler Season Links</b></div>
			<div slot="content1" />
			<div slot="tab2">{thai ? 'ทั้งรายการและภาพการ์ด' : 'List and Scans'}</div>
			<div slot="content2" />
			<div slot="tab3">{thai ? 'เฉพาะภาพการ์ด' : 'Scans Only'}</div>
			<div slot="content3" />
			<div slot="tab4">{thai ? 'เฉพาะรายการการ์ด' : 'List Only'}</div>
			<div slot="content4" />
		</LimitedTab>
	</div>
{:else}
	<div class="tab">
		<LimitedTab
			onChangeActive={(i) => {
				switch (i) {
					case 0: {
						showList = true
						showScans = true
						break
					}
					case 1: {
						showList = false
						showScans = true
						break
					}
					case 2: {
						showList = true
						showScans = false
						break
					}
				}
			}}
		>
			<div slot="tab1">{thai ? 'ทั้งรายการและภาพการ์ด' : 'List and Scans'}</div>
			<div slot="content1" />
			<div slot="tab2">{thai ? 'เฉพาะภาพการ์ด' : 'Scans Only'}</div>
			<div slot="content2" />
			<div slot="tab3">{thai ? 'เฉพาะรายการการ์ด' : 'List Only'}</div>
			<div slot="content3" />
		</LimitedTab>
	</div>
{/if}
{#if showSpoilerSeason}
	<SpoilerSeasonRender {fdb} {pdb} {exploreInput} />
{:else}
	<ListDivider label={thai ? 'นักสืบและการ์ดประจำตัว' : 'Investigators and Signatures'} />
	<CardTableDoubleDisplay
		{toggleMap}
		singleRight
		localization={thai ? 'th' : 'en'}
		big={!showList && showScans}
		entries={getByPackFromPdbInvestigator(pdb, packs)}
		groupings={[]}
		sortings={[Sorting.Number]}
		taboo={true}
		fullDatabase={fdb}
		popupDatabase={pdb}
		onClickToggle={(id, newToggles) => {
			toggleMap[id] = newToggles
			toggleMap = { ...toggleMap }
		}}
		{showList}
		{showScans}
	/>

	<ListDivider label={thai ? 'จุดอ่อน' : 'Weakness'} />

	<CardTableDoubleDisplay
		{toggleMap}
		big={!showList && showScans}
		singleRight
		localization={thai ? 'th' : 'en'}
		columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
		entries={getByPackFromPdbWeakness(pdb, packs)}
		groupings={[]}
		sortings={[Sorting.Number]}
		taboo={true}
		fullDatabase={fdb}
		popupDatabase={pdb}
		onClickToggle={(id, newToggles) => {
			toggleMap[id] = newToggles
			toggleMap = { ...toggleMap }
		}}
		{showList}
		{showScans}
	/>

	<ListDivider label={thai ? 'การ์ดผู้เล่นที่เหลือ' : 'The Rest of Player Cards'} />

	<GrouperSorter {groupings} {sortings} {onGroupingsChanged} {onSortingsChanged} />

	<CardTableDoubleDisplay
		{toggleMap}
		big={!showList && showScans}
		columns={[ExtraColumn.Cost, ExtraColumn.Icons]}
		singleRight
		localization={thai ? 'th' : 'en'}
		entries={getByPackFromPdb(pdb, packs)}
		{groupings}
		{sortings}
		taboo={true}
		fullDatabase={fdb}
		popupDatabase={pdb}
		onClickToggle={(id, newToggles) => {
			toggleMap[id] = newToggles
			toggleMap = { ...toggleMap }
		}}
		{showList}
		{showScans}
	/>
{/if}

<style>
	.pack-banner {
		width: 400px;
		max-width: 100%;
		margin: 0 auto;
	}

	.tab {
		margin-top: 8px;
	}
</style>
