CREATE TABLE `about_sections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`image_url` text NOT NULL,
	`display_order` integer NOT NULL,
	`reverse` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `job_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`positions` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
