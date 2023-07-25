import { PopulationEntity } from './PopulationEntity'

describe('PopulationEntity', () => {
  describe('_getPrecisePopulation', () => {
    it('should return the correct population percentages', () => {
      const population = { id: '123', tr: 24, nc: 24, vs: 48, __resetSubscriptions: false }
      const populationEntity = new PopulationEntity(population)
      const percentages = { tr: 15, nc: 35, vs: 50 }
      const result = populationEntity['_getPrecisePopulation'](population, percentages)
      expect(result).toEqual({ tr: 14, nc: 24, vs: 48 })
    })
  })
})
