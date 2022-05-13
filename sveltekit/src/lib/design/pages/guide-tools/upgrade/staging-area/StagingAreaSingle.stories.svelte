<script lang="ts">
	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import Story from '$lib/design/story/story.svelte'
	import { GlobalSettings_PipStyle } from '$lib/proto/generated/global_settings'
	import StagingAreaSingle from './StagingAreaSingle.svelte'

	const pdbp = fetchPopupDatabase()
</script>

{#await pdbp then pdb}
	<Story name="Test">
		<StagingAreaSingle
			label={'Staging Test'}
			globalSettings={{ pipStyle: GlobalSettings_PipStyle.PipsReal, taboo: true }}
			popupDatabase={pdb}
			stagingCards={[
				'01000',
				'01550',
				'01553',
				'01572',
				'01573',
				'01574',
				'01575',
				'01579',
				'01580',
				'01586',
				'01587',
				'01593',
				'08017',
				'08018',
				'08047',
				'08071',
				'08072',
				'08073',
				'08074',
				'08097',
				'08104',
				'08112',
				'08116',
				'08126',
			]}
		/>
	</Story>
{/await}
