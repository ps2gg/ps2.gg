import { CensusQuery } from '@ps2gg/census/api'
import { getLogger } from '@ps2gg/common/logging'

const logger = getLogger()

export async function getAssistXpEvents(): Promise<CensusAssistXpEvents> {
  logger.info('Fetching valid assist event ids from Census')

  const assists = await new CensusQuery().collection('experience').where('description').contains('Assist').limit(1000).get()
  const filtered = assists.experience_list.filter(filterExperienceEvents)
  const parsed = {}

  for (const assist of filtered) {
    // @ts-ignore
    parsed[assist.experience_id] = assist.description
  }
  logger.info(parsed, 'Retrieved assist events')

  return parsed
}

function filterExperienceEvents(experience: ExperienceEvent) {
  const { description } = experience
  const killAssistStrings = ['Kill Player Assist', 'Kill Player Priority Assist', 'Kill Player High Priority Assist', 'Kill Assist - ']
  // 1v1 detection will still work without this, but we save some throughput
  const killAssistExcludeStrings = ['- Engi Turret', '- Phalanx', '- Drop Pod', '- R Drone']

  for (const string of killAssistStrings) {
    if (killAssistExcludeStrings.find((s) => description.includes(s))) continue
    if (description.includes(string)) return true
  }

  return false
}

export type CensusAssistXpEvents = {
  [id: string]: string
}

type ExperienceEvent = {
  experience_id: string
  description: string
}
