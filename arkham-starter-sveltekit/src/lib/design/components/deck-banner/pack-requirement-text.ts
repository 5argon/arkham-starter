import { CardPack } from '$lib/design/interface/card-pack'

export function createPackRequirementText(icons: CardPack[]): string {
	let useStarter = false
	const nonStarter: CardPack[] = []
	icons.forEach((x) => {
		if (
			x === CardPack.NathanielCho ||
			x === CardPack.HarveyWalters ||
			x === CardPack.WinifredHabbamock ||
			x === CardPack.JacquelineFine ||
			x === CardPack.StellaClark
		) {
			useStarter = true
		} else {
			nonStarter.push(x)
		}
	})
	if (nonStarter.length === 0) {
		return 'Only Revised Core Set'
	} else if (nonStarter.length === 1) {
		return '1 Expansion'
	} else if (nonStarter.length >= 3) {
		return nonStarter.length + ' Expansions'
	} else if (useStarter) {
		return nonStarter.length + ' Expansions + Starter'
	} else {
		return nonStarter.length + ' Expansions'
	}
}
