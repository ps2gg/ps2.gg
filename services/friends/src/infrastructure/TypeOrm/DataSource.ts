import { getProdPostgresDSN } from '@ps2gg/nx/nest-app'
import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { existsSync, readFileSync } from 'fs'

/**
 * process.env.NODE_ENV is forcibly replaced with development in the build process due to
 * the optimization flag being turned off in project.json. It should also stay off to avoid
 * misnaming of entities through minimization.
 * So instead, we check for the production state by the presence of the database secrets.
 */
const prod = existsSync('/run/secrets/friends_db_pass')

export const options: PostgresConnectionOptions = {
  type: 'postgres',
  url: prod ? getProdPostgresDSN('friends', readFileSync) : (process.env['POSTGRES_DSN'] as string),
  entities: [`${__dirname}/../../domain/Entity/*.{ts,js}`],
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
