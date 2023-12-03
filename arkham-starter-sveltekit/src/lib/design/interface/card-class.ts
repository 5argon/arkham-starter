import { CardClass } from '$lib/core/card-class'
export { CardClass }

export function classToFontColorCss(
	c1: CardClass | null,
	c2: CardClass | null,
	c3: CardClass | null,
): string {
	const notNullCount = (c1 !== null ? 1 : 0) + (c2 !== null ? 1 : 0) + (c3 !== null ? 1 : 0)
	if (notNullCount > 1) {
		return 'font-multiclass'
	}
	if (notNullCount === 0) {
		return ''
	}
	switch (c1) {
		case CardClass.Neutral:
			return 'font-neutral'
		case CardClass.Guardian:
			return 'font-guardian'
		case CardClass.Seeker:
			return 'font-seeker'
		case CardClass.Rogue:
			return 'font-rogue'
		case CardClass.Mystic:
			return 'font-mystic'
		case CardClass.Survivor:
			return 'font-survivor'
		default:
			return ''
	}
}

export function classToBorderColorCss(
	c1: CardClass | null,
	c2: CardClass | null,
	c3: CardClass | null,
): string {
	const notNullCount = (c1 !== null ? 1 : 0) + (c2 !== null ? 1 : 0) + (c3 !== null ? 1 : 0)
	if (notNullCount > 1) {
		return 'border-color-multiclass'
	}
	if (notNullCount === 0) {
		return 'border-color-neutral'
	}
	switch (c1) {
		case CardClass.Neutral:
			return 'border-color-neutral'
		case CardClass.Guardian:
			return 'border-color-guardian'
		case CardClass.Seeker:
			return 'border-color-seeker'
		case CardClass.Rogue:
			return 'border-color-rogue'
		case CardClass.Mystic:
			return 'border-color-mystic'
		case CardClass.Survivor:
			return 'border-color-survivor'
		default:
			return 'border-color-neutral'
	}
}
