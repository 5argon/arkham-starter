import { common, parse, normalize } from "./deps.ts";

export function findDestPathOnTopMinusFirstFolder(
  input: string,
  storyFile: string,
  dest: string
): string {
  const parsed = parse(storyFile);
  const inputNormalized = normalize(input);
  const destNormalized = normalize(dest);
  const commonWithDest = common([storyFile, destNormalized]);

  const destPathOnTop = parsed.dir.substring(commonWithDest.length);
  const inputSubs = inputNormalized.substring(commonWithDest.length);

  const commonWithInput = common([inputSubs, destPathOnTop]);
  const destPathOnTopMinusFirstFolder = destPathOnTop.substring(
    commonWithInput.length
  );
  return destPathOnTopMinusFirstFolder;
}
