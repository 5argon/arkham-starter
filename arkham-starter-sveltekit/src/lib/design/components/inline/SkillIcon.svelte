<script lang="ts">
	import { CommitIcon } from '$lib/core/commit-icon'
	import { imageIconSkillPath } from '$lib/design/interface/path'
	export let icon: CommitIcon
	let imagePath: string
	let iconAlt: string
	$: {
		switch (icon) {
			case CommitIcon.Agility: {
				imagePath = `${imageIconSkillPath}agility.png`
				iconAlt = 'Agility'
				break
			}
			case CommitIcon.Combat: {
				imagePath = `${imageIconSkillPath}combat.png`
				iconAlt = 'Combat'
				break
			}
			case CommitIcon.Intellect: {
				imagePath = `${imageIconSkillPath}intellect.png`
				iconAlt = 'Intellect'
				break
			}
			case CommitIcon.Willpower: {
				imagePath = `${imageIconSkillPath}willpower.png`
				iconAlt = 'Willpower'
				break
			}
			case CommitIcon.Wild: {
				imagePath = `${imageIconSkillPath}wild.png`
				iconAlt = 'Wild'
				break
			}
		}
	}
</script>

<div class="outer-square">
	<img draggable={false} class="class-icon" src={imagePath} alt={iconAlt} />
</div>

<style>
	.outer-square {
		display: inline-block;
		width: 14px;
		height: 14px;
	}

	.class-icon {
		user-select: none;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
