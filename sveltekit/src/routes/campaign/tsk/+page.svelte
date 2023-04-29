<script lang="ts">
	import { theScarletKeysCampaign } from '$lib/campaign/tsk/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle title={'Campaign Reference: ' + theScarletKeysCampaign.name} helpMd={help} />

<EncounterOverview campaign={theScarletKeysCampaign}/>
