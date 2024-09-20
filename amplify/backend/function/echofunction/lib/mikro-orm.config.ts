import { PostgreSqlDriver, Options } from '@mikro-orm/postgresql';

const config: Options = {
  driver: PostgreSqlDriver,
  clientUrl: process.env.SOURCE_DB_URI,
  entities: ['./*.entity.js'],
  entitiesTs: ['./*.entity.ts'],
  debug: true,
  driverOptions: {
    connection: { ssl: true },
  },
};

export default config;
