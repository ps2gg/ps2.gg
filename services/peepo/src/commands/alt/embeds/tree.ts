import * as asciiTree from 'ascii-tree'
import { APIEmbed } from 'discord.js'
import { getAltEmbed } from './match'
import { ptsToPercent } from './score'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getAltTreeEmbed(matches: any, name: string): APIEmbed {
  const embed = getAltEmbed(matches, name)

  if (matches.error) return embed
  const tree = matches.result.tree

  delete embed.fields
  embed.description = `\`\`\`arm\n${getAsciiTrees(tree)}\`\`\`\n`
  embed.fields = [
    {
      name: 'Legend',
      value: '`†` The alt was filtered\n`⚐` May contain errors if they played when the alt patch dropped',
    },
  ]

  return embed
}

function getAsciiTrees(alts) {
  const trees = []

  for (const alt of alts) {
    if (alt.matchType === 'experimental') continue // root nodes only
    if (trees.find((t) => t.includes(`${alt.name} ·`))) continue // alt already in other tree
    trees.push(asciiTree.generate(getAsciiBranch(alt, alts)))
  }

  return parse(trees)
}

function parse(trees) {
  const trimmed = ' [trimmed output]'
  const maxLength = 4096 - 10 - trimmed.length
  let output = trees.join('\n\n').slice(0, maxLength)

  if (output.length >= maxLength) output += trimmed

  return output
}

function getAsciiBranch(alt, alts, depth = 1) {
  let input = getAsciiNode(alt, depth)

  if (!alt.children) return input
  alt.depth = depth

  for (const child of alt.children) {
    const character = alts.find((a) => a.character_id === child.id)

    // < depth: avoid circular links by only recognizing alts down the tree
    // = depth: avoid duplicate children from siblings
    if (character.depth && character.depth <= depth) continue
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    character.matchScoreFormatted = ptsToPercent(child.score)
    input += getAsciiBranch(character, alts, depth + 1)
  }

  alt.children = [] // Remove duplicate branches.

  depth++

  return input
}

function getAsciiNode(alt, depth) {
  let input = ''

  for (let i = 0; i < depth; i++) input += '#'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const score = alt.matchScoreFormatted || ptsToPercent(alt.matchScore)

  input += `${alt.name} · ${score}`
  if (alt.filtered && score !== '⚐') input += ' †'
  input += '\r\n'

  return input
}
