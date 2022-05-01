import { path } from "../mod.ts";
import { deckDirectory } from "./constants.ts";
import { UserDecks, UserJson } from "./interfaces.ts";


export async function readUserDecks(): Promise<UserDecks[]> {
  const userDecks: UserDecks[] = [];

  for await(const dirEntry of Deno.readDir(deckDirectory)) {
    if(dirEntry.isFile) {
      const jsonString = await Deno.readTextFile(
        path.join(deckDirectory, dirEntry.name)
      );
      const json = JSON.parse(jsonString) as UserJson;
      userDecks.push({
        id: parseInt(dirEntry.name.replace(".json", "")),
        decks: json.decks,
      });
    }
  }

  return userDecks;
}
