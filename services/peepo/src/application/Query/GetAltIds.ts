import { Alt } from '@ps2gg/alts/types'
import { getAltMatchesById } from '@ps2gg/alts/ws'

export async function getAltIds(characterIds: string[]): Promise<{ altIds: string[]; relations: AltRelation[] }> {
  const alts = await Promise.all(characterIds.map((id) => getAltMatchesById(id)))
  const filtered: Alt[][] = alts.filter((res) => res.success).map((alt) => alt.result.alts.filter((a) => a.matchType.includes('experimental') && a.matchScore >= 16))
  const relations = linkAltsWithParents(filtered)
  const altIds = filtered.flat().map((a) => a.character_id)
  return { altIds, relations }
}

function linkAltsWithParents(alts: Alt[][]): AltRelation[] {
  const relations = []

  for (const matches of alts) {
    const parent = matches.find((a) => a.matchType.includes('primary'))

    for (const alt of matches) {
      relations.push({
        parent: parent.name,
        child: alt.name,
      })
    }
  }

  return relations
}

export type AltRelation = {
  parent: string
  child: string
}
