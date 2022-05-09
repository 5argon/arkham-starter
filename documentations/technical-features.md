# Technical features

- Created with Svelte and SvelteKit. The reason is just because I wanted some reasons to learn them. Vite is also used for SvelteKit instead of Rollup previously used in Sapper, so that is a bonus of things I get to learn!
- Like/popularity score and other numerical stats tied to the deck is not pulled from ArkhamDB. This new presentation is intended so user can focus on the content of the deck and the included guide. There is also randomization button to encourage deck discovery.
- Card list gets a bit more graphical than ArkhamDB's minimal and clean style, to aid identifying card in the collection for beginners. (e.g. Not require hovering mouse to see the graphics, in the case of browsing on mobile device.)
- UI is mobile first, such as user able to easily close the popup after inspecting the card name.

## Static

Most notably, this site is **very static**. Visitor cannot create any content. Card list and ownership of each deck is completely pulled and "baked" into this site from ArkhamDB. This make the performance blazing fast no matter which device you view it with, and cheap to host and serve the pages for me. User can follow the deck to the real ArkhamDB page to interact with the author and give ratings as usual.

Text and images which appear when inspecting the card is also baked statically. User can follow the link to ArkhamDB's card page also.

Thanks to heavy restriction on packs allowed to create a deck, it is now possible to pre-generate **all possible permutations** of the filter tool in the deck listing to instantly show the filter result. This is an interesting experiment for me and it is also fast for users.