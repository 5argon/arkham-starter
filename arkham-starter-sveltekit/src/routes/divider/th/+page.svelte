<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'

	import MarkdownImage from '$lib/design/components/basic/MarkdownImage.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import helpMd from '$lib/md/divider-th.md?raw'
</script>

<svelte:head>
	<title>arkham-starter.com | ตัวคั่นการ์ด 3 มิลลิเมตร (The 3mm Divider)</title>
	<meta property="og:title" content={'ตัวคั่นการ์ด 3 มิลลิเมตร (The 3mm Divider)'} />
	<meta property="og:image" content={'https://arkham-starter.com/image/documentation/divider/thai1.webp'} />
	<meta
		property="og:description"
		content={'ตัวคั่นการ์ดอาถรรพ์แห่งอาร์คัม เดอะการ์ดเกม ใช้ในกล่องหลักได้ แนวตั้งแนวนอนในแผ่นเดียว'}
	/>
</svelte:head>

<PageTitle title={'ตัวคั่นการ์ด 3 มิลลิเมตร (The 3mm Divider)'} />

<SvelteMarkdown renderers={{ image: MarkdownImage }} source={helpMd} />
