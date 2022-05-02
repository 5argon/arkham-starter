export function gatherCardsInDescription(md: string): string[] {
  const uniqueCards = new Set<string>();
  const captureCardIdInMd = new RegExp("(/card/([^)]*))");
}
