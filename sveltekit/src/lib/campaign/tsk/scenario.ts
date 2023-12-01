import type { Scenario } from '$lib/core/campaign'
import {
	ancientEvils,
	chillingCold,
	darkCult,
	ghouls,
	lockedDoors,
	nightgaunts,
	strikingFear,
	theMidnightMasks,
} from '../notz/encounter'
import {
	agentsOfTheOutside,
	agentsOfYuggoth,
	beyondTheBeyond,
	cleanupCrew,
	congressOfTheKey,
	crimsonConspiracy,
	dancingMad,
	darkVeiling,
	deadHeat,
	dealingsInTheDark,
	dogsOfWar,
	mysteriesAbound,
	onThinIce,
	outsiders,
	redCoterie,
	riddlesAndRain,
	sanguineShadows,
	scarletSorcery,
	secretWar,
	shadesOfSuffering,
	shadowOfADoubt,
	spatialAnomaly,
	spreadingCorruption,
	strangeHappenings,
	withoutATrace,
} from './encounter'

export const riddlesAndRainScenario: Scenario = {
	name: 'Riddles and Rain',
	index: 1,
	shortName: '5-A',
	setups: [
		{
			shuffles: [
				{ encounterSet: riddlesAndRain, overwriteCount: 0 },
				darkVeiling,
				shadowOfADoubt,
				strangeHappenings,
				chillingCold,
				lockedDoors,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
			],
			remaining: [crimsonConspiracy, outsiders],
		},
	],
}

export const deadHeatScenario: Scenario = {
	name: 'Dead Heat',
	index: 2,
	shortName: '11-B',
	setups: [
		{
			shuffles: [
				{ encounterSet: deadHeat, overwriteCount: 8 },
				scarletSorcery,
				spreadingCorruption,
				ghouls,
				strikingFear,
			],
		},
	],
}

export const sanguineShadowsScenario: Scenario = {
	name: 'Sanguine Shadows',
	index: 3,
	shortName: '16-D',
	setups: [
		{
			shuffles: [
				{ encounterSet: sanguineShadows, overwriteCount: 8 },
				darkVeiling,
				mysteriesAbound,
				shadowOfADoubt,
				strangeHappenings,
				lockedDoors,
				nightgaunts,
			],
		},
	],
}

export const dealingsInTheDarkScenario: Scenario = {
	name: 'Dealings in the Dark',
	index: 4,
	shortName: '21-F',
	setups: [
		{
			shuffles: [
				{ encounterSet: dealingsInTheDark, overwriteCount: 9 },
				{ encounterSet: agentsOfYuggoth, overwriteCount: 3 },
				darkVeiling,
				ancientEvils,
				darkCult,
				lockedDoors,
				{ encounterSet: theMidnightMasks, overwriteCount: 5 },
			],
			remaining: [{ encounterSet: agentsOfYuggoth, overwriteCount: 1 }],
		},
	],
	commonSetup: {
		notes: [
			{
				what: 'The starting encounter deck count is reduced equal to amount of players, since each investigator draws a Cultist enemy at the start.',
			},
			{
				encounterSet: agentsOfYuggoth,
				what: 'The Emissary from Yuggoth enemy is set aside, out of play.',
			},
		],
	},
}

export const dancingMad1Scenario: Scenario = {
	name: 'Dancing Mad (v. I)',
	index: 5,
	shortName: '28-I (v. I)',
	setups: [
		{
			shuffles: [
				{ encounterSet: dancingMad, overwriteCount: 2 },
				agentsOfTheOutside,
				secretWar,
				shadowOfADoubt,
			],
			remaining: [cleanupCrew, crimsonConspiracy],
		},
	],
}

export const dancingMad2Scenario: Scenario = {
	name: 'Dancing Mad (v. II)',
	index: 6,
	shortName: '28-I (v.II)',
	setups: [
		{
			shuffles: [
				{ encounterSet: dancingMad, overwriteCount: 2 },
				{ encounterSet: agentsOfTheOutside, overwriteCount: 2 },
				cleanupCrew,
				crimsonConspiracy,
				{ encounterSet: secretWar, overwriteCount: 5 },
				shadowOfADoubt,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: agentsOfTheOutside,
				what: '2x Paradigm Effacer are set aside, out of play.',
			},
			{
				encounterSet: secretWar,
				what: '2x Otherworldly Mimic are set aside, out of play.',
			},
		],
	},
}

