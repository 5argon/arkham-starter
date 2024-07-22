<script lang='ts'>
  import { Checkbox, FaIcon, allIcons } from '$lib'
</script>

<h1>Checkbox</h1>

<Checkbox checked={false}>
  <svelte:fragment>
    <FaIcon path={allIcons.arrowUp} />
    <span>Hello</span>
  </svelte:fragment>
</Checkbox>