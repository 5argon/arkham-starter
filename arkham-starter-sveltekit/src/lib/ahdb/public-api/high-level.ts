import { type CardClass, classCodeToCardClass } from '$lib/core/card-class'

import { coreToRcore, rcoreToCore } from '../conversion'
import type { AhdbDeck, CardList } from '../deck'
import { fetchArkhamBuildDeck, fetchPublicArkhamDbDeck, fetchPublishedArkhamDbDeck } from './call'
import { arkhamBuildShareRealUrl, arkhamStarterDeckUrl, realUrlDeck, realUrlDecklist } from './constants'

export interface ExtractResult {
  deck: string
  source: DeckSource
}

/**
 * Handles either URL string or plain string of deck ID of any source.
 * It tries to predict the right source.
 */
export function extractDeck(inputString: string): ExtractResult {
  // Format: https://arkham.build/share/3CEq396JgzuYvyb
  {
    const urlRegex = new RegExp(/arkham\.build\/share\/([^/]*)/gm)
    const matchResult = urlRegex.exec(inputString)
    if (matchResult !== null) {
      return { deck: matchResult[1], source: DeckSource.ArkhamBuildShared }
    }
  }
  {
    const urlRegex = new RegExp(/decklist\/view\/([^/]*)/gm)
    const matchResult = urlRegex.exec(inputString)
    if (matchResult !== null) {
      return { deck: matchResult[1], source: DeckSource.ArkhamDbPublished }
    }
  }
  {
    const urlRegex = new RegExp(/decklist\/edit\/([^/]*)/gm)
    const matchResult = urlRegex.exec(inputString)
    if (matchResult !== null) {
      return { deck: matchResult[1], source: DeckSource.ArkhamDbPublished }
    }
  }
  {
    const urlRegex = new RegExp(/deck\/view\/([^/]*)/gm)
    const matchResult = urlRegex.exec(inputString)
    if (matchResult !== null) {
      return { deck: matchResult[1], source: DeckSource.ArkhamDbPublic }
    }
  }
  {
    const urlRegex = new RegExp(/edit\/([^/]*)/gm)
    const matchResult = urlRegex.exec(inputString)
    if (matchResult !== null) {
      return { deck: matchResult[1], source: DeckSource.ArkhamDbPublic }
    }
  }
  {
    const pRegex = new RegExp(/p:(\d+)$/gm)
    const matchResult = pRegex.exec(inputString)
    if (matchResult !== null) {
      return { deck: matchResult[1], source: DeckSource.ArkhamDbPublished }
    }
  }

  if (isArkhamBuildDeckId(inputString)) {
    return { deck: inputString, source: DeckSource.ArkhamBuildShared }
  } else if (isLikelyArkhamDbPublicDeck(inputString)) {
    return { deck: inputString, source: DeckSource.ArkhamDbPublic }
  }
  return { deck: inputString, source: DeckSource.ArkhamDbPublished }
}

export interface ArkhamStarterDeckData {
  authorName: string
  authorId: string
  authorUsername: string
  series: string
  rename: string
  excerpt: string
  extraCards: string[]
}

export interface FetchDeckResult {
  id: string
  source: DeckSource
  /**
   * No way to know user in unpublished deck, it will be `null`.
   */
  userId: number | null
  link: string
  deck: string
  investigatorCode: string
  cards1: CardAndAmount[]
  cards2: CardAndAmount[]
  cards3: CardAndAmount[]
  nextDeck: number | null
  previousDeck: number | null

  xp: number
  xpSpent: number
  xpAdjustment: number

  decodedMeta: DecodedMeta
}

export interface CardAndAmount {
  cardId: string
  amount: number
}

export function forwardDeckToRcore(d: FetchDeckResult): FetchDeckResult {
  function fw(cards: CardAndAmount[]): CardAndAmount[] {
    return cards.map<CardAndAmount>((x) => {
      return { cardId: coreToRcore(x.cardId), amount: x.amount }
    })
  }

  return {
    ...d,
    investigatorCode: coreToRcore(d.investigatorCode),
    cards1: fw(d.cards1),
    cards2: fw(d.cards2),
    cards3: fw(d.cards3),
  }
}

