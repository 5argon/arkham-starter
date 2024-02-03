<script lang="ts">
	import type { GameComponent } from '$lib/core/campaign'
	import { textIconFontClass, textIconToFontCharacter } from '$lib/design/interface/text-icon'
	import { gameComponentToString, gameComponentToTextIcon } from './helper'

	export let gameComponent: GameComponent
	$: textIcon = gameComponentToTextIcon(gameComponent)
</script>

{#if textIcon !== null}
	<span class={textIconFontClass}>{textIconToFontCharacter(textIcon)}</span>
{/if}
<span>{gameComponentToString(gameComponent)}</span>
