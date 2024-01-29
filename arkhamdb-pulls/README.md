# arkhamdb-pulls

So that arkham-starters.com is not troubling ArkhamDB's server as much as possible while using, we preprocess data from ArkhamDB ahead of time and keep using our version serving from our server. This also save network roundtrip time since it came from the same location that serve the page.

`pull.ts` is a Deno script that would gather required data from ArkhamDB to generate the static site. This should be the only time we need an internet connection when generating the site.

## Initiating the pull

```
yarn pull
```

`pulls` folder will be cleaned up and repopulated with new data once it is done. Then you need to manually make use of the pulled resources. In my case :

- `card` folder is manually copied to `static/image/` statically uploaded path (= not compiled, just upload) of the nearby SvelteKit project.
- `json` folder's content are copied to :
  - `lib/data` : For build time of arkham-starter.com.
  - `static/db` : Allow direct linking to these processed files.

## What's in the `pulls` folder?

- `card` : Inside are subfolders of different pre-cropped shapes of each card's image. The web has access to all these images and use URL structure to choose the right version for display.
- `json` : Contains `.json` obtained from ArkhamDB and pre-processed. They are copied to the SvelteKit app before building.
  - `playerdb.json` : Contains data of all player cards, including one in the Campaign.
  - `popupdb.json` : This is a minified version of `playerdb.json`. "Popup" means just enough card data to display a small popup such as that when you write a deck guide and type `#` character. Many fields are stripped out, many fields need further client-side transformation. We aim for smaller size for this one so user with bad internet connection could use the page if the page don't require full database.
