export type Env = 'production' | 'development'

export interface Environment {
  env: Env
  production: boolean
  redisDsn: string
  eventStreamDsn: string
  postgresDsn: string
}

export const environment: Environment = {
  env: process.env['NODE_ENV'] as Env,
  production: process.env['NODE_ENV'] === 'production',
  postgresDsn: process.env['POSTGRES_DSN'] as string,
  redisDsn: process.env['REDIS_DSN'] as string,
  eventStreamDsn: process.env['EVENT_STREAM_DSN'] as string,
}
