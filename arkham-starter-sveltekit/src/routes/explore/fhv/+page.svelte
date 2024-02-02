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
	in your social channel. They are WEBP with rounded transparent corners baked in, should work great
	on blogs with dark background. Let's get hyped for the Campaign Expansion!
</p>

<p>(Avoid hotlinking to these images as the URL will change when things finalizes.)</p>

<ListDivider label="Investigators" />
<div>
	<b>Quantity :</b> 20 Cards (All single copy except #10 with 3 copies.)
</div>
{#if !loadInvestigators}
	<Button
		label={'Load Visual Spoilers'}
		big
		onClick={() => {
			loadInvestigators = true
		}}
	/>
{/if}
{#if loadInvestigators}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10001.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10001b.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10002.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10003.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10004.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10004b.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10005.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10005b.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10006.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10007.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10008.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10009.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10009b.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10010.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10011.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10012.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10012b.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10013.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10014.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10015.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10015b.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10016.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10016b.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10017.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10018.webp'} alt="Preview" /></div>
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
		label={'Load Visual Spoilers'}
		big
		onClick={() => {
			loadGuardian = true
		}}
	/>
{/if}
{#if loadGuardian}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10019.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10020.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10021.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10022.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10023.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10024.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10025.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10026.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10027.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10028.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10029.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10030.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10031.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10032.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10033.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10034.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10035.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10036.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10037.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10038.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10039.webp'} alt="Preview" /></div>
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
		label={'Load Visual Spoilers'}
		big
		onClick={() => {
			loadSeeker = true
		}}
	/>
{/if}
{#if loadSeeker}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10040.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10041.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10042.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10043.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10044.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10045.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10046.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10047.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10048.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10049.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10050.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10051.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10052.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10053.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10054.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10055.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10056.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10057.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10058.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10059.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10060.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10061.webp'} alt="Preview" /></div>
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
		label={'Load Visual Spoilers'}
		big
		onClick={() => {
			loadRogue = true
		}}
	/>
{/if}
{#if loadRogue}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10062.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10063.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10064.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10065.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10066.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10067.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10068.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10069.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10070.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10071.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10072.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10073.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10074.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10075.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10076.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10077.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10078.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10079.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10080.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10081.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10082.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10083.webp'} alt="Preview" /></div>
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
		label={'Load Visual Spoilers'}
		big
		onClick={() => {
			loadMystic = true
		}}
	/>
{/if}
{#if loadMystic}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10084.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10085.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10086.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10087.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10088.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10089.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10090.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10091.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10092.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10093.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10094.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10095.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10096.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10097.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10098.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10099.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10100.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10101.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10102.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10103.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10104.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10105.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10106.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10107.webp'} alt="Preview" /></div>
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
		label={'Load Visual Spoilers'}
		big
		onClick={() => {
			loadSurvivor = true
		}}
	/>
{/if}
{#if loadSurvivor}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10108.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10109.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10110.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10111.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10112.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10113.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10114.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10115.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10116.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10117.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10118.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10119.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10120.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10121.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10122.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10123.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10124.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10125.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10126.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10127.webp'} alt="Preview" /></div>
	</div>
{/if}

<div class="spacing" />
<ListDivider label="Neutral" />
<div><b>Quantity :</b> 11 Cards. (Cards with a single copy : #132, #133, #134.)</div>
{#if !loadNeutral}
	<Button
		label={'Load Visual Spoilers'}
		big
		onClick={() => {
			loadNeutral = true
		}}
	/>
{/if}
{#if loadNeutral}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10128.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10129.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10130.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10131.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10132.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10133.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10134.webp'} alt="Preview" /></div>
	</div>
{/if}

<div class="spacing" />
<ListDivider label="Basic Weakness" />
<div><b>Quantity :</b> 4 Cards. (All single copy.)</div>

{#if !loadBasicWeakness}
	<Button
		label={'Load Visual Spoilers'}
		big
		onClick={() => {
			loadBasicWeakness = true
		}}
	/>
{/if}
{#if loadBasicWeakness}
	<div class="flex-lr">
		<div class="flex-item"><img src={'/image/card/fhv/10135.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10136.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10137.webp'} alt="Preview" /></div>
		<div class="flex-item"><img src={'/image/card/fhv/10138.webp'} alt="Preview" /></div>
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
