import { WsController } from '@ps2gg/census/controllers'
import { PlayerLoadout } from '@ps2gg/census/types'
import { createLogger } from '@ps2gg/common/logging'

const logger = createLogger('Speedruns')

export class SpeedrunController extends WsController {
  constructor() {
    super(['Death'])
  }

  onDeath(timestamp: Date, server: string, continent: string, winner: PlayerLoadout, loser: PlayerLoadout, loadout: string, vehicle: string): void {
    logger.info(`Kill | Winner: ${winner.character_id} | Loser: ${loser.character_id}`)
  }
}
