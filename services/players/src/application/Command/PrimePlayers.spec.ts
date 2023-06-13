import { Test, TestingModule } from '@nestjs/testing'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { PrimePlayers, PrimePlayersHandler } from './PrimePlayers'
import { GetPlayers } from '../Query/GetPlayers'
import { PopulatePlayer } from './PopulatePlayer'

describe('PrimePlayersHandler', () => {
  let commandBus: CommandBus
  let queryBus: QueryBus
  let handler: PrimePlayersHandler

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrimePlayersHandler,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile()

    handler = module.get<PrimePlayersHandler>(PrimePlayersHandler)
    queryBus = module.get<QueryBus>(QueryBus)
    commandBus = module.get<CommandBus>(CommandBus)
  })

  it('should not populate existing players', async () => {
    const ids = ['1', '2', '3']
    const players = [
      { id: '1', name: 'Player 1' },
      { id: '2', name: 'Player 2' },
    ]
    const getPlayersSpy = jest.spyOn(queryBus, 'execute').mockResolvedValue(players)
    const populatePlayerSpy = jest.spyOn(commandBus, 'execute').mockResolvedValue(undefined)

    await handler.execute(new PrimePlayers(ids))
    console.log('e')
    expect(getPlayersSpy).toHaveBeenCalledWith(new GetPlayers(ids))
    expect(populatePlayerSpy).toHaveBeenCalledTimes(1)
    expect(populatePlayerSpy).toHaveBeenCalledWith(new PopulatePlayer('3', false, new Date(0)))
  })
})
