import { emptyDir, path } from "../mod.ts";
import { pullsCards, pullsDecks, pullsDirectory } from "./constants.ts";

export async function prepareOuterFolders(): Promise<void[]> {
  const emptyPromise1 = emptyDir(pullsDirectory);
  const emptyPromise2 = emptyDir(path.join(pullsDirectory, pullsCards));
  const emptyPromise3 = emptyDir(path.join(pullsDirectory, pullsDecks));
  const emptyPromise = Promise.all<void>([
    emptyPromise1,
    emptyPromise2,
    emptyPromise3,
  ]);
  return await emptyPromise;
}
