# Filling out missing data for Campaign Reference 

The [Campaign Reference](https://arkham-starter.com/tool/campaign) is currently incomplete due to me not actually owned and played some campaigns yet. You can see these incomplete campaigns marked with an asterisk.

## Where are they?

Go to `sveltekit/src/lib/campaign` to see folders named after abbreviation of the campaign's name. Inside you will find exactly 4 files, forming hierarchy of data from bottom to top in this order : 

## Encounter

`encounter.ts` is each individual encounter set, including the scenario-specific one. Each one has an icon and card count, shown at the bottom right corner of the card.

The incomplete campaign may have `count` field as `0`. You can help changing it to the right number shown at the bottom right of the card of that set.

## Scenario

`scenario.ts` is each scenario, it choose several encounter sets into either `shuffles` and `setAsides` array. Both array are merged together to form a list of needed encounter sets that the scenario used.

`shuffles` are sets you can safely jumble into the random encounter deck, though sometimes you need to pick a subset of the set. This occur the most often with the scenario-specific set. For example when playing "The Gathering", it would be wrong if you shuffle everything in The Gathering encounter set as it includes the locations, etc. Actually you shuffles just 2 enemy cards inside this set.

To express the number of cards subset of an entire encounter set that get shuffled, each entry can be changed to this format : `{encounterSet: ___, overwriteCount: ___}`.

Since this information requires knowledge of scenario setup instruction and I have not played these, in an incomplete campaign, I type `overwriteCount` as `0` as a placeholder. You can help by changing this to the right number.

`setAsides` is an another array of encounter sets that reminds the person who setup the game not to jumble them into the random deck just yet. Formatting is the same as `shuffles` deck, including the thing about `overwriteCount`.

## Transition

`transition.ts` consists of pairs of scenarios. It tells the system valid progression throughout the campaign, to make a tool such as the one that tell you what encounter sets are re-used in the next scenario, so you don't have to take them out in the case of playing multiple scenarios in the same session.

Look at transitions of the existing campaigns to get general idea how to edit this file.

## Campaign

Finally, `campaign.ts` take all the transition along with some campaign-wide data, and you have a full campaign! Each Campaign Reference page use just this file, it can drills all the way down and obtain every information about the campaign.

Notably, it has `commonEncounterSets` field. If the campaign always ask the player to mess with some encounter sets you can move them from each scenario's `shuffles`/`setAsides` to this array instead. It will be excluded from the matrix and setup instruction to make room for other sets that actually differs between scenarios.