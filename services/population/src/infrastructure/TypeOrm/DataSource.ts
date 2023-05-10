import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const options: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env['POSTGRES_DSN'] as string,
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
