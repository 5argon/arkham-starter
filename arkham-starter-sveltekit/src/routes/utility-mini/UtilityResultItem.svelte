<script lang="ts">
	import type { ResultItem } from './result'

	export let item: ResultItem

	$: multipleCopies = item.members.length > 0 && item.members[0].quantity > 1
	$: quantityFirstCopy = item.members.length === 0 ? 0 : item.members[0].quantity
</script>

<div class="frame">
	<div class="item-name">{item.name}</div>
	{#if multipleCopies}
		<div class="item-quantity">Recommended Copies : {quantityFirstCopy}</div>
	{/if}
	<div class="item-description">{item.description}</div>
	<div class="flex-preview">
		{#each item.members as member}
			<span class="flex-member">
				<span>
					<img
						alt="front"
						class="mini-front"
						src={'image/custom/utility-mini-card/' +
							member.frontName.replace(/\.[^/.]+$/, '') +
							'.webp'}
					/>
				</span>
				<span>
					<img
						alt="back"
						class="mini-back"
						src={'image/custom/utility-mini-card/' +
							member.backName.replace(/\.[^/.]+$/, '') +
							'.webp'}
					/>
				</span>
			</span>
		{/each}
	</div>
</div>

<style>
	.frame {
		padding: 12px 0px;
	}

	.item-name {
		margin-left: 16px;
		font-size: large;
		padding: 2px 0px;
	}

	.item-description {
		margin-left: 16px;
		padding: 2px 0px;
	}

	.item-quantity {
		font-size: x-small;
		margin-left: 16px;
	}

	.flex-preview {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 8px 0px;
	}

	.flex-member {
		margin: 16px;
	}

	.mini-front {
		border-radius: 12px 0px 0px 12px;
	}

	.mini-back {
		border-radius: 0px 12px 12px 0px;
	}
</style>
