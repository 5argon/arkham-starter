<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import mdText from '$lib/md/submission.md?raw'
</script>

<svelte:head>
	<title>arkham-starter.com | Deck Submission</title>
</svelte:head>

<PageTitle title={'Deck Submission'} />

<SvelteMarkdown source={mdText} />
