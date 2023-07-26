export const NotifyConfigurePopulation = {
  id: 'notify.configurePopulation',
  type: 'StringSelectMenu',
  placeholder: 'Minimum Players',
  options: getPlayerCountOptions(),
}

function getPlayerCountOptions() {
  const options = []

  for (let i = 1; i <= 8; i++) {
    options.push({
      label: `${i * 12} Players`,
      value: `${i * 12}`,
    })
  }

  return options
}
