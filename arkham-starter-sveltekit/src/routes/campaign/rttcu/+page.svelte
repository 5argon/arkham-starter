<script lang="ts">
	import { returnToTheCircleUndoneCampaign } from '$lib/campaign/tcu/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
</script>

<EncounterOverview campaign={returnToTheCircleUndoneCampaign} incomplete />
