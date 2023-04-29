import { GameComponent, type Scenario } from '$lib/core/campaign'
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
	shortName: 'I',
	setups: [
		{
			shuffles: [
				{ encounterSet: curtainCall, overwriteCount: 0 },
				rats,
				strikingFear,
				cultOfTheYellowSign,
				delusions,
				evilPortents,
				hauntings,
			],
		},
	],
}

export const theLastKingScenario: Scenario = {
	index: 2,
	name: 'The Last King',
	shortName: 'II',
	setups: [
		{
			shuffles: [
				{ encounterSet: theLastKing, overwriteCount: 4 },
				ancientEvils,
				decayAndFilth,
				hastursGift,
				theStranger,
			],
		},
	],
}

export const echoesOfThePastScenario: Scenario = {
	index: 3,
	name: 'Echoes of the Past',
	shortName: 'III',
	setups: [
		{
			name: '4 Players',
			shuffles: [
				{ encounterSet: echoesOfThePast, overwriteCount: 5 },
				darkCult,
				lockedDoors,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				cultOfTheYellowSign,
				delusions,
			],
		},
		{
			name: '3 Players',
			shuffles: [
				{ encounterSet: echoesOfThePast, overwriteCount: 6 },
				darkCult,
				lockedDoors,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				cultOfTheYellowSign,
				delusions,
			],
		},
		{
			name: '2 Players',
			shuffles: [
				{ encounterSet: echoesOfThePast, overwriteCount: 7 },
				darkCult,
				lockedDoors,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				cultOfTheYellowSign,
				delusions,
			],
		},
		{
			name: '1 Player',
			shuffles: [
				{ encounterSet: echoesOfThePast, overwriteCount: 8 },
				darkCult,
				lockedDoors,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				cultOfTheYellowSign,
				delusions,
			],
		},
	],
}

export const theUnspeakableOathScenario: Scenario = {
	index: 4,
	name: 'The Unspeakable Oath',
	shortName: 'IV',
	setups: [
		{
			shuffles: [
				{ encounterSet: theUnspeakableOath, overwriteCount: 7 },
				agentsOfHastur,
				decayAndFilth,
				delusions,
				{ encounterSet: hastursGift, overwriteCount: 2 },
			],
			remaining: [inhabitantsOfCarcosa],
		},
	],
}

export const aPhantomOfTruthScenario: Scenario = {
	index: 5,
	name: 'A Phantom of Truth',
	shortName: 'V',
	setups: [
		{
			name: 'Doubt',
			shuffles: [
				{ encounterSet: aPhantomOfTruth, overwriteCount: 10 },
				agentsOfHastur,
				{ encounterSet: theMidnightMasks, overwriteCount: 2 },
				byakhee,
				{ encounterSet: evilPortents, overwriteCount: 6 },
				theStranger,
			],
		},
		{
			name: 'Conviction',
			shuffles: [
				{ encounterSet: aPhantomOfTruth, overwriteCount: 12 },
				agentsOfHastur,
				{ encounterSet: theMidnightMasks, overwriteCount: 3 },
				byakhee,
				{ encounterSet: evilPortents, overwriteCount: 4 },
				theStranger,
			],
		},
	],
}

export const thePallidMaskScenario: Scenario = {
	index: 6,
	name: 'The Pallid Mask',
	shortName: 'VI',
	setups: [
		{
			shuffles: [
				{ encounterSet: thePallidMask, overwriteCount: 15 },
				chillingCold,
				ghouls,
				hauntings,
			],
		},
	],
}

export const blackStarsRiseScenario: Scenario = {
	index: 7,
	name: 'Black Stars Rise',
	shortName: 'VII',
	setups: [
		{
			shuffles: [
				{ encounterSet: blackStarsRise, overwriteCount: 6 },
				ancientEvils,
				darkCult,
				byakhee,
				evilPortents,
				{ encounterSet: inhabitantsOfCarcosa, overwriteCount: 2 },
				theStranger,
			],
			gameComponentsPerDifficulty: {
				easy: [GameComponent.TokenM3],
				standard: [GameComponent.TokenM5],
				hard: [GameComponent.TokenM6],
				expert: [GameComponent.TokenM7],
			},
		},
	],
}

