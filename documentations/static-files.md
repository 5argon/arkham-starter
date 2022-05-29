# Static Resources

There are static resources used for rendering this site. They are not technically "public API" opened for the mass [like in ArkhamDB](https://arkhamdb.com/api/), and many are just transformed from ArkhamDB's public API.

If you need them for your project, you may direct link to them. I think it won't cause problem to my hosting cost given that this game's traffic is not that hot.

However, currently I cannot guarantee that any of them will have strong forward compatibility and can change from time to time (their content, their path). If you are hotlinking my resources into an app or your deck guide, that might someday break.

These are hosted together with the site with **Firebase Hosting**. They comes with nice CDN which make the resources appears closer to the audience dynamically instead of downloaded from the same, fixed place.

# `db`

https://arkham-starter.com/db/ contains :

- https://arkham-starter.com/db/playerdb.json : All cards in the game. The same thing as https://arkhamdb.com/api/public/cards, so I suggest getting that at instead to stay current in the case I forgot to update my copy. I pulled a copy of it just because I don't want to trouble the owner of ArkhamDB, and also making it comes from the same place as other things of my site.
- https://arkham-starter.com/db/popupdb.json : Minified player card database. The goal is to cut down the download time as much as possible to have every cards in an entire game downloaded, with only selected subsets of their data. Actual card's text are not here, for example. It has some number mapping tricks to reduce redundant set name or trait name. (They are provided as a map inside the JSON, must be mapped manually.) Field names are also minified to cryptic abbreviation, which I think is not hard to figure out which is which if you look at the payload.

# `image/card`

https://arkham-starter.com/image/card/ contains card's image in different shapes. This is different from ArkhamDB as these images are actually in these shape, rather than a cropped full image like when you hover on the card's name in ArkhamDB. This is so they are as fast as possible to download. I wrote a script to crop these shape out of "good" place of the card based on type. (e.g. Cropping position is not the same on Asset vs. Skill card.)

Replace `_____` with ArkhamDB's card ID.

- https://arkham-starter.com/image/card/square/_____.png : 128x128.
- https://arkham-starter.com/image/card/square-small/_____.png : 32x32.
- https://arkham-starter.com/image/card/strip/_____.png : 96x32.

For example, try this .45 Automatic graphic in different shapes : 

- https://arkham-starter.com/image/card/square/01016.png
- https://arkham-starter.com/image/card/square-small/01016.png
- https://arkham-starter.com/image/card/strip/01016.png

# `image/icon`

Contain game's icon extracted from official documentaion PDF. These maybe useful to write a deck guide and you want to use some official graphics and you need them hosted somewhere. By all means use what I have already hosted here instead of re-hosting them.

## `class`

These are a bit better resolution than those hosted on ArkhamDB. I used these in front of all card's entries here. They have variable width, for example Seeker has less width than others due to its shape.

- https://arkham-starter.com/image/icon/class/guardian.png
- https://arkham-starter.com/image/icon/class/mystic.png
- https://arkham-starter.com/image/icon/class/rogue.png
- https://arkham-starter.com/image/icon/class/seeker.png
- https://arkham-starter.com/image/icon/class/survivor.png

## `pack`

Pack (Set/Cycle) icons. Width 64 px.

There are `/pack/black/___.png` and `/pack/white/___.png` to choose from. Replace `___` with the same code names you get from hovering links in https://arkhamdb.com/search to get the link. For example, https://arkham-starter.com/image/icon/pack/black/dwl.png

## `slot`

Equipment slot graphics. Width 32 px.

- https://arkham-starter.com/image/icon/slot/accessory.png
- https://arkham-starter.com/image/icon/slot/ally.png
- https://arkham-starter.com/image/icon/slot/body.png
- https://arkham-starter.com/image/icon/slot/one-arcane.png
- https://arkham-starter.com/image/icon/slot/one-hand.png
- https://arkham-starter.com/image/icon/slot/two-arcane.png
- https://arkham-starter.com/image/icon/slot/two-hand.png

## `stat`

The colored test icons used on the left side of the cards. Width 24 px.

- https://arkham-starter.com/image/icon/stat/agility.png
- https://arkham-starter.com/image/icon/stat/combat.png
- https://arkham-starter.com/image/icon/stat/intellect.png
- https://arkham-starter.com/image/icon/stat/wild.png
- https://arkham-starter.com/image/icon/stat/willpower.png