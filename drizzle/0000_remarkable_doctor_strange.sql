CREATE TABLE "educational_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"excerpt" text,
	"type" text NOT NULL,
	"category" text NOT NULL,
	"difficulty" text NOT NULL,
	"duration" integer,
	"thumbnail" text,
	"video_url" text,
	"attachments" jsonb,
	"author" text,
	"featured" boolean DEFAULT false,
	"views" integer DEFAULT 0,
	"likes" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"category" text NOT NULL,
	"priority" integer DEFAULT 0,
	"tags" jsonb,
	"helpful" integer DEFAULT 0,
	"not_helpful" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "investments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"project_id" integer,
	"amount" integer NOT NULL,
	"units" integer DEFAULT 1,
	"returns" numeric(10, 2) DEFAULT '0',
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"investment_date" timestamp DEFAULT now(),
	"expected_return_date" date,
	"actual_return_date" date,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "market_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"location" text NOT NULL,
	"property_type" text NOT NULL,
	"average_price" integer,
	"average_rent" integer,
	"price_growth" numeric(5, 2),
	"rent_growth" numeric(5, 2),
	"vacancy_rate" numeric(5, 2),
	"market_trend" text,
	"data_date" date NOT NULL,
	"source" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"type" text NOT NULL,
	"read" boolean DEFAULT false,
	"action_url" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"short_description" text,
	"location" text NOT NULL,
	"category" text NOT NULL,
	"property_type" text NOT NULL,
	"roi" numeric(5, 2) NOT NULL,
	"min_investment" integer NOT NULL,
	"target_amount" integer NOT NULL,
	"current_amount" integer DEFAULT 0,
	"status" text NOT NULL,
	"featured" boolean DEFAULT false,
	"priority" integer DEFAULT 0,
	"property_size" integer,
	"bedrooms" integer,
	"bathrooms" integer,
	"floors" integer,
	"parking_spaces" integer,
	"expected_completion_date" date,
	"monthly_rent" integer,
	"annual_appreciation" numeric(5, 2),
	"image_url" text,
	"gallery" jsonb,
	"video_url" text,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"address" text,
	"city" text,
	"state" text,
	"country" text,
	"postal_code" text,
	"construction_start_date" date,
	"construction_end_date" date,
	"tags" jsonb,
	"amenities" jsonb,
	"documents" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"avatar" text,
	"content" text NOT NULL,
	"rating" integer NOT NULL,
	"verified" boolean DEFAULT false,
	"featured" boolean DEFAULT false,
	"user_id" integer,
	"project_id" integer,
	"investment_amount" integer,
	"investment_duration" text,
	"location" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"project_id" integer,
	"investment_id" integer,
	"amount" integer NOT NULL,
	"type" text NOT NULL,
	"status" text NOT NULL,
	"payment_method" text,
	"reference" text,
	"description" text,
	"fees" integer DEFAULT 0,
	"net_amount" integer,
	"processed_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"session_id" text NOT NULL,
	"user_agent" text,
	"ip_address" text,
	"device_type" text,
	"browser" text,
	"os" text,
	"country" text,
	"city" text,
	"started_at" timestamp DEFAULT now(),
	"ended_at" timestamp,
	"duration" integer,
	"pages_visited" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"phone" text,
	"avatar" text,
	"date_of_birth" date,
	"nationality" text,
	"kyc_verified" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"last_login_at" timestamp,
	"preferences" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "investments" ADD CONSTRAINT "investments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "investments" ADD CONSTRAINT "investments_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_investment_id_investments_id_fk" FOREIGN KEY ("investment_id") REFERENCES "public"."investments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;