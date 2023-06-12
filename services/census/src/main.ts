import { censusWs } from '@ps2gg/census/api'
import { getAssistXpEvents } from '@ps2gg/census/collections'
import { servers } from '@ps2gg/common/constants'
import { PlayerController } from './infrastructure/Census/PlayerController'

async function subscribe() {
  const assistXpEvents = await getAssistXpEvents()
  const assistXpEventIds = Object.keys(assistXpEvents).map((id) => `GainExperience_experience_id_${id}`)
  const eventNames = ['ItemAdded', 'PlayerLogin', 'PlayerLogout', 'VehicleDestroy', 'Death', 'ContinentLock']

  censusWs.subscribe({
    worlds: Object.keys(servers),
    characters: ['all'],
    logicalAndCharactersWithWorlds: true,
    eventNames: eventNames.concat(assistXpEventIds),
  })
}

new PlayerController()

subscribe()
