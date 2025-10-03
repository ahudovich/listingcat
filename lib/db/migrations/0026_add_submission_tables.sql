CREATE TYPE "public"."submission_status" AS ENUM('pending', 'submitted', 'rejected', 'approved');--> statement-breakpoint
CREATE TYPE "public"."submission_type" AS ENUM('user');--> statement-breakpoint
CREATE TABLE "directory_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_url" text,
	"status" "submission_status" DEFAULT 'pending' NOT NULL,
	"type" "submission_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"user_id" text NOT NULL,
	"directory_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "launch_platform_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_url" text,
	"status" "submission_status" DEFAULT 'pending' NOT NULL,
	"type" "submission_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"user_id" text NOT NULL,
	"launch_platform_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "directory_submissions" ADD CONSTRAINT "directory_submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "directory_submissions" ADD CONSTRAINT "directory_submissions_directory_id_directories_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" ADD CONSTRAINT "launch_platform_submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" ADD CONSTRAINT "launch_platform_submissions_launch_platform_id_launch_platforms_id_fk" FOREIGN KEY ("launch_platform_id") REFERENCES "public"."launch_platforms"("id") ON DELETE cascade ON UPDATE no action;