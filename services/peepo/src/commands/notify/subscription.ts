import { getOffsetAdjustedTimeOfDay, getServerTimezone } from '@ps2gg/common/util'
import { CommandResponse } from '@ps2gg/discord/command'
import { DynamicSubscription } from '@ps2gg/events/types'
import { PopulationClient } from '@ps2gg/population/client'
import { Population } from '@ps2gg/population/types'
import { User } from '@ps2gg/users/types'
import { getFailureEmbed } from './embeds/failure'
import { getNotifyEmbed } from './embeds/notify'

const population = new PopulationClient()

export function getDefaultSubscription(userId: string, scope: string, server: string): DynamicSubscription {
  const filter = { $min: 6 }
  const timezone = getServerTimezone(server)
  const sendAfter = getOffsetAdjustedTimeOfDay(1000 * 60 * 60 * 12, timezone)
  const sendBefore = getOffsetAdjustedTimeOfDay(1000 * 60 * 60 * 2, timezone)
  const configuration = { tr: filter, vs: filter, nc: filter }
  const subscription = { userId, scope, sendBefore, sendAfter, configuration }
  return subscription
}

export async function subscribe(compositeScopes: string[], user: User, event: string, server: string): Promise<CommandResponse> {
  const populationSum = { tr: 0, nc: 0, vs: 0 }

  for (const compositeScope of compositeScopes) {
    const pop = await population.getPopulation(compositeScope)

    if (!pop) {
      return {
        interactionContext: [event, server],
        embeds: [getFailureEmbed(server, event)],
        ephemeral: true,
      }
    }
    populationSum.tr += pop.tr
    populationSum.nc += pop.nc
    populationSum.vs += pop.vs
    const subscription = getDefaultSubscription(user.id, compositeScope, server)
    await population.setSubscription(subscription)
  }

  return {
    interactionContext: [event, server],
    embeds: [getNotifyEmbed(server, event, populationSum as Population)],
    ephemeral: false,
  }
}
