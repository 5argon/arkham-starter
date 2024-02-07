<script lang="ts">
	import Story from '../../story/story.svelte'
	import Modal from './Modal.svelte'

	let showing: boolean = true
</script>

<Story name="Test">
	<Modal
		onClose={() => {
			showing = false
		}}
		show={showing}
		title="Modal Title">Hello World</Modal
	>
</Story>
