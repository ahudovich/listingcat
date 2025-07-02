CREATE TABLE "table_updates" (
	"table_name" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "benefits" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."benefit";--> statement-breakpoint
CREATE TYPE "public"."benefit" AS ENUM('pro-access');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "benefits" SET DATA TYPE "public"."benefit"[] USING "benefits"::"public"."benefit"[];
