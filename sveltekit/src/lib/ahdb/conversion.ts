import { CardClass } from '$lib/core/card-class'
import { CardPack } from '$lib/core/card-pack'

/**
 * Hard coded name of each pack.
 */
export function iconToNameConversion(c: CardPack): string {
	switch (c) {
		case CardPack.CoreSet:
			return 'Core Set'
		case CardPack.RevisedCoreSet:
			return 'Revised Core Set'
		case CardPack.NathanielCho:
			return 'Nathaniel Cho'
		case CardPack.HarveyWalters:
			return 'Harvey Walters'
		case CardPack.WinifredHabbamock:
			return 'Winifred Habbamock'
		case CardPack.JacquelineFine:
			return 'Jacqueline Fine'
		case CardPack.StellaClark:
			return 'Stella Clark'

		case CardPack.EdgeOfTheEarth:
			return 'Edge of the Earth Investigator Expansion'
		case CardPack.TheScarletKeys:
			return 'The Scarlet Keys Investigator Expansion'

		case CardPack.ReturnToTheNightOfTheZealot:
			return 'Return To the Night of the Zealot'
		case CardPack.ReturnToTheDunwichLegacy:
			return 'Return To the Dunwich Legacy'
		case CardPack.ReturnToThePathToCarcosa:
			return 'Return To the Path to Carcosa'
		case CardPack.ReturnToTheCircleUndone:
			return 'Return To the Circle Undone'
		case CardPack.ReturnToTheForgottenAge:
			return 'Return To the Forgotten Age'
		case CardPack.ReturnToTheDreamEaters:
			return 'Return To the Dream-Eaters'
		case CardPack.ReturnToTheInnsmouthConspiracy:
			return 'Return To the Innsmouth Conspiracy'
		default:
			return iconToNewNameConversion(c) ?? ''
	}
}

export function iconToNewNameConversion(c: CardPack): string | null {
	switch (c) {
		case CardPack.Unknown:
			return '(Unknown Set)'
		case CardPack.RandomBasicWeakness:
			return 'Random Basic Weakness'
		case CardPack.CoreSet:
			break
		case CardPack.RevisedCoreSet:
			break
		case CardPack.ParallelInvestigator:
			return 'Parallel Investigator'
		case CardPack.Novella:
			return 'Novella'

		case CardPack.NathanielCho:
			break
		case CardPack.HarveyWalters:
			break
		case CardPack.WinifredHabbamock:
			break
		case CardPack.JacquelineFine:
			break
		case CardPack.StellaClark:
			break

		case CardPack.TheDunwichLegacy:
			return 'The Dunwich Legacy Investigator Expansion'
		case CardPack.ThePathToCarcosa:
			return 'The Path to Carcosa Investigator Expansion'
		case CardPack.TheForgottenAge:
			return 'The Forgotten Age Investigator Expansion'
		case CardPack.TheCircleUndone:
			return 'The Circle Undone Investigator Expansion'
		case CardPack.TheDreamEaters:
			return 'The Dream-Eaters Investigator Expansion'
		case CardPack.TheInnsmouthConspiracy:
			return 'The Innsmouth Conspiracy Investigator Expansion'

		case CardPack.ReturnToTheNightOfTheZealot:
			break
		case CardPack.ReturnToTheDunwichLegacy:
			break
		case CardPack.ReturnToThePathToCarcosa:
			break
		case CardPack.ReturnToTheCircleUndone:
			break
		case CardPack.ReturnToTheForgottenAge:
			break
		case CardPack.ReturnToTheDreamEaters:
			break
		case CardPack.ReturnToTheInnsmouthConspiracy:
			break
	}
	return null
}

export function packCodeToIconConversion(p: string): CardPack {
	switch (p) {
		case 'unk':
			return CardPack.Unknown
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
			return CardPack.TheInnsmouthConspiracy
		case 'eoep':
			return CardPack.EdgeOfTheEarth
		case 'tskp':
			return CardPack.TheScarletKeys

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
		case 'rttde':
			return CardPack.ReturnToTheDreamEaters
		case 'rttic':
			return CardPack.ReturnToTheInnsmouthConspiracy
		default:
			return CardPack.Unknown
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

export function coreToRcore(cardId: string): string {
	if (cardId in coreToRcoreMap) {
		return coreToRcoreMap[cardId]
	}
	return cardId
}

export function rcoreToCore(cardId: string): string {
	const flip = Object.fromEntries(
		Object.entries(coreToRcoreMap).map(([k, v]) => {
			return [v, k]
		}),
	)
	if (cardId in flip) {
		return flip[cardId]
	}
	return cardId
}

const coreToRcoreMap: { [k: string]: string } = {
	'01001': '01501',
	'01002': '01502',
	'01003': '01503',
	'01004': '01504',
	'01005': '01505',
	'01006': '01506',
	'01007': '01507',
	'01008': '01508',
	'01009': '01509',
	'01010': '01510',
	'01011': '01511',
	'01012': '01512',
	'01013': '01513',
	'01014': '01514',
	'01015': '01515',
	'01016': '01516',
	'01017': '01517',
	'01018': '01518',
	'01019': '01519',
	'01020': '01520',
	'01021': '01521',
	'01022': '01522',
	'01023': '01523',
	'01024': '01524',
	'01025': '01525',
	'01026': '01526',
	'01027': '01527',
	'01028': '01528',
	'01029': '01529',
	'01030': '01530',
	'01031': '01531',
	'01032': '01532',
	'01033': '01533',
	'01034': '01534',
	'01035': '01535',
	'01036': '01536',
	'01037': '01537',
	'01038': '01538',
	'01039': '01539',
	'01040': '01540',
	'01041': '01541',
	'01042': '01542',
	'01043': '01543',
	'01044': '01544',
	'01045': '01545',
	'01046': '01546',
	'01047': '01547',
	'01048': '01548',
	'01049': '01549',
	'01050': '01550',
	'01051': '01551',
	'01052': '01552',
	'01053': '01553',
	'01054': '01554',
	'01055': '01555',
	'01056': '01556',
	'01057': '01557',
	'01058': '01558',
	'01059': '01559',
	'01060': '01560',
	'01061': '01561',
	'01062': '01562',
	'01063': '01563',
	'01064': '01564',
	'01065': '01565',
	'01066': '01566',
	'01067': '01567',
	'01068': '01568',
	'01069': '01569',
	'01070': '01570',
	'01071': '01571',
	'01072': '01572',
	'01073': '01573',
	'01074': '01574',
	'01075': '01575',
	'01076': '01576',
	'01077': '01577',
	'01078': '01578',
	'01079': '01579',
	'01080': '01580',
	'01081': '01581',
	'01082': '01582',
	'01083': '01583',
	'01084': '01584',
	'01085': '01585',
	'01086': '01586',
	'01087': '01587',
	'01088': '01588',
	'01089': '01589',
	'01090': '01590',
	'01091': '01591',
	'01092': '01592',
	'01093': '01593',
	'01094': '01594',
	'01095': '01595',
	'01096': '01596',
	'01097': '01597',
	'01098': '01598',
	'01099': '01599',
	'01100': '01600',
	'01101': '01601',
	'01102': '01602',
	'01103': '01603',
}
