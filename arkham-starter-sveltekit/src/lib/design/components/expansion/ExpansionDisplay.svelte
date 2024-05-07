<script lang='ts'>
  import { goto } from '$app/navigation'
  import type { CardPack } from '$lib/core/card-pack'
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
  export let onClick: ((cardPack: CardPack) => void) | undefined = undefined
  export let campaign: boolean = false
  export let disabled: boolean = false

  let backgroundImageString: string = ''
  $: {
    const file = packToFile(set)
    if (file && !disabled) {
      backgroundImageString = `background-image: url(/image/expansion/${campaign ? 'campaign' : 'investigator'}/${file}.webp);`
    } else {
      backgroundImageString = ''
    }
  }
</script>

<button
  class='frame'
  class:frame-disabled={disabled}
  style={backgroundImageString}
  on:click={() => {
		if (onClick) {
			onClick(set)
		} else if (link) {
			goto(link)
		}
	}}
>
		<span class='overlay-color'>
			<div class='inner-frame' class:inner-frame-disabled={disabled}>
				<div class='flex-icon-text'>
					<img
            class='pack-icon'
            alt='pack icon'
            src={campaign
							? getCampaignStaticUrl(set, disabled ? CardPackIconColor.Black :  CardPackIconColor.White)
							: getPackStaticUrl(set, disabled? CardPackIconColor.Black : CardPackIconColor.White)}
          />
					<div class:disabled-text={disabled}>
						<div class='text'>{text}</div>
            {#if subText}
							<div class='sub-text'>{subText}</div>
						{/if}
					</div>
				</div>
			</div>
		</span>
</button>

<style>
    .frame {
        border: 1px solid black;
        margin: 2px 2px;
        padding: 0;
        background-size: cover;
        background-color: rgba(0, 0, 0, 0);
    }

    .frame-disabled {
        background-image: none;
    }

    .frame:hover {
        cursor: pointer;
    }

    .overlay-color {
        color: white;
        width: 230px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .overlay-color:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .inner-frame {
        background-color: rgba(0, 0, 0, 0.7);
        padding: 0px 6px;
    }

    .inner-frame-disabled {
        background-color: rgba(0, 0, 0, 0);
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

    .disabled-text {
        color: rgb(147, 147, 147);
    }
</style>
