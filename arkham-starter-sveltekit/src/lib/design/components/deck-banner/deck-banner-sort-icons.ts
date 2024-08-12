import { CardPack } from '$lib/design/interface/card-pack'

export function sortIcons(icons: CardPack[], investigatorPack: CardPack): CardPack[] {
	const newArray = [...icons]
	newArray.sort((a, b) => {
		if (a === investigatorPack) {
			// Pack that investigator came from always come first.
			return -1
		}
		if (
			a === CardPack.NathanielCho ||
			a === CardPack.HarveyWalters ||
			a === CardPack.WinifredHabbamock ||
			a === CardPack.JacquelineFine ||
			a === CardPack.StellaClark
		) {
			// Starter pack always come last.
			return 1
		}
		return a - b
	})
	return newArray
}
