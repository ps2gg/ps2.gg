export const image = (env: string) => `image: 127.0.0.1:5000/ps2gg:${env}`
export const entrypoint = (env: string, name: string) => `entrypoint: "sh /app/docker/entrypoint.${env}.sh ${name}"`
export const volumes = (env: string) => (env === 'dev' ? `volumes:\n      - ../../..:/app` : '')
export const healthcheck = () => `healthcheck:
      test: 'curl -f localhost:3000/healthz'
      timeout: 5s
      interval: 10s
      start_period: 300s
      retries: 5`

export function networks(networks: string[]) {
  let config = 'networks:'

  for (const network of networks) {
    config += `
      - ps2gg-${network}`
  }

  return config
}

export function environment(type: string, env: string, name: string) {
  if (type === 'nest' && (env === 'prod' || env === 'staging')) return '' // none needed for now
  let config = `environment:`

  if (type === 'nest' && env === 'dev') {
    config += `
      POSTGRES_DSN: "postgresql://postgres:postgres@${name}-db/postgres"
      EVENT_STREAM_DSN: "amqp://rabbitmq:rabbitmq@rabbitmq:5672"`
  } else if (type === 'postgres' && env === 'dev') {
    config += `
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres`
  } else if (type === 'postgres' && (env === 'prod' || env === 'staging')) {
    config += `
      POSTGRES_USER: ${name}
      POSTGRES_PASSWORD_FILE: /run/secrets/${name}-db-pass`
  }

  return config
}

export let allSecrets = ''
export function getAllSecrets() {
  const allSecretsCopy = allSecrets
  allSecrets = ''

  return allSecretsCopy
}
export function secrets(type: string, env: string, name: string, add = true) {
  if (env === 'dev' || type !== 'nest') return ''
  if (add)
    allSecrets += `
    ${name}-db-pass:
      external: true`

  return `
    secrets:
      - ${name}-db-pass
      - rabbitmq-pass`
}
