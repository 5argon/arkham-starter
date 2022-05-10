# Upgrade Planner

A two-column table that can "diff" the cards and update XP calculation (cost and total cumulative) as you change things around on the table. The plan is implied that you upgrade in order from top to bottom.

Its primary objective is to export your finished plan to table-formatted Markdown which is a disaster to normally type. Paste it in ArkhamDB's deck guide to remember your upgrade plans for future reference in-between scenarios what you were thinking while creating the deck, and perhaps make some deviations from the plan depending on your campaign state.

This is for decks that uses the main section for level 0 starting cards and Side Deck section for all the upgrade cards. Sometimes you forgot which cards in the starting list are waiting to be removed long after creating it. Therefore just by importing that deck, you have every cards needed for both "from" and "to" columns for this planner since ArkhamDB exports both the main and side deck together.

The export formatting will closely emulate what is shown on the left section of your deck in ArkhamDB. (With class icons, coloring, XP pips, hoverable, and is using the same stylesheet as the rest of ArkhamDB.) So if you are writing a detailed deck guide for beginners, they can make visual connection to the decklist better as opposed to being generic blue hyperlinks.

Below are some boring write ups about details of each section you can probably figure out by just using it... I program better when I write documentations first even before anything is completed.

- [Staging Area](#staging-area)
- [Two-column Table](#two-column-table)
  - [Left side](#left-side)
  - [Right side](#right-side)
  - [Arrow](#arrow)
  - [Mark](#mark)
  - [XP Unlock](#xp-unlock)
  - [Divider Row](#divider-row)
  - [Cumulative XP Unlock](#cumulative-xp-unlock)
- [Exporting](#exporting)
  - [Shape](#shape)
  - [Included columns](#included-columns)
  - [Card presentation](#card-presentation)
  - [Export border](#export-border)
  - [Import code](#import-code)

## Staging Area

Section on the left side of the screen. These are cards you are planning to add to the two-column table to try out the upgrades. You may add more cards than actually used in the planner.

It is planned so you can add any individual card as you like, but it need a good card browser which looks like a lot of work. For now, you can only add cards by pasing deck URL from ArkhamDB.

Other than grabbing the deck ID number from the URL, it also detects a kind of deck from the URL :

- If it has `/decklist/view` : It requests a deck from published deck API of ArkhamDB.
- If it has `/deck/view` or `/deck/edit` : It requests a deck from personal deck API of ArkhamDB, which would fail if you hadn't check the "make public" option in your user settings. Also if you are currently editing the deck and have changes in the card list, save it first before importing.

Use the left/right button to add the card to main two-column table. It will create a new row automatically if it cannot find empty space to add.

It is possible to drag and drop cards here to an empty slot in the two-column table. A card will appear there but will not disappear from the staging list.

## Two-column Table

Any card can move individually by drag-and-dropping. If you drop on an another card, both cards will swap place. Press the trash can button to delete a single card.

An entire row can be moved as a whole using up/down button on the left. A row cannot be dragged. An entire row can be deleted by pressing the trash can button on the left.

### Left side

This side represent a card to be removed.

So if your plan for the step is purchasing a Permanent card, it should be on the right side, not the left. (Otherwise automatic calculation would be wrong.)

### Right side

This side represent a card to add.

### Arrow

It is has a little red tip, that means it detects that a row is an upgrade instead of a purchase and may get XP discount. It detects by comparing card name of both sides if they are the same or not.

### Mark

There is a little box on the left side of the left card for each row. You can type anything here (like an asterisk or other ASCII characters) and it will appear in the final export as its own row.

This is so if you want to say something about this row, it can be paired with later under the table. Markdown support of column span is not good, so it is best not try to add an explanation paragraph sandwiched inside the table.

### XP Unlock

Check the unlock icon at the end of each row to unlock the automatic XP calculation. The XP box is now editable, and is currently using the previously automatically calculated XP. Locking and unlocking again will reset the box to automatically calculated number.

The application has no knowledge of a card like Adaptable, Down the Rabbit Hole, etc. and this is where you can force it to use any XP as you like.

Cumulative XP will also be updated to use your custom edit XP automatically.

### Divider Row

Press "Add Divider Row" to add a special row. This row can subdivides the table into multiple sections with total cumulative XP connected. Use the up/down button on the left to position the divider row.

Type on the long box to explain the divider. It is exported in Markdown to the same column as the right card.

### Cumulative XP Unlock

Similar to "XP Unlock" feature, but only available on the divider row. Using unlock check box on the divider row will "interrupt" the flow of cumulative XP to stop here, and start with a new value that you type in.

An example is that you would like to express branching path of plans, and therefore 2 divider should start from the same number of cumulative XP from the previous section. Or you can also position divider on top, and enter negative number to express that you have some spare XP from the start. (e.g. In the Thick of It, Parallel Roland.)

## Exporting

Many things are draft of the complete feature, right now you cannot actually adjust the exporting this much just yet...

Adjust several exporting options here and you will see the export result updated below. Copy the text and paste in your ArkhamDB deck guide. Currently there is no emulated ArkhamDB preview of export result, please see it in ArkhamDB directly after pasting.

### Shape

Toggle between simple list or table. Columns will not line up in a simple list, but is more flexible to continue editing in Markdown.

### Included columns

You can remove the XP and cumulative XP column in the export here. Arrow column can be customized to use an another glyph that is not an arrow. It can also be colored red when it is an upgrade instead of a purchase.

### Card presentation

Customize how each card looks like in the export for both sides.

The card can be a simple ArkhamDB hoverable link (e.g. `[Text](/card/12345)`) or full-on styled with class icons, text color, and even XP pips, so it looks like the decklist cards on the left side in ArkhamDB such that reader can connect the dots easier between your guide and the deck.

However, the more you add blings to the export, the more it looks messy in the Markdown and impossible to continue editing in Markdown. To deal with this problem, it also export a strange string of code ("upgrade code") that represents an entire table.

### Export border

You might notice these :

```md
[//]: # (==================== TABLE START ====================)

...
[//]: # (===================== TABLE END =====================)
```

This is a Markdown comment that viewer cannot see. Since the exported Markdown table looks like a mess, this dividing line helps you see clearer where is the table while scrolling through your deck documentation, so you can detect an actual content that you had hand-typed from the mess.

### Import code

Using the same Markdown comment, at the end of your exported Markdown you will see something like this :

```
[//]: # (https://arkham-starters.com/guide-tools/upgrade?i=O%2C%2C%2C1%2C0%2C14%2C38%2C%7C%2C....)
```

Since table is hell to continue editing in Markdown format, this URL is intended so if you visit it, you would arrive back at this page with the table restored and can continue making changes to make a new export. You can share this so others can use to see the upgrade plan in this site as well. Note that the staging area is not restored.

But right now, it has no such loading feature yet. Also if I made changes to the upgrade code format it is possible that an old upgrade code is no longer compatible.
