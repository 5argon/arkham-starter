import { AhdbCard } from "../interfaces.ts";
import { emptyDir, path } from "../../mod.ts";
import { decode, encode } from "npm:@jsquash/avif";
import { encode as encodePng } from "npm:@jsquash/png";
import { createCanvas } from "https://deno.land/x/canvas@v1.4.2/mod.ts";
import {
  ImageMagick,
  MagickFormat
} from "https://deno.land/x/imagemagick_deno@0.0.31/mod.ts";
import { CropTarget } from "./download-images.ts";
import {
  pullsDirectory,
  pullsCard,
  pullsImagesTrue,
  pullsImagesFullSmall,
  pullsImagesFullp,
  pullsImagesSquare,
  pullsImagesSquareSmall,
  pullsImagesStrip,
} from "../constants.ts"
import { ensureDir } from "../../mod.ts"

const concurrentLimit = 100

export async function processImages(cards: AhdbCard[]): Promise<void> {
  const pi = path.join(pullsDirectory, pullsCard)
  await ensureDir(pi)
  const truePath = path.join(pi, pullsImagesTrue)
  const fullPath = path.join(pi, pullsImagesFullp)
  const fullSmallPath = path.join(pi, pullsImagesFullSmall)
  const squarePath = path.join(pi, pullsImagesSquare)
  const stripPath = path.join(pi, pullsImagesStrip)
  const squareSmallPath = path.join(pi, pullsImagesSquareSmall)
  await Promise.all([
    emptyDir(fullPath),
    emptyDir(fullSmallPath),
    emptyDir(squarePath),
    emptyDir(stripPath),
    emptyDir(squareSmallPath),
  ])
  for (let i = 0; i < cards.length; i += concurrentLimit) {
    const cardBatch = cards.slice(i, i + concurrentLimit)
    console.log(
      "Processing images for cards " + i + " to " + (i + cardBatch.length),
    )
    await Promise.all(
      cardBatch.map((x) =>
        processSingleCard(
          x,
          truePath,
          fullPath,
          squarePath,
          stripPath,
          squareSmallPath,
          fullSmallPath,
        ),
      ),
    )
  }
}



/**
 * Full card should already exist at full path, it decodes and crops into the other versions.
 */
