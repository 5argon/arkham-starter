import type { Scenario } from '$lib/core/campaign'
import {
	agentsOfCthulhu,
	ancientEvils,
	chillingCold,
	darkCult,
	lockedDoors,
	nightgaunts,
	rats,
	strikingFear,
	theMidnightMasks,
} from '../notz/encounter'
import {
	thePitOfDespair,
	theVanishingOfElinaHarper,
	inTooDeep,
	devilReef,
	horrorInHighGear,
	aLightInTheFog,
	theLairOfDagon,
	intoTheMaelstrom,
	creaturesOfTheDeep,
	floodedCaverns,
	risingTide,
	shatteredMemories,
	agentsOfDagon,
	fogOverInnsmouth,
	theLocals,
	syzygy,
	agentsOfHydra,
	malfunction,
} from './encounter'

export const thePitOfDespairScenario: Scenario = {
	name: 'The Pit of Despair',
	index: 1,
	shortName: 'I',
	shuffles: [
		{ encounterSet: thePitOfDespair, overwriteCount: 0 },
		agentsOfCthulhu,
		rats,
		creaturesOfTheDeep,
		floodedCaverns,
		risingTide,
		shatteredMemories,
	],
}

export const theVanishingOfElinaHarperScenario: Scenario = {
	name: 'The Vanishing of Elina Harper',
	index: 2,
	shortName: 'II',
	shuffles: [
		{ encounterSet: theVanishingOfElinaHarper, overwriteCount: 0 },
		chillingCold,
		lockedDoors,
		nightgaunts,
		{ encounterSet: theMidnightMasks, overwriteCount: 5 },
		agentsOfDagon,
		fogOverInnsmouth,
		theLocals,
	],
}

export const inTooDeepScenario: Scenario = {
	name: 'In Too Deep',
	index: 3,
	shortName: 'III',
	shuffles: [
		{ encounterSet: inTooDeep, overwriteCount: 0 },
		agentsOfCthulhu,
		creaturesOfTheDeep,
		risingTide,
		syzygy,
		theLocals,
	],
}

export const devilReefScenario: Scenario = {
	name: 'Devil Reef',
	index: 4,
	shortName: 'IV',
	shuffles: [
		{ encounterSet: devilReef, overwriteCount: 0 },
		agentsOfHydra,
		creaturesOfTheDeep,
		floodedCaverns,
		malfunction,
		risingTide,
	],
}

export const horrorInHighGearScenario: Scenario = {
	name: 'Horror in High Gear',
	index: 5,
	shortName: 'V',
	shuffles: [
		{ encounterSet: horrorInHighGear, overwriteCount: 0 },
		ancientEvils,
		fogOverInnsmouth,
		malfunction,
		shatteredMemories,
	],
}

export const aLightInTheFogScenario: Scenario = {
	name: 'A Light in the Fog',
	index: 6,
	shortName: 'VI',
	shuffles: [
		{ encounterSet: aLightInTheFog, overwriteCount: 0 },
		strikingFear,
		creaturesOfTheDeep,
		floodedCaverns,
		risingTide,
		syzygy,
	],
}

export const theLairOfDagonScenario: Scenario = {
	name: 'The Lair of Dagon',
	index: 7,
	shortName: 'VII',
	shuffles: [
		{ encounterSet: theLairOfDagon, overwriteCount: 0 },
		darkCult,
		lockedDoors,
		agentsOfDagon,
		floodedCaverns,
		syzygy,
	],
}

export const intoTheMaelstromScenario: Scenario = {
	name: 'Into the Maelstrom',
	index: 8,
	shortName: 'VIII',
	shuffles: [
		{ encounterSet: intoTheMaelstrom, overwriteCount: 0 },
		ancientEvils,
		agentsOfHydra,
		creaturesOfTheDeep,
		floodedCaverns,
		shatteredMemories,
		syzygy,
	],
}
