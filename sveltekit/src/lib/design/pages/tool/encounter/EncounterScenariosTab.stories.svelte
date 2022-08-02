<script>
	import Story from '$lib/design/story/story.svelte'
	import EncounterScenariosTab from './EncounterScenariosTab.svelte'
	import { allCampaigns } from '$lib/campaign/all-campaign'
</script>

<Story name="Test">
	<EncounterScenariosTab campaign={allCampaigns[1]} />
</Story>