export function forwardDeckToOldCore(d: FetchDeckResult): FetchDeckResult {
  function fw(cards: CardAndAmount[]): CardAndAmount[] {
    return cards.map<CardAndAmount>((x) => {
      return { cardId: rcoreToCore(x.cardId), amount: x.amount }
    })
  }

  return {
    ...d,
    cards1: fw(d.cards1),
    cards2: fw(d.cards2),
    cards3: fw(d.cards3),
  }
}

function isArkhamBuildDeckId(deckId: string): boolean {
  return deckId.length === 15
}

/**
 * Guess that it is a public (non-published) deck if the string is a number of over 1 million.
 */
function isLikelyArkhamDbPublicDeck(deckId: string): boolean {
  return parseInt(deckId) > 1000000
}

export enum DeckSource {
  ArkhamDbPublic,
  ArkhamDbPublished,
  ArkhamBuildShared,
  ArkhamStarter
}

export async function fetchDeckFromId(
  deckId: string,
  source: DeckSource,
): Promise<FetchDeckResult | null> {
  let fetchedDeck: AhdbDeck | null = null
  switch (source) {
    case DeckSource.ArkhamBuildShared: {
      fetchedDeck = await fetchArkhamBuildDeck(deckId)
      break
    }
    case DeckSource.ArkhamDbPublic: {
      fetchedDeck = await fetchPublicArkhamDbDeck(deckId)
      break
    }
    case DeckSource.ArkhamDbPublished: {
      fetchedDeck = await fetchPublishedArkhamDbDeck(deckId)
      break
    }
    default:
      throw new Error('Invalid source')
  }
  if (fetchedDeck === null) {
    return null
  }
  return ahdbToOurs(fetchedDeck, source)
}

export function ahdbToOurs(d: AhdbDeck, source: DeckSource): FetchDeckResult {
  const userId: number | null = d.user_id
  let link: string
  switch (source) {
    case DeckSource.ArkhamDbPublic:
      link = [...realUrlDeck, d.id].join('/')
      break
    case DeckSource.ArkhamDbPublished:
      link = [...realUrlDecklist, d.id].join('/')
      break
    case DeckSource.ArkhamBuildShared:
      link = [...arkhamBuildShareRealUrl, d.id].join('/')
      break
    case DeckSource.ArkhamStarter:
      link = [...arkhamStarterDeckUrl, d.id].join('/')
      break
    default:
      throw new Error('Invalid source')
  }

  function cardListToArray(cl: CardList): CardAndAmount[] {
    if (cl === null) {
      return []
    }
    return Object.entries(cl).map<CardAndAmount>((x) => {
      return { cardId: x[0], amount: x[1] }
    })
  }

  return {
    id: d.id.toString(),
    source: source,
    userId: userId,
    link: link,
    deck: d.name,
    investigatorCode: d.investigator_code,
    cards1: cardListToArray(d.slots),
    cards2: cardListToArray(d.sideSlots),
    cards3: cardListToArray(d.ignoreDeckLimitSlots),
    nextDeck: d.next_deck,
    previousDeck: d.previous_deck,
    xp: d.xp ?? 0,
    xpAdjustment: d.xp_adjustment,
    xpSpent: d.xp_spent ?? 0,
    decodedMeta: metaDecode(d.meta),
  }
}

export interface DecodedMeta {
  alternateFront?: string
  alternateBack?: string
  customizableMetas?: CustomizableMeta[]
  factionSelected?: CardClass
  optionSelected?: string
  deckSizeSelected?: number
  extraDeck?: string[]
  faction1?: CardClass
  faction2?: CardClass
}

interface RawMeta extends CustMeta {
  alternate_front?: string
  alternate_back?: string

  /**
   * Parallel Back Wendy Adams
   */
  option_selected?: 'blessed' | 'cursed' | 'both'

