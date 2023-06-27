import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Test, TestingModule } from '@nestjs/testing'
import { SetPopulation } from '../../application/Command/SetPopulation'
import { PopulationController } from './PopulationController'

describe('PopulationController', () => {
  let controller: PopulationController
  let commandBus: CommandBus

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopulationController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<PopulationController>(PopulationController)
    commandBus = module.get<CommandBus>(CommandBus)
  })

  describe('save', () => {
    it('should call commandBus.execute with SetPopulation command', async () => {
      const population = { id: '1', tr: 0, nc: 0, vs: 0, __resetSubscriptions: true }
      const expectedCommand = new SetPopulation(population)

      await controller.save(population)

      expect(commandBus.execute).toHaveBeenCalledWith(expectedCommand)
    })

    it('should return the saved population', async () => {
      const population = { id: '1', tr: 0, nc: 0, vs: 0, __resetSubscriptions: true }
      const expectedPopulation = { id: '1', tr: 0, nc: 0, vs: 0, __resetSubscriptions: true }
      jest.spyOn(commandBus, 'execute').mockResolvedValue(expectedPopulation)

      const result = await controller.save(population)

      expect(result).toEqual(expectedPopulation)
    })
  })
})
