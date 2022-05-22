import { createTreeJson } from "./create-tree-json.ts";
import { getStoriesRecursive } from "./input-processing.ts";
import { mirrorStoryFile } from "./mirror-story-file.ts";
import { emptyDir, ensureFile, join } from "./deps.ts";

export async function sync(
  inputFolder: string,
  outputFolder: string
): Promise<void> {
  console.log(
    `Regenerating ${outputFolder} according to stories found in ${inputFolder}`
  );
  const gn = await getStoriesRecursive(inputFolder);

  await emptyDir(outputFolder);

  const promises = gn.map((x) => mirrorStoryFile(inputFolder, x, outputFolder));
  const layoutFilePromise = Deno.writeTextFile(
    join(outputFolder, "__layout@storybook.svelte"),
    "<slot />"
  );
  const indexFilePromise = ensureFile(join(outputFolder, "index.svelte"));
  const treeJsonPromise = createTreeJson(inputFolder, gn, outputFolder);
  await Promise.all([
    ...promises,
    layoutFilePromise,
    indexFilePromise,
    treeJsonPromise,
  ]);
}
