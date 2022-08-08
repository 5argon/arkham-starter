<script lang="ts">
	import { thePathToCarcosaCampaign } from '$lib/campaign/ptc/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle subTitle="Tool" title={'Campaign Reference: The Path to Carcosa'} helpMd={help} />

<EncounterOverview campaign={thePathToCarcosaCampaign} incomplete />
