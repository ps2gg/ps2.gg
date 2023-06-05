import { vehicles, infantry } from '@ps2gg/common/constants'

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getRegion(server: string): string | undefined {
  let region

  switch (server) {
    case 'Miller':
    case 'Cobalt':
      region = 'EU'
      break
    case 'Emerald':
    case 'Connery':
      region = 'NA'
      break
    case 'SolTech':
      region = 'CN'
      break
  }

  return region
}

export function getRole(vehicle_id: string, loadout_id: string): string {
  const vehicle = vehicles[vehicle_id]
  let role = infantry[loadout_id]

  switch (vehicle) {
    case 'Magrider':
    case 'Vanguard':
    case 'Prowler':
      role = 'MBT'
      break
    case 'Scythe':
    case 'Reaver':
    case 'Mosquito':
      role = 'ESF'
      break
    default:
      if (vehicle) role = vehicle
      break
  }

  return role
}
