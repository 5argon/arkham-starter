<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle title={'Campaign Reference'} helpMd={help} />

<h2>Spoiler Info</h2>
<p>When you entered one of the campaign pages below, you will see :</p>
<ul>
	<li>All scenario names.</li>
	<li>All encounter set icon graphics.</li>
	<li>Which encounter set icon are used in which scenario, presented in a matrix.</li>
	<li>
		When hovering on the encounter set icon or toggle "Show Name", you will additionally see the
		encounter set's name.
	</li>
	<li>
		In "Scenarios" tab, you will additionally see a minimalistic representation of that scenario's
		setup instruction, represented by encounter set icons and numbers, and some important reminders
		such as added Basic Weakness or Chaos Bag changes during Intro or Setup. (Light spoiler)
	</li>
	<li>
		In "Diagrams" tab contains a sanity check image that helps reminding you of scenario's details.
		Don't use it unless you already know the scenario inside out. (Heavy spoiler)
	</li>
</ul>

<h2>Campaigns</h2>
<p>
	* = These are campaigns I have not played or has incomplete details. The information in these
	pages are made by directly copying community-made encounter set table and I can't check
	correctness of them.
</p>
<ul>
	<li><a href="./campaign/notz">Night of the Zealot</a></li>
	<li><a href="./campaign/dwl">The Dunwich Legacy</a></li>
	<li><a href="./campaign/ptc">The Path to Carcosa</a></li>
	<li><a href="./campaign/tfa">The Forgotten Age</a></li>
	<li><a href="./campaign/tcu">*The Circle Undone</a></li>
	<li><a href="./campaign/tde">*The Dream-Eaters</a></li>
	<li><a href="./campaign/tic">*The Innsmouth Conspiracy</a></li>
	<li><a href="./campaign/eote">Edge of the Earth</a></li>
	<li><a href="./campaign/tsk">The Scarlet Keys</a></li>
</ul>
<ul>
	<li><a href="./campaign/rtnotz">*Return to the Night of the Zealot</a></li>
	<li><a href="./campaign/rtdwl">Return to the Dunwich Legacy</a></li>
	<li><a href="./campaign/rtptc">*Return to the Path to Carcosa</a></li>
	<li><a href="./campaign/rttfa">*Return to the Forgotten Age</a></li>
	<li><a href="./campaign/rttcu">*Return to the Circle Undone</a></li>
</ul>
<ul>
	<li><a href="./campaign/overall">Overall</a></li>
</ul>
