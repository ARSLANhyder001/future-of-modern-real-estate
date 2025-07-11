import { 
  type User, type InsertUser, type Project, type InsertProject,
  type Investment, type InsertInvestment, type Transaction, type InsertTransaction,
  type Testimonial, type InsertTestimonial
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined>;
  
  // Investments
  getInvestmentsByUser(userId: number): Promise<Investment[]>;
  getInvestmentsByProject(projectId: number): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  
  // Transactions
  getTransactionsByUser(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private investments: Map<number, Investment>;
  private transactions: Map<number, Transaction>;
  private testimonials: Map<number, Testimonial>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentInvestmentId: number;
  private currentTransactionId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.investments = new Map();
    this.transactions = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentInvestmentId = 1;
    this.currentTransactionId = 1;
    this.currentTestimonialId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed projects
    const sampleProjects: Omit<Project, 'id'>[] = [
      {
        title: "Dubai Marina Tower",
        description: "Luxury residential tower in the heart of Dubai Marina with premium amenities and stunning views.",
        shortDescription: "Premium residential tower in Dubai Marina",
        location: "Dubai Marina, UAE",
        category: "RESIDENTIAL",
        propertyType: "APARTMENT",
        roi: "12.50",
        minInvestment: 50000,
        targetAmount: 5000000,
        currentAmount: 3000000,
        status: "FUNDING",
        featured: false,
        priority: 0,
        propertySize: 1200,
        bedrooms: 2,
        bathrooms: 2,
        floors: 25,
        parkingSpaces: 1,
        expectedCompletionDate: "2024-12-31",
        monthlyRent: 8000,
        annualAppreciation: "5.20",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        gallery: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
        videoUrl: null,
        latitude: "25.0920",
        longitude: "55.1381",
        address: "Dubai Marina, Dubai, UAE",
        city: "Dubai",
        state: "Dubai",
        country: "UAE",
        postalCode: "00000",
        constructionStartDate: "2023-01-01",
        constructionEndDate: "2024-12-31",
        tags: ["luxury", "residential", "marina"],
        amenities: ["gym", "pool", "parking", "security"],
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Singapore Business Hub",
        description: "Modern office complex in Singapore's premier business district with high rental yields.",
        shortDescription: "Modern office complex in Singapore CBD",
        location: "Singapore CBD, Singapore",
        category: "COMMERCIAL",
        propertyType: "OFFICE",
        roi: "15.20",
        minInvestment: 100000,
        targetAmount: 8000000,
        currentAmount: 8000000,
        status: "COMPLETE",
        featured: true,
        priority: 1,
        propertySize: 5000,
        bedrooms: null,
        bathrooms: 8,
        floors: 15,
        parkingSpaces: 20,
        expectedCompletionDate: "2023-06-30",
        monthlyRent: 50000,
        annualAppreciation: "7.50",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        gallery: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
        videoUrl: null,
        latitude: "1.3521",
        longitude: "103.8198",
        address: "Singapore CBD, Singapore",
        city: "Singapore",
        state: null,
        country: "Singapore",
        postalCode: "00000",
        constructionStartDate: "2022-01-01",
        constructionEndDate: "2023-06-30",
        tags: ["commercial", "office", "cbd"],
        amenities: ["parking", "security", "conference rooms"],
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "London Tech District",
        description: "Industrial warehouse facility with long-term lease agreements and stable returns.",
        shortDescription: "Industrial warehouse in London",
        location: "London, UK",
        category: "INDUSTRIAL",
        propertyType: "WAREHOUSE",
        roi: "8.75",
        minInvestment: 25000,
        targetAmount: 3000000,
        currentAmount: 1500000,
        status: "FUNDING",
        featured: false,
        priority: 0,
        propertySize: 10000,
        bedrooms: null,
        bathrooms: 2,
        floors: 1,
        parkingSpaces: 10,
        expectedCompletionDate: "2024-03-31",
        monthlyRent: 15000,
        annualAppreciation: "3.20",
        imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        gallery: ["https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
        videoUrl: null,
        latitude: "51.5074",
        longitude: "-0.1278",
        address: "London, UK",
        city: "London",
        state: null,
        country: "UK",
        postalCode: "00000",
        constructionStartDate: "2023-03-01",
        constructionEndDate: "2024-03-31",
        tags: ["industrial", "warehouse", "logistics"],
        amenities: ["loading dock", "security", "parking"],
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Petaro Pump",
        description: "A high-traffic petrol pump located on the main highway in Jamshoro, Pakistan. Fully operational and generating steady returns.",
        shortDescription: "High-traffic petrol pump in Jamshoro",
        location: "Jamshoro, Pakistan",
        category: "COMMERCIAL",
        propertyType: "RETAIL",
        roi: "28.76",
        minInvestment: 100000,
        targetAmount: 20000000,
        currentAmount: 20000000,
        status: "COMPLETE",
        featured: true,
        priority: 2,
        propertySize: 2000,
        bedrooms: null,
        bathrooms: 2,
        floors: 1,
        parkingSpaces: 5,
        expectedCompletionDate: "2022-12-31",
        monthlyRent: 25000,
        annualAppreciation: "12.50",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
        videoUrl: null,
        latitude: "25.4280",
        longitude: "68.2800",
        address: "Jamshoro, Pakistan",
        city: "Jamshoro",
        state: "Sindh",
        country: "Pakistan",
        postalCode: "00000",
        constructionStartDate: "2022-01-01",
        constructionEndDate: "2022-12-31",
        tags: ["petrol", "highway", "retail"],
        amenities: ["parking", "security", "convenience store"],
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "120 Sq. Yd. Banglow at Gulistan-e-Noor Mohammad",
        description: "A modern 120 square yard banglow in the heart of Hyderabad, currently under construction. 70% funded, estimated ROI up to 30% on completion.",
        shortDescription: "Modern banglow in Hyderabad",
        location: "Gulistan-e-Noor Mohammad, Hyderabad, Pakistan",
        category: "RESIDENTIAL",
        propertyType: "VILLA",
        roi: "30.00",
        minInvestment: 100000,
        targetAmount: 15000000,
        currentAmount: 10500000,
        status: "FUNDING",
        featured: false,
        priority: 0,
        propertySize: 1080,
        bedrooms: 4,
        bathrooms: 3,
        floors: 2,
        parkingSpaces: 2,
        expectedCompletionDate: "2024-06-30",
        monthlyRent: 12000,
        annualAppreciation: "15.00",
        imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        gallery: ["https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
        videoUrl: null,
        latitude: "25.3960",
        longitude: "68.3578",
        address: "Gulistan-e-Noor Mohammad, Hyderabad, Pakistan",
        city: "Hyderabad",
        state: "Sindh",
        country: "Pakistan",
        postalCode: "00000",
        constructionStartDate: "2023-06-01",
        constructionEndDate: "2024-06-30",
        tags: ["residential", "villa", "modern"],
        amenities: ["garden", "parking", "security"],
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "150 Sq. Yd. Banglow",
        description: "A completed 150 square yard banglow, waiting for sale. Excellent opportunity for capital appreciation.",
        shortDescription: "Completed banglow ready for sale",
        location: "Hyderabad, Pakistan",
        category: "RESIDENTIAL",
        propertyType: "VILLA",
        roi: "25.00",
        minInvestment: 100000,
        targetAmount: 18000000,
        currentAmount: 18000000,
        status: "WAITING_FOR_SALE",
        featured: false,
        priority: 0,
        propertySize: 1350,
        bedrooms: 5,
        bathrooms: 4,
        floors: 2,
        parkingSpaces: 3,
        expectedCompletionDate: "2023-12-31",
        monthlyRent: 15000,
        annualAppreciation: "18.00",
        imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        gallery: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
        videoUrl: null,
        latitude: "25.3960",
        longitude: "68.3578",
        address: "Hyderabad, Pakistan",
        city: "Hyderabad",
        state: "Sindh",
        country: "Pakistan",
        postalCode: "00000",
        constructionStartDate: "2023-01-01",
        constructionEndDate: "2023-12-31",
        tags: ["residential", "villa", "completed"],
        amenities: ["garden", "parking", "security", "pool"],
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleProjects.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id });
    });

    // Seed testimonials
    const sampleTestimonials: Omit<Testimonial, 'id'>[] = [
      {
        name: "PERVAIZ AHMMED",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        content: "SAIR REIT has revolutionized my investment strategy. The halal approach combined with excellent returns is exactly what I was looking for.",
        rating: 5,
        verified: true,
        featured: false,
        userId: null,
        projectId: null,
        investmentAmount: null,
        investmentDuration: null,
        location: "Dubai, UAE",
        createdAt: new Date(),
      },
      {
        name: "ABDUL AZIZ",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        content: "The transparency and real-time tracking give me complete confidence in my investments. I've seen consistent 12%+ returns month after month.",
        rating: 5,
        verified: true,
        featured: true,
        userId: null,
        projectId: null,
        investmentAmount: null,
        investmentDuration: null,
        location: "Singapore",
        createdAt: new Date(),
      },
      {
        name: "MAKHDOOM NAVEED",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        content: "Finally, a platform that combines cutting-edge technology with solid fundamentals. My portfolio has grown 35% since joining SAIR REIT.",
        rating: 5,
        verified: true,
        featured: false,
        userId: null,
        projectId: null,
        investmentAmount: null,
        investmentDuration: null,
        location: "London, UK",
        createdAt: new Date(),
      },
    ];

    sampleTestimonials.forEach(testimonial => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { ...testimonial, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      id,
      email: insertUser.email,
      password: insertUser.password,
      username: insertUser.username,
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null,
      phone: insertUser.phone ?? null,
      avatar: null,
      dateOfBirth: null,
      nationality: insertUser.nationality ?? null,
      kycVerified: false,
      isActive: true,
      lastLoginAt: null,
      preferences: insertUser.preferences ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      id,
      title: insertProject.title,
      description: insertProject.description,
      shortDescription: insertProject.shortDescription ?? null,
      location: insertProject.location,
      category: insertProject.category,
      propertyType: insertProject.propertyType,
      roi: insertProject.roi,
      minInvestment: insertProject.minInvestment,
      targetAmount: insertProject.targetAmount,
      currentAmount: insertProject.currentAmount ?? null,
      status: insertProject.status,
      featured: insertProject.featured ?? false,
      priority: insertProject.priority ?? 0,
      propertySize: insertProject.propertySize ?? null,
      bedrooms: insertProject.bedrooms ?? null,
      bathrooms: insertProject.bathrooms ?? null,
      floors: insertProject.floors ?? null,
      parkingSpaces: insertProject.parkingSpaces ?? null,
      expectedCompletionDate: insertProject.expectedCompletionDate ?? null,
      monthlyRent: insertProject.monthlyRent ?? null,
      annualAppreciation: insertProject.annualAppreciation ?? null,
      imageUrl: insertProject.imageUrl ?? null,
      gallery: insertProject.gallery ?? null,
      videoUrl: insertProject.videoUrl ?? null,
      latitude: insertProject.latitude ?? null,
      longitude: insertProject.longitude ?? null,
      address: insertProject.address ?? null,
      city: insertProject.city ?? null,
      state: insertProject.state ?? null,
      country: insertProject.country ?? null,
      postalCode: insertProject.postalCode ?? null,
      constructionStartDate: insertProject.constructionStartDate ?? null,
      constructionEndDate: insertProject.constructionEndDate ?? null,
      tags: insertProject.tags ?? null,
      amenities: insertProject.amenities ?? null,
      documents: insertProject.documents ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updates };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(inv => inv.userId === userId);
  }

  async getInvestmentsByProject(projectId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(inv => inv.projectId === projectId);
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const id = this.currentInvestmentId++;
    const investment: Investment = { 
      id,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: insertInvestment.userId ?? null,
      projectId: insertInvestment.projectId ?? null,
      amount: insertInvestment.amount,
      units: insertInvestment.units ?? null,
      returns: insertInvestment.returns ?? null,
      investmentDate: new Date(),
      expectedReturnDate: null,
      actualReturnDate: null,
      notes: null
    };
    this.investments.set(id, investment);
    return investment;
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(tx => tx.userId === userId);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = { 
      id,
      type: insertTransaction.type,
      status: insertTransaction.status,
      description: insertTransaction.description ?? null,
      createdAt: new Date(),
      userId: insertTransaction.userId ?? null,
      projectId: insertTransaction.projectId ?? null,
      amount: insertTransaction.amount,
      investmentId: insertTransaction.investmentId ?? null,
      paymentMethod: insertTransaction.paymentMethod ?? null,
      reference: insertTransaction.reference ?? null,
      fees: insertTransaction.fees ?? 0,
      netAmount: insertTransaction.netAmount ?? null,
      processedAt: insertTransaction.processedAt ?? null
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      id,
      name: insertTestimonial.name,
      avatar: insertTestimonial.avatar ?? null,
      content: insertTestimonial.content,
      rating: insertTestimonial.rating,
      location: insertTestimonial.location ?? null,
      featured: insertTestimonial.featured ?? null,
      createdAt: new Date(),
      verified: insertTestimonial.verified ?? null,
      userId: insertTestimonial.userId ?? null,
      projectId: insertTestimonial.projectId ?? null,
      investmentAmount: insertTestimonial.investmentAmount ?? null,
      investmentDuration: insertTestimonial.investmentDuration ?? null
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

import { DbStorage } from "./db-storage";

// Use PostgreSQL if DATABASE_URL is available, otherwise use in-memory storage
export const storage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();
