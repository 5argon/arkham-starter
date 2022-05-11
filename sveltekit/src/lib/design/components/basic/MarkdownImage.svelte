<script context="module" lang="ts">
	const regex = new RegExp(/!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g)
</script>

<script lang="ts">
	export let raw: string
	export let text: string
	let url: string = ''
	$: {
		regex.lastIndex = 0
		const result = regex.exec(raw)
		if (result !== null && result.length > 1) {
			console.log(result)
			const u = result[1]
			const subStart = u.indexOf('/image/documentation/')
			url = u.substring(subStart)
		}
	}
</script>

<div>
	<img src={url} alt={text} />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
	}

	img {
		max-width: 600px;
		max-height: 300px;
	}
</style>