export async function processSingleCard(
  card: AhdbCard,
  truePath: string,
  fullPath: string,
  squarePath: string,
  stripPath: string,
  squareSmallPath: string,
  fullSmallPath: string
): Promise<void> {
  function backCodeExtract(s: string): string {
    const filename = s.match(/([\w\d_-]*)\.?[^\\/]*$/i);
    return filename?.[1] ?? "";
  }
  let backCode: string | null = null;
  if (card.backimagesrc !== undefined) {
    backCode = backCodeExtract(card.backimagesrc);
  }
  const p = path.join(truePath, card.code + ".avif");
  let read: Uint8Array;
  try {
    read = await Deno.readFile(p);
  } catch {
    // If card does not have image, silently skipping.
    // It is possible that it was patched.
    if (card.imagesrc !== undefined) {
      console.log("Image not found in true folder " + card.code);
    }
    return;
  }
  let image: ImageData;
  try {
    image = await decode(read);
  } catch {
    console.log("Error decoding image " + card.code);
    return;
  }
  let squareTarget: CropTarget | undefined;
  let stripTarget: CropTarget | undefined;
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
    case "upgrade":
      squareTarget = {
        x: 169.5 / 425,
        y: 12 / 600,
        w: 86 / 425,
        h: 86 / 600,
      };
      stripTarget = {
        x: 166 / 425,
        y: 568.5 / 600,
        w: 93 / 425,
        h: 31 / 600,
      };
      break;
    default:
      break;
  }

  function cropImageData(image: ImageData, target: CropTarget): ImageData {
    const croppedWidth = Math.floor(image.width * target.w);
    const croppedHeight = Math.floor(image.height * target.h);
    const cropStartX = Math.floor(image.width * target.x);
    const cropStartY = Math.floor(image.height * target.y);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.putImageData(image, 0, 0);
    const croppedImageData = ctx.getImageData(
      cropStartX,
      cropStartY,
      croppedWidth,
      croppedHeight
    );
    return new ImageData(croppedImageData.data, croppedWidth, croppedHeight);
  }

  async function createAvifBufferWithResize(
    image: ImageData,
    keepAspectRatio: boolean,
    width?: number,
    height?: number
  ): Promise<Uint8Array> {
    let resizedWidth: number;
    let resizedHeight: number;

    // Figure out width and height with keepAspectRatio option
    if (keepAspectRatio) {
      if (width !== undefined && height !== undefined) {
        resizedWidth = width;
        resizedHeight = height;
      } else if (width !== undefined) {
        resizedWidth = width;
        resizedHeight = Math.floor((width / image.width) * image.height);
      } else if (height !== undefined) {
        resizedWidth = Math.floor((height / image.height) * image.width);
        resizedHeight = height;
      } else {
        throw new Error("Either width or height must be provided.");
      }
    } else {
      if (width === undefined || height === undefined) {
        throw new Error("Both width and height must be provided.");
      }
      resizedWidth = width;
      resizedHeight = height;
    }

    // Resize with good interpolation with imagemagick
    const pngBuffer = await encodePng(image);
    const pngByteArray = new Uint8Array(pngBuffer);
    const resizedImageData = ImageMagick.read(pngByteArray, (image) => {
      image.resize(resizedWidth, resizedHeight);
      return image.write(MagickFormat.Rgba, (buffer) => {
        return new ImageData(
          new Uint8ClampedArray(buffer),
          image.width,
          image.height
        );
      });
    });

    // TODO: Push the size smaller with quality settings.
    const avif = await encode(resizedImageData, {});
    return new Uint8Array(avif);
  }

  if (squareTarget !== undefined && stripTarget !== undefined) {
    const square = await cropImageData(image, squareTarget);
    const strip = await cropImageData(image, stripTarget);
    const squareSmall = await cropImageData(image, squareTarget);
    const p1 = path.join(squarePath, card.code + ".avif");
    const p2 = path.join(stripPath, card.code + ".avif");
    const p3 = path.join(squareSmallPath, card.code + ".avif");
    const w1 = Deno.writeFile(
      p1,
      await createAvifBufferWithResize(square, false, 128, 128)
    );
    const w2 = Deno.writeFile(
      p2,
      await createAvifBufferWithResize(strip, false, 96, 32)
    );
    const w3 = Deno.writeFile(
      p3,
      await createAvifBufferWithResize(squareSmall, false, 32, 32)
    );
    await Promise.all([w1, w2, w3]);
  }

  const p4 = path.join(fullSmallPath, card.code + ".avif");
  const p5 = path.join(fullPath, card.code + ".avif");
  const fullEncode = new Uint8Array(image.data.buffer);
  const w4 = Deno.writeFile(
    p4,
    await createAvifBufferWithResize(image, true, undefined, 300)
  );

  let resizedFull = fullEncode;
  if (image.width > 640) {
    resizedFull = await createAvifBufferWithResize(image, true, 640, undefined);
  } else if (image.height > 640) {
    resizedFull = await createAvifBufferWithResize(image, true, undefined, 640);
  }
  const w5 = Deno.writeFile(p5, resizedFull);
  await Promise.all([w4, w5]);

  if (backCode !== null) {
    const pBack = path.join(truePath, backCode + ".avif");
    const destBack = path.join(fullPath, backCode + ".avif");
    let read: Uint8Array;
    try {
      read = await Deno.readFile(pBack);
    } catch {
      if (card.imagesrc !== undefined) {
        console.log("Image not found in true folder (back) " + pBack);
      }
      return;
    }
    let image: ImageData;
    try {
      image = await decode(read);
    } catch {
      console.log("Error decoding image (back) " + pBack);
      return;
    }
    const backEncode = new Uint8Array(image.data.buffer);
    let resizedBack = backEncode;
    if (image.width > 640) {
      resizedBack = await createAvifBufferWithResize(
        image,
        true,
        640,
        undefined
      );
    } else if (image.height > 640) {
      resizedBack = await createAvifBufferWithResize(
        image,
        true,
        undefined,
        640
      );
    }
    await Deno.writeFile(destBack, resizedBack);
  }
}
