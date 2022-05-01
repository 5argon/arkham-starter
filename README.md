# arkhambeginners.com

https://arkhambeginners.com is a static, curated decklist site with data pulled from ArkhamDB (https://arkhamdb.com). It is intended to be a go-to site for **beginners** to the series to easily find decks they could possibly build, to start playing as soon as possible, as opposed to browsing full wealth of decks and knowledges in ArkhamDB which maybe too intimidating.

The design will heavily encourage viewer to visit the original ArkhamDB deck page, so the author can still receive comments and likes.

To reduce confusion, it is based on new release format starting from Revised Core Set and 2-box format expansions, along with all the repackaged expansions. Cycles that haven't receive a repackage yet cannot be used.

## Documentations

- [Deck criterias](./documentations/deck-criterias.md)
- [Site features](./documentations/site-features.md)

## Technical features

- Created with Svelte and SvelteKit. The reason is just because I wanted some reasons to learn them.
- The site is completely static. Visitor cannot create any content. Card list and ownership of each deck is completely pulled and "baked" into this site from ArkhamDB. This make the performance blazing fast no matter which device you view it with, and cheap to host and serve the pages for me. User can follow the deck to the real ArkhamDB page to interact with the author and give ratings as usual.
  - Text and images which appear when inspecting the card is also baked statically. User can follow the link to ArkhamDB's card page also.
- Like/popularity score and other numerical stats tied to the deck is not pulled from ArkhamDB. This new presentation is intended so user can focus on the content of the deck and the included guide. There is also randomization button to encourage deck discovery.
- Card list gets a bit more graphical than ArkhamDB's minimal and clean style, to aid identifying card in the collection for beginners. (e.g. Not require hovering mouse to see the graphics, in the case of browsing on mobile device.)
- UI is mobile first, such as user able to easily close the popup after inspecting the card name.

## Repository structure

- `/documentations` : Markdown files of documentations.
- `/arkham-beginners-sveltekit` : The SvelteKit project.