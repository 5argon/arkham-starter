<script lang="ts">
	import { theDunwichLegacyCampaign } from '$lib/campaign/dwl/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle title={'Campaign Reference: ' + theDunwichLegacyCampaign.name} helpMd={help} />

<EncounterOverview campaign={theDunwichLegacyCampaign} />
