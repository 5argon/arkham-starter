<script lang="ts">
	import { edgeOfTheEarthCampaign } from '$lib/campaign/eote/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle title={'Campaign Reference: ' + edgeOfTheEarthCampaign.name} helpMd={help} />

<EncounterOverview campaign={edgeOfTheEarthCampaign} />
