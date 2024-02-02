import { CardPackIcon } from '$lib/design/interface/card-pack'

export function packToFile(pack: CardPackIcon): string | null {
	switch (pack) {
		case CardPackIcon.CoreSet:
			return 'core'
		case CardPackIcon.RevisedCoreSet:
			return 'core'
		case CardPackIcon.TheDunwichLegacy:
			return 'dwl'
		case CardPackIcon.ThePathToCarcosa:
			return 'ptc'
		case CardPackIcon.TheForgottenAge:
			return 'tfa'
		case CardPackIcon.TheCircleUndone:
			return 'tcu'
		case CardPackIcon.TheDreamEaters:
			return 'tde'
		case CardPackIcon.TheInnsmouthConspiracy:
			return 'tic'
		case CardPackIcon.EdgeOfTheEarth:
			return 'eote'
		case CardPackIcon.TheScarletKeys:
			return 'tsk'
		case CardPackIcon.TheFeastOfHemlockVale:
			return 'fhv'
		case CardPackIcon.NathanielCho:
			return 'nat'
		case CardPackIcon.HarveyWalters:
			return 'har'
		case CardPackIcon.WinifredHabbamock:
			return 'win'
		case CardPackIcon.JacquelineFine:
			return 'jac'
		case CardPackIcon.StellaClark:
			return 'ste'
		default:
			return null
	}
}
