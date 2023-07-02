import { getAltMatchesById } from '@ps2gg/alts/ws'

export async function getAltIds(characterIds: string[]): Promise<string[]> {
  const alts = await Promise.all(characterIds.map((id) => getAltMatchesById(id)))
  return alts
    .filter((res) => res.success)
    .map((alt) => alt.result.alts.filter((a) => a.matchType.includes('experimental') && a.matchScore >= 16).map((a) => a.character_id))
    .flat()
}
