<script lang="ts">
	import { returnToTheDunwichLegacyCampaign } from '$lib/campaign/dwl/campaign'
import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
</script>

<EncounterOverview campaign={returnToTheDunwichLegacyCampaign} />
