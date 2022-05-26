# Deck Gather

This is a tool to help you bring out the cards from your collection for **all players** that had built their own deck in ArkhamDB **in one go**. It is useful if you are the collection's owner where everyone's deck will be built from. You can then gather them for everyone, or have an entire table helps working on gathering everyone's deck in parallel, now that the "task" is clearly grouped without conflict.

It merges all the decks together (both starting card list and side deck) into **a single big list**, then you are able to sort it according to the shape of your collection.

A label is appended to each entry telling you which player they are for, and whether it belongs to that player's side deck or the main deck. Supposed that you have a party of 3 players, then designate 6 stacks for the main and side deck of each person. Then everyone can help building each other's deck very fast, by putting the cards in the right stack by looking at the label. This is faster than each player building only their own deck and having to go through the same section in the collection over and over, possibly passing through cards that is to be taken out to an another player's deck.

## Importing a deck

You can paste ArkhamDB's deck URL into the box. Other than grabbing the deck ID number from the URL, it also detects a kind of deck from the URL :

- If it has `/decklist/view` or `/decklist/edit` : It requests a deck from published deck API of ArkhamDB.
- If it has `/deck/view` or `/deck/edit` : It requests a deck from personal deck API of ArkhamDB, which **would fail if** that user hadn't check the "make public" option in your user settings. Also if you are currently editing the deck and have changes in the card list, save it first before importing.

You can also type just the deck's ID number, but it always assume it is a personal-but-public deck. To type just deck's ID and you want it to meant published deck, prefix `p:` in front of ID.

## Sharing URL

After pressing "Gather All Cards" once, you will also get a URL where the visitor will arrive at this page with decks already in the box and automatically click "Gather All Cards" after arriving.

This is so you can give the URL to other players in the table, then everyone can help out bringing cards from the collection at the same time.

## Deck Overlaps

This area **only appears if** multiple players used the same cards too much it exceeds quantity provided in the collection. It lists everyone that contributes to breaking the limit, and also amount used vs. total quantity of that card suffixed to the label at the end.

The tool assumes you owns 1 box of every release. (There is no Core Set, only 1x Revised Core Set.) You can then may decide to proxy these cards if they are not too many.

This tool currently has no idea about duplicate cards in multiple set, and warn you as soon as it exceeds the quantity inside that set. e.g. Multiple players has "Charisma" that was selected from Dunwich set in ArkhamDB, that it totals to 3 copies, it then warns you even though there is more Charisma in the Revised Core Set to use. For now, please look out for this situation on your own.
