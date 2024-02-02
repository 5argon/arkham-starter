<script>
	import ExpansionDisplay from '$lib/design/components/expansion/ExpansionDisplay.svelte'
	import { CardPackIcon } from '$lib/design/interface/card-pack'
	const investigatorExpansion = 'Investigator Expansion'
	const investigatorStarterDeck = 'Investigator Starter Deck'
</script>

<div class="flex">
	<ExpansionDisplay
		set={CardPackIcon.RevisedCoreSet}
		text="Revised Core Set"
		link="/explore/rcore"
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheDunwichLegacy}
		text="The Dunwich Legacy"
		subText={investigatorExpansion}
		link="/explore/dwl"
	/>
	<ExpansionDisplay
		set={CardPackIcon.ThePathToCarcosa}
		text="The Path to Carcosa"
		subText={investigatorExpansion}
		link="/explore/ptc"
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheForgottenAge}
		text="The Forgotten Age"
		subText={investigatorExpansion}
		link="/explore/tfa"
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheCircleUndone}
		text="The Circle Undone"
		subText={investigatorExpansion}
		link="/explore/tcu"
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheDreamEaters}
		text="The Dream-Eaters"
		subText={investigatorExpansion}
		link="/explore/tde"
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheInnsmouthConspiracy}
		text="The Innsmouth Conspiracy"
		subText={investigatorExpansion}
		link="/explore/tic"
	/>
	<ExpansionDisplay
		set={CardPackIcon.EdgeOfTheEarth}
		text="Edge of the Earth"
		subText={investigatorExpansion}
		link="/explore/eote"
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheScarletKeys}
		text="The Scarlet Keys"
		subText={investigatorExpansion}
		link="/explore/tsk"
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheFeastOfHemlockVale}
		text="The Feast of Hemlock Vale"
		subText={investigatorExpansion}
		link="/explore/fhv"
	/>
</div>

<div class="flex">
	<ExpansionDisplay
		set={CardPackIcon.NathanielCho}
		text="Nathaniel Cho"
		subText={investigatorStarterDeck}
		link="/explore/nat"
	/>
	<ExpansionDisplay
		set={CardPackIcon.HarveyWalters}
		text="Harvey Walters"
		subText={investigatorStarterDeck}
		link="/explore/har"
	/>
	<ExpansionDisplay
		set={CardPackIcon.WinifredHabbamock}
		text="Winifred Habbamock"
		subText={investigatorStarterDeck}
		link="/explore/win"
	/>
	<ExpansionDisplay
		set={CardPackIcon.JacquelineFine}
		text="Jacqueline Fine"
		subText={investigatorStarterDeck}
		link="/explore/jac"
	/>
	<ExpansionDisplay
		set={CardPackIcon.StellaClark}
		text="Stella Clark"
		subText={investigatorStarterDeck}
		link="/explore/ste"
	/>
</div>

<!-- <div class="flex">
	<ExpansionDisplay
		set={CardPackIcon.ReturnToTheDunwichLegacy}
		text="Return to The Dunwich Legacy"
		link="/explore/rtdwl"
	/>
	<ExpansionDisplay
		set={CardPackIcon.ReturnToThePathToCarcosa}
		text="Return to The Path to Carcosa"
		link="/explore/rtptc"
	/>
	<ExpansionDisplay
		set={CardPackIcon.ReturnToTheForgottenAge}
		text="Return to The Forgotten Age"
		link="/explore/rttfa"
	/>
	<ExpansionDisplay
		set={CardPackIcon.ReturnToTheCircleUndone}
		text="Return to The Circle Undone"
		link="/explore/rttcu"
	/>
	<ExpansionDisplay
		set={CardPackIcon.ParallelInvestigator}
		text="Parallel Investigator"
		link="/explore/par"
	/>
</div> -->

<style>
	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 8px 0px;
	}
</style>
