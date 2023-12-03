<script lang="ts">
	import { theCircleUndoneCampaign } from '$lib/campaign/tcu/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle title={'Campaign Reference: ' + theCircleUndoneCampaign.name} helpMd={help} />

<EncounterOverview campaign={theCircleUndoneCampaign} incomplete />
