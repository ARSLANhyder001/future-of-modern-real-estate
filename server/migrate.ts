import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './db';

async function runMigrations() {
  console.log('Running database migrations...');
  if (!db) {
    console.error('No database connection. Set DATABASE_URL.');
    process.exit(1);
  }
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();