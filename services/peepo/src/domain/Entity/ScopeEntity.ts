import { bases, continents } from '@ps2gg/common/constants'
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

  static getEventType(scope: string): string {
    if (bases[scope]) return 'Base'
    if (continents[scope]) return 'Continent'
    if (scope.split('.')[0] === 'ESF') return 'ESF'
  }

  static getEventName(scope: string, type: string): string {
    if (type === 'Base') return bases[scope] + ' Fights'
    if (type === 'Continent') return continents[scope] + ' Unlock'
    if (type === 'ESF') return 'ESF Fights'
  }

  static getEvents(): { name: string; id: string }[] {
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
