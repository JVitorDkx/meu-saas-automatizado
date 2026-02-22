CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`company` varchar(255),
	`automationScore` int DEFAULT 0,
	`status` enum('new','qualified','contacted','converted','rejected') NOT NULL DEFAULT 'new',
	`notes` text,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roiCalculations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`hoursPerDay` decimal(5,2) NOT NULL,
	`hourlyRate` decimal(10,2) NOT NULL,
	`estimatedSavings` decimal(15,2) NOT NULL,
	`conversionRate` decimal(5,2) DEFAULT '35',
	`averageTicket` decimal(10,2) NOT NULL,
	`estimatedMonthlySales` decimal(15,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `roiCalculations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`plan` enum('starter','growth','enterprise') NOT NULL DEFAULT 'starter',
	`status` enum('active','canceled','expired','pending') NOT NULL DEFAULT 'pending',
	`monthlyPrice` decimal(10,2) NOT NULL,
	`leadsPerMonth` int DEFAULT 50,
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`startDate` timestamp NOT NULL DEFAULT (now()),
	`renewalDate` timestamp,
	`canceledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptions_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `usageLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`leadId` int,
	`action` varchar(100) NOT NULL,
	`details` json,
	`costEstimate` decimal(10,4) DEFAULT '0',
	`success` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `usageLogs_id` PRIMARY KEY(`id`)
);
