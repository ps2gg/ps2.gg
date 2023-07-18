export interface Alt {
  character_id: string
  online: boolean
  battleRank: string
  faction: string
  name: string
  outfit: string
  server: string
  stats: Stats
  lastLogout: Date
  matchType: string
  matchScore: number
  itemsLength: number
  factionItemsLength: number
}

export interface Stats {
  playTime: number
  infiltrator: ClassStats
  'light assault': ClassStats
  medic: ClassStats
  engineer: ClassStats
  'heavy assault': ClassStats
  max: ClassStats
  a2a: ClassStats
  a2g: ClassStats
  mbt: ClassStats
  flash: ClassStats
  sunderer: ClassStats
  lightning: ClassStats
  liberator: ClassStats
  galaxy: ClassStats
  harasser: ClassStats
  valkyrie: ClassStats
  ant: ClassStats
  bastion: ClassStats
}

export interface ClassStats {
  playTime: number
  playTimePercent: number
  kills: number
}

export type Preprocessed = {
  character_id: string
  alts: Alt[]
  deduped: Alt[]
}
