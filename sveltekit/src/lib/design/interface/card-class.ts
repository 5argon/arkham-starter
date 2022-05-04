export enum CardClass {
	Neutral,
	Guardian,
	Seeker,
	Rogue,
	Mystic,
	Survivor,
}

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
			return ''
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
