<script lang="ts">
	import { CardClass } from '$lib/core/card-class'
	import Button from '$lib/design/components/basic/Button.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import ClassIcon from '$lib/design/components/inline/ClassIcon.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import ExploreMenu from '$lib/design/pages/explore/ExploreMenu.svelte'
	import type { PageData } from './$types'
	export let data: PageData
	let loadInvestigators: boolean = false
	let loadGuardian: boolean = false
	let loadSeeker: boolean = false
	let loadMystic: boolean = false
	let loadRogue: boolean = false
	let loadSurvivor: boolean = false
	let loadNeutral: boolean = false
	let loadBasicWeakness: boolean = false
</script>

<svelte:head>
	<title>arkham-starter.com | Explore</title>
</svelte:head>

<PageTitle title={'Explore: The Feast of Hemlock Vale Investigator Expansion'} />

<ExploreMenu />

<p>
	Complete explore page with grouping / sorting tools like other expansions will be available after
	arkhamdb updates JSON data for these cards. This site works by pulling that JSON data and then
	patch it with these images. Since I got the physical cards now, I'm doing my homework processing
	my card graphics ahead of time.
</p>

<p>Click the button to load visual spoilers of that section.</p>

<p>
	If you are a content creator, I'd be happy if you can make use of them to talk about these cards
	in your social channel. They are PNG with rounded transparent corners baked in, should work great
	on blogs with dark background. Let's get hyped for the Campaign Expansion!
</p>

<p>(Avoid hotlinking to these images as the URL will change when things finalizes.)</p>

