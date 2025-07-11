import { pgTable, text, serial, integer, boolean, decimal, timestamp, jsonb, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enhanced Users table with profile information
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  avatar: text("avatar"),
  dateOfBirth: date("date_of_birth"),
  nationality: text("nationality"),
  kycVerified: boolean("kyc_verified").default(false),
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  preferences: jsonb("preferences").$type<{
    notifications: boolean;
    emailUpdates: boolean;
    riskTolerance: 'low' | 'medium' | 'high';
    investmentGoals: string[];
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced Projects table with more details
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  location: text("location").notNull(),
  category: text("category").notNull(), // 'RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'MIXED_USE'
  propertyType: text("property_type").notNull(), // 'APARTMENT', 'VILLA', 'OFFICE', 'RETAIL', 'WAREHOUSE'
  roi: decimal("roi", { precision: 5, scale: 2 }).notNull(),
  minInvestment: integer("min_investment").notNull(),
  targetAmount: integer("target_amount").notNull(),
  currentAmount: integer("current_amount").default(0),
  status: text("status").notNull(), // 'DRAFT', 'FUNDING', 'ACTIVE', 'COMPLETE', 'SOLD'
  featured: boolean("featured").default(false),
  priority: integer("priority").default(0),
  
  // Property details
  propertySize: integer("property_size"), // in sq ft
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  floors: integer("floors"),
  parkingSpaces: integer("parking_spaces"),
  
  // Financial details
  expectedCompletionDate: date("expected_completion_date"),
  monthlyRent: integer("monthly_rent"),
  annualAppreciation: decimal("annual_appreciation", { precision: 5, scale: 2 }),
  
  // Media
  imageUrl: text("image_url"),
  gallery: jsonb("gallery").$type<string[]>(),
  videoUrl: text("video_url"),
  
  // Location details
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  postalCode: text("postal_code"),
  
  // Project timeline
  constructionStartDate: date("construction_start_date"),
  constructionEndDate: date("construction_end_date"),
  
  // Additional metadata
  tags: jsonb("tags").$type<string[]>(),
  amenities: jsonb("amenities").$type<string[]>(),
  documents: jsonb("documents").$type<Array<{
    name: string;
    url: string;
    type: string;
  }>>(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced Investments table
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  projectId: integer("project_id").references(() => projects.id),
  amount: integer("amount").notNull(),
  units: integer("units").default(1),
  returns: decimal("returns", { precision: 10, scale: 2 }).default("0"),
  status: text("status").notNull().default('ACTIVE'), // 'ACTIVE', 'SOLD', 'CANCELLED'
  investmentDate: timestamp("investment_date").defaultNow(),
  expectedReturnDate: date("expected_return_date"),
  actualReturnDate: date("actual_return_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  projectId: integer("project_id").references(() => projects.id),
  investmentId: integer("investment_id").references(() => investments.id),
  amount: integer("amount").notNull(),
  type: text("type").notNull(), // 'INVESTMENT', 'RETURN', 'DIVIDEND', 'WITHDRAWAL', 'REFUND'
  status: text("status").notNull(), // 'PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'
  paymentMethod: text("payment_method"), // 'BANK_TRANSFER', 'CREDIT_CARD', 'CRYPTO', 'CASH'
  reference: text("reference"),
  description: text("description"),
  fees: integer("fees").default(0),
  netAmount: integer("net_amount"),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Enhanced Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  verified: boolean("verified").default(false),
  featured: boolean("featured").default(false),
  userId: integer("user_id").references(() => users.id),
  projectId: integer("project_id").references(() => projects.id),
  investmentAmount: integer("investment_amount"),
  investmentDuration: text("investment_duration"), // e.g., "6 months", "1 year"
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

// New: Notifications table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'INFO', 'SUCCESS', 'WARNING', 'ERROR', 'INVESTMENT', 'RETURN'
  read: boolean("read").default(false),
  actionUrl: text("action_url"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// New: FAQ table
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(), // 'GENERAL', 'INVESTMENT', 'TECHNICAL', 'LEGAL', 'PAYMENT'
  priority: integer("priority").default(0),
  tags: jsonb("tags").$type<string[]>(),
  helpful: integer("helpful").default(0),
  notHelpful: integer("not_helpful").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// New: Educational Content table
export const educationalContent = pgTable("educational_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  type: text("type").notNull(), // 'ARTICLE', 'VIDEO', 'GUIDE', 'TUTORIAL', 'WEBINAR'
  category: text("category").notNull(), // 'INVESTMENT_BASICS', 'REAL_ESTATE', 'HALAL_INVESTING', 'MARKET_ANALYSIS'
  difficulty: text("difficulty").notNull(), // 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'
  duration: integer("duration"), // in minutes
  thumbnail: text("thumbnail"),
  videoUrl: text("video_url"),
  attachments: jsonb("attachments").$type<Array<{
    name: string;
    url: string;
    type: string;
  }>>(),
  author: text("author"),
  featured: boolean("featured").default(false),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// New: Market Data table
export const marketData = pgTable("market_data", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  propertyType: text("property_type").notNull(),
  averagePrice: integer("average_price"),
  averageRent: integer("average_rent"),
  priceGrowth: decimal("price_growth", { precision: 5, scale: 2 }),
  rentGrowth: decimal("rent_growth", { precision: 5, scale: 2 }),
  vacancyRate: decimal("vacancy_rate", { precision: 5, scale: 2 }),
  marketTrend: text("market_trend"), // 'RISING', 'STABLE', 'DECLINING'
  dataDate: date("data_date").notNull(),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow(),
});

// New: User Sessions table for analytics
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id").notNull(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  deviceType: text("device_type"), // 'DESKTOP', 'MOBILE', 'TABLET'
  browser: text("browser"),
  os: text("os"),
  country: text("country"),
  city: text("city"),
  startedAt: timestamp("started_at").defaultNow(),
  endedAt: timestamp("ended_at"),
  duration: integer("duration"), // in seconds
  pagesVisited: jsonb("pages_visited").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema validation schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  phone: true,
  nationality: true,
  preferences: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEducationalContentSchema = createInsertSchema(educationalContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = z.infer<typeof insertFaqSchema>;
export type EducationalContent = typeof educationalContent.$inferSelect;
export type InsertEducationalContent = z.infer<typeof insertEducationalContentSchema>;
export type MarketData = typeof marketData.$inferSelect;
export type UserSession = typeof userSessions.$inferSelect;
