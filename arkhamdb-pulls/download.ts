import { AhdbCard } from "./scripts/interfaces.ts"
import { path } from "./mod.ts"
import {
  pullsDirectory,
  pullsImages,
  pullsImagesTrue,
  pullsJson,
  pullsUtilsPlayerDatabase,
  pullsUtilsValid,
} from "./scripts/constants.ts"
import { downloadImages } from "./scripts/process-user-deck/download-images.ts"

const playerCards: AhdbCard[] = JSON.parse(
  await Deno.readTextFile(
    path.join(pullsDirectory, pullsJson, pullsUtilsPlayerDatabase),
  ),
)

if (Deno.args.findIndex((x) => x === "-i") === -1) {
  console.log("Downloading all player card images... (TAKES TIME!)")
  await downloadImages(playerCards)
  console.log("Downloaded all player card images.")
} else {
  console.log("Skipped image downloads.")
}

const pi = path.join(pullsDirectory, pullsImages)
const truePath = path.join(pi, pullsImagesTrue)
const validImages: string[] = []
for await (const dir of Deno.readDir(truePath)) {
  if (dir.isFile) {
    validImages.push(path.basename(dir.name, ".png"))
  }
}

await Deno.writeTextFile(
  path.join(pullsDirectory, pullsJson, pullsUtilsValid),
  JSON.stringify(validImages),
)
console.log("Written valid image map.")
