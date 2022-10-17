# popup-db.json

"Popup DB" is a single-JSON database of **all cards in the game** processed from ArkhamDB's **player card** data, which you can see from this public API : https://arkhamdb.com/api/public/cards

What's different from that massive chunk of JSON you see in that link is that :

- Miniature data. "Popup" refers to the amount of data just enough for small UI such as the auto-complete popup when you type `#` in ArkhamDB. It has class, XP, card name and subtitle, sets, etc. but **not** the card's text.
- Only player cards, no campaign cards.
- JSON structure is minimized in an "Arkham-specific" way to reduce the number of JSON characters.
- It is statically hosted and public available for use at `https://arkham-starter.com/db/popupdb.json`. It is hosted on Firebase Hosting, therefore it is also duplicated to many datacenters and should be speedy for access close to your location.
- Taboo changes are applied and separated in some special fields. It always use the latest taboo. Therefore this chunk of data can only display between no taboo and latest taboo.
- Processed manually. If ArkhamDB updates, this data will not be updated together until I re-sync.

## Structure

Because there are many cards and JSON's field name will get duplicated for each card, this database abbreviates the field name to a few characters. The outer layer contains 4 maps, and finally a big array of all cards.

Some fields are number when they are not supposed to, these fields requires extra processing to get the true string by consulting the 4 maps earlier. This is because something like traits (such as "Insight") are used multiple times throughout the game, it is wasteful to have many "Insight" string throughout the JSON. This make using the database more of a hassle but I make a priority to maximize download speed.

```ts
interface PopupDatabaseRaw {
    packNames: { [k: number]: string };
    packCodes: { [k: number]: string };
    classNames: { [k: number]: string };
    traits: { [k: number]: string };
    items: PopupDatabaseItemRaw[];
}

interface PopupDatabaseItemRaw {
	/**
	 * Card string ID like in ArkhamDB, such as "01006".
	 */
	id: string

	/**
	 * Card name.
	 */
	n: string

	/**
	 * Card subname, such as "The Fed" of "Roland Banks".
	 */
	sn?: string

	/**
	 * If `true`, it means there are other cards with the same name
	 * and requires showing subname explicitly to not be confused.
	 * Such as various instances of "Strange Solution".
	 */
	esn: boolean

	/**
	 * Pack code.
	 * Use number to map with the real string in outer maps.
	 */
	pc: number

	/**
	 * Pack name
	 * Use number to map with the real string in outer maps.
	 */
	pn: number

	/**
	 * Position. The number of cards on the bottom right corner.
	 */
	ps: number

	/**
	 * Class string from ArkhamDB, such as "survivor". (all lowercase)
	 */
	c1: number

	/**
	 * Class string from ArkhamDB, such as "survivor". (all lowercase)
	 */
	c2?: number

	/**
	 * Class string from ArkhamDB, such as "survivor". (all lowercase)
	 */
	c3?: number

	/**
	 * XP pips
	 */
	xp?: number

	/**
	 * XP added (chained) from taboo. Can be negative in the case of unchain.
	 */
	xpat: number

	/**
	 * Exceptional status.
	 */
	ex: boolean

	/**
	 * Exceptional status after latest taboo applied.
	 */
	ext: boolean

	/**
	 * Investigator restriction.
	 * Essentially `true` when it is an investigator signature card / weakness.
	 */
	ir: boolean

	/**
	 * Weakness.
	 */
	wk: boolean

	/**
	 * Cost.
	 */
	cs?: number

	/**
	 * Intellect icons.
	 */
	sit?: number

	/**
	 * Combat icons.
	 */
	scm?: number

	/**
	 * Wild icons.
	 */
	swl?: number

	/**
	 * Agility icons.
	 */
	sag?: number

	/**
	 * Willpower icons.
	 */
	swi?: number

	/**
	 * Traits.
	 * Use number to map with the real string in outer maps.
	 */
	tra: number[]

	/**
	 * Customizable choices.
	 */
	cus: {
		/**
		 * XP checkboxes
		 */
		xp: number

		/**
		 * Customizable name
		 */
		n: string
	}[]
}
```