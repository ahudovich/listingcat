CREATE TYPE "public"."directory_type" AS ENUM('General', 'Showcase', 'Marketplace');--> statement-breakpoint
ALTER TABLE "directories" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "launch_platforms" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."product_category";--> statement-breakpoint
CREATE TYPE "public"."product_category" AS ENUM('AI Tools', 'Anything', 'Boilerplates', 'Dev Tools', 'Directories', 'Open Source');--> statement-breakpoint
ALTER TABLE "directories" ALTER COLUMN "category" SET DATA TYPE "public"."product_category" USING "category"::"public"."product_category";--> statement-breakpoint
ALTER TABLE "launch_platforms" ALTER COLUMN "category" SET DATA TYPE "public"."product_category" USING "category"::"public"."product_category";--> statement-breakpoint
ALTER TABLE "directories" ADD COLUMN "type" "directory_type" DEFAULT 'General';