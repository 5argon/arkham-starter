# Campaign Reference

If you search "Arkham Horror Encounter Set Usage" or similar, you will find spread sheets or tables that many community members have made, and passed over, over the years. This shows a quick overview of encounter set used in varying granularity. Some show an entire game, some has one campaign per sheet.

These has many purposes, including :

- Want to know what are needed for an entire campaign run.
- Want to gather the cards ahead of reading the story, due to storage "logistics".
- Want to setup the for the next time right at the end of today's session.
- Want to see the overall encounter set usage statistics.

However, players come and go. Many sheets has editing disabled, and the player that stopped playing the game won't have time to maintain it anymore. The forked version is made because someone want to continue, or just that the visualization is not to their liking.

So I made a yet another version. These are my reasons :

- I don't want to keep a Google Sheet URL, I want it accessible from URL I can remember (that is, my own site).
- Google Sheets are often massive and not mobile friendly. I want to be able to reference quickly from tiny mobile phone screen without much scrolling around. (Especially, not too much horizontal scrolling.)
- I have my own preference of how I want to see the data. Mainly, I want to be able to hide all the texts once I got used to the campaign and make it minimal, but also can toggle them back when I want to.
- I want the loading performance to be better than Google Sheets.

By programming a web application, I can make the data shift around in presentation as opposed to be completely static in Google Sheets. Also I have more confidence of maintaining it now that everything are automatically generated from a central source of "campaign database" in the code, not that I hand-place every icons in the cell like in Google Sheets.

# Top Section

This section tells you some campaign-wide information. For example, all the Core Set encounter sets used throughout the campaign. It maybe useful in some organization scheme, maybe you want to move all the relevant core encounters to near the campaign encounter sets while the campaign is on-going.

# Matrix Tab

This emulates the classic Google Sheet layout invented by the community. An overview matrix like this has sparseness that let you see the whole picture. However, when reading only a scenario you are interested in, maybe using Scenarios Tab is more to-the-point.

# Scenarios Tab

The smallest unit of a campaign are scenarios. By selecting one, you will see a minimal presentation of scenario setup what are needed to play.

The "Set aside" section indicates that you should not shuffle these sets together just yet. Scenario setup tells you what to do, or maybe they come into play in the middle of scenario.

## Minimum Count

It is intended so you can setup without looking at the campaign guide. The minimum count is there to let you check if you missed anything. (Occassionally there is a card sticking on the dividers...)

Minimum means sometimes the scenario would immediately ask you to add the set aside cards to the starting encounter deck on setup, depending on some conditions. This app has no way to know if you met those conditions or not.

## Subset

If any icon is showing parentheses of number behind it, that means not all cards in the set are included in the encounter deck.

This always occur on a scenario-specific set, as that set count of cards would also include act, agenda, locations, etc. as well.

Depending on setup instruction, it may occur on other sets too. To keep spoiler minimal, please read the setup instruction why not all of them are in the deck. If you are replaying, probably these parentheses could remind you of the setup instructions without touching the campaign guide.

# Transitions Tab

An advanced tab for scenario setup nerds who want to push the limit. One layer higher from a scenario are transitions. Campaign is composed of finite sequence of transitions from one scenario to other, which links up into a tree visualized by the official campaign log. It is possible to have branching paths.

By selecting a scenario first, it shows all the possible transitions that has "from" as the selected scenario. If there is only one choice, it automatically select that choice for you.

## Pre-gather for the next session

At the clean up at the end of each session, you would separate the encounter deck into individual encounter sets and counted that nothing were lost. Normally at this step you would put all of them back, but wait! Actually some sets are used again in the next scenario.

So the idea to shave off some teardown/setup time is to keep the "intersects", put away the "differences", and add the new sets that wasn't used previously. The Transition Tab shows 3 group of encounter sets to help you do this :

- **Keep** : These sets you just played with are also used in the next scenario. You can keep them for the next session.
- **Remove** : Return these to the right place in your collection, because they are not used in the next scenario.
- **Add** : New encounter sets not used in the scenario you just finished, you need to add these to the "Keep" stack.

Assembling needed encounter sets ahead of time can improve excitement on the next session when you are back with full power, so the game starts faster while you are eager to start playing.

## Foresight

An extremely niche feature, I am not sure if anyone other than me wants to do this. It attempts to pre-gather encounter sets **next to the next session** while tearing down the current one, **as much as possible**. (It would also have to wait for some encounter sets that are used in the next session.)

If there is only one choice what the next-next scenario would be, you just have to check "Foresight". Otherwise, the UI will show all the possible ones based on available transitions for you to select which one to Foresight.

It adds 2 sections in addition to Keep, Remove, and Add :

- **Remove to Foresight** : A subset of the previous "Remove" section. It detects that the encounter sets that were going to return to the collection are actually used in your next-next scenario. You can move them to your Foresight stack instead of returning to the collection.
- **Add to Foresight** : These encounter sets are not used in the scenario you just finished, and not even in the next scenario. Therefore you need to get these from the collection to add to your Foresight stack in preparation of your next-next session.

Overall, this feels more like a feature for the curious players. Not many scenario sequences would benefit from assembling 2 sessions ahead, but at least now we have a tool to verify this.