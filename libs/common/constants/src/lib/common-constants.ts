export const ps2gg = {
  altsUrl: 'http://alts:3003',
}

export const servers: { [key: string]: string } = {
  '1': 'Connery',
  '10': 'Miller',
  '13': 'Cobalt',
  '17': 'Emerald',
  '19': 'Jaeger',
  '40': 'SolTech',
}

export const continents: { [key: string]: string } = {
  '2': 'Indar',
  '4': 'Hossin',
  '6': 'Amerish',
  '8': 'Esamir',
  '344': 'Oshur',
}

export const vehicles: { [key: string]: string } = {
  '1': 'Flash',
  '2': 'Sunderer',
  '3': 'Lightning',
  '4': 'Magrider',
  '5': 'Vanguard',
  '6': 'Prowler',
  '7': 'Scythe',
  '8': 'Reaver',
  '9': 'Mosquito',
  '10': 'Liberator',
  '11': 'Galaxy',
  '12': 'Harasser',
  '14': 'Valkyrie',
  '15': 'Ant',
  '2019': 'Bastion',
}

export const infantry: { [key: string]: string } = {
  '1': 'Infiltrator',
  '3': 'Light Assault',
  '4': 'Medic',
  '5': 'Engineer',
  '6': 'Heavy Assault',
  '7': 'MAX',
  '8': 'Infiltrator',
  '10': 'Light Assault',
  '11': 'Medic',
  '12': 'Engineer',
  '13': 'Heavy Assault',
  '14': 'MAX',
  '15': 'Infiltrator',
  '17': 'Light Assault',
  '18': 'Medic',
  '19': 'Engineer',
  '20': 'Heavy Assault',
  '21': 'MAX',
  '28': 'Infiltrator',
  '29': 'Light Assault',
  '30': 'Medic',
  '31': 'Engineer',
  '32': 'Heavy Assault',
  '45': 'MAX',
}

export const esf: { [key: string]: string } = {
  '7': 'Scythe',
  '8': 'Reaver',
  '9': 'Mosquito',
}

export const mbt: { [key: string]: string } = {
  '4': 'Magrider',
  '5': 'Vanguard',
  '6': 'Prowler',
}

export const a2aWeapons: { [key: string]: string } = {
  '4900': 'M18 Needler',
  '4302': 'Saron Laser Cannon',
  '4600': 'M20 Mustang',

  '4905': 'Tomcat A2AM Pods',
  '4300': 'Photon A2A Missile Pods',
  '4602': 'Tomcat A2AM Pods',

  '4911': 'M18 Rotary',
  '4304': 'Maelstrom Turbo Laser',
  '4604': 'Vortek Rotary',

  '5050': 'M18 Locust',
  '4445': 'Antares LC',
  '4745': 'M20 Kestrel',

  '5052': 'Coyote Missiles',
  '4447': 'Coyote Missiles',
  '4747': 'Coyote Missiles',
}

export const a2gWeapons: { [key: string]: string } = {
  '4903': 'Hellfire Rocket Pods',
  '4301': 'Dual Photon Pods',
  '4601': 'Breaker Rocket Pods',

  '4906': 'M14 Banshee',
  '4305': 'Light PPA',
  '4605': 'M30 Mustang AH',

  '5051': 'Hornet Missiles',
  '4446': 'Hornet Missiles',
  '4746': 'Hornet Missiles',
}

export const factions: { [key: string]: string } = {
  '1': 'VS',
  '2': 'NC',
  '3': 'TR',
}

export const roleThresholds = {
  pilot: {
    esf: {
      playTimePercent: 0.2,
      kills: 3000,
    },
  },
}
