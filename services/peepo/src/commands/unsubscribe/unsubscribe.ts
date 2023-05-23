import { ServerId } from '@ps2gg/census/types'
import { servers } from '@ps2gg/common/constants'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { sanitizeScope, scopes } from '../../util/scopes'

const population = new PopulationClient()

/**
 * TODO: Let notification API handle these with a simple "all" request
 * the repo would look up existing subscriptions of the user and remove
 * them accordingly
 */
export async function unsubscribe(user: User, scope: string, server: string): Promise<void> {
  if (server === 'All') {
    await unsubscribeFromAllServers(user, scope)
  } else {
    await unsubscribeFromSingleServer(user, scope, server as ServerId)
  }
}

async function unsubscribeFromAllServers(user: User, scope: string) {
  for (const server of Object.values(servers)) {
    if (scope === 'All') {
      unsubscribeFromAllScopes(user, server)
    } else {
      await population.removeSubscription(user.id, getCompositeScope(scope, server))
    }
  }
}

async function unsubscribeFromSingleServer(user: User, scope: string, server: string) {
  if (scope === 'All') {
    await unsubscribeFromAllScopes(user, server)
  } else {
    await population.removeSubscription(user.id, getCompositeScope(scope, server))
  }
}

async function unsubscribeFromAllScopes(user: User, server: string) {
  for (const s of scopes) {
    const scope = sanitizeScope(s)
    await population.removeSubscription(user.id, getCompositeScope(scope, server))
  }
}

function getCompositeScope(scope: string, server: string): string {
  scope = sanitizeScope(scope)

  return `${scope}.${server}`
}
