CREATE TYPE "public"."directory_type" AS ENUM('General', 'Showcase', 'Marketplace');--> statement-breakpoint
CREATE TYPE "public"."link_attribute" AS ENUM('dofollow', 'nofollow', 'ugc', 'sponsored', 'dynamic', 'mixed');--> statement-breakpoint
CREATE TYPE "public"."pricing_model" AS ENUM('free', 'paid', 'mixed');--> statement-breakpoint
CREATE TYPE "public"."product_category" AS ENUM('AI Tools', 'Anything', 'Boilerplates', 'Dev Tools', 'Directories', 'Open Source');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('pending', 'submitted', 'rejected', 'approved');--> statement-breakpoint
CREATE TYPE "public"."submission_type" AS ENUM('user');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "directories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"name" text NOT NULL,
	"website_url" text NOT NULL,
	"type" "directory_type" DEFAULT 'General',
	"category" "product_category" NOT NULL,
	"category_notes" text,
	"dr" smallint NOT NULL,
	"traffic" integer NOT NULL,
	"spam_score" smallint,
	"web_analytics_url" text,
	"pricing_model" "pricing_model" NOT NULL,
	"pricing_info" text,
	"pricing_url" text,
	"link_attribute" "link_attribute" NOT NULL,
	"link_attribute_notes" text,
	"is_account_required" boolean NOT NULL,
	"submit_url" text,
	"submission_notes" text,
	CONSTRAINT "directories_name_unique" UNIQUE("name"),
	CONSTRAINT "directories_websiteUrl_unique" UNIQUE("website_url"),
	CONSTRAINT "directories_webAnalyticsUrl_unique" UNIQUE("web_analytics_url"),
	CONSTRAINT "directories_submitUrl_unique" UNIQUE("submit_url")
);
--> statement-breakpoint
CREATE TABLE "directory_submissions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"listing_url" text,
	"status" "submission_status" DEFAULT 'pending' NOT NULL,
	"type" "submission_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"project_id" uuid NOT NULL,
	"directory_id" uuid NOT NULL,
	CONSTRAINT "project_directory_unique" UNIQUE("project_id","directory_id")
);
--> statement-breakpoint
CREATE TABLE "launch_platform_submissions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"listing_url" text,
	"status" "submission_status" DEFAULT 'pending' NOT NULL,
	"type" "submission_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"project_id" uuid NOT NULL,
	"launch_platform_id" uuid NOT NULL,
	CONSTRAINT "project_launch_platform_unique" UNIQUE("project_id","launch_platform_id")
);
--> statement-breakpoint
CREATE TABLE "launch_platforms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"name" text NOT NULL,
	"website_url" text NOT NULL,
	"category" "product_category" NOT NULL,
	"dr" smallint NOT NULL,
	"traffic" integer NOT NULL,
	"web_analytics_url" text,
	"pricing_model" "pricing_model" NOT NULL,
	"pricing_info" text,
	"pricing_url" text,
	"link_attribute" "link_attribute" NOT NULL,
	"link_attribute_notes" text,
	"is_account_required" boolean NOT NULL,
	"submit_url" text,
	CONSTRAINT "launch_platforms_name_unique" UNIQUE("name"),
	CONSTRAINT "launch_platforms_websiteUrl_unique" UNIQUE("website_url"),
	CONSTRAINT "launch_platforms_webAnalyticsUrl_unique" UNIQUE("web_analytics_url"),
	CONSTRAINT "launch_platforms_submitUrl_unique" UNIQUE("submit_url")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"website_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "user_slug_unique" UNIQUE("user_id","slug"),
	CONSTRAINT "user_website_url_unique" UNIQUE("user_id","website_url"),
	CONSTRAINT "name_length" CHECK (LENGTH(name) <= 60)
);
--> statement-breakpoint
CREATE TABLE "resource_requests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "resource_requests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text,
	"website_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "directory_submissions" ADD CONSTRAINT "directory_submissions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "directory_submissions" ADD CONSTRAINT "directory_submissions_directory_id_directories_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" ADD CONSTRAINT "launch_platform_submissions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" ADD CONSTRAINT "launch_platform_submissions_launch_platform_id_launch_platforms_id_fk" FOREIGN KEY ("launch_platform_id") REFERENCES "public"."launch_platforms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;