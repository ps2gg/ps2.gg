import { getBases } from '@ps2gg/census/collections'
import { continents } from '@ps2gg/common/constants'
import { AutocompleteResponse } from '@ps2gg/discord/command'

export const scopes: string[] = []

async function populateScopes() {
  const bases = Object.values(await getBases()).map((base) => `f: ${base}`)
  const conts = Object.values(continents).map((cont) => `c: ${cont}`)
  scopes.push(...[...conts, ...bases])
}
populateScopes()

export function sanitizeScope(scope: string): string {
  return scope.replace(/f: /, '').replace(/c: /, '')
}

export function getScopeSuggestions(query: string, all?: boolean): AutocompleteResponse[] {
  return [...(all ? ['All'] : []), ...scopes]
    .filter((scope) => scope.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8)
    .map((scope) => ({ name: scope, value: scope }))
}
