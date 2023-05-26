import { entrypoint, environment, getAllSecrets, healthcheck, image, networks, secrets, volumes } from './generate-strings'

/**
 * Generates docker-compose files based on available /services
 */
function main() {
  generate('dev')
  generate('prod')
  generate('staging')
}
main()

function generate(env: string) {
  const services = getServices()
  const compose = generateCompose(services, env)
  save(compose, env)
}

function getServices(): Service[] {
  const workspace = require('../../workspace.json')
  const { projects } = workspace
  const services: Service[] = []

  for (const value of Object.values<string>(projects)) {
    if (value.startsWith('services/')) {
      const type = getServiceType(value)
      const name = value.split('/').pop()
      // @ts-ignore
      services.push({ name, type })
    }
  }

  return services
}

function getServiceType(path: string) {
  const project = require(`../../${path}/project.json`)
  const isNestApp = project.targets['build-migration'] // only nest apps have this
  return isNestApp ? 'nest' : 'general'
}

function generateCompose(services: Service[], env: string): string {
  let compose = `version: \'3.4\'
  
services:`

  for (const service of services) {
    compose += generateService(service, env)
  }

  if (env === 'prod' || env === 'staging') {
    compose += `
secrets:
    ${getAllSecrets()}`
  }

  compose += `
volumes:
  ${services.map((service) => `${service.name}-db-${env}:`).join('\n  ')}
  `

  return compose
}

function generateService(service: Service, env: string) {
  switch (service.type) {
    case 'nest':
      return generateNestService(service, env)
    default:
      return generateGeneralService(service, env)
  }
}

function generateNestService(service: Service, env: string) {
  return `
  ${service.name}:
    ${image(env)}
    ${entrypoint(env, service.name)}
    ${networks(['internal', 'external'])}
    ${healthcheck()}
    ${environment('nest', env, service.name)}
    ${secrets('nest', env, service.name)}
    ${volumes(env)}

  ${service.name}-db:
    image: postgres:15.2-alpine
    ${networks(['internal'])}
    volumes:
      - ${service.name}-db-${env}:/var/lib/postgresql/data
    ${environment('postgres', env, service.name)}
    ${secrets('nest', env, service.name, false)}\n
`
}

function generateGeneralService(service: Service, env: string) {
  return `
  ${service.name}:
    ${image(env)}
    ${entrypoint(env, service.name)}
    ${networks(['internal'])}
    ${volumes(env)}\n`
}

function save(compose: string, env: string) {
  const fs = require('fs')
  fs.writeFileSync(`${__dirname}/generated/docker-compose.${env}.yml`, compose)
}

type Service = {
  name: string
  type: string
}
