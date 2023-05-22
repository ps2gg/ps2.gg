export function getUTCOffsetMs(timezone: string): number {
  if (timezone === 'PST') {
    return -(1000 * 60 * 60 * 8)
  } else if (timezone === 'EST') {
    return -(1000 * 60 * 60 * 5)
  } else if (timezone === 'CET') {
    return 1000 * 60 * 60 * 1
  } else if (timezone === 'JST') {
    return 1000 * 60 * 60 * 9
  }
}

export function getServerTimezone(server: string): string {
  if (server === 'Connery') {
    return 'PST'
  } else if (server === 'Emerald' || server === 'Jaeger') {
    return 'EST'
  } else if (server === 'Miller' || server === 'Cobalt') {
    return 'CET'
  } else if (server === 'SolTech') {
    return 'JST'
  }
}

export function getOffsetAdjustedTimeOfDay(time: number, timezone: string): number {
  const utcOffsetMs = getUTCOffsetMs(timezone)
  console.log(utcOffsetMs)
  const timeOfDayMs = time % (24 * 60 * 60 * 1000)
  const offsetTimeOfDayMs = (timeOfDayMs - utcOffsetMs) % (24 * 60 * 60 * 1000)
  return offsetTimeOfDayMs >= 0 ? offsetTimeOfDayMs : offsetTimeOfDayMs + 24 * 60 * 60 * 1000
}

export function getCurrentMsInDay(): number {
  const now = Date.now()
  const timeOfDayMs = now % (24 * 60 * 60 * 1000)
  return timeOfDayMs
}
