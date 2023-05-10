import { servers } from '@ps2gg/common/constants'
import { getRegion } from '@ps2gg/common/util'
import { emojis } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'
import { format } from 'timeago.js'
import { ptsToPercent } from './score'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getAltEmbed(matches: any, name: string): APIEmbed {
  if (!matches.error && matches.result?.alts.length <= 16) {
    return getEmbed(matches.result.alts)
  } else if (!matches.error) {
    return getWarningEmbed(name, matches.result)
  } else {
    return getErrorEmbed(name, matches)
  }
}

function getEmbed(alts) {
  const main = alts.find((a) => a.matchType.includes('primary'))
  const characters = getCharacters(alts)
  const stats = getStats(alts)
  const roles = getRoles(stats)
  const roleStats = getRoleStats(roles, stats, alts)
  return {
    title: `${getOutfit(main)}${main.name}`,
    url: `https://ps2.fisu.pw/player/?name=${main.name.toLowerCase()}`,
    fields: [].concat(characters).concat(roleStats.slice().reverse()),
    footer: getFooter(alts),
  }
}

function getWarningEmbed(name, matches) {
  if (matches) {
    return {
      title: `Found too many matches for ${name}.`,
      description: `More than 16 matches (${matches.alts.length}).`,
    }
  } else {
    return {
      title: `No matches found for ${name}`,
    }
  }
}

function getErrorEmbed(name, matches) {
  return {
    title: `Found no alts for ${name}.`,
    description: matches.error,
  }
}

function getCharacters(alts) {
  const serverAlts = []
  const maxNameLength = getMaxNameLength(alts)

  for (const server of Object.values(servers)) {
    addServerCharacters(serverAlts, server, alts, maxNameLength)
  }

  return serverAlts
}

function addServerCharacters(serverAlts, server: string, alts, maxNameLength) {
  const characters = alts.filter((a) => a.server === server)

  if (!characters.length) return
  const strings = []
  const maxBRLength = alts
    .map((alt) => getBattleRank(alt))
    .sort((a, b) => a.length - b.length)
    .reverse()[0].length

  for (const character of characters) {
    strings.push(createAltString(character, maxNameLength, maxBRLength))
  }

  serverAlts.push({
    name: `${getRegionEmoji(server)} ${server}`,
    value: `\`\`\`css\n${strings.join('\n')}\`\`\`\n`,
  })
}

function getMaxNameLength(alts) {
  let max = 0

  for (const alt of alts) {
    const oLength = getOutfit(alt).length

    if (oLength + alt.name.length > max) max = oLength + alt.name.length
  }

  return max
}

function createAltString(alt, maxNameLength, maxBRLength) {
  const outfit = getOutfit(alt)
  const padLength = maxNameLength - getOutfit(alt).length
  const name = alt.name.padEnd(padLength)
  const br = getBattleRank(alt).toLowerCase()
  const faction = getFaction(alt)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const score = ptsToPercent(alt.matchScore || 0)
  const padLengthScore = score.length + (maxBRLength - br.length)
  return `${outfit}${name}  ${faction} · ${br} · ${score.padStart(padLengthScore)}`
}

function getOutfit(alt) {
  return alt.outfit ? `[${alt.outfit}] ` : ''
}

function getRegionEmoji(server: string) {
  const region = getRegion(server)

  switch (region) {
    case 'NA':
      return emojis.na
    case 'EU':
      return emojis.eu
    case 'CN':
      return emojis.cn
  }
}

function getFaction(alt) {
  switch (alt.faction) {
    case 'TR':
      return 'ᴛʀ'
    case 'NC':
      return 'ɴᴄ'
    case 'VS':
      return 'ᴠs'
    default:
      return 'ɴs'
  }
}

function getBattleRank(alt) {
  return alt.battleRank ? `ʙʀ${alt.battleRank}` : ''
}

