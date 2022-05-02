import { prepareOuterFolders } from "./scripts/prepare-outer-folders.ts";
import { readUserDecks } from "./scripts/read-user-decks.ts";
import {
  gatherCards,
  processUserDeck,
} from "./scripts/process-user-deck/process-user-deck.ts";
import {
  writeCards,
  writeDecks,
} from "./scripts/process-user-deck/write-json.ts";

const userDecksPromise = readUserDecks();
const prepareOuterFoldersPromise = prepareOuterFolders();

const userDecks = await userDecksPromise;
await prepareOuterFoldersPromise;

const processUserDeckPromises = userDecks.map((x) => processUserDeck(x));
const decksNestedArrays = await Promise.all(processUserDeckPromises);
const decks = decksNestedArrays.flatMap((x) => x);
console.log(
  "Fetched " + decks.length + " decks across " + userDecks.length + " users."
);
const cards = await gatherCards(decks);
console.log("Fetched " + cards.length + " unique cards used in all decks.");

console.log("Writing fetched data.");
const writeDeckPromises = writeDecks(decks);
const writeCardPromises = writeCards(cards);
await Promise.all([writeDeckPromises, writeCardPromises]);
console.log("Finished writing fetched data.");
