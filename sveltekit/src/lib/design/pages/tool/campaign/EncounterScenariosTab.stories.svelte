<script>
	import Story from '$lib/design/story/story.svelte'
	import EncounterScenariosTab from './EncounterScenariosTab.svelte'
	import { allCampaigns } from '$lib/campaign/all-campaign'
	import { EncounterSetSorting } from '$lib/core/campaign'
</script>

<Story name="Test">
	<EncounterScenariosTab campaign={allCampaigns[1]} sorting={EncounterSetSorting.Alphabetical} />
</Story>
