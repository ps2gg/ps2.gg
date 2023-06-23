import { ServerId } from '@ps2gg/census/types'
import { servers } from '@ps2gg/common/constants'

export function getServerId(server: string): ServerId | null {
  // @ts-ignore
  return Object.keys(servers).find((key) => servers[key].toLowerCase() === server?.toLowerCase())
}
