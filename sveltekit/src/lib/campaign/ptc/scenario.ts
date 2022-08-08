import type { Scenario } from '$lib/core/campaign'
import {
	agentsOfHastur,
	ancientEvils,
	chillingCold,
	darkCult,
	ghouls,
	lockedDoors,
	rats,
	strikingFear,
	theMidnightMasks,
} from '../core/encounter'
import {
	aPhantomOfTruth,
	blackStarsRise,
	byakhee,
	cultOfTheYellowSign,
	curtainCall,
	decayAndFilth,
	delusions,
	dimCarcosa,
	echoesOfThePast,
	evilPortents,
	hastursGift,
	hauntings,
	inhabitantsOfCarcosa,
	theLastKing,
	thePallidMask,
	theStranger,
	theUnspeakableOath,
} from './encounter'

export const curtainCallScenario: Scenario = {
	index: 1,
	name: 'Curtain Call',
	encounterSets: [
		curtainCall,
		rats,
		strikingFear,
		cultOfTheYellowSign,
		delusions,
		evilPortents,
		hauntings,
	],
}

export const theLastKingScenario: Scenario = {
	index: 2,
	name: 'The Last King',
	encounterSets: [theLastKing, ancientEvils, decayAndFilth, hastursGift, theStranger],
}

export const echoesOfThePastScenario: Scenario = {
	index: 3,
	name: 'Echoes of the Past',
	encounterSets: [
		echoesOfThePast,
		darkCult,
		lockedDoors,
		{ encounterSet: theMidnightMasks, overwriteCount: 5 },
		cultOfTheYellowSign,
		delusions,
	],
}

export const theUnspeakableOathScenario: Scenario = {
	index: 4,
	name: 'The Unspeakable Oath',
	encounterSets: [
		theUnspeakableOath,
		agentsOfHastur,
		decayAndFilth,
		delusions,
		hastursGift,
		inhabitantsOfCarcosa,
	],
}

export const aPhantomOfTruthScenario: Scenario = {
	index: 5,
	name: 'A Phantom of Truth',
	encounterSets: [
		aPhantomOfTruth,
		agentsOfHastur,
		{ encounterSet: theMidnightMasks, overwriteCount: 5 },
		byakhee,
		evilPortents,
		theStranger,
	],
}

export const thePallidMaskScenario: Scenario = {
	index: 6,
	name: 'The Pallid Mask',
	encounterSets: [thePallidMask, chillingCold, ghouls, hauntings],
}

export const blackStarsRiseScenario: Scenario = {
	index: 7,
	name: 'Black Stars Rise',
	encounterSets: [
		blackStarsRise,
		ancientEvils,
		darkCult,
		byakhee,
		evilPortents,
		inhabitantsOfCarcosa,
		theStranger,
	],
}

export const dimCarcosaScenario: Scenario = {
	index: 8,
	name: 'Dim Carcosa',
	encounterSets: [
		dimCarcosa,
		agentsOfHastur,
		strikingFear,
		cultOfTheYellowSign,
		delusions,
		inhabitantsOfCarcosa,
	],
}
