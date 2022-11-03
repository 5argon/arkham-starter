<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'

	export let pageTitle: string
	export let helpMd: string
	export let queryString: string
</script>

<PageTitle title={pageTitle} {helpMd} />
{queryString}
