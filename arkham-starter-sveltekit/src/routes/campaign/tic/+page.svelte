<script lang="ts">
	import { theInnsmouthConspiracyCampaign } from '$lib/campaign/tic/campaign'
import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
</script>

<EncounterOverview campaign={theInnsmouthConspiracyCampaign} incomplete />
