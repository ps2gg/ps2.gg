import { getBases } from '@ps2gg/census/collections'
import { continents } from '@ps2gg/common/constants'
import { AutocompleteResponse } from '@ps2gg/discord/command'

export const scopes: string[] = []

async function populateScopes() {
  const bases = Object.values(await getBases()).map((base) => `${base.replace("'", '')} Fight`)
  const conts = Object.values(continents).map((cont) => `${cont} Unlock`)
  scopes.push(...[...conts, ...bases])
}
populateScopes()

export function sanitizeScope(scope: string): string {
  return scope.split(' ').slice(0, -1).join(' ')
}

export function getScopeSuggestions(query: string, all?: boolean): AutocompleteResponse[] {
  return [...(all ? ['All'] : []), ...scopes]
    .filter((scope) => scope.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8)
    .map((scope) => ({ name: scope, value: scope }))
}

export function getCompositeScope(scope: string, server: string): string {
  return `${scope}.${server}`
}
