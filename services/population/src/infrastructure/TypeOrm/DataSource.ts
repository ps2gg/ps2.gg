import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { readFileSync } from 'fs'

const prod = (process.env['NODE_ENV'] as string) === 'production'

export const options: PostgresConnectionOptions = {
  type: 'postgres',
  url: prod
    ? `postgresql://population:${readFileSync('/run/secrets/population_db_pass', 'utf-8')}@population_db/population`
    : (process.env['POSTGRES_DSN'] as string),
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
