<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'
	import mdText from '$lib/md/about.md?raw'
</script>

<h1>About</h1>
<SvelteMarkdown source={mdText} />
