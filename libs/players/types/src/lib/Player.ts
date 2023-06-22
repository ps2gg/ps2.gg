export interface Player {
  id: string
  name: string
  factionId: string
  outfitTag: string
  isOnline?: boolean
  lastLogout?: Date
}