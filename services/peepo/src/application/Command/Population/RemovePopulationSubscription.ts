import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { UnsubscribeEmbed } from '../../../domain/Embed/UnsubscribeEmbed'
import { PopulationEntity } from '../../../domain/Entity/PopulationEntity'

export async function removePopulationSubscription(server: string, event: string, user: User): Promise<UnsubscribeEmbed> {
  const population = new PopulationClient()
  event = event === 'All' ? 'anything' : event
  const id = new PopulationEntity(server, event)
  const ids = id.getIds()

  for (const id of ids) {
    await population.removeSubscription({ userId: user.id, id })
  }

  return new UnsubscribeEmbed(event, server)
}
