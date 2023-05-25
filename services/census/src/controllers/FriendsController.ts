import { WsController } from '@ps2gg/census/controllers'
import { PlayerLoadout } from '@ps2gg/census/types'
import { createLogger } from '@ps2gg/common/logging'
import { ExampleClient } from '@ps2gg/friends/client'

const logger = createLogger('Ratings')

export class FriendsController extends WsController {
  // private _friends = new FriendsClient()
  private _friends = new ExampleClient()

  constructor() {
    super(['PlayerLogin'])
  }

  override onLogout(character_id: string, timestamp: Date): void {
    
  }

  override onLogin(character_id: string, timestamp: Date): void {
    // friends.populate(chracter_id)
    logger.info(`player logged on ${character_id}`)
    logger.info("player logged on %s", character_id)
  }
}

// bun nx g @nrwl/js:lib 
// bun nx g @ps2gg/nx:nest-app Frens