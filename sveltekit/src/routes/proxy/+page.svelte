<script lang="ts">
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import helpMd from '$lib/md/proxy.md?raw'
</script>

<svelte:head>
	<title>arkham-starter.com | Proxy Template</title>
</svelte:head>

<PageTitle title={'Proxy Template'} {helpMd} />

<p>
	I blown up the contrast and exposure of these graphics so it is also friendly with photocopier,
	which unlike a printer cannot reproduce detailed greys.
</p>

<ListDivider label="Premade A4 PDF" />

<p>Each one is sized -2 millimeters each side from a normal card size.</p>

<ul>
	<li>
		<a href="/image/custom/proxy/ahlcg-proxy-a4-1.pdf" target="_blank" rel="noreferrer"
			>Asset, Event, Skill : 0, 1, 2 skill icons</a
		>
	</li>
	<li>
		<a href="/image/custom/proxy/ahlcg-proxy-a4-2.pdf" target="_blank" rel="noreferrer"
			>Asset, Event, Skill : 2, 3, 4 skill icons</a
		>
	</li>
	<li>
		<a href="/image/custom/proxy/ahlcg-proxy-a4-3.pdf" target="_blank" rel="noreferrer"
			>Asset, Event, Skill : No skill icon</a
		>
	</li>
	<li>
		<a href="/image/custom/proxy/ahlcg-proxy-a4-4.pdf" target="_blank" rel="noreferrer"
			>Skill : Various skill icons</a
		>
	</li>
</ul>

<ListDivider label="Asset" />

<div>
	<img alt="Asset" src="/image/custom/proxy/asset-0.png" />
	<img alt="Asset" src="/image/custom/proxy/asset-1.png" />
	<img alt="Asset" src="/image/custom/proxy/asset-2.png" />
	<img alt="Asset" src="/image/custom/proxy/asset-3.png" />
	<img alt="Asset" src="/image/custom/proxy/asset-4.png" />
</div>

<ListDivider label="Event" />

<div>
	<img alt="Event" src="/image/custom/proxy/event-0.png" />
	<img alt="Event" src="/image/custom/proxy/event-1.png" />
	<img alt="Event" src="/image/custom/proxy/event-2.png" />
	<img alt="Event" src="/image/custom/proxy/event-3.png" />
	<img alt="Event" src="/image/custom/proxy/event-4.png" />
</div>

<ListDivider label="Skill" />

<div>
	<img alt="Skill" src="/image/custom/proxy/skill-0.png" />
	<img alt="Skill" src="/image/custom/proxy/skill-1.png" />
	<img alt="Skill" src="/image/custom/proxy/skill-2.png" />
	<img alt="Skill" src="/image/custom/proxy/skill-3.png" />
	<img alt="Skill" src="/image/custom/proxy/skill-4.png" />
</div>