  /**
   * Mandy Thompson
   */
  deck_size_selected?: 30 | 40 | 50

  /**
   * For anyone with one faction choice.
   */
  faction_selected?: 'guardian' | 'seeker' | 'rogue' | 'mystic' | 'survivor'

  /**
   * Charlie Kane
   */
  faction_1?: 'guardian' | 'seeker' | 'rogue' | 'mystic' | 'survivor'

  /**
   * Charlie Kane
   */
  faction_2?: 'guardian' | 'seeker' | 'rogue' | 'mystic' | 'survivor'

  /**
   * Parallel Back Jim Culver
   */
  extra_deck?: ExtraDeckString
}

export interface CustMeta {
  /** Hunter's Armor */
  cus_09021?: CustMetaString
  /** Runic Axe */
  cus_09022?: CustMetaString
  /** Custom Modifications */
  cus_09023?: CustMetaString

  /** Alchemical Distillation */
  cus_09040?: CustMetaString
  /** Empirical Hypothesis */
  cus_09041?: CustMetaString
  /** The Raven Quill */
  cus_09042?: CustMetaString

  /** Damning Testimony */
  cus_09059?: CustMetaString
  /** Friends in Low Places */
  cus_09060?: CustMetaString
  /** Honed Instinct */
  cus_09061?: CustMetaString

  /** Living Ink */
  cus_09079?: CustMetaString
  /** Summoned Servitor */
  cus_09080?: CustMetaString
  /** Power Word */
  cus_09081?: CustMetaString

  /** Pocket Multi Tool */
  cus_09099?: CustMetaString
  /** Makeshift Trap */
  cus_09100?: CustMetaString
  /** Grizzled */
  cus_09101?: CustMetaString

  /** Hyperphysical Shotcaster */
  cus_09119?: CustMetaString
}

/**
 * Format: X,X,X,...
 * Each X: index|checked_boxes OR index|checked_boxes|details
 *
 * Each details :
 * - Card's ID
 * - Trait string
 * - willpower | intellect | combat | agility (Living Ink)
 * - Multiple of above, separated by ^
 */
type CustMetaString = string

/**
 * Format: X,X,X,...
 * Each X: Card's ID.
 */
type ExtraDeckString = string

export interface CustomizableMeta {
  card: string
  index: number
  checked: number
  detail: string
}

function metaDecode(meta: string): DecodedMeta {
  if (meta === '') {
    return {}
  }
  const json = JSON.parse(meta) as RawMeta
  const dm: DecodedMeta = {
    customizableMetas: [],
  }
  if (json.alternate_front && json.alternate_front !== '') {
    dm.alternateFront = json.alternate_front
  }
  if (json.alternate_back && json.alternate_back !== '') {
    dm.alternateBack = json.alternate_back
  }
  if (json.faction_selected) {
    dm.factionSelected = classCodeToCardClass(json.faction_selected)
  }
  if (json.faction_1) {
    dm.faction1 = classCodeToCardClass(json.faction_1)
  }
  if (json.faction_2) {
    dm.faction2 = classCodeToCardClass(json.faction_2)
  }
  if (json.option_selected) {
    dm.optionSelected = json.option_selected
  }
  if (json.deck_size_selected) {
    dm.deckSizeSelected = json.deck_size_selected
  }
  if (json.extra_deck) {
    dm.extraDeck = json.extra_deck.split(',')
  }
  const customizableMetas: CustomizableMeta[] = []
  Object.entries(json).forEach(([key, value]) => {
    if (key.startsWith('cus_') && typeof value === 'string') {
      const custCard = key.slice(4)
      const custSep = value.split(',')
      custSep.forEach((x) => {
        const custValue = x.split('|')
        if (custValue.length >= 2) {
          customizableMetas.push({
            card: custCard,
            index: parseInt(custValue[0]),
            checked: parseInt(custValue[1]),
            detail: custValue.length > 2 ? custValue[2] : '',
          })
        }
      })
    }
  })
  dm.customizableMetas = customizableMetas
  return dm
}
