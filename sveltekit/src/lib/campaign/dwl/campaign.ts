import { GameComponent, type Campaign } from '$lib/core/campaign'
import { armitagesFate } from './encounter'
import { transitions } from './transition'

export const theDunwichLegacyCampaign: Campaign = {
	name: 'The Dunwich Legacy',
	scenarioTransitions: transitions,
	commonEncounterSets: [armitagesFate],
	startingChaosBag: {
		easy: [
			GameComponent.TokenP1,
			GameComponent.TokenP1,
			GameComponent.Token0,
			GameComponent.Token0,
			GameComponent.Token0,
			GameComponent.TokenM1,
			GameComponent.TokenM1,
			GameComponent.TokenM1,
			GameComponent.TokenM2,
			GameComponent.TokenM2,
			GameComponent.TokenSkull,
			GameComponent.TokenSkull,
			GameComponent.TokenCultist,
			GameComponent.TokenAutofail,
			GameComponent.TokenElderSign,
		],
		standard: [
			GameComponent.TokenP1,
			GameComponent.Token0,
			GameComponent.Token0,
			GameComponent.TokenM1,
			GameComponent.TokenM1,
			GameComponent.TokenM1,
			GameComponent.TokenM2,
			GameComponent.TokenM2,
			GameComponent.TokenM3,
			GameComponent.TokenM4,
			GameComponent.TokenSkull,
			GameComponent.TokenSkull,
			GameComponent.TokenCultist,
			GameComponent.TokenAutofail,
			GameComponent.TokenElderSign,
		],
		hard: [
			GameComponent.Token0,
			GameComponent.Token0,
			GameComponent.Token0,
			GameComponent.TokenM1,
			GameComponent.TokenM1,
			GameComponent.TokenM2,
			GameComponent.TokenM2,
			GameComponent.TokenM3,
			GameComponent.TokenM3,
			GameComponent.TokenM4,
			GameComponent.TokenM5,
			GameComponent.TokenSkull,
			GameComponent.TokenSkull,
			GameComponent.TokenCultist,
			GameComponent.TokenAutofail,
			GameComponent.TokenElderSign,
		],
		expert: [
			GameComponent.Token0,
			GameComponent.TokenM1,
			GameComponent.TokenM1,
			GameComponent.TokenM2,
			GameComponent.TokenM2,
			GameComponent.TokenM3,
			GameComponent.TokenM3,
			GameComponent.TokenM4,
			GameComponent.TokenM4,
			GameComponent.TokenM5,
			GameComponent.TokenM6,
			GameComponent.TokenM8,
			GameComponent.TokenSkull,
			GameComponent.TokenSkull,
			GameComponent.TokenCultist,
			GameComponent.TokenAutofail,
			GameComponent.TokenElderSign,
		],
	},
}