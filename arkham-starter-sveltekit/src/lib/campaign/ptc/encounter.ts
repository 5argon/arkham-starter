import { EncounterSetFlag, type EncounterSet } from '$lib/core/campaign'

const folder = 'The Path to Carcosa/'
const scenario = 'Scenarios/'
const returnTo = 'Return to the Path to Carcosa/'

export const curtainCall: EncounterSet = {
	name: 'Curtain Call',
	count: 20,
	icon: folder + scenario + 'TPtC 1 - Curtain Call',
	flag: EncounterSetFlag.Scenario,
}

export const theLastKing: EncounterSet = {
	name: 'The Last King',
	count: 25,
	icon: folder + scenario + 'TPtC 2 - The Last King',
	flag: EncounterSetFlag.Scenario,
}

export const echoesOfThePast: EncounterSet = {
	name: 'Echoes of the Past',
	count: 32,
	icon: folder + scenario + 'TPtC 3 - Echoes of the Past',
	flag: EncounterSetFlag.Scenario,
}

export const theUnspeakableOath: EncounterSet = {
	name: 'The Unspeakable Oath',
	count: 36,
	icon: folder + scenario + 'TPtC 4 - The Unspeakable Oath',
	flag: EncounterSetFlag.Scenario,
}

export const aPhantomOfTruth: EncounterSet = {
	name: 'A Phantom of Truth',
	count: 38,
	icon: folder + scenario + 'TPtC 5 - A Phantom of Truth',
	flag: EncounterSetFlag.Scenario,
}

export const thePallidMask: EncounterSet = {
	name: 'The Pallid Mask',
	count: 36,
	icon: folder + scenario + 'TPtC 6 - The Pallid Mask',
	flag: EncounterSetFlag.Scenario,
}

export const blackStarsRise: EncounterSet = {
	name: 'Black Stars Rise',
	count: 38,
	icon: folder + scenario + 'TPtC 7 - Black Stars Rise',
	flag: EncounterSetFlag.Scenario,
}

export const dimCarcosa: EncounterSet = {
	name: 'Dim Carcosa',
	count: 36,
	icon: folder + scenario + 'TPtC 8 - Dim Carcosa',
	flag: EncounterSetFlag.Scenario,
}

export const byakhee: EncounterSet = {
	name: 'Byakhee',
	count: 4,
	icon: folder + 'Byakhee',
}

export const cultOfTheYellowSign: EncounterSet = {
	name: 'Cult of the Yellow Sign',
	count: 6,
	icon: folder + 'Cult of the Yellow Sign',
}

export const decayAndFilth: EncounterSet = {
	name: 'Decay & Filth',
	count: 6,
	icon: folder + 'Decay and Filth',
}

export const delusions: EncounterSet = {
	name: 'Delusions',
	count: 6,
	icon: folder + 'Delusions',
}

export const evilPortents: EncounterSet = {
	name: 'Evil Portents',
	count: 6,
	icon: folder + 'Evil Portents',
}

export const hastursGift: EncounterSet = {
	name: "Hastur's Gift",
	count: 6,
	icon: folder + "Hastur's Gift",
}

export const hauntings: EncounterSet = {
	name: 'Hauntings',
	count: 4,
	icon: folder + 'Hauntings',
}

export const inhabitantsOfCarcosa: EncounterSet = {
	name: 'Inhabitants of Carcosa',
	count: 3,
	icon: folder + 'Inhabitants of Carcosa',
}

export const theStranger: EncounterSet = {
	name: 'The Stranger',
	count: 3,
	icon: folder + 'The Stranger',
}

export const returnToCurtainCall: EncounterSet = {
	name: 'Return to Curtain Call',
	count: 7,
	icon: folder + returnTo + scenario + 'TPtC R-1 - Curtain Call',
	flag: EncounterSetFlag.Scenario,
}

export const returnToTheLastKing: EncounterSet = {
	name: 'Return to the Last King',
	count: 9,
	icon: folder + returnTo + scenario + 'TPtC R-2 - The Last King',
	flag: EncounterSetFlag.Scenario,
}

export const returnToEchoesOfThePast: EncounterSet = {
	name: 'Return to Echoes of the Past',
	count: 7,
	icon: folder + returnTo + scenario + 'TPtC R-3 - Echoes of the Past',
	flag: EncounterSetFlag.Scenario,
}

export const returnToTheUnspeakableOath: EncounterSet = {
	name: 'Return to the Unspeakable Oath',
	count: 6,
	icon: folder + returnTo + scenario + 'TPtC R-4 - The Unspeakable Oath',
	flag: EncounterSetFlag.Scenario,
}

export const returnToAPhantomOfTruth: EncounterSet = {
	name: 'Return to a Phantom of Truth',
	count: 9,
	icon: folder + returnTo + scenario + 'TPtC R-5 - A Phantom of Truth',
	flag: EncounterSetFlag.Scenario,
}

export const returnToThePallidMask: EncounterSet = {
	name: 'Return to the Pallid Mask',
	count: 6,
	icon: folder + returnTo + scenario + 'TPtC R-6 - The Pallid Mask',
	flag: EncounterSetFlag.Scenario,
}

export const returnToBlackStarsRise: EncounterSet = {
	name: 'Return to Black Stars Rise',
	count: 5,
	icon: folder + returnTo + scenario + 'TPtC R-7 - Black Stars Rise',
	flag: EncounterSetFlag.Scenario,
}

export const returnToDimCarcosa: EncounterSet = {
	name: 'Return to Dim Carcosa',
	count: 6,
	icon: folder + returnTo + scenario + 'TPtC R-8 - Dim Carcosa',
	flag: EncounterSetFlag.Scenario,
}

export const delusoryEvils: EncounterSet = {
	name: 'Delusory Evils',
	count: 3,
	icon: folder + returnTo + 'Delusory Evils',
	flag: EncounterSetFlag.ReturnTo,
}

export const decayingReality: EncounterSet = {
	name: 'Decaying Reality',
	count: 6,
	icon: folder + returnTo + 'Decaying Reality',
	flag: EncounterSetFlag.ReturnTo,
}

export const hastursEnvoys: EncounterSet = {
	name: "Hastur's Envoys",
	count: 4,
	icon: folder + returnTo + "Hastur's Envoys",
	flag: EncounterSetFlag.ReturnTo,
}

export const maddeningDelusions: EncounterSet = {
	name: 'Maddening Delusions',
	count: 6,
	icon: folder + returnTo + 'Maddening Delusions',
	flag: EncounterSetFlag.ReturnTo,
}

export const neuroticFear: EncounterSet = {
	name: 'Neurotic Fear',
	count: 7,
	icon: folder + returnTo + 'Neurotic Fear',
	flag: EncounterSetFlag.ReturnTo,
}
