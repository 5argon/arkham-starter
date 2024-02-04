<script lang="ts">
	import { edgeOfTheEarthCampaign } from '$lib/campaign/eote/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
</script>

<EncounterOverview campaign={edgeOfTheEarthCampaign} />
