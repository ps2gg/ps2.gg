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
    const baseScopes = Object.keys({
      '4139': "Nason's Defiance",
      '6342': 'Kwahtee Mountain Complex',
      '2303': 'Indar Excavation Site',
      '6329': 'The Ascent',
      '2419': 'Ti Alloys, Inc.',
    }).map((id) => {
      return { name: `Fight: ${bases[id].replace(/'/g, '')}`, id }
    })
    const contScopes = Object.keys(continents).map((id) => {
      return { name: `Unlock: ${continents[id]}`, id }
    })
    const vehicleScopes = ['ESF'].map((vehicle) => {
      return { name: `Vehicles: ${vehicle}`, id: vehicle }
    })

    return [...[...vehicleScopes, ...contScopes, ...baseScopes]]
  }

  static getAutocomplete(query: string, events: { name: string; id: string }[]): AutocompleteResponse[] {
    const all = query === 'All'
    return [...(all ? [{ name: 'All', id: 'All' }] : []), ...events]
      .filter((event) => event.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10)
      .map((event) => ({ name: event.name, value: event.id }))
  }
}
