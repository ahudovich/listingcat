CREATE TYPE "public"."benefit" AS ENUM('database-access');--> statement-breakpoint
CREATE TYPE "public"."link_attribute" AS ENUM('dofollow', 'nofollow', 'ugc', 'sponsored', 'dynamic', 'mixed');--> statement-breakpoint
CREATE TYPE "public"."pricing_model" AS ENUM('free', 'paid', 'mixed');--> statement-breakpoint
CREATE TYPE "public"."product_category" AS ENUM('AI Tools', 'Anything', 'Boilerplates', 'Dev Tools', 'Directories', 'Open Source');--> statement-breakpoint
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
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"benefits" "benefit"[],
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "directories" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"name" text NOT NULL,
	"category" "product_category" NOT NULL,
	"category_notes" text,
	"website_url" text NOT NULL,
	"dr" smallint NOT NULL,
	"as" smallint NOT NULL,
	"da" smallint NOT NULL,
	"traffic" integer NOT NULL,
	"web_analytics_url" text,
	"pricing_model" "pricing_model" NOT NULL,
	"pricing_info" text,
	"link_attribute" "link_attribute" NOT NULL,
	"link_attribute_notes" text,
	"is_account_required" boolean NOT NULL,
	"submit_url" text,
	CONSTRAINT "directories_name_unique" UNIQUE("name"),
	CONSTRAINT "directories_websiteUrl_unique" UNIQUE("website_url"),
	CONSTRAINT "directories_webAnalyticsUrl_unique" UNIQUE("web_analytics_url"),
	CONSTRAINT "directories_submitUrl_unique" UNIQUE("submit_url")
);
--> statement-breakpoint
CREATE TABLE "launch_platforms" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"name" text NOT NULL,
	"category" "product_category" NOT NULL,
	"website_url" text NOT NULL,
	"dr" smallint NOT NULL,
	"as" smallint NOT NULL,
	"da" smallint NOT NULL,
	"traffic" integer NOT NULL,
	"web_analytics_url" text,
	"pricing_model" "pricing_model" NOT NULL,
	"pricing_info" text,
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
CREATE TABLE "marketplaces" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"name" text NOT NULL,
	"category" "product_category" NOT NULL,
	"website_url" text NOT NULL,
	"dr" smallint NOT NULL,
	"as" smallint NOT NULL,
	"da" smallint NOT NULL,
	"traffic" integer NOT NULL,
	"web_analytics_url" text,
	"pricing_model" "pricing_model" NOT NULL,
	"pricing_info" text,
	"link_attribute" "link_attribute" NOT NULL,
	"link_attribute_notes" text,
	"is_account_required" boolean NOT NULL,
	"submit_url" text,
	CONSTRAINT "marketplaces_name_unique" UNIQUE("name"),
	CONSTRAINT "marketplaces_websiteUrl_unique" UNIQUE("website_url"),
	CONSTRAINT "marketplaces_webAnalyticsUrl_unique" UNIQUE("web_analytics_url"),
	CONSTRAINT "marketplaces_submitUrl_unique" UNIQUE("submit_url")
);
--> statement-breakpoint
CREATE TABLE "showcases" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"name" text NOT NULL,
	"category" "product_category" NOT NULL,
	"category_notes" text,
	"website_url" text NOT NULL,
	"dr" smallint NOT NULL,
	"as" smallint NOT NULL,
	"da" smallint NOT NULL,
	"traffic" integer NOT NULL,
	"web_analytics_url" text,
	"pricing_model" "pricing_model" NOT NULL,
	"pricing_info" text,
	"link_attribute" "link_attribute" NOT NULL,
	"link_attribute_notes" text,
	"is_account_required" boolean NOT NULL,
	"submit_url" text,
	CONSTRAINT "showcases_name_unique" UNIQUE("name"),
	CONSTRAINT "showcases_websiteUrl_unique" UNIQUE("website_url"),
	CONSTRAINT "showcases_webAnalyticsUrl_unique" UNIQUE("web_analytics_url"),
	CONSTRAINT "showcases_submitUrl_unique" UNIQUE("submit_url")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;