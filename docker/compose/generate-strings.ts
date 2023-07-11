export function image(env: string) {
  return `image: 127.0.0.1:5000/ps2gg:${env}`
}

export function entrypoint(env: string, name: string) {
  return `entrypoint: "sh /app/docker/entrypoint.${env}.sh ${name}"`
}

export function volumes(env: string) {
  if (env === 'dev') {
    return `volumes:\n      - ../../..:/app`
  } else {
    return 'volumes:\n      - ../../../node_modules:/app/node_modules'
  }
}

export function healthcheck(name: string) {
  if (name === 'peepo') return '' // Doesn't run an HTTP server, should generalize this in the future
  return `healthcheck:
      test: 'curl -f localhost:3000/healthz'
      timeout: 5s
      interval: 10s
      start_period: 300s
      retries: 5`
}

export function networks(networks: string[]) {
  let config = 'networks:'

  for (const network of networks) {
    config += `
      - ps2gg-${network}`
  }

  return config
}

export function environment(type: string, env: string, name: string) {
  if (type === 'nest' && (env === 'prod' || env === 'staging')) {
    return ''
  }

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
  if (env === 'dev' || type !== 'nest') {
    return ''
  }

  if (add) {
    allSecrets += `
    ${name}-db-pass:
      external: true`
  }

  return `
    secrets:
      - ${name}-db-pass
      - rabbitmq-pass`
}
