<script lang="ts">
	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
</script>

<svelte:head>
	<title>arkham-starter.com | The Scarlet Keys : Upscaled World Map</title>
</svelte:head>

<PageTitle title={'The Scarlet Keys : Upscaled World Map'} />

<p>
	I took the playmat scan available at <a href="https://hallofarkham.com/the-scarlet-keys/"
		>Hall of Arkham</a
	>, add the Rome location banner that was missing, then enlarge with an AI Upscaler. But these kind
	of upscaler smear texts and symbols, so I cleaned up all the location labels manually and type
	back everything. Some other things are lost in the upscaling and I didn't manually restore them,
	for example blue star icon on the labels.
</p>

<ListDivider label="Clean Map" />

<p>
	Using original output from the upscaler, image size is 8000 x 4516 px. Therefore if you are going
	to print them, at 300 DPI, this size can cover 26.67 x 15.05 inch or 677.3 x 382.4 mm. (Fits in A0
	paper, 841 x 1189 mm) Download size is <b>~30 MB</b>.
</p>

<ul>
	<li>
		<a href="/image/custom/tsk-map/tsk-map.png" target="_blank">English</a>
	</li>
	<li>
		<a href="/image/custom/tsk-map/tsk-map-bw.png" target="_blank">English (Photocopier-friendly)</a
		>
	</li>
	<li>
		<a href="/image/custom/tsk-map/tsk-map-blank.png" target="_blank">Blank</a>
	</li>
</ul>

<p>
	These are scaled further than the output from upscaler by 2 times, which blurs the background. But
	since I typed back all the texts before exporting it, you would still get benefit of sharp text at
	larger size. Maybe it is useful for even larger print. Download size is <b>~70 MB</b>.
</p>

<ul>
	<li>
		<a href="/image/custom/tsk-map/tsk-map-2x.png" target="_blank">English 2x</a>
	</li>
</ul>

<ListDivider label="Overlaid Map" />

<p>Map with extended information edited on top of it.</p>

<p>
	These are sized to "A3 plus" / "Full-bleed A3", it is a size a bit larger than A3 that many A3
	printer supports. The purpose is that after printing, you can cut the bleed out to make an exact
	A3 size. (e.g. For printer with maximum paper size of 330 x 487mm and a maximum printing area of
	323 x 480mm)
</p>

<ListDivider label="Spoiler-Free Dossier Map" level={ListDividerLevel.Two} />

<p>
	Augmented map that has relevant dossier floating near its location. This is spoiler-free, since
	the game said you can read any dossier at any time as soon as you gain access to the world map.
</p>

<ul>
	<li>
		<a href="" target="_blank">Coming Soon</a>
	</li>
</ul>

<ListDivider label="FULL SPOILER Map" level={ListDividerLevel.Two} />

<p>
	If you had enough of discovery, surprises, and disappointments already, this might be the map for
	you! <b
		>(But I strongly recommend you to play the game normally first before looking at this map to
		experience the said discovery, surprises, and disappointments.)</b
	>
</p>

<p>
	On later replays of TSK, you might want to focus on hitting unplayed version or unplayed time
	threshold difficulty scaling of some scenarios, getting unobtained keys, or make your own
	"gauntlet course" consisting of challenging scenarios back to back, or even arrange the narrative
	as you like. You might want to challenge Hard/Expert level, which you must take advantage of every
	drop of extra XP on the map to add critical playmaking cards to your deck before going into the
	next scenario.
</p>

<p>
	In all these cases, the surprise about time and conditions to obtain stuff on the map is not
	desirable. You don't want to start over after realizing you ended up getting the same version of
	scenario you had played so many times.
</p>

<p>
	This map shows possible time cost at each location, key/enemies/playable scenario locations, and
	color-coded connecting questlines. Don't worry, there is still plenty of "game" to play on this
	map, not just at start, but also when you don't get the best resolution and need to re-route your
	path. Amount of information in this map is equivalent to having read this excellent article <a
		href="https://derbk.com/ancientevils/best-laid-plans-traveling-the-world/"
		><b>Best-Laid Plans: Traveling the World (https://derbk.com/ancientevils)</b></a
	>
</p>

<p>
	It is also designed so you can circle on things you are planning to hit. (e.g. XP,
	trust/deception, keys, time, etc.) Just to make sure you don't miss anything.
</p>

<ul>
	<li>
		<a href="" target="_blank">Coming Soon</a>
	</li>
</ul>
