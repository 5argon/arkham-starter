<script>
	import RenderGroupedCards from '$lib/design/components/deck-table/RenderGroupedCards.svelte'
	import ResourceItem from './ResourceItem.svelte'
</script>

<h2>Reference Materials</h2>

<ResourceItem
	url="/explore"
	title="Explore Investigator Expansions"
	description="An interactive gallery of cards inside each Investigator Expansion to help you decide on your purchase."
/>
<ResourceItem
	url="/campaign"
	title="Campaign Reference"
	description="Speed up the setup of any scenario with the encounter set overview matrix, and various useful reminders to reduce setup mistakes."
/>
<ResourceItem
	url="/tool/query"
	title="Query"
	description="Specify as many cards as you like that you want to play with in the same deck. It returns which investigators could use all of them."
/>

<h2>Tools For arkhamdb.com</h2>
<ResourceItem
	url="/tool/upgrade"
	title="Upgrade Planner"
	description="Visualize steps to progress your deck along the campaign and automatically calculates XP to get there. The importer makes your public arkhamdb.com deck cards all available for planning including the Side Deck. You can either view your finished plan by a sharing URL in this site, or export it to paste in Description section of your deck in arkhamdb.com. The exporter also supports a format optimized to view inside ArkhamCards app."
/>
<ResourceItem
	url="/deck/view"
	title="Alternate Deck Viewer"
	description="View any public arkhamdb.com deck in more beginner-friendly, more graphical style. You can also simply change 'arkhamdb' to 'arkham-starter' on the URL of any public arkhamdb.com deck as a shortcut to use this tool to view it."
/>
<ResourceItem
	url="/tool/list"
	title="Colorful Card Lister"
	description="Simple tool to export a list of cards that are part of your arkhamdb.com deck to help writing the deck description. The exported text is decorated with more colorful HTML than the default blue text you get from typing # while writing in arkhamdb.com."
/>

<h2>Play Group Management</h2>

<ResourceItem
	url="/tool/gather"
	title="Deck Gather"
	description="A tool for the collection owner to pick cards for everyone in a single iteration when starting the campaign, instead of going over the collection as many times as player count. Input arkhamdb.com decks of everyone, it then combines everyone's cards so you can sort them all according to how your collection is ordered."
/>
<ResourceItem
	url="/tool/switch"
	title="Campaign Switch"
	description="For running concurrent campaigns using a single collection while avoid having to disassemble all the decks each time you switch. It is able to compare up to 4 vs. 4 decks and return the intersection, so you only transfer those cards when switching the campaign."
/>
<ResourceItem
	url="/tool/assembler"
	title="Team Assembler"
	description="Input as many arkhamdb.com decks from you and your friends that you are interested in starting the campaign with. It analyzes every possible combinations of them into 2P, 3P, and 4P teams and sorts up the one with less card overlap up top. Now you all can simply browse the best team to go with. Useful when you and your friends all have many unplayed decks created ahead of time in arkhamdb.com."
/>

<h2>Physical Blings</h2>

<ResourceItem
	url="/divider"
	title="The 3mm Divider"
	description="Minimal-style dividers that are only 3mm wider than the cards. It has many unique quirks such as supporting both orientation in one design, and available in multiple languages."
/>
<ResourceItem url="/errata" title="Errata Patch Cards" description="" />
<ResourceItem url="/utility-mini" title="Utility Mini-Card" description="" />
<ResourceItem url="/proxy" title="Proxy Template" description="" />

<h2>Campaign-Specific Stuff</h2>

<ResourceItem url="/supply" title="The Forgotten Age : Supply Cards" description="" />
<ResourceItem url="/eote" title="Edge of the Earth : Prologue Scene" description="" />
<ResourceItem url="/tsk-document" title="The Scarlet Keys : Printable Documents" description="" />
<ResourceItem url="/tsk-map" title="The Scarlet Keys : Upscaled World Map" description="" />
