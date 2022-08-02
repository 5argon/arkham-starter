<script>
	import Story from '$lib/design/story/story.svelte'
	import EncounterTransitionsTab from './EncounterTransitionsTab.svelte'
	import { allCampaigns } from '$lib/campaign/all-campaign'
</script>

<Story name="Test">
	<EncounterTransitionsTab campaign={allCampaigns[1]} />
</Story>
