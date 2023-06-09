import { convertTo12HourClock } from '@ps2gg/common/util'

export const NotifyConfigureSendBefore = {
  id: 'notify.configureSendBefore',
  type: 'StringSelectMenu',
  placeholder: 'Send before',
  options: getTimeOptions(),
}

export const NotifyConfigureSendAfter = {
  id: 'notify.configureSendAfter',
  type: 'StringSelectMenu',
  placeholder: 'Send after',
  options: getTimeOptions(),
}

function getTimeOptions() {
  const options = []

  for (let i = 0; i <= 23; i++) {
    options.push({
      label: `${convertTo12HourClock(i)}`,
      value: (i * 60 * 60 * 1000).toString(),
    })
  }

  return options
}
