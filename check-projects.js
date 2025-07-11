import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function checkProjects() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Check if projects table exists
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'projects';
    `);
    
    if (tableCheck.rows.length === 0) {
      console.log('❌ Projects table does not exist!');
      return;
    }
    
    console.log('✅ Projects table exists');

    // Count projects
    const countResult = await client.query('SELECT COUNT(*) FROM projects;');
    console.log(`📊 Number of projects: ${countResult.rows[0].count}`);

    // Get all projects
    const projects = await client.query('SELECT id, title, status FROM projects LIMIT 5;');
    console.log('📋 Sample projects:');
    projects.rows.forEach(project => {
      console.log(`   - ID: ${project.id}, Title: ${project.title}, Status: ${project.status}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkProjects(); 