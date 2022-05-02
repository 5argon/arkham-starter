import { AhdbCard } from "../interfaces.ts";
import { path, emptyDir } from "../../mod.ts";
import {
  baseUrl,
  pullsDirectory,
  pullsImages,
  pullsImagesFull,
  pullsImagesSquare,
  pullsImagesStrip,
} from "../constants.ts";
import { fetchWithRetries } from "../fetch.ts";

export async function downloadImages(cards: AhdbCard[]): Promise<void> {
  const pi = path.join(pullsDirectory, pullsImages);
  await emptyDir(pi);
  const fullPath = path.join(pi, pullsImagesFull);
  const squarePath = path.join(pi, pullsImagesSquare);
  const stripPath = path.join(pi, pullsImagesStrip);
  await Promise.all([
    emptyDir(fullPath),
    emptyDir(squarePath),
    emptyDir(stripPath),
  ]);
  await Promise.all(
    cards.map((x) =>
      downloadImageAndProcessSingleCard(x, fullPath, squarePath, stripPath)
    )
  );
}

async function downloadImageAndProcessSingleCard(
  card: AhdbCard,
  fullPath: string,
  squarePath: string,
  stripPath: string
): Promise<void> {
  await downloadImageSingleCard(card, fullPath);
}

async function downloadImageSingleCard(
  card: AhdbCard,
  destination: string
): Promise<void> {
  if (card.imagesrc === undefined) {
    // console.log("Card " + card.code + " is missing an image.");
    return;
  }
  const imagePath = path.join(baseUrl, card.imagesrc);
  console.log("Downloading card image : " + imagePath);
  const imageResult = await fetchWithRetries(imagePath);
  const abuf = await imageResult.arrayBuffer();
  await Deno.writeFile(
    path.join(destination, card.code + ".png"),
    new Uint8Array(abuf)
  );
}
