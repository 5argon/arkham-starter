<script lang="ts">
	import {
		CardPackIcon,
		CardPackIconColor,
		getCampaignStaticUrl,
		getPackStaticUrl,
	} from '$lib/design/interface/card-pack'

	import { packToFile } from './pack-to-file'
	export let set: CardPackIcon
	export let text: string
	export let subText: string | undefined = undefined
	export let link: string | undefined = undefined
	export let campaign: boolean = false

	let backgroundImageString: string = ''
	$: {
		const file = packToFile(set)
		if (file) {
			backgroundImageString = `background-image: url(/image/expansion/${campaign ? 'campaign' : 'investigator'}/${file}.webp);`
		} else {
			backgroundImageString = ''
		}
	}
</script>

<div class="frame" style={backgroundImageString}>
	<a href={link}>
		<div class="inner-frame">
			<div class="flex-icon-text">
				<img
					class="pack-icon"
					alt="pack icon"
					src={campaign
						? getCampaignStaticUrl(set, CardPackIconColor.White)
						: getPackStaticUrl(set, CardPackIconColor.White)}
				/>
				<div>
					<div class="text">{text}</div>
					{#if subText}
						<div class="sub-text">{subText}</div>
					{/if}
				</div>
			</div>
		</div>
	</a>
</div>

<style>
	.frame {
		border: 1px solid black;
		color: white;
		margin: 2px 2px;
		width: 230px;
		height: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-size: cover;
	}

	.inner-frame {
		background-color: rgba(0, 0, 0, 0.7);
		padding: 0px 6px;
	}

	.flex-icon-text {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.pack-icon {
		max-width: 20px;
		max-height: 20px;
		padding: 4px 12px 4px 0px;
	}

	.text {
		font-weight: bold;
	}

	.sub-text {
		font-size: x-small;
		text-decoration: none;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
		color: white;
	}
</style>
