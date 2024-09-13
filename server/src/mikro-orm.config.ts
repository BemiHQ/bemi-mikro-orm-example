import { PostgreSqlDriver, Options } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

const config: Options = {
  driver: PostgreSqlDriver,
  clientUrl: process.env.SOURCE_DB_URI,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  extensions: [Migrator],
};

export default config;
