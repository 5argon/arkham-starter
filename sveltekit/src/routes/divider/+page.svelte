<script lang="ts">
	import MarkdownImage from '$lib/design/components/basic/MarkdownImage.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import helpMd from '$lib/md/divider.md?raw'
	import SvelteMarkdown from 'svelte-markdown'
</script>

<svelte:head>
	<title>arkham-starter.com | The 3mm Divider</title>
</svelte:head>

<PageTitle title={'The 3mm Divider'} />

<SvelteMarkdown renderers={{ image: MarkdownImage }} source={helpMd} />