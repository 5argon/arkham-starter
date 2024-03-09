<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'

	import mdText from '$lib/md/about.md?raw'
</script>

<svelte:head>
	<title>arkham-starter.com | About</title>
</svelte:head>

<h1>About</h1>
<SvelteMarkdown source={mdText} />
