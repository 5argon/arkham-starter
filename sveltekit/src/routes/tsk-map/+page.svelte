<script lang="ts">
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
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

<ListDivider label="Download" />

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
		<a href="/image/custom/tsk-map/tsk-map-bw.png" target="_blank">English (Photocopier-friendly)</a>
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
