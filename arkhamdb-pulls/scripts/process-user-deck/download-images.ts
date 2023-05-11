import { AhdbCard } from "../interfaces.ts";
import { path, emptyDir, Image, resize } from "../../mod.ts";
import {
  baseUrl,
  pullsDirectory,
  pullsImages,
  pullsImagesFull,
  pullsImagesFullSmall,
  pullsImagesSquare,
  pullsImagesSquareSmall,
  pullsImagesStrip,
} from "../constants.ts";
import { fetchWithRetries } from "../fetch.ts";

export async function downloadImages(cards: AhdbCard[]): Promise<void> {
  const pi = path.join(pullsDirectory, pullsImages);
  await emptyDir(pi);
  const fullPath = path.join(pi, pullsImagesFull);
  const fullSmallPath = path.join(pi, pullsImagesFullSmall);
  const squarePath = path.join(pi, pullsImagesSquare);
  const stripPath = path.join(pi, pullsImagesStrip);
  const squareSmallPath = path.join(pi, pullsImagesSquareSmall);
  await Promise.all([
    emptyDir(fullPath),
    emptyDir(fullSmallPath),
    emptyDir(squarePath),
    emptyDir(stripPath),
    emptyDir(squareSmallPath),
  ]);
  await Promise.all(
    cards.map((x) =>
      downloadImageAndProcessSingleCard(
        x,
        fullPath,
        squarePath,
        stripPath,
        squareSmallPath,
        fullSmallPath
      )
    )
  );
}

async function downloadImageAndProcessSingleCard(
  card: AhdbCard,
  fullPath: string,
  squarePath: string,
  stripPath: string,
  squareSmallPath: string,
  fullSmallPath: string
): Promise<void> {
  function backCodeExtract(s: string): string {
    const filename = s.match(/([\w\d_-]*)\.?[^\\\/]*$/i);
    return filename?.[1] ?? "";
  }
  const regularFileName = card.code;
  await downloadImageSingleCard(card.imagesrc, regularFileName, fullPath);
  if (card.backimagesrc !== undefined) {
    const backFileName = backCodeExtract(card.backimagesrc);
    await downloadImageSingleCard(card.backimagesrc, backFileName, fullPath);
  }
  await processSingleCard(
    card,
    fullPath,
    squarePath,
    stripPath,
    squareSmallPath,
    fullSmallPath
  );
}

export async function downloadImageSingleCard(
  imageSrc: string | undefined,
  fileName: string,
  destination: string
): Promise<void> {
  // Skip downloading if we have image of it already.
  const patched = await tryPatch(fileName, destination);
  if (patched) {
    return;
  }

  if (imageSrc === undefined) {
    // console.log("Card " + card.code + " is missing an image.");
    await tryPatch(fileName, destination);
    return;
  }
  const imagePath = path.join(baseUrl, imageSrc);
  // console.log("Downloading card image : " + imagePath);
  let imageResult: Response;
  try {
    imageResult = await fetchWithRetries(imagePath);
  } catch {
    // console.log("Fetching failed for : " + imagePath);
    await tryPatch(fileName, destination);
    return;
  }
  const abuf = await imageResult.arrayBuffer();
  await Deno.writeFile(
    path.join(destination, fileName + ".png"),
    new Uint8Array(abuf)
  );
}

async function tryPatch(code: string, destination: string): Promise<boolean> {
  try {
    await Deno.copyFile(
      path.join("patch", code + ".png"),
      path.join(destination, code + ".png")
    );
    console.log("Patched : " + code);
    return true;
  } catch {
    // OK to fail
    return false;
  }
}

