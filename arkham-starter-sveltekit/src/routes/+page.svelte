<script>
	import ResourcePage from './resource/ResourcePage.svelte'
</script>

<svelte:head>
	<title>arkham-starter.com</title>
</svelte:head>

<a href="/explore/tdc">
	<div class="news">
		<div class="news-bg"></div>
		<div class="news-text">
			<div><b>The Drowned City Spoiler Season</b></div>
			<div style="font-size:x-small;">Stay up to date here!</div>
		</div>
	</div>
</a>

<p>
	This site ultimately aims to get you <i>start</i> playing Arkham Horror: The Card Game with less friction.
	That includes the performance of this site itself. It's designed to be very fast to load.
</p>

<p>
	Bigger part of the site is to provide some starter decks (cheaper decks using only a few
	expansions, no matter which one you go for first), and a party assembler that helps you avoid
	overlapping cards between team members. Right now this part is <b>in development</b>.
</p>

<p>
	What's ready to use right now are some beginner-oriented resources and helping tools. Take a look
	at them below!
</p>

<ResourcePage />

<style>
	.news {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		width: 400px;
		padding: 8px 16px;
		border-radius: 8px;
		border: 1px solid #ccc;
	}

	.news-bg {
		height: 50px;
		width: 100%;
		background-image: url('image/expansion/investigator/tdc.webp');
		background-size: cover;
		border-radius: 4px;
	}

	.news-text {
		text-align: center;
		font-size: 1.2em;
	}
</style>
