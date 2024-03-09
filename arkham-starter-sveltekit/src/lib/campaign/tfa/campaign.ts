import {
	heartOfTheEldersPart1Scenario,
	heartOfTheEldersPart2Scenario,
	returnToHeartOfTheEldersPart1Scenario,
	returnToHeartOfTheEldersPart2Scenario,
	returnToShatteredAeonsScenario,
	returnToTheBoundaryBeyondScenario,
	returnToTheCityOfArchivesScenario,
	returnToTheDepthsOfYothScenario,
	returnToTheDoomOfEztliScenario,
	returnToTheUntamedWildsScenario,
	returnToThreadsOfFateScenario,
	shatteredAeonsScenario,
	theBoundaryBeyondScenario,
	theCityOfArchivesScenario,
	theDepthsOfYothScenario,
	theDoomOfEztliScenario,
	theUntamedWildsScenario,
	threadsOfFateScenario,
} from '$lib/campaign/tfa/scenario'
import type { Campaign } from '$lib/core/campaign'
import { CardPack } from '$lib/core/card-pack'

export const theForgottenAgeCampaign: Campaign = {
	name: 'The Forgotten Age',
	investigatorExpansion: CardPack.TheForgottenAge,
	scenarios: [
		heartOfTheEldersPart1Scenario,
		heartOfTheEldersPart2Scenario,
		shatteredAeonsScenario,
		theBoundaryBeyondScenario,
		theCityOfArchivesScenario,
		theDepthsOfYothScenario,
		theDoomOfEztliScenario,
		theUntamedWildsScenario,
		threadsOfFateScenario,
	],
	setupReferenceGraphic:
		'https://drive.google.com/drive/folders/1WnmIqXn7kXsWaw4Z2-1x6BRqWunsArFC?usp=share_link',
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}

export const returnToTheForgottenAgeCampaign: Campaign = {
	name: 'Return to the Forgotten Age',
	investigatorExpansion: CardPack.ReturnToTheForgottenAge,
	scenarios: [
		returnToHeartOfTheEldersPart1Scenario,
		returnToHeartOfTheEldersPart2Scenario,
		returnToShatteredAeonsScenario,
		returnToTheBoundaryBeyondScenario,
		returnToTheCityOfArchivesScenario,
		returnToTheDepthsOfYothScenario,
		returnToTheDoomOfEztliScenario,
		returnToTheUntamedWildsScenario,
		returnToThreadsOfFateScenario,
	],
	startingChaosBag: {
		easy: [],
		standard: [],
		hard: [],
		expert: [],
	},
}