export const onThinIceScenario: Scenario = {
	name: 'On Thin Ice',
	index: 7,
	shortName: '33-K',
	setups: [
		{
			shuffles: [
				{ encounterSet: onThinIce, overwriteCount: 8 },
				agentsOfTheOutside,
				agentsOfYuggoth,
				crimsonConspiracy,
				darkVeiling,
				outsiders,
				spatialAnomaly,
				chillingCold,
			],
		},
	],
}

export const dogsOfWar1Scenario: Scenario = {
	name: 'Dogs of War (v. I)',
	index: 8,
	shortName: '38-N (v. I)',
	setups: [
		{
			shuffles: [
				{ encounterSet: dogsOfWar, overwriteCount: 6 },
				scarletSorcery,
				spatialAnomaly,
				spreadingCorruption,
				darkCult,
			],
		},
	],
}

export const dogsOfWar2Scenario: Scenario = {
	name: 'Dogs of War (v. II)',
	index: 9,
	shortName: '38-N (v. II)',
	setups: [
		{
			shuffles: [
				{ encounterSet: dogsOfWar, overwriteCount: 6 },
				{ encounterSet: cleanupCrew, overwriteCount: 5 },
				scarletSorcery,
				spatialAnomaly,
				spreadingCorruption,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: cleanupCrew,
				what: 'Coterie Assassin (A) starts the game concealed, with 1 additional decoy for each other investigator in the game.',
			},
		],
	},
}

export const dogsOfWar3Scenario: Scenario = {
	name: 'Dogs of War (v. III)',
	index: 10,
	shortName: '38-N (v. III)',
	setups: [
		{
			shuffles: [
				{ encounterSet: dogsOfWar, overwriteCount: 6 },
				cleanupCrew,
				scarletSorcery,
				spatialAnomaly,
				spreadingCorruption,
				darkCult,
			],
		},
	],
}

export const shadesOfSufferingScenario: Scenario = {
	name: 'Shades of Suffering',
	index: 11,
	shortName: '46-Q',
	setups: [
		{
			shuffles: [
				{ encounterSet: shadesOfSuffering, overwriteCount: 5 },
				darkVeiling,
				mysteriesAbound,
				scarletSorcery,
				spreadingCorruption,
				strikingFear,
			],
		},
	],
}

export const withoutATraceScenario: Scenario = {
	name: 'Without a Trace',
	index: 12,
	shortName: '56-Y',
	setups: [
		{
			shuffles: [
				{ encounterSet: withoutATrace, overwriteCount: 0 },
				agentsOfTheOutside,
				{ encounterSet: beyondTheBeyond, overwriteCount: 2 },
				{ encounterSet: outsiders, overwriteCount: 5 },
				secretWar,
				spreadingCorruption,
			],
		},
	],
	commonSetup: {
		notes: [
			{ encounterSet: outsiders, what: 'The Apocalyptic Presage enemy is set aside, out of play.' },
		],
	},
}

export const congressOfTheKeys1Scenario: Scenario = {
	name: 'Congress of the Keys (v. I)',
	index: 13,
	shortName: '59-Z (v. I)',
	setups: [
		{
			shuffles: [
				{ encounterSet: congressOfTheKey, overwriteCount: 0 },
				scarletSorcery,
				spatialAnomaly,
				spreadingCorruption,
				lockedDoors,
			],
			remaining: [
				agentsOfTheOutside,
				{ encounterSet: beyondTheBeyond, overwriteCount: 2 },
				outsiders,
				secretWar,
				ancientEvils,
				{ encounterSet: strikingFear, overwriteCount: 4 },
				redCoterie,
			],
		},
	],
	commonSetup: {
		notes: [
			{
				what: 'Consult v.II / v.III instruction for the 2nd encounter deck.',
			},
			{
				encounterSet: redCoterie,
				what: 'Do not gather Coterie enemies who voted “nay,” abstained, or were eerily silent (not counting The Red-Gloved Man).',
			},
			{
				encounterSet: redCoterie,
				what: 'Remember to add remaining "yea" members that was not spawned to the encounter deck. (The encounter deck could be bigger than above\'s card count.)',
			},
		],
		specialGather: [
			{
				encounterSet: withoutATrace,
				what: ['The Red-Gloved Man (Conspirator)'],
			},
			{
				encounterSet: withoutATrace,
				what: ['Aliki Zoni Uperetria (Conspirator)'],
			},
			{
				encounterSet: dealingsInTheDark,
				what: ['Ece Şahin (Conspirator)'],
			},
			{
				encounterSet: sanguineShadows,
				what: ['La Chica Roja (Conspirator)'],
			},
			{
				encounterSet: dancingMad,
				what: ['Desiderio Delgado Álvarez (Conspirator)'],
			},
			{
				encounterSet: onThinIce,
				what: ['Thorne (Conspirator)'],
			},
			{
				encounterSet: dogsOfWar,
				what: ['The Claret Knight (Conspirator)'],
			},
		],
	},
}