<ListDivider label="Investigators" />
<div>
	<b>Quantity :</b> 20 Cards (All single copy except #10 with 3 copies.)
</div>
{#if !loadInvestigators}
	<Button
		label={'Load Visual Spoilers (~1.5 MB per card)'}
		big
		onClick={() => {
			loadInvestigators = true
		}}
	/>
{/if}
{#if loadInvestigators}
	<div class="flex-lr">
		<!-- 10001 to 10039 -->
		<div class="flex-item"><img src={'/image/card/fhv/10001.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10001b.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10002.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10003.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10004.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10004b.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10005.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10005b.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10006.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10007.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10008.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10009.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10009b.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10010.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10011.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10012.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10012b.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10013.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10014.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10015.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10015b.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10016.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10016b.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10017.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10018.png'} alt="Preview" /></div>
	</div>
{/if}
<div class="spacing" />
<ListDivider label="Guardian" />
<div>
	<ClassIcon cardClass={CardClass.Guardian} />
	<b>Quantity :</b> 40 Cards (Cards with a single copy : #36, #39.)
</div>
{#if !loadGuardian}
	<Button
		label={'Load Visual Spoilers (~1.5 MB per card)'}
		big
		onClick={() => {
			loadGuardian = true
		}}
	/>
{/if}
{#if loadGuardian}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10019.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10020.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10021.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10022.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10023.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10024.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10025.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10026.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10027.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10028.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10029.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10030.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10031.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10032.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10033.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10034.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10035.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10036.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10037.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10038.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10039.png'} alt="Preview" /></div>
	</div>
{/if}

<div class="spacing" />
<ListDivider label="Seeker" />
<div>
	<ClassIcon cardClass={CardClass.Seeker} />
	<b>Quantity :</b> 39 Cards (Cards with a single copy : #44, #45, #59, #60, #61.)
</div>
{#if !loadSeeker}
	<Button
		label={'Load Visual Spoilers (~1.5 MB per card)'}
		big
		onClick={() => {
			loadSeeker = true
		}}
	/>
{/if}
{#if loadSeeker}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10040.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10041.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10042.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10043.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10044.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10045.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10046.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10047.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10048.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10049.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10050.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10051.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10052.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10053.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10054.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10055.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10056.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10057.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10058.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10059.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10060.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10061.png'} alt="Preview" /></div>
	</div>
{/if}

<div class="spacing" />
<ListDivider label="Rogue" />
<div>
	<ClassIcon cardClass={CardClass.Rogue} />
	<b>Quantity :</b> 41 Cards, counting the weakness Bonded card. (Cards with a single copy : #62, #63,
	#79.)
</div>
{#if !loadRogue}
	<Button
		label={'Load Visual Spoilers (~1.5 MB per card)'}
		big
		onClick={() => {
			loadRogue = true
		}}
	/>
{/if}
{#if loadRogue}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10062.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10063.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10064.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10065.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10066.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10067.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10068.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10069.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10070.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10071.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10072.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10073.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10074.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10075.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10076.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10077.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10078.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10079.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10080.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10081.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10082.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10083.png'} alt="Preview" /></div>
	</div>
{/if}

<div class="spacing" />
<ListDivider label="Mystic" />
<div>
	<ClassIcon cardClass={CardClass.Mystic} />
	<b>Quantity :</b> 40 Cards. (Cards with a single copy : #85, #86, #87, #88, #89, #90, #106, #107.)
</div>
{#if !loadMystic}
	<Button
		label={'Load Visual Spoilers (~1.5 MB per card)'}
		big
		onClick={() => {
			loadMystic = true
		}}
	/>
{/if}
{#if loadMystic}
	<div class="flex-lr">
		<!-- 10084 to 10107 -->
		<div class="flex-item"><img src={'/image/card/fhv/10084.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10085.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10086.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10087.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10088.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10089.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10090.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10091.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10092.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10093.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10094.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10095.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10096.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10097.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10098.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10099.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10100.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10101.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10102.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10103.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10104.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10105.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10106.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10107.png'} alt="Preview" /></div>
	</div>
{/if}

<div class="spacing" />
<ListDivider label="Survivor" />
<div>
	<ClassIcon cardClass={CardClass.Survivor} />
	<b>Quantity :</b> 39 Cards. (Cards with a single copy : #127.)
</div>
{#if !loadSurvivor}
	<Button
		label={'Load Visual Spoilers (~1.5 MB per card)'}
		big
		onClick={() => {
			loadSurvivor = true
		}}
	/>
{/if}
{#if loadSurvivor}
	<div class="flex-lr">
		<!-- 10108 to 10127 -->
		<div class="flex-item"><img src={'/image/card/fhv/10108.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10109.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10110.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10111.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10112.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10113.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10114.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10115.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10116.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10117.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10118.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10119.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10120.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10121.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10122.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10123.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10124.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10125.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10126.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10127.png'} alt="Preview" /></div>
	</div>
{/if}

<div class="spacing" />
<ListDivider label="Neutral" />
<div><b>Quantity :</b> 11 Cards. (Cards with a single copy : #132, #133, #134.)</div>
{#if !loadNeutral}
	<Button
		label={'Load Visual Spoilers (~1.5 MB per card)'}
		big
		onClick={() => {
			loadNeutral = true
		}}
	/>
{/if}
{#if loadNeutral}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10128.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10129.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10130.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10131.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10132.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10133.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10134.png'} alt="Preview" /></div>
	</div>
{/if}

<div class="spacing" />
<ListDivider label="Basic Weakness" />
<div><b>Quantity :</b> 4 Cards. (All single copy.)</div>

{#if !loadBasicWeakness}
	<Button
		label={'Load Visual Spoilers (~1.5 MB per card)'}
		big
		onClick={() => {
			loadBasicWeakness = true
		}}
	/>
{/if}
{#if loadBasicWeakness}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10135.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10136.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10137.png'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10138.png'} alt="Preview" /></div>
	</div>
{/if}

<style>
	.flex-lr {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.flex-item {
		padding: 10px;
	}

	img {
		max-width: 400px;
		max-height: 400px;
	}

	.spacing {
		margin-top: 30px;
	}
</style>
