import Database from 'better-sqlite3';
import { getFullEnv } from '../env/configs';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { todoTable } from '../core/todo/schemas/drizzle-todo-table.schema';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const makeDrizzle = () => {
  const { databaseFile, currentEnv, drizzleMigrationsFolder } = getFullEnv();
  const sqliteDatabase = new Database(databaseFile);

  const db = drizzle(sqliteDatabase, {
    schema: { todo: todoTable },
  });

  if (['test', 'e2e'].includes(currentEnv)) {
    migrate(db, { migrationsFolder: drizzleMigrationsFolder });
  }

  return db;
};

declare global {
  var __DB__: DrizzleDatabase;
}

if (!globalThis.__DB__) {
  globalThis.__DB__ = makeDrizzle();
}

export const drizzleDatabase = {
  db: globalThis.__DB__,
  todoTable,
};

export type DrizzleDatabase = ReturnType<typeof makeDrizzle>;

(async () => {
  const db = globalThis.__DB__;
  await db.query.todo.findMany();
})();
