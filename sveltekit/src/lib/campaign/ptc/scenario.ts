import type { Scenario } from '$lib/core/campaign'
import { insert_hydration_dev } from 'svelte/internal'
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
} from '../notz/encounter'
import {
	aPhantomOfTruth,
	blackStarsRise,
	byakhee,
	cultOfTheYellowSign,
	curtainCall,
	decayAndFilth,
	decayingReality,
	delusions,
	delusoryEvils,
	dimCarcosa,
	echoesOfThePast,
	evilPortents,
	hastursEnvoys,
	hastursGift,
	hauntings,
	inhabitantsOfCarcosa,
	maddeningDelusions,
	neuroticFear,
	returnToAPhantomOfTruth,
	returnToBlackStarsRise,
	returnToCurtainCall,
	returnToDimCarcosa,
	returnToEchoesOfThePast,
	returnToTheLastKing,
	returnToThePallidMask,
	returnToTheUnspeakableOath,
	theLastKing,
	thePallidMask,
	theStranger,
	theUnspeakableOath,
} from './encounter'

export const curtainCallScenario: Scenario = {
	index: 1,
	name: 'Curtain Call',
	shuffles: [
		{ encounterSet: curtainCall, overwriteCount: 0 },
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
	shuffles: [
		{ encounterSet: theLastKing, overwriteCount: 0 },
		ancientEvils,
		decayAndFilth,
		hastursGift,
		theStranger,
	],
}

export const echoesOfThePastScenario: Scenario = {
	index: 3,
	name: 'Echoes of the Past',
	shuffles: [
		{ encounterSet: echoesOfThePast, overwriteCount: 0 },
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
	shuffles: [
		{ encounterSet: theUnspeakableOath, overwriteCount: 0 },
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
	shuffles: [
		{ encounterSet: aPhantomOfTruth, overwriteCount: 0 },
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
	shuffles: [{ encounterSet: thePallidMask, overwriteCount: 0 }, chillingCold, ghouls, hauntings],
}

export const blackStarsRiseScenario: Scenario = {
	index: 7,
	name: 'Black Stars Rise',
	shuffles: [
		{ encounterSet: blackStarsRise, overwriteCount: 0 },
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
	shuffles: [
		{ encounterSet: dimCarcosa, overwriteCount: 0 },
		agentsOfHastur,
		strikingFear,
		cultOfTheYellowSign,
		delusions,
		inhabitantsOfCarcosa,
	],
}

export const returnToCurtainCallScenario: Scenario = {
	index: 1,
	name: 'Curtain Call',
	shuffles: [
		{ encounterSet: curtainCall, overwriteCount: 0 },
		{ encounterSet: returnToCurtainCall, overwriteCount: 0 },
		rats,
		cultOfTheYellowSign,
		evilPortents,
		hauntings,
		maddeningDelusions,
		neuroticFear,
	],
}

export const returnToTheLastKingScenario: Scenario = {
	index: 2,
	name: 'The Last King',
	shuffles: [
		{ encounterSet: theLastKing, overwriteCount: 0 },
		{ encounterSet: returnToTheLastKing, overwriteCount: 0 },
		hastursGift,
		theStranger,
		decayingReality,
		delusoryEvils,
	],
}

export const returnToEchoesOfThePastScenario: Scenario = {
	index: 3,
	name: 'Echoes of the Past',
	shuffles: [
		{ encounterSet: echoesOfThePast, overwriteCount: 0 },
		{ encounterSet: returnToEchoesOfThePast, overwriteCount: 0 },
		darkCult,
		lockedDoors,
		{ encounterSet: theMidnightMasks, overwriteCount: 5 },
		cultOfTheYellowSign,
		maddeningDelusions,
	],
}

export const returnToTheUnspeakableOathScenario: Scenario = {
	index: 4,
	name: 'The Unspeakable Oath',
	shuffles: [
		{ encounterSet: theUnspeakableOath, overwriteCount: 0 },
		{ encounterSet: returnToTheUnspeakableOath, overwriteCount: 0 },
		hastursGift,
		inhabitantsOfCarcosa,
		decayingReality,
		hastursEnvoys,
		maddeningDelusions,
	],
}

export const returnToAPhantomOfTruthScenario: Scenario = {
	index: 5,
	name: 'A Phantom of Truth',
	shuffles: [
		{ encounterSet: aPhantomOfTruth, overwriteCount: 0 },
		{ encounterSet: returnToAPhantomOfTruth, overwriteCount: 0 },
		{ encounterSet: theMidnightMasks, overwriteCount: 5 },
		byakhee,
		evilPortents,
		theStranger,
		hastursEnvoys,
	],
}

export const returnToThePallidMaskScenario: Scenario = {
	index: 6,
	name: 'The Pallid Mask',
	shuffles: [
		{ encounterSet: thePallidMask, overwriteCount: 0 },
		{ encounterSet: returnToThePallidMask, overwriteCount: 0 },
		chillingCold,
		ghouls,
		hauntings,
	],
}

export const returnToBlackStarsRiseScenario: Scenario = {
	index: 7,
	name: 'Black Stars Rise',
	shuffles: [
		{ encounterSet: blackStarsRise, overwriteCount: 0 },
		{ encounterSet: returnToBlackStarsRise, overwriteCount: 0 },
		darkCult,
		byakhee,
		evilPortents,
		inhabitantsOfCarcosa,
		theStranger,
		delusoryEvils,
	],
}

export const returnToDimCarcosaScenario: Scenario = {
	index: 8,
	name: 'Dim Carcosa',
	shuffles: [
		{ encounterSet: dimCarcosa, overwriteCount: 0 },
		{ encounterSet: returnToDimCarcosa, overwriteCount: 0 },
		cultOfTheYellowSign,
		inhabitantsOfCarcosa,
		hastursEnvoys,
		maddeningDelusions,
		neuroticFear,
	],
}
