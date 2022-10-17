import { AhdbCard } from "./interfaces.ts";
import { CustomizableStruct } from "./popup-database.ts";

export function extractCustomizable(
  c: AhdbCard
): CustomizableStruct[] | undefined {
  const options = c.customization_options;
  const texts = c.customization_text;
  if (options !== undefined && texts !== undefined) {
    const splittedTexts = texts.split("\n");
    if (splittedTexts.length !== options.length) {
      throw new Error(
        "Found a card with mismatched length of customizable options and texts."
      );
    }
    const custs: CustomizableStruct[] = [];
    for (let i = 0; i < splittedTexts.length; i += 1) {
      const text = splittedTexts[i];
      const option = options[i];
      if (option.xp < 1) {
        continue;
      }
      // Matches the bold text in each customizable option without the following dot in the first group.
      const matched = text.match(/<b>(.*?)\.<\/b>/);
      if (matched === null || matched.length < 2) {
        continue;
      }
      const cust: CustomizableStruct = {
        n: matched[1],
        xp: option.xp,
      };
      custs.push(cust);
    }
    return custs;
  }
  return undefined;
}
