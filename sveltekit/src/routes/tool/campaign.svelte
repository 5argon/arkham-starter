<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle subTitle="Tool" title={'Campaign Reference'} helpMd={help} />

<h2>Spoiler Info</h2>
<p>When you entered one of the campaign pages below, you will see :</p>
<ul>
	<li>All scenario names.</li>
	<li>All encounter set icon graphics.</li>
	<li>Which encounter set icon are used in which scenario, presented in a matrix.</li>
</ul>

<h3>Require interactions</h3>
<ul>
	<li>
		When hovering on the encounter set icon or toggle "Show Name", you will additionally see the
		encounter set's name.
	</li>
	<li>
		In "Scenarios" tab, you will additionally see a minimalistic representation of that scenario's
		setup instruction, represented by encounter set icons and numbers. There is no text instruction
		other than "set aside".
	</li>
</ul>

<h2>Campaigns</h2>
<p>
	* = These are campaigns I have not played yet, I only buy the repackaged campaigns as they are
	released. The information in these pages are made by directly copying community-made encounter set
	table. Information in some area maybe incomplete or incorrect.
</p>
<ul>
	<li><a href="./campaign/notz">Night of the Zealot</a></li>
	<li><a href="./campaign/dwl">The Dunwich Legacy</a></li>
	<li><a href="./campaign/ptc">*The Path to Carcosa</a></li>
	<li><a href="./campaign/tfa">*The Forgotten Age</a></li>
	<li><a href="./campaign/eote">Edge of the Earth</a></li>
</ul>
