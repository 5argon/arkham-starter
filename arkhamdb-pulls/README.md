# arkhamdb-pulls

`pull.ts` is a Deno script that would gather required data from ArkhamDB to generate the static site. This should be the only time we need an internet connection when generating the site.

Input in `input` folder is a `json` files named after user's ID in ArkhamDB, inside containing JSON object of a single field `decks`.

This `decks` is an array of `number` of public deck IDs of that user that would like to be featured in arkhambeginners.com.

## Initiating the pull

```
deno run --allow-read --allow-write --allow-net pull.ts
```

`pulls` folder will be cleaned up and repopulated with new data once it is done.