function getStats(alts) {
  const stats = {
    global: {
      playTime: 0,
      rating: 0,
      kills: 0,
    },
  }

  for (const alt of alts) {
    if (!alt.stats) continue
    sumClassStats(stats, alt.stats, alt.rating)
    sumGlobalStats(stats, alt.stats, alt.rating)
  }
  for (const role in stats) {
    stats[role].playTimePercent = stats[role].playTime / stats.global.playTime
  }

  return stats
}

function sumClassStats(globalStats, characterStats, rating) {
  for (const role in characterStats) {
    if (['playTime'].includes(role)) continue
    sumStats(globalStats, characterStats, role)
  }
}

function sumGlobalStats(globalStats, characterStats, rating) {
  if (!characterStats.playTime) return
  sumStats(globalStats, characterStats, 'global')
}

function sumStats(globalStats, characterStats, role) {
  if (!globalStats[role]) globalStats[role] = { kills: 0, playTime: 0, playTimePercent: 0 }
  const stats = role === 'global' ? characterStats : characterStats[role]

  globalStats[role].kills += stats.kills
  globalStats[role].playTime += stats.playTime
}

function getRoles(stats) {
  const roles = []

  for (const role in stats) {
    if (role === 'global') continue
    if (stats[role].playTimePercent > 0.1) roles.push(role)
  }

  return roles.slice(0, 3) // Max 3
}

function getRoleStats(roles, stats, alts) {
  const roleStats = []

  for (const role of roles) {
    const statsStrings = getRoleStatsStrings(stats[role], role, alts)

    roleStats.push({
      name: `${emojis[role]} ${capitalize(role)}`,
      value: `\`\`\`prolog\n${statsStrings.join('\n')}\`\`\``,
      inline: true,
    })
  }

  return roleStats
}

function getRoleStatsStrings(stats, role, alts) {
  const strings: string[] = []

  addKills(strings, stats)
  addTime(strings, stats)
  addUsage(strings, stats)
  padStrings(strings)

  return strings
}

function addKills(strings, stats) {
  if (!stats.kills) return
  strings.push(`${stats.kills} ᴋɪʟʟs`)
}

function addTime(strings, stats) {
  strings.push(`${(stats.playTime / 60 / 60 / 24).toFixed(2)} ᴅᴀʏs`)
}

function addUsage(strings, stats) {
  strings.push(`${(stats.playTimePercent * 100).toFixed(2)} ﹪`)
}

function padStrings(strings: string[]) {
  // Get longest number in front
  const max = Math.max(...strings.map((s) => s.split(' ')[0].length))

  for (let i = 0; i < strings.length; i++) {
    const split = strings[i].split(' ')

    strings[i] = split[0].padEnd(max) + ' ' + split.slice(1).join(' ')
  }
}

function getGrade(stats, role, alts) {
  return '-'
}

function getFooter(alts) {
  const online = alts.find((a) => a.online)
  const onlineIcon = 'https://cdn.discordapp.com/emojis/717334812083355658.png?v=1'
  const offlineIcon = 'https://cdn.discordapp.com/emojis/717334809621430352.png?v=1'
  const { lastLogout, alt } = getLastLogout(online, alts)
  const agesAgo = lastLogout < new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 20
  const text = online
    ? `Playing as ${online.name}, ${online.server} ${online.faction}.`
    : `Last seen ${agesAgo ? 'a looong time ago' : format(lastLogout)}${alt ? ` as ${alt.name}` : ''}.`

  return {
    // 37 is max length without breaking the format
    text: text.length > 37 ? text.slice(0, 37 - 3) + '...' : text,
    icon_url: online ? onlineIcon : offlineIcon,
  }
}

function getLastLogout(online, alts) {
  if (online) return {}
  let max = 0
  let alt = null

  alts.map((a) => {
    if (!a.lastLogout) return
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const d = new Date(a.lastLogout).getTime()

    if (d > max) {
      max = d
      alt = a
    }
  })

  return { lastLogout: max, alt }
}

function cap(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1))
}

function capitalize(str) {
  return str.length <= 3 ? str.toUpperCase() : cap(str)
}
