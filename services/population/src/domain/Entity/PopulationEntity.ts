import { Subscribable } from '@ps2gg/events/subscriptions'
import { SubscribableEntity } from '@ps2gg/events/types'
import { Population } from '@ps2gg/population/types'
import { Column, Entity, Index } from 'typeorm'
import { PopulationPercentages } from '../Types/PopulationPercentages'

@Entity()
@Subscribable()
@Index(['tr', 'nc', 'vs'])
export class PopulationEntity extends SubscribableEntity implements Population {
  @Column('int', { nullable: false })
  readonly tr: number

  @Column('int', { nullable: false })
  readonly nc: number

  @Column('int', { nullable: false })
  readonly vs: number

  @Column('boolean', { default: false })
  override __resetSubscriptions: boolean

  constructor(population: Population, percentages?: PopulationPercentages) {
    super()
    if (!population) return
    const { id, tr, nc, vs } = population
    this.id = id

    if (percentages) {
      const { tr, nc, vs } = this._getPrecisePopulation(population, percentages)
      this.tr = tr
      this.nc = nc
      this.vs = vs
    } else {
      this.tr = tr
      this.nc = nc
      this.vs = vs
    }
  }

  private _getPrecisePopulation(population: Population, percentages: PopulationPercentages): { tr: number; nc: number; vs: number } {
    const { tr, nc, vs } = population
    const { tr: trPercentage, nc: ncPercentage, vs: vsPercentage } = percentages
    const min = getLowerBound(tr) + getLowerBound(nc) + getLowerBound(vs)
    const max = tr + nc + vs
    return {
      tr: getMaxPrecisePopulationByPercentage(tr, trPercentage, min, max),
      nc: getMaxPrecisePopulationByPercentage(nc, ncPercentage, min, max),
      vs: getMaxPrecisePopulationByPercentage(vs, vsPercentage, min, max),
    }
  }
}

function getMaxPrecisePopulationByPercentage(population: number, targetPercentage: number, min: number, max: number): number {
  if (targetPercentage === 0) return 0

  // Since it is probably not immediately obvious what we're doing, here a short explanation:
  // First, we look for the highest possible population total that the percentages could be derived from (j)
  // Then, we look for the highest possible match for the given faction by its given percentage (i)
  // There may be a more elegant way to do this, but I'm not that cracked at maths.
  for (let j = max; j >= min; j--) {
    for (let i = population; i >= getLowerBound(population); i--) {
      const percentage = Math.round((i / j) * 100)

      if (percentage === Math.round(targetPercentage)) return i
    }
  }
  return population // Bandaid while percentages aren't reliable for every fight
}

function getLowerBound(num: number): number {
  return num === 12 ? 0 : num / 2
}
