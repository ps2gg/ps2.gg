import { ServerId } from '@ps2gg/census/types'
import { servers } from '@ps2gg/common/constants'
import { getServerId } from '@ps2gg/common/util'
import { NotificationsClient } from '@ps2gg/notifications/client'
import { User } from '@ps2gg/users/types'
import { sanitizeScope, scopes } from '../../domain/scopes'

const subscriptions = new NotificationsClient()

export async function unsubscribe(user: User, scope: string, server: string): Promise<void> {
  if (server === 'All') {
    await unsubscribeFromAllServers(user, scope)
  } else {
    await unsubscribeFromSingleServer(user, scope, server as ServerId)
  }
}

async function unsubscribeFromAllServers(user: User, scope: string) {
  for (const serverId of Object.keys(servers)) {
    if (scope === 'All') {
      unsubscribeFromAllScopes(user, serverId as ServerId)
    } else {
      await subscriptions.removePopulationSubscription(user.id, sanitizeScope(scope), serverId as ServerId)
    }
  }
}

async function unsubscribeFromSingleServer(user: User, scope: string, server: ServerId) {
  const serverId = getServerId(server)

  if (scope === 'All') {
    await unsubscribeFromAllScopes(user, serverId)
  } else {
    await subscriptions.removePopulationSubscription(user.id, sanitizeScope(scope), serverId)
  }
}

async function unsubscribeFromAllScopes(user: User, serverId: ServerId) {
  for (const s of scopes) {
    const scope = sanitizeScope(s)
    await subscriptions.removePopulationSubscription(user.id, sanitizeScope(scope), serverId)
  }
}
