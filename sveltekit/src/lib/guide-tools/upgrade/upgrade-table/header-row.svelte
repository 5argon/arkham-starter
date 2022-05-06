<script lang="ts">
	import type { AllColumns } from '../interface'
	export let cols: AllColumns
</script>

<tr>
	<th/>
	<th/>
	<th>{cols.mark.title} </th>
	<th>{cols.left.title} </th>
	<th/>
	<th>{cols.arrow.title} </th>
	<th>{cols.right.title} </th>
	<th/>
	<th>{cols.xp.title} </th>
	<th>{cols.xpCumulative.title} </th>
	<th></th>
</tr>

<style>
	th {
		font-size: 0.8em;
	}
</style>
