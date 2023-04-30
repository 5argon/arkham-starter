# Alternate arkhamdb.com Deck Viewer

This page fetches a deck by ID (from the URL `?id=___` query string) via [arkhamdb.com public API](https://arkhamdb.com/api/) and present it differently than in arkhamdb.com.

This beginner-friendly presentation is actually for use when inspecting each starter deck hosted in this site, but then I think why not make it able to show **any** advanced, full-collection decks from arkhamdb.com as well?

## Accessing this viewer from arkhamdb.com

I have setup a redirect URL such that when you are viewing your deck in arkhamdb.com (published or not) you can change "arkhamdb" to "arkham-starter" and press enter then it should work out.

## What's different?

The real purpose of this site is to host starter decks for newcomers, so I want to develop the UI that helps them the most. Many new players I invited to join the party expressed that when using arkhamdb.com, while the deckbuilder is good, they wanted to see "cards laid out on the table" like when they built the deck physically instead of having to click/hover on each card.

I did just that and remove the Description section to make some room. (And of course this site cannot actually build a deck.) You can click the deck's name to go to the original deck in arkhamdb.com to read the description or build your deck.

Everything has pack icon and collector's number. Beginner has limited collection and don't know where all the meta cards everyone are abusing came from, UI that help learning Investigator Expansion should be priority. It also helps finding the cards by looking just at the bottom right corner, especially for newcomers that hadn't decided on how to organize their cards just yet.

## Some feature highlights

- You can click on the card to toggle it, to help when assembling the deck.
- Grouping and Sorting is a bit more flexible than in arkhamdb.com so it can be adjusted to fit how your collection looks like.
- Investigator Expansion based packs used and card count information. (It even assume unreleased repackages to exist now.) How many pack icons you have basically shows real-world cost of your deck.
- All old Core Set cards used in a deck are forwarded to Revised Core Set card ID.
- Side Deck is accounted in "packs used". In arkhamdb.com Side Deck is ignored completely in display and in search.
- Five "representative cards" thumbnails. Starter decks in this site would have five such hand-picked cards. But since this renderer is being adapted to render any deck from arkhamdb.com with no such information, they are chosen automatically from XP cards you have in your deck / side deck.

## Currently unsupported

Many more are unsupported, but for example :

- Nothing about XP, next, previous deck : Not in priority since all the starter decks in this site would be at 0 XP.
