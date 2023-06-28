import pino, { Logger } from 'pino'

const production = process.env['NODE_ENV'] === 'production'

export function getLogger(context?: string): Logger {
  return pino(getLoggerOptions(context))
}

export function logTransaction(method: string, query: object, result: object, level = 'info'): void {
  const logger = getLogger()
  logger[level]({ method, query, result }, 'transaction completed')
}

function getLoggerOptions(service?: string) {
  return {
    name: service,
    level: production ? 'info' : 'debug',
    defaultMeta: { service },
    transport: getDevelopmentTransports(),
    // transports: production ? getProductionTransports() : getDevelopmentTransports(),
  }
}

function getProductionTransports() {}

function getDevelopmentTransports() {
  return {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
    },
  }
}
