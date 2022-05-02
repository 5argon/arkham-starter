import { emptyDir, path } from "../mod.ts";
import { pullsCards, pullsDecks, pullsDirectory } from "./constants.ts";

export async function prepareOuterFolders(): Promise<void[]> {
  await emptyDir(pullsDirectory);
  const emptyPromise2 = emptyDir(path.join(pullsDirectory, pullsCards));
  const emptyPromise3 = emptyDir(path.join(pullsDirectory, pullsDecks));
  const emptyPromise = Promise.all<void>([
    emptyPromise2,
    emptyPromise3,
  ]);
  return await emptyPromise;
}
