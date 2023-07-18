import { getPreprocessedAltMatches } from '@ps2gg/alts/ws'

export async function getAltIds(characterIds: string[]): Promise<AltMatch[]> {
  const alts = await getPreprocessedAltMatches(characterIds)
  const altIds = alts
    .map((alt) =>
      alt.deduped.map((a) => {
        return {
          characterId: a.character_id,
          parentId: alt.character_id,
        }
      })
    )
    .flat()
  return altIds
}

export type AltMatch = {
  characterId: string
  parentId: string
}
