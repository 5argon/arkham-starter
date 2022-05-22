import { findDestPathOnTopMinusFirstFolder } from "./find-path.ts";
import { join, parse } from "./deps.ts";

type TreeConstructor = { [k: string]: TreeConstructor | null };

export async function createTreeJson(
  input: string,
  allStoryFiles: string[],
  outputFolder: string
): Promise<void> {
  const all = allStoryFiles.map((x) => {
    const parsed = parse(x);
    const dest = findDestPathOnTopMinusFirstFolder(input, x, outputFolder);
    const a: string[] = [];
    if (dest !== "") {
      const destSplit = dest.split("/");
      a.push(...destSplit);
    }
    const nameWithoutExtension = parse(parsed.name).name;
    a.push(nameWithoutExtension);
    return a;
  });
  const tc: TreeConstructor = {};

  all.forEach((x) => {
    Do(tc, 0, x);
  });
  const fileContent = JSON.stringify(tc);
  await Deno.writeTextFile(join(outputFolder, "tree.json"), fileContent);
}

function Do(tcon: TreeConstructor, index: number, sa: string[]) {
  if (sa.length === 0) {
    return;
  }
  const item = sa[index];
  const last = index === sa.length - 1;
  const exist = item in tcon;
  let newTcon: TreeConstructor;
  if (!exist) {
    tcon[item] = null;
    newTcon = {};
  } else {
    const get = tcon[item];
    if (get !== null) {
      newTcon = get;
    } else {
      newTcon = {};
    }
  }
  if (!last) {
    Do(newTcon, index + 1, sa);
    tcon[item] = newTcon;
  }
}
