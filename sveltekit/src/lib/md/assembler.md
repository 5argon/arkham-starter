# Party Assembler

In [Deck Gather](/tool/gather) tool, you have already decided on your party and is trying to bring out cards from your big collection as fast and efficient as possible.

But perhaps you are also using that page to trial and error to see which decks works together with not too many overlaps, among other things such as each player's favorite investigator or team balance. This is because many decks in arkhamdb.com are designed in vacuum of its own, not accounting for the rest of the party taking limited amount of popular cards at the same time.

That gets quite tedious to try all the combinations among decks you have. I believe this is where computer is good at helping, try jumbling all the decks exhaustively and display insights so you can make the final call what your party could be.

## Workflow overview

1. Input tons of deck URL you are interested in, but not sure which among them would work together. They can come from different authors as well.
2. Press "Process" button and wait for it to download all the decks and overlay each combinations with each other.
3. Browse through the resulting combinations which are sorted by degree of overlaps. You may find interesting comp with low overlaps this way.

## Filters

Total combinations analyzed may be huge. You can apply some filters to narrow them down.

- **No Same Class** : Do not include teams that has more than one of the same class.
- **Zero Overlap Only** : Only show teams with no overlap at all. You can gather cards for these teams without conflict resolution.
- **No Same User** : Prevent building a team that contains deck published by the same arkhamdb.com user. Intended so that each player will get one of their own deck to play in the team. Unfortunately, arkhamdb.com does not expose username of "unpublished but public" deck. It can only do so for you for published decks. (Published deck also exposes only user ID number, there is no way to know the username from that ID.)

There is also one built-in filter applied : Teams with the same investigator by name are already removed. (You cannot do so by the game rule, there is a unique star in front of investigator's name.) This make it possible to include multiple decks of the same investigator and the tool will take care of not pairing among those decks for you.