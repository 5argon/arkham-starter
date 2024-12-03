import { AhdbCard } from "./scripts/interfaces.ts"
import { path } from "./mod.ts"
import {
  pullsDirectory,
  pullsJson,
  pullsUtilsPlayerDatabase,
} from "./scripts/constants.ts"
import { processImages } from "./scripts/process-user-deck/process-card.ts"

/**
 * Works completely on whats in the `pulls/card/true/[language]` directory.
 * All languages gets their processed form in `full/[language]` and `full-small/[language]` directory.
 * The `en` language gets transformed into language-agnostic `square`, `square-small`, `strip`.
 * Finally writes a `valid.json` file.
 */

interface ValidJson {
  /**
   * Maps from language code to card code that its image exist.
   */
  languages: { [k: string]: string[] }
}

const playerCards: AhdbCard[] = JSON.parse(
  await Deno.readTextFile(
    path.join(pullsDirectory, pullsJson, pullsUtilsPlayerDatabase),
  ),
)
await processImages(playerCards)
