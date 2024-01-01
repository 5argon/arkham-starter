import { GuideStep } from "../../common/guide"
import { CampaignNote } from "./notes"
import { t } from "../../../intl"

export const steps: GuideStep<CampaignNote>[] = [
  {
    name: t({
      description: "Step name",
      defaultMessage: "Extracurricular Activity", id: '3ZN2sb',
    }),
    possibleNotes:
[
      CampaignNote.StudentsRescued,
      CampaignNote.FailedToSaveStudents,
      CampaignNote.ExperimentDefeated,
      CampaignNote.WarrenRiceRescued,
      CampaignNote.WarrenRiceKidnapped,
    ],
    resolutions: [],
  },
]
