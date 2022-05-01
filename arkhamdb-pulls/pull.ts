import { prepareOuterFolders } from "./scripts/prepare-outer-folders.ts";
import { readUserDecks } from "./scripts/read-user-decks.ts";

const userDecksPromise = readUserDecks();
const prepareOuterFoldersPromise = prepareOuterFolders();

const userDecks = await userDecksPromise;
await prepareOuterFoldersPromise;
