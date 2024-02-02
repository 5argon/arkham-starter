<script>
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import Button from '../basic/Button.svelte'
	import TeamSlot from './top-bar/TeamSlot.svelte'
	import TopBarButton from './top-bar/TopBarButton.svelte'
</script>

<div class="pane">
	<div class="left">
		<!-- svelte-ignore a11y-missing-attribute -->
		<img class="intellect" src="/image/icon/stat/intellect.png" />
		<div class="text">arkham-starter.com</div>
		<div><TopBarButton text="Home" link="/" /></div>
		<!-- <div><TopBarButton text="Browse Starter Decks" link="/" /></div> -->
		<!-- <div><TopBarButton text="Resources and Tools" link="/resource" /></div> -->
	</div>
	<div class="right">
		<!-- <div class="text">Current Team</div>
		<TeamSlot index={0} />
		<TeamSlot index={1} />
		<TeamSlot index={2} />
		<TeamSlot index={3} />
		<Button label="View Team" onClick={() => {}}><FaIcon path={allIcons.expand} /></Button> -->
	</div>
</div>

<style>
	.pane {
		display: flex;
		padding: 2px;
		border: 1px solid black;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.text {
		font-weight: bold;
		margin: 6px 4px;
	}

	.intellect {
		width: 16px;
		height: 16px;
		margin: 0px 8px;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.right {
		display: flex;
		align-items: center;
	}
</style>
