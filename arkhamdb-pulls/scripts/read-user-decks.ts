import { path } from "../mod.ts";
import { inputDirectory } from "./constants.ts";
import { UserDecks } from "./interfaces.ts";

export async function readUserDecks(): Promise<UserDecks[]> {
  const userDecks: UserDecks[] = [];

  for await (const dirEntry of Deno.readDir(inputDirectory)) {
    if (dirEntry.isFile) {
      const jsonString = await Deno.readTextFile(
        path.join(inputDirectory, dirEntry.name)
      );
      const json = JSON.parse(jsonString) as UserDecks;
      userDecks.push(json);
    }
  }

  return userDecks;
}
