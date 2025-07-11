import fs from 'fs';

const neonUrl = 'postgresql://neondb_owner:npg_4H2bXBeyKgWf@ep-cold-unit-adfoqhwl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const envContent = `# Database Configuration
DATABASE_URL=${neonUrl}

# Server Configuration
PORT=5000
NODE_ENV=development
`;

fs.writeFileSync('.env', envContent);
console.log('✅ .env file updated with Neon database URL!'); 