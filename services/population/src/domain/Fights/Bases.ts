import { bases } from '@ps2gg/common/constants'
import { PopulationEntity } from '../Entity/PopulationEntity'

export function getValidBases(fights: PopulationEntity[]): PopulationEntity[] {
  return fights.filter((fight) => {
    const baseId = fight.id.split('.')[0]
    return bases[baseId]
  })
}
