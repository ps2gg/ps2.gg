import { getPreprocessedAltMatches } from '@ps2gg/alts/ws'
import { sleep } from '@ps2gg/common/util'

export async function getAltIds(characterIds: string[]): Promise<{ altIds: string[]; relations: AltRelation[] }> {
  const alts = await getPreprocessedAltMatches(characterIds)
  const relations = linkAltsWithParents(alts)
  const altIds = alts.map((a) => a.deduped.map((a) => a.character_id)).flat()
  return { altIds, relations }
}

function linkAltsWithParents(preprocessed: any): AltRelation[] {
  const relations = []

  for (const character of preprocessed) {
    for (const alt of character.deduped) {
      relations.push({
        parent: character.characterId,
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
