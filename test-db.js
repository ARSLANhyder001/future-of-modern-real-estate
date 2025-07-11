import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔌 Connecting to Supabase...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Check database info
    const dbInfo = await client.query('SELECT current_database(), current_user;');
    console.log('📊 Database:', dbInfo.rows[0]);

    // Check existing tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('📋 Existing tables:');
    if (tables.rows.length === 0) {
      console.log('   No tables found in public schema');
    } else {
      tables.rows.forEach(row => console.log(`   - ${row.table_name}`));
    }

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await client.end();
  }
}

testConnection(); 