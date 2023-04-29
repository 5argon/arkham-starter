export enum CardClass {
	Guardian,
	Seeker,
	Rogue,
	Mystic,
	Survivor,
	Neutral,
}

export function cardClassToName(c: CardClass): string {
	switch (c) {
		case CardClass.Guardian:
			return 'Guardian'
		case CardClass.Seeker:
			return 'Seeker'
		case CardClass.Rogue:
			return 'Rogue'
		case CardClass.Mystic:
			return 'Mystic'
		case CardClass.Survivor:
			return 'Survivor'
		case CardClass.Neutral:
			return 'Survivor'
		default:
			return ''
	}
}

export function cardClassToBackgroundClass(c: CardClass): string {
	switch (c) {
		case CardClass.Guardian:
			return 'background-color-guardian'
		case CardClass.Seeker:
			return 'background-color-seeker'
		case CardClass.Rogue:
			return 'background-color-rogue'
		case CardClass.Mystic:
			return 'background-color-mystic'
		case CardClass.Survivor:
			return 'background-color-survivor'
		default:
			return 'background-color-neutral'
	}
}
