<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'

	import MarkdownImage from '$lib/design/components/basic/MarkdownImage.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import helpMd from '$lib/md/divider-cut.md?raw'
</script>

<svelte:head>
	<title>arkham-starter.com | The 3mm Divider : Cutting Tips</title>
</svelte:head>

<PageTitle title={'The 3mm Divider : Cutting Tips'} />

<SvelteMarkdown renderers={{ image: MarkdownImage }} source={helpMd} />