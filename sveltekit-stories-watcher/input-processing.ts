import { walk } from "./deps.ts";

const regex = new RegExp(/\.stories\..+$/i);

/**
 * Find all files ending with `*.stories.*` recursively inside {@link inputPath} directory.
 */
export async function getStoriesRecursive(inputPath: string) {
  const names: string[] = [];
  for await (const dirEntry of walk(inputPath)) {
    if (dirEntry.isFile) {
      regex.lastIndex = 0;
      const result = regex.exec(dirEntry.path);
      if (result !== null) {
        names.push(dirEntry.path);
      }
    }
  }
  return names;
}
