# Property Investment Platform

A modern full-stack web application for property investment management with React frontend, Express backend, and PostgreSQL database.

## 🚀 Features

- **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS
- **Real-time Data**: Live project updates and statistics
- **Advanced Filtering**: Search and filter properties by multiple criteria
- **Responsive Design**: Works seamlessly on all devices
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Production Ready**: Optimized for deployment with security and performance

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Radix UI components
- Framer Motion for animations
- React Query for data fetching

### Backend
- Express.js with TypeScript
- Drizzle ORM for database operations
- PostgreSQL database (Neon/Supabase)
- JWT authentication
- Rate limiting and security middleware

### Database
- PostgreSQL with Neon/Supabase
- Drizzle ORM for type-safe queries
- Automatic migrations

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon/Supabase recommended)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd your-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your database credentials:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   NODE_ENV=development
   PORT=5000
   ```

4. **Database Setup**
   ```bash
   # Run migrations
   npm run db:migrate
   
   # Seed the database
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 🚀 Production Deployment

### Option 1: Traditional Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Option 2: Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t property-app .
   ```

2. **Run with Docker**
   ```bash
   docker run -p 5000:5000 --env-file .env property-app
   ```

### Option 3: Docker Compose (Recommended)

1. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **For production with nginx**
   ```bash
   docker-compose --profile production up -d
   ```

### Option 4: Automated Deployment Script

```bash
chmod +x deploy.sh
./deploy.sh
```

## 🌐 Deployment Platforms

### Vercel (Frontend) + Railway (Backend)

1. **Deploy Backend to Railway**
   - Connect your GitHub repository
   - Set environment variables
   - Railway will auto-deploy on push

2. **Deploy Frontend to Vercel**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist/public`

### Heroku

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set DATABASE_URL=your-database-url
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### DigitalOcean App Platform

1. Create a new app in DigitalOcean
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set run command: `npm start`
5. Configure environment variables

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

## 🔒 Security Features

- Helmet.js for security headers
- Rate limiting on API endpoints
- CORS protection
- Input validation with Zod
- SQL injection protection via Drizzle ORM
- Environment variable protection

## 📊 Performance Optimizations

- Code splitting with Vite
- Gzip compression
- Static asset optimization
- Database query optimization
- Caching strategies

## 🗄️ Database Schema

The application uses the following main tables:
- `projects` - Property investment projects
- `testimonials` - User testimonials
- `investors` - Investor information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Happy coding! 🎉**