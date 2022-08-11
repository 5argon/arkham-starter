<script>
	import Story from '$lib/design/story/story.svelte'
	import EncounterOverview from './EncounterOverview.svelte'
	import { allCampaigns } from '$lib/campaign/all-campaign'
</script>

<Story name="Test">
	<EncounterOverview campaign={allCampaigns[1]}  />
</Story>
