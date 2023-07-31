export interface Player {
  id: string
  name: string
  factionId: string
  serverId: string
  outfitTag: string
  isOnline?: boolean
  lastLogout?: Date
  lastActivity?: Date
}
