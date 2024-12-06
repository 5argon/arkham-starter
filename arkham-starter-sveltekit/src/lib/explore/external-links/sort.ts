interface JsonObject {
	site: string;
	url: string;
	name: string;
	date?: string;
	cards?: string[];
}

const folderPath = './src/lib/explore/external-links';

for await (const dirEntry of Deno.readDir(folderPath)) {
	if (dirEntry.isFile && dirEntry.name.endsWith('.json')) {
		const filePath = `${folderPath}/${dirEntry.name}`;
		const data: JsonObject[] = JSON.parse(await Deno.readTextFile(filePath));

		data.sort((a, b) => {
			if (a.date !== b.date) return new Date(a.date!).getTime() - new Date(b.date!).getTime();
			if (a.site !== b.site) return a.site.localeCompare(b.site);
			return a.name.localeCompare(b.name);
		});

		data.forEach(item => {
			if (item.cards) {
				item.cards.sort();
			}
		});

		await Deno.writeTextFile(filePath, JSON.stringify(data, null, 2));
	}
}