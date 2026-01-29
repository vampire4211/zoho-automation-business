DROP INDEX "posts_slug_unique";--> statement-breakpoint
DROP INDEX "projects_slug_unique";--> statement-breakpoint
ALTER TABLE `form_submissions` ALTER COLUMN "phone" TO "phone" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
ALTER TABLE `form_submissions` ALTER COLUMN "message" TO "message" text NOT NULL;--> statement-breakpoint
ALTER TABLE `form_submissions` ADD `secondary_email` text;--> statement-breakpoint
ALTER TABLE `form_submissions` ADD `whatsapp` text;--> statement-breakpoint
ALTER TABLE `form_submissions` ADD `services` text;--> statement-breakpoint
ALTER TABLE `form_submissions` DROP COLUMN `service`;