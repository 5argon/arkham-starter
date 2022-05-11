import { CardClass } from '$lib/core/card-class'

export const ahdbIcons = {
	guardian: '<span class="icon-guardian"></span>',
	survivor: '<span class="icon-survivor"></span>',
	rogue: '<span class="icon-rogue"></span>',
	mystic: '<span class="icon-mystic"></span>',
	seeker: '<span class="icon-seeker"></span>',

	combat: '<span class="icon-combat"></span>',
	intellect: '<span class="icon-intellect"></span>',
	agility: '<span class="icon-agility"></span>',
	willpower: '<span class="icon-willpower"></span>',
	wild: '<span class="icon-wild"></span>',

	skull: '<span class="icon-skull"></span>',
	tablet: '<span class="icon-tablet"></span>',
	elderThing: '<span class="icon-elder_thing"></span>',
	cultist: '<span class="icon-cultist"></span>',

	elderSign: '<span class="icon-elder_sign"></span>',
	autoFail: '<span class="icon-auto_fail"></span>',
}

function getClassIcon(c: CardClass): string {
	switch (c) {
		case CardClass.Guardian:
			return ahdbIcons.guardian
		case CardClass.Seeker:
			return ahdbIcons.seeker
		case CardClass.Rogue:
			return ahdbIcons.rogue
		case CardClass.Mystic:
			return ahdbIcons.mystic
		case CardClass.Survivor:
			return ahdbIcons.survivor
		case CardClass.Neutral:
			return ''
		default:
			return ''
	}
}

export function prefixClassIcons(
	text: string,
	c1: CardClass,
	c2: CardClass | null,
	c3: CardClass | null,
): string {
	return `${getClassIcon(c1)}${c2 !== null ? getClassIcon(c2) : ''}${
		c3 !== null ? getClassIcon(c3) : ''
	} ${text}`
}

export function wrapCard(text: string, card: string): string {
	return `[${text}](/card/${card})`
}

export function wrapSmall(text: string, ignore?: boolean): string {
	if (ignore === true) {
		return text
	}
	return `<span class="small">${text}</span>`
}

export function wrapColor(
	text: string,
	c1: CardClass,
	c2: CardClass | null,
	c3: CardClass | null,
	small?: boolean,
): string {
	const smallString = small ? ' small' : ''
	if (c2 === null && c3 === null) {
		switch (c1) {
			case CardClass.Guardian:
				return `<span class="fg-guardian${smallString}">${text}</span>`
			case CardClass.Seeker:
				return `<span class="fg-seeker${smallString}">${text}</span>`
			case CardClass.Rogue:
				return `<span class="fg-rogue${smallString}">${text}</span>`
			case CardClass.Mystic:
				return `<span class="fg-mystic${smallString}">${text}</span>`
			case CardClass.Survivor:
				return `<span class="fg-survivor${smallString}">${text}</span>`
			case CardClass.Neutral:
				return `<span class="fg-neutral${smallString}">${text}</span>`
			default:
				return `<span class="fg-neutral${smallString}">${text}</span>`
		}
	} else {
		return `<span class="fg-dual${smallString}">${text}</span>`
	}
}

export function wrapPips(s: string): string {
	// Cause trouble inside table...
	return '<span class="card-xp">' + s + '</span>'
}

export function wrapLeftBorder(
	text: string,
	c1: CardClass,
	c2: CardClass | null,
	c3: CardClass | null,
): string {
	if (c2 === null && c3 === null) {
		switch (c1) {
			case CardClass.Guardian:
				return `<div class="card-text border-guardian"><p>${text}</p></span>`
			case CardClass.Seeker:
				return `<div class="card-text border-seeker"><p>${text}</p></span>`
			case CardClass.Rogue:
				return `<div class="card-text border-rogue"><p>${text}</p></span>`
			case CardClass.Mystic:
				return `<div class="card-text border-mystic"><p>${text}</p></span>`
			case CardClass.Survivor:
				return `<div class="card-text border-survivor"><p>${text}</p></span>`
			case CardClass.Neutral:
				return `<div class="card-text border-neutral"><p>${text}</p></span>`
		}
	} else {
		return `<div class="card-text border-dual"><p>${text}</p></span>`
	}
}