export const congressOfTheKeys2Scenario: Scenario = {
	name: 'Congress of the Keys (v. II)',
	index: 14,
	shortName: '59-Z (v. II)',
	setups: [
		{
			shuffles: [
				{ encounterSet: congressOfTheKey, overwriteCount: 0 },
				agentsOfTheOutside,
				{ encounterSet: beyondTheBeyond, overwriteCount: 2 },
				outsiders,
				secretWar,
				spreadingCorruption,
				ancientEvils,
				{ encounterSet: strikingFear, overwriteCount: 4 },
			],
			remaining: [redCoterie],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: strikingFear,
				what: '3x Rotting Remains are removed from the set.',
			},
		],
		specialGather: [
			{
				encounterSet: withoutATrace,
				what: ['The Red-Gloved Man (Conspirator)'],
			},
			{
				encounterSet: withoutATrace,
				what: ['Aliki Zoni Uperetria (Conspirator)'],
			},
			{
				encounterSet: dealingsInTheDark,
				what: ['Ece Şahin (Conspirator)'],
			},
			{
				encounterSet: sanguineShadows,
				what: ['La Chica Roja (Conspirator)'],
			},
			{
				encounterSet: dancingMad,
				what: ['Desiderio Delgado Álvarez (Conspirator)'],
			},
			{
				encounterSet: onThinIce,
				what: ['Thorne (Conspirator)'],
			},
			{
				encounterSet: dogsOfWar,
				what: ['The Claret Knight (Conspirator)'],
			},
		],
	},
}

export const congressOfTheKeys3Scenario: Scenario = {
	name: 'Congress of the Keys (v. III)',
	index: 15,
	shortName: '59-Z (v. III)',
	setups: [
		{
			shuffles: [
				{ encounterSet: congressOfTheKey, overwriteCount: 0 },
				agentsOfTheOutside,
				{ encounterSet: beyondTheBeyond, overwriteCount: 2 },
				outsiders,
				secretWar,
				spreadingCorruption,
				ancientEvils,
				{ encounterSet: strikingFear, overwriteCount: 4 },
			],
			remaining: [redCoterie],
		},
	],
	commonSetup: {
		notes: [
			{
				encounterSet: redCoterie,
				what: 'Do not gather Coterie enemies who voted “yea,” “nay,” or abstained.',
			},
			{
				encounterSet: redCoterie,
				what: 'Remember to add remaining "eerily silent" members that was not spawned to the encounter deck. (The encounter deck could be bigger than above\'s card count.)',
			},
			{
				encounterSet: strikingFear,
				what: '3x Rotting Remains are removed from the set.',
			},
		],
		specialGather: [
			{
				encounterSet: withoutATrace,
				what: ['The Red-Gloved Man (Conspirator)'],
			},
			{
				encounterSet: withoutATrace,
				what: ['Aliki Zoni Uperetria (Conspirator)'],
			},
			{
				encounterSet: dealingsInTheDark,
				what: ['Ece Şahin (Conspirator)'],
			},
			{
				encounterSet: sanguineShadows,
				what: ['La Chica Roja (Conspirator)'],
			},
			{
				encounterSet: dancingMad,
				what: ['Desiderio Delgado Álvarez (Conspirator)'],
			},
			{
				encounterSet: onThinIce,
				what: ['Thorne (Conspirator)'],
			},
			{
				encounterSet: dogsOfWar,
				what: ['The Claret Knight (Conspirator)'],
			},
		],
	},
}
