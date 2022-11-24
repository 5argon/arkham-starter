<script lang="ts">
	import { theDreamEatersCampaign } from '$lib/campaign/tde/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle title={'Campaign Reference: ' + theDreamEatersCampaign.name} helpMd={help} />

<EncounterOverview campaign={theDreamEatersCampaign} incomplete />
