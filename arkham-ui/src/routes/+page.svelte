<script>
  import Checkbox from '$lib/Checkbox.svelte'
  import { allIcons } from '$lib/index.ts'
</script>


<h1>Checkbox</h1>

<Checkbox iconImagePath={allIcons.arrowUp} checked={false}>Hello</Checkbox>