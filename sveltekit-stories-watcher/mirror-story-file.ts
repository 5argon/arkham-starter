import { findDestPathOnTopMinusFirstFolder } from "./find-path.ts";
import { parse, join, ensureDir, relative } from "./deps.ts";

function makeFileContent(path: string): string {
  return `<script>
	import Stories from '${path}';
</script>

<Stories />`;
}

/**
 * From full path to a story file, make an equivalent file
 * in the {@link dest} folder inside the same shape of directory structure of the
 * original file. The file content is simply rendering the original file, importing
 * it with a relative path.
 */
export async function mirrorStoryFile(
  input: string,
  storyFile: string,
  dest: string
): Promise<void> {
  const destPathOnTopMinusFirstFolder = findDestPathOnTopMinusFirstFolder(
    input,
    storyFile,
    dest
  );

  const parsed = parse(storyFile);
  const destPath = join(dest, destPathOnTopMinusFirstFolder);
  const ensurePromise = ensureDir(destPath);
  const relativeWalk = relative(destPath, parsed.dir);
  const relativeWalkWithFileName = join(relativeWalk, parsed.name + parsed.ext);
  const destPathWithFile = join(
    destPath,
    parsed.name.replace(".stories", parsed.ext)
  );
  const fileContent = makeFileContent(relativeWalkWithFileName);

  await ensurePromise;
  await Deno.writeTextFile(destPathWithFile, fileContent);
}
