<script lang='ts'>
  import { Checkbox, FaIcon, allIcons } from '$lib'
  import LimitedTab from '$lib/LimitedTab.svelte'
</script>

<h1>Checkbox</h1>

<Checkbox checked={false}>
  <svelte:fragment>
    <FaIcon path={allIcons.arrowUp} />
    <span>Hello</span>
  </svelte:fragment>
</Checkbox>

<h1>LimitedTab</h1>

<LimitedTab>
  <div slot='tab1'>Tab 1</div>
  <div slot='content1'>Content 1</div>
  <div slot='tab2'>Tab 2</div>
  <div slot='content2'>Content 2</div>
  <div slot='tab3'>Tab 3</div>
  <div slot='content3'>Content 3</div>
</LimitedTab>