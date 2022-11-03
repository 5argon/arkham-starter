<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'
	import mdText from '$lib/md/about.md?raw'
</script>

<h1>arkham-starter.com</h1>

<svelte:head>
	<title>arkham-starter.com</title>
</svelte:head>

<SvelteMarkdown source={mdText} />
