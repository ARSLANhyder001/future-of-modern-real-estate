#!/bin/bash

# Production Deployment Script
set -e

echo "🚀 Starting production deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file based on env.example"
    exit 1
fi

# Load environment variables
source .env

# Check required environment variables
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL is not set in .env file"
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci --only=production

echo "🔍 Running type checks..."
npm run type-check

echo "🔍 Running linting..."
npm run lint

echo "🏗️ Building application..."
npm run build

echo "🗄️ Running database migrations..."
npm run db:migrate

echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Build completed successfully!"

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Docker detected. You can also deploy using Docker:"
    echo "   docker build -t your-app ."
    echo "   docker run -p 5000:5000 --env-file .env your-app"
fi

echo "🚀 Starting production server..."
echo "   Application will be available at: http://localhost:5000"
echo "   API endpoints: http://localhost:5000/api/*"

npm start 