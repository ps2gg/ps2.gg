import { continents } from '@ps2gg/common/constants'

export function getContinentId(continent: string): string | undefined {
  return Object.keys(continents).find((key) => continents[key].toLowerCase() === continent?.toLowerCase())
}
