# Requirements

From results of campaign or standalone (or even scenario-as-a-standalone), we must plan such that information that can be summarized uses the same field name because that is Firestore's query rule. And also we should keep in mind of operation such as "array in", should be useful to query card IDs according to different fun criterias.

The Profile is presented as tabs on top, taking hint from many popular live service game's profile page. Each page summarizes different dimension of the game.

# Overall

- Amount of campaign played.
- Total "active campaign time" based on start and end date of campaigns.

# Campaign

- Clear status ("clear lamp") per player count (if requested) per difficulty.
- Cumulative achievements.
- Ending XP statistics.
- Scenario-as-standalone statistics.

## Advanced

- Frequency of resolution of each scenario.

# Investigator

- Most played investigator.
- Most played class of investigator.
- Deckbuilding Option statistics.
- Parallel usage statistics.
- Most often included card for each investigator.
- Most often included card for each class of investigator.
- Clear difficulty and rate per investigator.
- Killed / Insane count per investigator.
- Cumulative trauma count per investigator.

# Player Card


# Standalone Scenarios

- Clear status per player count per difficulty. (With resolution obtained.)
- XP earned.