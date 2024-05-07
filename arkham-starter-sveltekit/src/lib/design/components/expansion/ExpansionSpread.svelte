<script lang='ts'>
  import { CardPack } from '$lib/core/card-pack.js'
  import ExpansionDisplay from '$lib/design/components/expansion/ExpansionDisplay.svelte'
  import { CardPackIcon } from '$lib/design/interface/card-pack'

  const investigatorExpansion = 'Investigator Expansion'
  const investigatorStarterDeck = 'Investigator Starter Deck'
  export let onClick: ((set: CardPack) => void) | undefined = undefined
  // If defined, only these packs make the button colored.
  export let enabledExpansions: CardPack[] | undefined = undefined

  $:isDisabled = (set: CardPack) => {
    if (enabledExpansions === undefined) return false
    return !enabledExpansions.includes(set)
  }
</script>

<div class='flex'>
  <ExpansionDisplay
    set={CardPackIcon.RevisedCoreSet}
    disabled={isDisabled(CardPackIcon.RevisedCoreSet)}
    text='Revised Core Set'
    link='/explore/rcore'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.TheDunwichLegacy}
    disabled={isDisabled(CardPackIcon.TheDunwichLegacy)}
    text='The Dunwich Legacy'
    subText={investigatorExpansion}
    link='/explore/dwl'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.ThePathToCarcosa}
    disabled={isDisabled(CardPackIcon.ThePathToCarcosa)}
    text='The Path to Carcosa'
    subText={investigatorExpansion}
    link='/explore/ptc'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.TheForgottenAge}
    disabled={isDisabled(CardPackIcon.TheForgottenAge)}
    text='The Forgotten Age'
    subText={investigatorExpansion}
    link='/explore/tfa'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.TheCircleUndone}
    disabled={isDisabled(CardPackIcon.TheCircleUndone)}
    text='The Circle Undone'
    subText={investigatorExpansion}
    link='/explore/tcu'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.TheDreamEaters}
    disabled={isDisabled(CardPackIcon.TheDreamEaters)}
    text='The Dream-Eaters'
    subText={investigatorExpansion}
    link='/explore/tde'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.TheInnsmouthConspiracy}
    disabled={isDisabled(CardPackIcon.TheInnsmouthConspiracy)}
    text='The Innsmouth Conspiracy'
    subText={investigatorExpansion}
    link='/explore/tic'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.EdgeOfTheEarth}
    disabled={isDisabled(CardPackIcon.EdgeOfTheEarth)}
    text='Edge of the Earth'
    subText={investigatorExpansion}
    link='/explore/eote'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.TheScarletKeys}
    disabled={isDisabled(CardPackIcon.TheScarletKeys)}
    text='The Scarlet Keys'
    subText={investigatorExpansion}
    link='/explore/tsk'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.TheFeastOfHemlockVale}
    disabled={isDisabled(CardPackIcon.TheFeastOfHemlockVale)}
    text='The Feast of Hemlock Vale'
    subText={investigatorExpansion}
    link='/explore/fhv'
    onClick={onClick}
  />
</div>

<div class='flex'>
  <ExpansionDisplay
    set={CardPackIcon.NathanielCho}
    disabled={isDisabled(CardPackIcon.NathanielCho)}
    text='Nathaniel Cho'
    subText={investigatorStarterDeck}
    link='/explore/nat'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.HarveyWalters}
    disabled={isDisabled(CardPackIcon.HarveyWalters)}
    text='Harvey Walters'
    subText={investigatorStarterDeck}
    link='/explore/har'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.WinifredHabbamock}
    disabled={isDisabled(CardPackIcon.WinifredHabbamock)}
    text='Winifred Habbamock'
    subText={investigatorStarterDeck}
    link='/explore/win'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.JacquelineFine}
    disabled={isDisabled(CardPackIcon.JacquelineFine)}
    text='Jacqueline Fine'
    subText={investigatorStarterDeck}
    link='/explore/jac'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPackIcon.StellaClark}
    disabled={isDisabled(CardPackIcon.StellaClark)}
    text='Stella Clark'
    subText={investigatorStarterDeck}
    link='/explore/ste'
    onClick={onClick}
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
