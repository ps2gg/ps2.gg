import { PopulationClient } from '@ps2gg/population/client'
import { NotificationEmbed } from '../../../domain/Embed/Notification'

export async function getPopulationNotification(id: string): Promise<NotificationEmbed> {
  const population = await new PopulationClient().getPopulation(id)
  return new NotificationEmbed(id, population)
}
