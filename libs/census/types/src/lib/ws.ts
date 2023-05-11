export type CensusWsEvent = {
  online?: Heartbeat
  payload?: any
  service: string
  type: string
}

export type Heartbeat = {
  EventServerEndpoint_Connery_1: 'true' | 'false'
  EventServerEndpoint_Miller_10: 'true' | 'false'
  EventServerEndpoint_Cobalt_13: 'true' | 'false'
  EventServerEndpoint_Emerald_17: 'true' | 'false'
  EventServerEndpoint_Jaeger_19: 'true' | 'false'
  EventServerEndpoint_Soltech_40: 'true' | 'false'
}

export type PlayerLoadout = {
  character_id: string
  vehicle_id: string
  loadout_id: string
}

export type Subscription = {
  service?: string
  action?: string
  worlds: string[]
  characters: string[]
  logicalAndCharactersWithWorlds?: boolean
  eventNames: string[]
}
