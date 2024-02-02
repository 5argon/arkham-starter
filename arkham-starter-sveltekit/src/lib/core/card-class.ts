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
			return 'Neutral'
		default:
			return ''
	}
}

export function classCodeToCardClass(c: string): CardClass {
	switch (c) {
		case 'guardian':
			return CardClass.Guardian
		case 'seeker':
			return CardClass.Seeker
		case 'rogue':
			return CardClass.Rogue
		case 'mystic':
			return CardClass.Mystic
		case 'survivor':
			return CardClass.Survivor
		case 'neutral':
			return CardClass.Neutral
		default:
			return CardClass.Neutral
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
