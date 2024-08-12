<script lang='ts'>
  import ExpansionDisplay from '$lib/design/components/expansion/ExpansionDisplay.svelte'
  import { CardPack } from '$lib/design/interface/card-pack'

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
    set={CardPack.RevisedCoreSet}
    disabled={isDisabled(CardPack.RevisedCoreSet)}
    text='Revised Core Set'
    link='/explore/rcore'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.TheDunwichLegacy}
    disabled={isDisabled(CardPack.TheDunwichLegacy)}
    text='The Dunwich Legacy'
    subText={investigatorExpansion}
    link='/explore/dwl'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.ThePathToCarcosa}
    disabled={isDisabled(CardPack.ThePathToCarcosa)}
    text='The Path to Carcosa'
    subText={investigatorExpansion}
    link='/explore/ptc'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.TheForgottenAge}
    disabled={isDisabled(CardPack.TheForgottenAge)}
    text='The Forgotten Age'
    subText={investigatorExpansion}
    link='/explore/tfa'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.TheCircleUndone}
    disabled={isDisabled(CardPack.TheCircleUndone)}
    text='The Circle Undone'
    subText={investigatorExpansion}
    link='/explore/tcu'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.TheDreamEaters}
    disabled={isDisabled(CardPack.TheDreamEaters)}
    text='The Dream-Eaters'
    subText={investigatorExpansion}
    link='/explore/tde'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.TheInnsmouthConspiracy}
    disabled={isDisabled(CardPack.TheInnsmouthConspiracy)}
    text='The Innsmouth Conspiracy'
    subText={investigatorExpansion}
    link='/explore/tic'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.EdgeOfTheEarth}
    disabled={isDisabled(CardPack.EdgeOfTheEarth)}
    text='Edge of the Earth'
    subText={investigatorExpansion}
    link='/explore/eote'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.TheScarletKeys}
    disabled={isDisabled(CardPack.TheScarletKeys)}
    text='The Scarlet Keys'
    subText={investigatorExpansion}
    link='/explore/tsk'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.TheFeastOfHemlockVale}
    disabled={isDisabled(CardPack.TheFeastOfHemlockVale)}
    text='The Feast of Hemlock Vale'
    subText={investigatorExpansion}
    link='/explore/fhv'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.TheDrownedCity}
    disabled={isDisabled(CardPack.TheDrownedCity)}
    text='The Drowned City*'
    subText={investigatorExpansion}
    link='/explore/tdc'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.ParallelInvestigator}
    disabled={isDisabled(CardPack.ParallelInvestigator)}
    text='Parallel Investigator'
    subText={"Print-and-Play Cards"}
    link='/explore/par'
    onClick={onClick}
  />
</div>

<div class='flex'>
  <ExpansionDisplay
    set={CardPack.NathanielCho}
    disabled={isDisabled(CardPack.NathanielCho)}
    text='Nathaniel Cho'
    subText={investigatorStarterDeck}
    link='/explore/nat'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.HarveyWalters}
    disabled={isDisabled(CardPack.HarveyWalters)}
    text='Harvey Walters'
    subText={investigatorStarterDeck}
    link='/explore/har'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.WinifredHabbamock}
    disabled={isDisabled(CardPack.WinifredHabbamock)}
    text='Winifred Habbamock'
    subText={investigatorStarterDeck}
    link='/explore/win'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.JacquelineFine}
    disabled={isDisabled(CardPack.JacquelineFine)}
    text='Jacqueline Fine'
    subText={investigatorStarterDeck}
    link='/explore/jac'
    onClick={onClick}
  />
  <ExpansionDisplay
    set={CardPack.StellaClark}
    disabled={isDisabled(CardPack.StellaClark)}
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
