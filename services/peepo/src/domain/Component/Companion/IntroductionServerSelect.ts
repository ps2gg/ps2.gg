import { servers } from '@ps2gg/common/constants'
import { ComponentConfig } from '@ps2gg/discord/command'

export const IntroductionServerSelect: ComponentConfig = {
  id: 'companion.serverSelect',
  type: 'StringSelectMenu',
  placeholder: 'Pick your Servers',
  max: 6,
  options: getServerOptions(),
  dynamic: true,
}

function getServerOptions() {
  return Object.keys(servers).map((serverId) => {
    return {
      label: `${servers[serverId]}`,
      value: serverId,
    }
  })
}
