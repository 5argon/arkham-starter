import type { CardAndAmount, CustomizableMeta } from '$lib/ahdb/public-api/high-level'
import type { PopupDatabase } from '$lib/core/popup-database'

export function calculateCardsXp(
  rcoreDeck: CardAndAmount[],
  popupDatabase: PopupDatabase,
  taboo: boolean,
  customizableMetas: CustomizableMeta[],
): number {
  const xp = rcoreDeck.reduce((a, b) => {
    const card = popupDatabase.getById(b.cardId)
    if (card === null) {
      return a
    }
    const xp = (taboo ? card.original.xpat : 0) + (card.original.xp ?? 0)
    const exceptional = taboo ? card.original.ext : card.original.ex
    const realXp = exceptional ? xp * 2 : xp
    return a + realXp * b.amount
  }, 0)
  const customizableXp = customizableMetas.reduce((a, b) => {
    return a + b.checked
  }, 0)
  return xp + customizableXp
}
