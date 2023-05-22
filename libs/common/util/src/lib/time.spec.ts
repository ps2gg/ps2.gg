import { getUTCOffsetMs, getServerTimezone, getOffsetAdjustedTimeOfDay, getCurrentMsInDay } from './time'

describe('getUTCOffsetMs', () => {
  it('should return -28800000 for timezone PST', () => {
    expect(getUTCOffsetMs('PST')).toEqual(-28800000)
  })

  it('should return -18000000 for timezone EST', () => {
    expect(getUTCOffsetMs('EST')).toEqual(-18000000)
  })

  it('should return 3600000 for timezone CET', () => {
    expect(getUTCOffsetMs('CET')).toEqual(3600000)
  })

  it('should return 32400000 for timezone JST', () => {
    expect(getUTCOffsetMs('JST')).toEqual(32400000)
  })
})

describe('getServerTimezone', () => {
  it('should return PST for server Connery', () => {
    expect(getServerTimezone('Connery')).toEqual('PST')
  })

  it('should return EST for server Emerald', () => {
    expect(getServerTimezone('Emerald')).toEqual('EST')
  })

  it('should return EST for server Jaeger', () => {
    expect(getServerTimezone('Jaeger')).toEqual('EST')
  })

  it('should return CET for server Miller', () => {
    expect(getServerTimezone('Miller')).toEqual('CET')
  })

  it('should return CET for server Cobalt', () => {
    expect(getServerTimezone('Cobalt')).toEqual('CET')
  })

  it('should return JST for server SolTech', () => {
    expect(getServerTimezone('SolTech')).toEqual('JST')
  })
})

describe('getOffsetAdjustedTimeOfDay', () => {
  it('should return 82800000 (23:00 PM) for 12:00 AM in CET timezone', () => {
    expect(getOffsetAdjustedTimeOfDay(0, 'CET')).toEqual(82800000)
  })

  it('should return 28800000 (08:00 AM) for 12:00 AM in PST timezone', () => {
    expect(getOffsetAdjustedTimeOfDay(0, 'PST')).toEqual(28800000)
  })

  it('should return 18000000 (05:00 AM) for 12:00 AM in EST timezone', () => {
    expect(getOffsetAdjustedTimeOfDay(0, 'EST')).toEqual(18000000)
  })

  it('should return 54000000 (15:00 PM) for 12:00 AM in JST timezone', () => {
    expect(getOffsetAdjustedTimeOfDay(0, 'JST')).toEqual(54000000)
  })
})

describe('getCurrentMsInDay', () => {
  it('should return a number between 0 and 86399999', () => {
    const currentMsInDay = getCurrentMsInDay()
    expect(currentMsInDay).toBeGreaterThanOrEqual(0)
    expect(currentMsInDay).toBeLessThanOrEqual(86399999)
  })
})
