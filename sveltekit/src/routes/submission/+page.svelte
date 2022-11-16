<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'
	import mdText from '$lib/md/submission.md?raw'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
</script>

<svelte:head>
	<title>arkham-starter.com | Deck Submission</title>
</svelte:head>

<PageTitle title={'Deck Submission'} />

<SvelteMarkdown source={mdText} />
