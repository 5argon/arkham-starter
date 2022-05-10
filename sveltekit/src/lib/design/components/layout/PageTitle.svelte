<script lang="ts">
	import { allIcons } from '$lib/design/icons/all-icons'

	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import SvelteMarkdown from 'svelte-markdown'
	import Modal from './Modal.svelte'

	export let title: string
	export let helpMd: string | null = null
	let openModal: boolean = false
</script>

<div>
	<h1 class="inline-block"><a href="/">arkham-starters.com</a> | {title}</h1>
	{#if helpMd !== null}
		<Modal
			onClose={() => {
				openModal = false
			}}
			show={openModal}
		>
			<SvelteMarkdown source={helpMd} />
		</Modal>
		<span on:click={() => (openModal = true)}><FaIcon big path={allIcons.manual} /></span>
	{/if}
</div>

<style>
	.inline-block {
		display: inline-block;
	}

	a {
		color: black;
	}

	span {
		margin-left: 4px;
		cursor: pointer;
	}
</style>
