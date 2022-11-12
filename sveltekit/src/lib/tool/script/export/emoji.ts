import { CardClass } from '$lib/core/card-class'

export function getClassIconEmoji(c: CardClass): string {
	switch (c) {
		case CardClass.Guardian:
			return '🔵'
		case CardClass.Seeker:
			return '🟠'
		case CardClass.Rogue:
			return '🟢'
		case CardClass.Mystic:
			return '🟣'
		case CardClass.Survivor:
			return '🔴'
		case CardClass.Neutral:
			return '⚪️'
		default:
			return ''
	}
}
