<script lang="ts">
	import { returnToTheNightOfTheZealotCampaign } from '$lib/campaign/notz/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
</script>

<EncounterOverview campaign={returnToTheNightOfTheZealotCampaign} incomplete />
