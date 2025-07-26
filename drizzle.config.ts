import { defineConfig } from 'drizzle-kit';
import { getFullEnv } from './src/env/configs';

const { databaseFile, drizzleMigrationsFolder, drizzleSchemaFiles } =
  getFullEnv();

export default defineConfig({
  out: drizzleMigrationsFolder,
  schema: drizzleSchemaFiles,
  dialect: 'sqlite',
  dbCredentials: {
    url: databaseFile,
  },
});
