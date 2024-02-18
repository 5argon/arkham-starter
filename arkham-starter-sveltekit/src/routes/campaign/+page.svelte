<script lang="ts">
	import ExpansionDisplay from '$lib/design/components/expansion/ExpansionDisplay.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { CardPackIcon } from '$lib/design/interface/card-pack'
	const campaignExpansion = 'Campaign Expansion'
</script>

<PageTitle title={'Campaign Expansion Setup References'} />
<div class="flex">
	<ExpansionDisplay
		set={CardPackIcon.RevisedCoreSet}
		text="Night of the Zealot"
		link="/campaign/notz"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheDunwichLegacy}
		text="The Dunwich Legacy"
		subText={campaignExpansion}
		link="/campaign/dwl"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.ThePathToCarcosa}
		text="The Path to Carcosa"
		subText={campaignExpansion}
		link="/campaign/ptc"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheForgottenAge}
		text="The Forgotten Age"
		subText={campaignExpansion}
		link="/campaign/tfa"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheCircleUndone}
		text="The Circle Undone"
		subText={campaignExpansion}
		link="/campaign/tcu"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheDreamEaters}
		text="The Dream-Eaters*"
		subText={campaignExpansion}
		link="/campaign/tde"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheInnsmouthConspiracy}
		text="The Innsmouth Conspiracy*"
		subText={campaignExpansion}
		link="/campaign/tic"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.EdgeOfTheEarth}
		text="Edge of the Earth"
		subText={campaignExpansion}
		link="/campaign/eote"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.TheScarletKeys}
		text="The Scarlet Keys"
		subText={campaignExpansion}
		link="/campaign/tsk"
		campaign
	/>
	<!-- <ExpansionDisplay
		set={CardPackIcon.TheFeastOfHemlockVale}
		text="The Feast of Hemlock Vale*"
		subText={campaignExpansion}
		link="/campaign/fhv"
		campaign
	/> -->
</div>
<div class="flex">
	<ExpansionDisplay
		set={CardPackIcon.ReturnToTheDunwichLegacy}
		text="Return to the Dunwich Legacy"
		link="/campaign/rtdwl"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.ReturnToThePathToCarcosa}
		text="Return to the Path to Carcosa*"
		link="/campaign/rtptc"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.ReturnToTheForgottenAge}
		text="Return to the Forgotten Age*"
		link="/campaign/rttfa"
		campaign
	/>
	<ExpansionDisplay
		set={CardPackIcon.ReturnToTheCircleUndone}
		text="Return to the Circle Undone*"
		link="/campaign/rttcu"
		campaign
	/>
</div>

<p>* = Incomplete because I have not played the campaign, or I'm not confident in correctness.</p>

<h2>Spoiler Info</h2>
<p>When you entered one of the campaign pages, you will see :</p>
<ul>
	<li>All scenario names.</li>
	<li>All encounter set icon graphics.</li>
	<li>Which encounter set icon are used in which scenario, presented in a matrix.</li>
	<li>
		When hovering on the encounter set icon or toggle "Show Name", you will additionally see the
		encounter set's name.
	</li>
	<li>
		In "Scenarios" tab, you will additionally see a minimalistic representation of that scenario's
		setup instruction, represented by encounter set icons and numbers, and some important reminders
		such as added Basic Weakness or Chaos Bag changes during Intro or Setup. (Light spoiler)
	</li>
	<li>
		In "Setup Reference Cards" tab contains a sanity check image that helps reminding you of
		scenario's details. Don't use it unless you already know the scenario inside out. (Heavy
		spoiler)
	</li>
</ul>

<style>
	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 8px 0px;
	}
</style>
