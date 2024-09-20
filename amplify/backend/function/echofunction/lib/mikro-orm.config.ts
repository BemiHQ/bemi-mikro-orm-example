import { PostgreSqlDriver, Options } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  driver: PostgreSqlDriver,
  clientUrl: process.env.SOURCE_DB_URI,
  entities: ['./*.entity.js'],
  entitiesTs: ['./*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default config;
