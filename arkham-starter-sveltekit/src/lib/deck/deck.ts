import type { AhdbDeck } from '$lib/ahdb/deck'

export interface RawDeck {
  user: string
  userUrl: string
  arkhamdbUserId: string
  id: string
  renameRegex: string
  series: string
  seriesUrl: string
  upgrade: string
  upgradeBreakpoint1: string
  upgradeBreakpoint2: string
  sideExtras: string
  excerpt: string
}

export function decodeSideExtras(s: string): string[] {
  const r = s.replace(/[[\]]/g, '')
  return r.split(',').map((x) => x.trim())
}

export interface DeckEntry {
  modifiedDeckName: string
  deck: AhdbDeck
  raw: RawDeck
}

export interface DeckEntryBeforeProcess {
  modifiedDeckName: string
  deck: AhdbDeck
  raw: RawDeck
}

export function getExtraName(investigator: string): string {
  switch (investigator) {
    case '90049': {
      return 'Spirit'
    }
    default: {
      return 'Extra'
    }
  }
}
