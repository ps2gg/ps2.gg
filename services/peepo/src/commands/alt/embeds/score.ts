export function ptsToPercent(points: number): string {
  if (points === 0) return '⚐'

  return Math.round((points / 128) * 100) + '﹪'
}