interface CropTarget {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Full card should already exist at full path, it decodes and crops into the other versions.
 */
async function processSingleCard(
  card: AhdbCard,
  fullPath: string,
  squarePath: string,
  stripPath: string,
  squareSmallPath: string,
  fullSmallPath: string
): Promise<void> {
  const p = path.join(fullPath, card.code + ".png");
  let read: Uint8Array;
  try {
    read = await Deno.readFile(p);
  } catch {
    // If card does not have image, silently skipping.
    // It is possible that it was patched.
    if (card.imagesrc !== undefined) {
      console.log("Error reading image " + card.code);
    }
    return;
  }
  let image;
  try {
    image = await Image.decode(read);
  } catch {
    console.log("Error decoding image " + card.code);
    return;
  }
  const w = image.width;
  const h = image.height;
  let squareTarget: CropTarget;
  let stripTarget: CropTarget;
  switch (card.type_code) {
    case "investigator":
      squareTarget = {
        x: 7 / 418,
        y: 56 / 300,
        w: 218 / 418,
        h: 218 / 300,
      };
      stripTarget = {
        x: 7 / 418,
        y: 80 / 300,
        w: 218 / 418,
        h: 72.7 / 300,
      };
      break;
    case "asset":
      squareTarget = {
        x: 131 / 606,
        y: 95.5 / 842,
        w: 336 / 606,
        h: 336 / 842,
      };
      stripTarget = {
        x: 83 / 606,
        y: 137.3 / 842,
        w: 446 / 606,
        h: 148.7 / 842,
      };
      break;
    case "event":
      squareTarget = {
        x: 135 / 606,
        y: 58 / 842,
        w: 328 / 606,
        h: 328 / 842,
      };
      stripTarget = {
        x: 83 / 606,
        y: 168.3 / 842,
        w: 495 / 606,
        h: 165 / 842,
      };
      break;
    case "skill":
      squareTarget = {
        x: 105 / 606,
        y: 116 / 842,
        w: 414 / 606,
        h: 414 / 842,
      };
      stripTarget = {
        x: 81 / 606,
        y: 159.7 / 842,
        w: 438 / 606,
        h: 146 / 842,
      };
      break;
    case "treachery":
      squareTarget = {
        x: 143.5 / 606,
        y: 23 / 842,
        w: 311 / 606,
        h: 311 / 842,
      };
      stripTarget = {
        x: 143.5 / 606,
        y: 150 / 842,
        w: 311 / 606,
        h: 103.7 / 842,
      };
      break;
    case "enemy":
      squareTarget = {
        x: 169.5 / 606,
        y: 541 / 842,
        w: 259 / 606,
        h: 259 / 842,
      };
      stripTarget = {
        x: 14 / 606,
        y: 555 / 842,
        w: 578 / 606,
        h: 192.7 / 842,
      };
      break;
    case "location":
      squareTarget = {
        x: 131 / 606,
        y: 95.5 / 842,
        w: 336 / 606,
        h: 336 / 842,
      };
      stripTarget = {
        x: 83 / 606,
        y: 137.3 / 842,
        w: 446 / 606,
        h: 148.7 / 842,
      };
      break;
    default:
      return;
  }
  const square = image
    .clone()
    .crop(
      squareTarget.x * w,
      squareTarget.y * h,
      squareTarget.w * w,
      squareTarget.h * h
    );
  const strip = image
    .clone()
    .crop(
      stripTarget.x * w,
      stripTarget.y * h,
      stripTarget.w * w,
      stripTarget.h * h
    );
  const squareSmall = image
    .clone()
    .crop(
      squareTarget.x * w,
      squareTarget.y * h,
      squareTarget.w * w,
      squareTarget.h * h
    );
  const p1 = path.join(squarePath, card.code + ".png");
  const p2 = path.join(stripPath, card.code + ".png");
  const p3 = path.join(squareSmallPath, card.code + ".png");
  const p4 = path.join(fullSmallPath, card.code + ".png");
  const w1 = Deno.writeFile(
    p1,
    await resize(await square.encode(), { width: 128, height: 128 })
  );
  const w2 = Deno.writeFile(
    p2,
    await resize(await strip.encode(), { width: 96, height: 32 })
  );
  const w3 = Deno.writeFile(
    p3,
    await resize(await squareSmall.encode(), { width: 32, height: 32 })
  );
  const w4 = Deno.writeFile(
    p4,
    await resize(await image.encode(), { aspectRatio: true, height: 300 })
  );
  await Promise.all([w1, w2, w3, w4]);
}
