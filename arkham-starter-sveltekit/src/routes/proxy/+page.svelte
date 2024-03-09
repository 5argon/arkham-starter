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
	Generic black and white card frames with the class edited out so you can focus on what's truly
	matter : your awesome proxy art.
</p>

<p>
	It is also photocopy-friendly. Unlike a monochrome printer it cannot reproduce detailed greys.
</p>

<p>
	Proxies are for resolving card overlaps, creating a bit more copies of card you <b>already own</b>
	to make unconventional team composition possible, or fix accidents such as lost cards. They are not
	meant for you to skip buying an Investigator Expansion by getting a few cards out of it for free.
</p>

<ListDivider label="Premade A4 PDF" />

<p>
	They are designed so the size comes out a bit smaller than an actual card. Then you can overlay
	inside a clear sleeve and still see genuine card back, without the proxy paper accidentally blep
	off the edge and revealing it is a proxy from the back side.
</p>

<ul>
	<li>
		<a href="/image/custom/proxy/ahlcg-proxy-a4-1.pdf" target="_blank" rel="noreferrer"
			>Asset, Event, Skill : 1, 2, 3 skill icons</a
		>
	</li>
	<li>
		<a href="/image/custom/proxy/ahlcg-proxy-a4-2.pdf" target="_blank" rel="noreferrer"
			>Asset, Event, Skill : 2, 3, 4 skill icons</a
		>
	</li>
	<li>
		<a href="/image/custom/proxy/ahlcg-proxy-a4-3.pdf" target="_blank" rel="noreferrer"
			>Asset, Event, Skill : 0 skill icon</a
		>
	</li>
	<li>
		<a href="/image/custom/proxy/ahlcg-proxy-a4-4.pdf" target="_blank" rel="noreferrer"
			>Skill : Various skill icons</a
		>
	</li>
</ul>

<p>Individual images below if you want an exact amount of a specific frame.</p>

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
