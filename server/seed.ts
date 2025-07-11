import { db } from './db.ts';
import { projects, testimonials } from '../shared/schema.ts';

async function seedDatabase() {
  console.log('Seeding database...');
  
  if (!db) {
    console.log('No database connection available. Skipping seed.');
    return;
  }
  
  try {
    // Create tables if they don't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        category TEXT NOT NULL,
        property_type TEXT NOT NULL,
        roi DECIMAL(5,2) NOT NULL,
        min_investment INTEGER NOT NULL,
        target_amount INTEGER NOT NULL,
        current_amount INTEGER DEFAULT 0,
        status TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS investments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        project_id INTEGER REFERENCES projects(id),
        amount INTEGER NOT NULL,
        returns DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        project_id INTEGER REFERENCES projects(id),
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        avatar TEXT,
        content TEXT NOT NULL,
        rating INTEGER NOT NULL,
        verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Insert sample projects
    const sampleProjects = [
      {
        title: "Dubai Marina Tower",
        description: "Luxury residential tower in the heart of Dubai Marina with premium amenities and stunning views.",
        location: "Dubai Marina, UAE",
        category: "RESIDENTIAL",
        propertyType: "APARTMENT",
        roi: "12.50",
        minInvestment: 50000,
        targetAmount: 5000000,
        currentAmount: 3000000,
        status: "FUNDING",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      },
      {
        title: "Abu Dhabi Business District",
        description: "Modern office complex in Abu Dhabi's premier business district with high rental yields.",
        location: "Abu Dhabi, UAE",
        category: "COMMERCIAL",
        propertyType: "OFFICE",
        roi: "15.20",
        minInvestment: 100000,
        targetAmount: 8000000,
        currentAmount: 8000000,
        status: "COMPLETE",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      },
      {
        title: "Sharjah Industrial Park",
        description: "Industrial warehouse facility with long-term lease agreements and stable returns.",
        location: "Sharjah, UAE",
        category: "INDUSTRIAL",
        propertyType: "WAREHOUSE",
        roi: "8.75",
        minInvestment: 25000,
        targetAmount: 3000000,
        currentAmount: 1500000,
        status: "FUNDING",
        imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      },
    ];

    for (const project of sampleProjects) {
      await db.insert(projects).values(project);
    }

    // Insert sample testimonials
    const sampleTestimonials = [
      {
        name: "PERVAIZ AHMMED",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        content: "SAIR REIT has revolutionized my investment strategy. The halal approach combined with excellent returns is exactly what I was looking for.",
        rating: 5,
        verified: true,
      },
      {
        name: "ABDUL AZIZ",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        content: "The transparency and real-time tracking give me complete confidence in my investments. I've seen consistent 12%+ returns month after month.",
        rating: 5,
        verified: true,
      },
      {
        name: "MAKHDOOM NAVEED",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        content: "Finally, a platform that combines cutting-edge technology with solid fundamentals. My portfolio has grown 35% since joining SAIR REIT.",
        rating: 5,
        verified: true,
      },
    ];

    for (const testimonial of sampleTestimonials) {
      await db.insert(testimonials).values(testimonial);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seedDatabase();