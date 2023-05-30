import { continents } from '@ps2gg/common/constants'
import { getServerId } from '@ps2gg/common/util'
import { AutocompleteResponse } from '@ps2gg/discord/command'

export class ScopeEntity {
  constructor(readonly server: string, readonly event: string) {}

  getCompositions(): string[] {
    if (this.event === 'ESF') {
      const scopes = []

      for (const continentId in continents) {
        scopes.push(`ESF.${continentId}.${getServerId(this.server)}`)
      }

      return scopes
    } else {
      return [`${this.event}.${getServerId(this.server)}`]
    }
  }

  static getEvents(): { name: string; id: string }[] {
    // const bases = await getBases()
    const bases = { '4139': "Nason's Defiance" }
    const baseScopes = Object.keys(bases).map((id) => {
      return { name: `${bases[id].replace(/'/g, '')} Fight`, id }
    })
    const contScopes = Object.keys(continents).map((id) => {
      return { name: `${continents[id]} Unlock`, id }
    })
    const vehicleScopes = ['ESF'].map((vehicle) => {
      return { name: `${vehicle} Fights`, id: vehicle }
    })

    return [...[...vehicleScopes, ...baseScopes]]
  }

  static getAutocomplete(query: string, events: { name: string; id: string }[]): AutocompleteResponse[] {
    const all = query === 'All'
    return [...(all ? [{ name: 'All', id: 'All' }] : []), ...events]
      .filter((event) => event.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8)
      .map((event) => ({ name: event.name, value: event.id }))
  }
}
