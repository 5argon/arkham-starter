import { CampaignEndState } from "../../common/campaign"
import { CampaignNote } from "./notes"

export interface TheDunwichLegacyCampaign
  extends CampaignEndState<CampaignNote> {
  returnTo: boolean
  scenarioQuestionaire: TheDunwichLegacyScenarioQuestionaire
  identifiedStrangeSolution: boolean
  surviveBeyondTheVeil: boolean
  henryFrancisWarrenInPlay: boolean
  threeWhippoorwillsDefeatedInOneTurn: boolean
}

export interface TheDunwichLegacyScenarioQuestionaire {
  extracurricularActivity: {
    firstScenario: boolean
    alchemicalConcoctionKill: boolean | undefined
  } & BaseScenarioQuestionaire

  theHouseAlwaysWins: {
    firstScenario: boolean
    cheated: boolean
    resignedBeforeAct3: boolean | undefined
  } & BaseScenarioQuestionaire

  theMiskatonicMuseum: {
    getInMuseum: "test" | "clue" | undefined
    storyAllyDead: boolean | undefined
    huntingHorrorDefeated: number | undefined
    shadowSpawnedResources: number | undefined
  } & BaseScenarioQuestionaire

  theEssexCountyExpress: {
    helplessPassengerLeftPlay: number | undefined
  } & BaseScenarioQuestionaire

  bloodOnTheAltar: {
    sacrificedAllyCardIds: string[] | undefined
    removedLocation: number | undefined
  } & BaseScenarioQuestionaire

  undimensionedAndUnseen: {
    broodEscaped: number | undefined
  }
}

interface BaseScenarioQuestionaire {
  xp: number
  resolution: number
}
