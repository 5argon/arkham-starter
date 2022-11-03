# arkham-starter.com

A repository for https://arkham-starter.com. Currently I don't have much confidence in project structure and have name/put files in messy place with little to no comments. It is likely just a project storage for now and not ready for you to read the code and contribute yet.

However, feel free to use Issue section if you found any bugs within the site as a user.

(If you managed to understand the project even in this messy state, contributions are welcomed!)

## What is this site

"Assemble your investigator party and start playing" is the purpose of this site, to be a great "starter" of Arkham Horror : The Card Game session. The biggest hurdle I am addressing is getting a party composition such that :

- Having the right balance of investigator classes, and also playing the character that player likes.
- Uses cards only in the collection that the party owns.
- Has no or minimal amount of overlapping cards that needs proxying.
- Find decks that contains a specific card, whether in the starting deck or planned in the upgrade.
- Choose from preconstructed deck by other members but still respecting everything else.
- Can find a way to fit into incomplete party incrementally. (e.g. First player may play anything, the next player should not choose the same class, the third player became even more restricted in remaining cards to use, etc.)
- New players may need some explanation how to play the preconstructed deck.

Contrary to [arkhamdb.com](https://arkhamdb.com)'s extensive data and queries, this site will have specific tooling to help getting the game started as fast as possible with respect to player's collection and the current "party". Each visitor gets a blank 4-slot party, and each step the members (decks) are added, the tool help finding the right deck for the remaining slots.

I also introduce the concept of "Starter Deck", a special class of deck that will receive some cool treatment in this site. It is a deck using no more than 2 Investigator Expansions (plus 1 Investigator Starter Deck, optionally) and comes with a guide to play it. This will further encourage newcomers to pick and play them, as well as incentivize seasoned players to build an economical deck not using an entire collection.

This site cannot build decks. It only use decks imported from arkhamdb.com, and must be done by the original author. (arkhamdb.com does not expose a public API that lists all decks in the d

- [Technical features](./documentations/technical-features.md)

## Documentations

Draft documentations to be put inside the site for real later. Everything in `/documentations` folders are not actually loaded for show to the user by the site at all.

- [Deck criterias](./documentations/deck-criterias.md)
- [Adding decks](./documentations/adding-decks.md)
- [Site features](./documentations/site-features.md)

## Need Help! (For non-programmers)

There are some sections you can help using GitHub's built-in text editor. (Though you need GitHub ID to submit the edit.)

- [Campaign Reference](./documentations/help/campaign-reference.md)