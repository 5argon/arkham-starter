import { CardClass } from '$lib/core/card-class'
import { CardPack } from '$lib/core/card-pack'

export function packCodeToIconConversion(p: string): CardPack {
	switch (p) {
		case 'core':
			return CardPack.CoreSet
		case 'rcore':
			return CardPack.RevisedCoreSet
		case 'rod':
		case 'aon':
		case 'bad':
		case 'btb':
		case 'rtr':
			return CardPack.ParallelInvestigator
		case 'books':
		case 'hoth':
		case 'tdor':
		case 'iotv':
		case 'tdg':
		case 'tftbw':
		case 'bob':
		case 'dre':
		case 'promo':
			return CardPack.Novella

		case 'nat':
			return CardPack.NathanielCho
		case 'har':
			return CardPack.HarveyWalters
		case 'win':
			return CardPack.WinifredHabbamock
		case 'jac':
			return CardPack.JacquelineFine
		case 'ste':
			return CardPack.StellaClark

		case 'dwl':
		case 'tmm':
		case 'tece':
		case 'bota':
		case 'uau':
		case 'wda':
		case 'litas':
			return CardPack.TheDunwichLegacy
		case 'ptc':
		case 'eotp':
		case 'tuo':
		case 'apot':
		case 'tpm':
		case 'bsr':
		case 'dca':
			return CardPack.ThePathToCarcosa
		case 'tfa':
		case 'tof':
		case 'tbb':
		case 'hote':
		case 'tcoa':
		case 'tdoy':
		case 'sha':
			return CardPack.TheForgottenAge
		case 'tcu':
		case 'tsn':
		case 'wos':
		case 'fgg':
		case 'uad':
		case 'icc':
		case 'bbt':
			return CardPack.TheCircleUndone
		case 'tde':
		case 'sfk':
		case 'tsh':
		case 'dsm':
		case 'pnr':
		case 'wgd':
		case 'woc':
			return CardPack.TheDreamEaters
		case 'tic':
		case 'itd':
		case 'def':
		case 'hhg':
		case 'lif':
		case 'lod':
		case 'itm':
			return CardPack.TheInsmouthConspiracy
		case 'eoep':
			return CardPack.EdgeOfTheEarth

		case 'rtnotz':
			return CardPack.ReturnToTheNightOfTheZealot
		case 'rtdwl':
			return CardPack.ReturnToTheDunwichLegacy
		case 'rtptc':
			return CardPack.ReturnToThePathToCarcosa
		case 'rttfa':
			return CardPack.ReturnToTheForgottenAge
		case 'rttcu':
			return CardPack.ReturnToTheCircleUndone
		default:
			return CardPack.CoreSet
	}
}

export function classConversion(c: string): CardClass {
	switch (c) {
		case 'neutral':
			return CardClass.Neutral
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
		default:
			return CardClass.Neutral
	}
}
