import { WsController } from '@ps2gg/census/controllers'
import { PlayerLoadout } from '@ps2gg/census/types'
import { createLogger } from '@ps2gg/common/logging'

const logger = createLogger('Ratings')

export class EloController extends WsController {
  private _assistXpEvents: Promise<{ name: string; id: string }[]>

  constructor() {
    super(['GainExperience', 'VehicleDestroy', 'Death'])
  }

  async onGainExperience(experience_id: string, timestamp: Date, character_id: string, other_id: string): Promise<void> {}

  override onDeath(timestamp: Date, server: string, continent: string, winner: PlayerLoadout, loser: PlayerLoadout, loadout: string, vehicle: string): void {
    // logger.info(`Player Death ${loser.character_id}`)
  }

  override onVehicleDestroy(
    timestamp: Date,
    server: string,
    continent: string,
    winner: PlayerLoadout,
    loser: PlayerLoadout,
    loadout: string,
    vehicle: string
  ): void {
    // console.log(winner, loser, loadout, vehicle)
    // logger.info(`Vehicle Destroy`)
  }
}
