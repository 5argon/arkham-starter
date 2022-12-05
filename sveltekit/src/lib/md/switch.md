# Campaign Switching Tool

This tool let you specify 2 ongoing campaigns, one campaign consists of up to 4 arkhamdb.com decks 

- Active Campaign : It assumes that cards from your collection are pulled out to make the decks of Active Campaign as much as possible.
- Inactive Campaign : Take all the leftover cards in the collection after building all the Active Campaign decks. These decks are likely incomplete and waiting for some hot cards to continue playing.

Then it assume all other cards are stored in your collection. (So imagine you have 3 different groups of cards here.)

This tool reveals you how to **switch from Active Campaign to Inactive Campaign** without dissolving all the decks back to collection first, by telling you to pick cards from which of the left deck (and also whether it is from main or side deck) to land on which of the right deck. In other words, it shows an intersection of 2 campaigns (up to 4 decks vs. 4 decks).

It is also useful to know if the switch is too much and you would rather dissolve all the decks back to collection.

This tool is inspired by arkhamdb.com's compare decks tool ([such as this](https://arkhamdb.com/deck/compare/2533514/2091839)). But that tool only compares 2 decks instead of 2 teams of 4 decks each, plus it ignores the Side Deck.

## Example

I am running Dunwich campaign using Zoey and Rex. Zoey is using 2x Blinding Light in her splash cards, and Rex of course is using 2x Deduction. Suddenly I got a visit and we want to play NotZ together using FFG Starter Deck for this night, as Roland, Daisy, Agnes team.

By using the tool with Active Campaign = [Zoey, Rex] vs. Inactive Campaign (i.e. What I am going to switch to) = [Roland, Daisy, Agnes] teams, the result would show : 

- [Zoey] 1x Blinding Light [Daisy]
- [Zoey] 1x Blinding Light [Agnes]
- [Rex] 1x Deduction [Roland]
- [Rex] 1x Deduction [Daisy]
- ...

You precisely know how to move minimum number of cards from Active Campaign to Inactive Campaign, and back when NotZ game is over using the "Swap" button because NotZ is now an Active Campaign, without completely disassembling Zoey and Rex decks just to have one night of NotZ game. 

Also it let you work on the swap faster by having better pipeline. You iterate Zoey and Rex decks first and pick all the cards to take out, and then assemble the NotZ deck on top of those cards you just took. It is faster than try building the NotZ deck first, then realize the collection is missing some cards, which is in use in either Zoey or Rex deck, then having to find it, and repeat.

## Algorithm details

The player order does matter. It iterates from the first player to the last. Therefore, there is more chance that a lot of first player's deck got transferred to Inactive Campaign than subsequent decks. e.g. If someone in Inactive Campaign needs 2x Unexpected Courage, and the 1st deck and 2nd deck of Active Campaign both uses 2x Unexpected Courage, the tool would tell you to transfer 2x Unexpected Courage of the 1st deck and not touching those of the 2nd deck.

## Using decks from ongoing campaign

When you use the Upgrade feature on arkhamdb.com, or managed automatically with ArkhamCards app, it actually produces a new deck with new ID on top. If you keep the Sharing URL using ID of the starting decks, you may want to update them to the upgraded deck.

If you are using the Side Deck upgrading system along the campaign, the tool could move cards in and out from the right deck.

For example, Zoey intially starts the campaign with 2x Stand Together (3) on her side deck. After the first scenario, she managed to purchase 1x Stand Together (3) into the deck. (Then Emergency Cache got moved into the Side Deck instead.) An another copy is still waiting in the Side Deck.

Then, suddenly I want to swap to an another campaign which Roland also has 2x Stand Together (3) in his side deck.

If I use Zoey's **upgraded deck ID**, the tool would correctly report :

```
(Switch to)

1x Stand Together (Zoey → Roland-S)
1x Stand Together (Zoey-S → Roland-S)

(Switch back)

1x Stand Together (Roland-S → Zoey)
1x Stand Together (Roland-S → Zoey-S)
```

But if you forgot to update Zoey's deck ID for the tool and continue using the initial ID, the tool would wrongly report : 

```
(Switch to)

2x Stand Together (Zoey-S → Roland-S)

(Switch back)

2x Stand Together (Roland-S → Zoey-S)
```

Using the right deck ID also benefit moving Basic Weakness around. Remember that campaign may add some more, and may take the same Basic Weakness that is currently used by your other campaigns.