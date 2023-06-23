import { isProd } from '@ps2gg/common/util'
import { SubscriptionEntity } from '@ps2gg/events/subscriptions'
import { getProdPostgresDSN } from '@ps2gg/nx/nest-app'
import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { readFileSync } from 'fs'

export const options: PostgresConnectionOptions = {
  type: 'postgres',
  url: isProd('population') ? getProdPostgresDSN('population', readFileSync) : (process.env['POSTGRES_DSN'] as string),
  entities: [`${__dirname}/../../domain/Entity/*.{ts,js}`, SubscriptionEntity],
  entityPrefix: '',
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [`${__dirname}/Migrations/*.{ts,js}`],
  migrationsRun: true,
  migrationsTableName: 'migration',
  // Uncomment if your database connection requires SSL
  // ssl: process.env['NODE_ENV'] as string === 'production' ? {
  //   rejectUnauthorized: false,
  // } : false,
}

export default new DataSource(options)
