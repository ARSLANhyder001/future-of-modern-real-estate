import { eq } from "drizzle-orm";
import { db } from "./db";
import { 
  users, projects, investments, transactions, testimonials,
  type User, type InsertUser, type Project, type InsertProject,
  type Investment, type InsertInvestment, type Transaction, type InsertTransaction,
  type Testimonial, type InsertTestimonial
} from "@shared/schema";
import type { IStorage } from "./storage";

export class DbStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not connected");
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllProjects(): Promise<Project[]> {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    if (!db) throw new Error("Database not connected");
    const result = await db.insert(projects).values(insertProject).returning();
    return result[0];
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    if (!db) throw new Error("Database not connected");
    const result = await db.update(projects).set(updates).where(eq(projects.id, id)).returning();
    return result[0];
  }

  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(investments).where(eq(investments.userId, userId));
  }

  async getInvestmentsByProject(projectId: number): Promise<Investment[]> {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(investments).where(eq(investments.projectId, projectId));
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    if (!db) throw new Error("Database not connected");
    const result = await db.insert(investments).values(insertInvestment).returning();
    return result[0];
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(transactions).where(eq(transactions.userId, userId));
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    if (!db) throw new Error("Database not connected");
    const result = await db.insert(transactions).values(insertTransaction).returning();
    return result[0];
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(testimonials);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    if (!db) throw new Error("Database not connected");
    const result = await db.insert(testimonials).values(insertTestimonial).returning();
    return result[0];
  }
}