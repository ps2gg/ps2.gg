import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PopulationController } from './PopulationController';
import { SetPopulation } from '../../application/Command/SetPopulation';
import { GetPopulation } from '../../application/Query/GetPopulation';
import { Population } from '@ps2gg/population/types';

describe('PopulationController', () => {
  let controller: PopulationController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

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
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PopulationController>(PopulationController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('save', () => {
    it('should return the saved population', async () => {
      const population: Population = {
        id: 'zone.Emerald',
        tr: 100,
        nc: 200,
        vs: 300,
        resetReceivedState: false,
      };
      const expectedOutput = population;

      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(expectedOutput);

      const result = await controller.save(population);

      expect(result).toEqual(expectedOutput);
      expect(commandBus.execute).toHaveBeenCalledWith(new SetPopulation(population));
    });
  });

  describe('get', () => {
    it('should return the population for the given server and id', async () => {
      const id = 'zone.Emerald';
      const expectedOutput: Population = {
        id,
        tr: 100,
        nc: 200,
        vs: 300,
        resetReceivedState: false,
      };

      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(expectedOutput);

      const result = await controller.get(id);

      expect(result).toEqual(expectedOutput);
      expect(queryBus.execute).toHaveBeenCalledWith(new GetPopulation(id));
    });
  });
});