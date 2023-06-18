import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { getLogger } from '@ps2gg/common/logging'
import { GetPlayers } from '../Query/GetPlayers'
import { PopulatePlayer } from './PopulatePlayer'

const logger = getLogger()

export class PopulatePlayers {
  constructor(readonly ids: string[]) {}
}

@CommandHandler(PopulatePlayers)
export class PopulatePlayersHandler implements ICommandHandler<PopulatePlayers, void> {
  constructor(private _queryBus: QueryBus, private _commandBus: CommandBus) {}

  async execute(command: PopulatePlayers): Promise<void> {
    const { ids } = command

    const players = await this._queryBus.execute(new GetPlayers(ids))
    const unpopulated = ids.filter((id) => !players.find((player) => player.id === id))
    logger.info(unpopulated, 'Priming unknown players')

    for (const id of unpopulated) {
      try {
        await this._commandBus.execute(new PopulatePlayer(id))
      } catch (err) {
        logger.error(err, `Failed to prime player ${id}`)
      }
    }
  }
}
