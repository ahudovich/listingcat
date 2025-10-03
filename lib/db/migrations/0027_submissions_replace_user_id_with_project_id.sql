ALTER TABLE "directory_submissions" DROP CONSTRAINT "directory_submissions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" DROP CONSTRAINT "launch_platform_submissions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "directory_submissions" ADD COLUMN "project_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" ADD COLUMN "project_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "directory_submissions" ADD CONSTRAINT "directory_submissions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" ADD CONSTRAINT "launch_platform_submissions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "directory_submissions" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "directory_submissions" ADD CONSTRAINT "project_directory_unique" UNIQUE("project_id","directory_id");--> statement-breakpoint
ALTER TABLE "launch_platform_submissions" ADD CONSTRAINT "project_launch_platform_unique" UNIQUE("project_id","launch_platform_id");
