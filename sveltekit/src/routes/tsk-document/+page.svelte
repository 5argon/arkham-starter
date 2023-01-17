<script lang="ts">
	import Button from '$lib/design/components/basic/Button.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'

	var showSpoilerFirst = false
	var showSpoiler = false
</script>

<svelte:head>
	<title>arkham-starter.com | The Scarlet Keys : Printable Documents</title>
</svelte:head>

<PageTitle title={'The Scarlet Keys : Printable Documents'} />

{#if !showSpoilerFirst}
	<p>
		This page provide printable game blings related to The Scarlet Keys campaign mechanics, which
		that mechanics is revealed after the 1st scenario. Recommended to click Proceed below only after
		you have completed the 1st scenario.
	</p>

	<Button
		label="Proceed"
		onClick={() => {
			showSpoilerFirst = true
		}}
	/>
{:else}
	<p>
		In The Scarlet Keys Campaign book there are documents which the instruction says the player can
		freely <b>peek</b> at any time while playing the campaign.
	</p>

	<p>
		However, these documents are scattered throughtout the campaign book. The instruction tells you
		to not read any of the story text right next to them until you choose to travel to that
		location.
	</p>

	<p>
		There is also risk of accidentally peeking at other spoilery content while trying to browse
		these documents, like setup instructions or resolutions of unplayed scenarios, thanks to
		non-linear quirk of this campaign.
	</p>

	<p>
		This page provides <b>just the documents</b> so you can print and have them separate from the campaign
		book. They are reference documents, it maybe more natural to pass it around the table to read rather
		than having the lead narrating them all out loud like typical campaign text.
	</p>

	<p>
		You can also view them here online if you don't want a physical copy, in which case each player
		can use their own mobile phone screen.
	</p>

	<ListDivider label="Printable A4 Files" />

	<p>
		They are enlarged so the width of each document is about 75% of A4 paper. Resize on your own if
		you want them more compact.
	</p>

	<ul>
		<li>
			<a href="/image/custom/tsk-document/tsk-dossier-bw.pdf">Black and White</a>
		</li>
		<li>
			<a href="/image/custom/tsk-document/tsk-dossier-color.pdf">Color</a>
		</li>
	</ul>

	<ListDivider label="View Online" />

	{#if !showSpoiler}
		<p>This button is not a spoiler if you have completed the 1st scenario.</p>
		<Button
			label="Show all documents"
			onClick={() => {
				showSpoiler = true
			}}
		/>
	{:else}
		<div class="flex-outer">
			<img src="/image/custom/tsk-document/11-B.png" alt="11-B" />
			<img src="/image/custom/tsk-document/16-D.png" alt="16-D" />
			<img src="/image/custom/tsk-document/21-F.png" alt="21-F" />
			<img src="/image/custom/tsk-document/26-G1-6.png" alt="26-G1-6" />
			<img src="/image/custom/tsk-document/28-I.png" alt="28-I" />
			<img src="/image/custom/tsk-document/32-J.png" alt="32-J" />
			<img src="/image/custom/tsk-document/33-K.png" alt="33-K" />
			<img src="/image/custom/tsk-document/37-M.png" alt="37-M" />
			<img src="/image/custom/tsk-document/38-N.png" alt="38-N" />
			<img src="/image/custom/tsk-document/49-R.png" alt="49-R" />
			<img src="/image/custom/tsk-document/52-U.png" alt="52-U" />
			<img src="/image/custom/tsk-document/53-V.png" alt="53-V" />
			<img src="/image/custom/tsk-document/54-W.png" alt="54-W" />
			<img src="/image/custom/tsk-document/55-X.png" alt="55-X" />
		</div>
	{/if}
{/if}

<style>
	img {
		max-width: 450px;
	}
</style>
