import { getBases } from '@ps2gg/census/collections'
import { continents } from '@ps2gg/common/constants'
import { getServerId } from '@ps2gg/common/util'
import { AutocompleteResponse } from '@ps2gg/discord/command'

export const scopes: { name: string; id: string }[] = []

async function populateScopes() {
  const bases = await getBases()
  const baseScopes = Object.keys(await getBases()).map((id) => {
    return { name: `${bases[id].replace("'", '')} Fight`, id }
  })
  const contScopes = Object.keys(continents).map((id) => {
    return { name: `${continents[id]} Unlock`, id }
  })
  const vehicleScopes = ['ESF'].map((vehicle) => {
    return { name: `${vehicle} Fights`, id: vehicle }
  })
  scopes.push(...vehicleScopes)
}
populateScopes()

export function getScopeSuggestions(query: string, all?: boolean): AutocompleteResponse[] {
  return [...(all ? [{ name: 'All', id: 'All' }] : []), ...scopes]
    .filter((scope) => scope.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8)
    .map((scope) => ({ name: scope.name, value: scope.id }))
}

export function getCompositeScopes(scope: string, server: string): string[] {
  if (scope === 'ESF') {
    const scopes = []

    for (const continentId in continents) {
      scopes.push(`ESF.${continentId}.${getServerId(server)}`)
    }

    return scopes
  } else {
    return [`${scope}.${getServerId(server)}`]
  }
}
