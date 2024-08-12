import { CardPack } from '$lib/design/interface/card-pack'

export function packToFile(pack: CardPack): string | null {
	switch (pack) {
		case CardPack.CoreSet:
			return 'core'
		case CardPack.RevisedCoreSet:
			return 'core'
		case CardPack.TheDunwichLegacy:
			return 'dwl'
		case CardPack.ThePathToCarcosa:
			return 'ptc'
		case CardPack.TheForgottenAge:
			return 'tfa'
		case CardPack.TheCircleUndone:
			return 'tcu'
		case CardPack.TheDreamEaters:
			return 'tde'
		case CardPack.TheInnsmouthConspiracy:
			return 'tic'
		case CardPack.EdgeOfTheEarth:
			return 'eote'
		case CardPack.TheScarletKeys:
			return 'tsk'
		case CardPack.TheFeastOfHemlockVale:
			return 'fhv'
		case CardPack.TheDrownedCity:
			return 'tdc'
		case CardPack.NathanielCho:
			return 'nat'
		case CardPack.HarveyWalters:
			return 'har'
		case CardPack.WinifredHabbamock:
			return 'win'
		case CardPack.JacquelineFine:
			return 'jac'
		case CardPack.StellaClark:
			return 'ste'
		case CardPack.ReturnToTheDunwichLegacy:
			return 'rtdwl'
		case CardPack.ReturnToThePathToCarcosa:
			return 'rtptc'
		case CardPack.ReturnToTheForgottenAge:
			return 'rttfa'
		case CardPack.ReturnToTheCircleUndone:
			return 'rttcu'
		case CardPack.ParallelInvestigator:
			return 'par'
		default:
			return null
	}
}
