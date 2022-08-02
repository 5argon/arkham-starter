<script>
	import Story from '$lib/design/story/story.svelte'
	import EncounterMatrixTab from './EncounterMatrixTab.svelte'
	import { allCampaigns } from '$lib/campaign/all-campaign'
</script>

<Story name="Test">
	<EncounterMatrixTab campaign={allCampaigns[1]} />
</Story>
