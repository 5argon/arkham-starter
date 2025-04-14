# arkhamdb-pulls

## `pull`

Pull many JSON from arkhamdb, patch in additional cards as needed. Saves `playerdb.json`, `popupdb.json`, `taboo.json`.

## `download`

Blatantly steals images of all those cards from arkham.build as much as possible, as needed by `playerdb.json` made on `pull`. If something aren't available, the next command can handle it. Every cards are considered English.

This empties the target folder on each run. As this use someone else's bandwidth, you shouldn't run this often.

## `patch`

Add additional card graphics to the `download` result, whether it's English or other languages. These came from `patch` folder. Now we are ready to create `valid.json` which tells you what images are available or missing.

## `process`

Make variations of card graphics from `true` folder.