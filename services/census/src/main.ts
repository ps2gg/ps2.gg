import { CensusWs } from '@ps2gg/census/api'
import { getAssistXpEvents } from '@ps2gg/census/collections'
import { FriendsController } from './infrastructure/Census/FriendsController'
import { PlayerController } from './infrastructure/Census/PlayerController'

const ws = new CensusWs()

async function subscribe() {
  const assistXpEvents = await getAssistXpEvents()
  const assistXpEventIds = Object.keys(assistXpEvents).map((id) => `GainExperience_experience_id_${id}`)
  const eventNames = ['ItemAdded', 'PlayerLogin', 'PlayerLogout', 'VehicleDestroy', 'Death', 'ContinentLock', 'GainExperience']

  ws.subscribe({
    worlds: ['all'],
    characters: ['all'],
    logicalAndCharactersWithWorlds: true,
    eventNames: eventNames,
  })
}

new PlayerController(ws)
new FriendsController(ws)

subscribe()