export const dimCarcosaScenario: Scenario = {
	index: 8,
	name: 'Dim Carcosa',
	shortName: 'VIII',
	setups: [
		{
			shuffles: [
				{ encounterSet: dimCarcosa, overwriteCount: 11 },
				agentsOfHastur,
				strikingFear,
				cultOfTheYellowSign,
				delusions,
				{ encounterSet: inhabitantsOfCarcosa, overwriteCount: 2 },
			],
		},
	],
}

export const returnToCurtainCallScenario: Scenario = {
	index: 1,
	name: 'Curtain Call',
	shortName: 'I',
	setups: [
		{
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
		},
	],
}

export const returnToTheLastKingScenario: Scenario = {
	index: 2,
	name: 'The Last King',
	shortName: 'II',
	setups: [
		{
			shuffles: [
				{ encounterSet: theLastKing, overwriteCount: 0 },
				{ encounterSet: returnToTheLastKing, overwriteCount: 0 },
				hastursGift,
				theStranger,
				decayingReality,
				delusoryEvils,
			],
		},
	],
}

export const returnToEchoesOfThePastScenario: Scenario = {
	index: 3,
	name: 'Echoes of the Past',
	shortName: 'III',
	setups: [
		{
			shuffles: [
				{ encounterSet: echoesOfThePast, overwriteCount: 0 },
				{ encounterSet: returnToEchoesOfThePast, overwriteCount: 0 },
				darkCult,
				lockedDoors,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				cultOfTheYellowSign,
				maddeningDelusions,
			],
		},
	],
}

export const returnToTheUnspeakableOathScenario: Scenario = {
	index: 4,
	name: 'The Unspeakable Oath',
	shortName: 'IV',
	setups: [
		{
			shuffles: [
				{ encounterSet: theUnspeakableOath, overwriteCount: 0 },
				{ encounterSet: returnToTheUnspeakableOath, overwriteCount: 0 },
				hastursGift,
				inhabitantsOfCarcosa,
				decayingReality,
				hastursEnvoys,
				maddeningDelusions,
			],
		},
	],
}

export const returnToAPhantomOfTruthScenario: Scenario = {
	index: 5,
	name: 'A Phantom of Truth',
	shortName: 'V',
	setups: [
		{
			shuffles: [
				{ encounterSet: aPhantomOfTruth, overwriteCount: 0 },
				{ encounterSet: returnToAPhantomOfTruth, overwriteCount: 0 },
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
				byakhee,
				evilPortents,
				theStranger,
				hastursEnvoys,
			],
		},
	],
}

export const returnToThePallidMaskScenario: Scenario = {
	index: 6,
	name: 'The Pallid Mask',
	shortName: 'VI',
	setups: [
		{
			shuffles: [
				{ encounterSet: thePallidMask, overwriteCount: 0 },
				{ encounterSet: returnToThePallidMask, overwriteCount: 0 },
				chillingCold,
				ghouls,
				hauntings,
			],
		},
	],
}

export const returnToBlackStarsRiseScenario: Scenario = {
	index: 7,
	name: 'Black Stars Rise',
	shortName: 'VII',
	setups: [
		{
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
		},
	],
}

export const returnToDimCarcosaScenario: Scenario = {
	index: 8,
	name: 'Dim Carcosa',
	shortName: 'VIII',
	setups: [
		{
			shuffles: [
				{ encounterSet: dimCarcosa, overwriteCount: 0 },
				{ encounterSet: returnToDimCarcosa, overwriteCount: 0 },
				cultOfTheYellowSign,
				inhabitantsOfCarcosa,
				hastursEnvoys,
				maddeningDelusions,
				neuroticFear,
			],
		},
	],
}
