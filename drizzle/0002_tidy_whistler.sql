CREATE TABLE `about_sections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`image_data` text NOT NULL,
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
--> statement-breakpoint
CREATE TABLE `newsletter_subscribers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`visitor_id` text,
	`subscribed_at` integer DEFAULT (strftime('%s', 'now')),
	`source` text,
	`status` text DEFAULT 'active'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `newsletter_subscribers_email_unique` ON `newsletter_subscribers` (`email`);--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visitor_id` text NOT NULL,
	`path` text NOT NULL,
	`referrer` text,
	`user_agent` text,
	`ip_hash` text,
	`country` text,
	`city` text,
	`device` text,
	`timestamp` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `visit_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visitor_id` text NOT NULL,
	`session_start` integer NOT NULL,
	`session_end` integer NOT NULL,
	`duration_seconds` integer NOT NULL,
	`pages_viewed` integer DEFAULT 1,
	`entry_page` text,
	`exit_page` text,
	`device` text,
	`source` text
);
--> statement-breakpoint
CREATE TABLE `visitor_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visitor_id` text NOT NULL,
	`first_visit` integer DEFAULT (strftime('%s', 'now')),
	`last_visit` integer DEFAULT (strftime('%s', 'now')),
	`total_visits` integer DEFAULT 1,
	`total_page_views` integer DEFAULT 0,
	`email` text,
	`source` text,
	`ip_hash` text,
	`session_duration` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `visitor_sessions_visitor_id_unique` ON `visitor_sessions` (`visitor_id`);--> statement-breakpoint
ALTER TABLE `posts` ADD `featured_image` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `gallery_images` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `video_urls` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `tags` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `author` text DEFAULT 'J&P Team';--> statement-breakpoint
ALTER TABLE `posts` ADD `view_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `projects` ADD `featured_image` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `gallery_images` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `demo_url` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `github_url` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `live_url` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `technologies` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `challenges` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `solutions` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `results` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `view_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `projects` ADD `created_at` integer DEFAULT (strftime('%s', 'now'));