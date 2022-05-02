# Adding your decks to this site

Since this site is intentionally "dumb" and **fully static**, there is no way to alter the content of the site from visitor's side.

Basically, the site needs to be regenerated from scratch whenever someone want to add a new deck to it. A new deck along with having its own page and URL, will also affect search page's result as well and those are all pre-calculated as much as possible.

The repository have tooling that turns a series of **ArkhamDB deck IDs** into an entire website. All you have to do is to go to `/arkhamdb-pulls/input`. There, you will find `.json` files with name based on **ArkhamDB user ID number**. Inside you can add and categorize your deck. Look at `61394.json` for example, which is my ID.

After adding a new file or edit your existing file, make it a pull request and after I merged it, I will also manually rebuilt the site to include your decks.

