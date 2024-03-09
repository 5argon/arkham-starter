import {
	atDeathsDoorstepScenario,
	beforeTheBlackThroneScenario,
	disappearanceAtTheTwilightEstateScenario,
	forTheGreaterGoodScenario,
	inTheClutchesOfChaosScenario,
	returnToAtDeathsDoorstepScenario,
	returnToBeforeTheBlackThroneScenario,
	returnToDisappearanceAtTheTwilightEstateScenario,
	returnToForTheGreaterGoodScenario,
	returnToInTheClutchesOfChaos1Scenario,
	returnToInTheClutchesOfChaos2Scenario,
	returnToTheSecretNameScenario,
	returnToTheWagesOfSinScenario,
	returnToTheWitchingHourScenario,
	returnToUnionAndDisillusionScenario,
	theSecretNameScenario,
	theWagesOfSinScenario,
	theWitchingHourScenario,
	unionAndDisillusionScenario,
} from '$lib/campaign/tcu/scenario'
import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'

export const theCircleUndoneCampaign: Campaign = {
	name: 'The Circle Undone',
	setupReferenceGraphic:
		'https://drive.google.com/drive/folders/1rENxazq4uHxScafpKT--ISXjaPDpV8U8?usp=share_link',
	investigatorExpansion: CardPack.TheCircleUndone,
	scenarios: [
		atDeathsDoorstepScenario,
		beforeTheBlackThroneScenario,
		disappearanceAtTheTwilightEstateScenario,
		forTheGreaterGoodScenario,
		inTheClutchesOfChaosScenario,
		theSecretNameScenario,
		theWagesOfSinScenario,
		theWitchingHourScenario,
		unionAndDisillusionScenario,
	],
	commonEncounterSets: [],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}

export const returnToTheCircleUndoneCampaign: Campaign = {
	name: 'Return to the Circle Undone',
	investigatorExpansion: CardPack.ReturnToTheCircleUndone,
	commonEncounterSets: [],
	scenarios: [
		returnToAtDeathsDoorstepScenario,
		returnToBeforeTheBlackThroneScenario,
		returnToDisappearanceAtTheTwilightEstateScenario,
		returnToForTheGreaterGoodScenario,
		returnToInTheClutchesOfChaos1Scenario,
		returnToInTheClutchesOfChaos2Scenario,
		returnToTheSecretNameScenario,
		returnToTheWagesOfSinScenario,
		returnToTheWitchingHourScenario,
		returnToUnionAndDisillusionScenario,
	],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
