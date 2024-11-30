import { ensureDir, path } from "./mod.ts"
import {
  pullsDirectory,
  pullsCard,
  pullsImagesTrue,
  patchDirectory,
} from "./scripts/constants.ts"
import { decode as decodeAvif, encode as encodeAvif } from "npm:@jsquash/avif"
import { decode as decodeJpeg } from "npm:@jsquash/jpeg"
import { decode as decodePng } from "npm:@jsquash/png"
import { decode as decodeWebp } from "npm:@jsquash/webp"

/**
 * Copy images from `patch/[language]/code.[jpg/jpeg/png/webp/avif]` to `pulls/card/true/[language]/code.[avif]`.
 * Then make a valid.json.
 */

interface ValidJson {
  /**
   * Maps from language code to card code that its image exist.
   */
  languages: { [k: string]: string[] }
}

/**
 * Source can be jpg, jpeg, png, webp, or avif.
 * Destination is always avif.
 */
async function patch(sourcePathWithExtension: string, destLanguage: string) {
  const sourcePath = path.join(patchDirectory, sourcePathWithExtension)
  const destPath = path.join(
    pullsDirectory,
    pullsCard,
    pullsImagesTrue,
    destLanguage,
  )
  const destPathAvif = path.join(
    destPath,
    path.basename(sourcePath, path.extname(sourcePath)) + ".avif",
  )
  // If destination file already exists, skip.
  try {
    const fileInfo = await Deno.stat(destPathAvif)
    if (fileInfo.isFile) {
      console.log(`Skipping ${sourcePathWithExtension} to ${destPathAvif}`)
      return
    }
  } catch {
    // File does not exist.
  }

  const sourceExtension = path.extname(sourcePath).slice(1)
  console.log("Reading " + sourcePathWithExtension)
  const source = await Deno.readFile(sourcePath)
  let imageData: ImageData
  if (sourceExtension === "avif") {
    imageData = await decodeAvif(source)
  } else if (sourceExtension === "jpg" || sourceExtension === "jpeg") {
    imageData = await decodeJpeg(source)
  } else if (sourceExtension === "png") {
    imageData = await decodePng(source)
  } else if (sourceExtension === "webp") {
    imageData = await decodeWebp(source)
  } else {
    throw new Error(`Unsupported source extension: ${sourceExtension}`)
  }
  const destAvif = await encodeAvif(imageData)
  await ensureDir(destPath)
  await Deno.writeFile(destPathAvif, new Uint8Array(destAvif))
  console.log(`Patched ${sourcePathWithExtension} to ${destPathAvif}`)
}

const patchFolder = path.join(patchDirectory)
// Iterate through all languages.
for await (const dir of Deno.readDir(patchFolder)) {
  if (!dir.isDirectory) {
    continue
  }
  const language = dir.name
  const languageFolder = path.join(patchFolder, language)
  const patchPromises = []
  for await (const file of Deno.readDir(languageFolder)) {
    if (!file.isFile) {
      continue
    }
    patchPromises.push(patch(path.join(language, file.name), language))
  }
  await Promise.all(patchPromises)
}

// const truePath = path.join(pi, pullsImagesTrue)
// const validImages: string[] = []
// for await (const dir of Deno.readDir(truePath)) {
//   if (dir.isFile) {
//     validImages.push(path.basename(dir.name, ".avif"))
//   }
// }
