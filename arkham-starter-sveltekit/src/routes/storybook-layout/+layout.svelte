<script>
	import SimpleLayout from '../../storybook/SimpleLayout.svelte'
	import tree from '../storybook/tree.json'
</script>

<SimpleLayout {tree} navigatorOffset={10}>
	<slot />
</SimpleLayout>
