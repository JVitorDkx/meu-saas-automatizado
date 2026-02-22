import { 
  int, 
  mysqlEnum, 
  mysqlTable, 
  text, 
  timestamp, 
  varchar,
  decimal,
  json,
  boolean
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads table: Stores lead information captured from forms
 * Tracks lead data, automation status, and qualification scores
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 255 }),
  automationScore: int("automationScore").default(0), // 0-100 score
  status: mysqlEnum("status", ["new", "qualified", "contacted", "converted", "rejected"]).default("new").notNull(),
  notes: text("notes"),
  metadata: json("metadata"), // Store additional data like source, utm params, etc
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Subscriptions table: Tracks customer plans and billing
 * Manages subscription status, plan type, and expiration dates
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  plan: mysqlEnum("plan", ["starter", "growth", "enterprise"]).default("starter").notNull(),
  status: mysqlEnum("status", ["active", "canceled", "expired", "pending"]).default("pending").notNull(),
  monthlyPrice: decimal("monthlyPrice", { precision: 10, scale: 2 }).notNull(), // R$ value
  leadsPerMonth: int("leadsPerMonth").default(50),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  startDate: timestamp("startDate").defaultNow().notNull(),
  renewalDate: timestamp("renewalDate"),
  canceledAt: timestamp("canceledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Usage logs table: Tracks platform usage for analytics and billing
 * Records each lead analysis, API call, and feature usage
 */
export const usageLogs = mysqlTable("usageLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  leadId: int("leadId"),
  action: varchar("action", { length: 100 }).notNull(), // "lead_created", "lead_analyzed", "api_call", etc
  details: json("details"), // Store action-specific data
  costEstimate: decimal("costEstimate", { precision: 10, scale: 4 }).default("0"), // Cost in R$
  success: boolean("success").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UsageLog = typeof usageLogs.$inferSelect;
export type InsertUsageLog = typeof usageLogs.$inferInsert;

/**
 * ROI Calculator History: Stores ROI calculations for analytics
 * Tracks when users use the ROI calculator and their inputs
 */
export const roiCalculations = mysqlTable("roiCalculations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  hoursPerDay: decimal("hoursPerDay", { precision: 5, scale: 2 }).notNull(),
  hourlyRate: decimal("hourlyRate", { precision: 10, scale: 2 }).notNull(), // R$ per hour
  estimatedSavings: decimal("estimatedSavings", { precision: 15, scale: 2 }).notNull(), // Monthly savings
  conversionRate: decimal("conversionRate", { precision: 5, scale: 2 }).default("35"), // % of leads converted
  averageTicket: decimal("averageTicket", { precision: 10, scale: 2 }).notNull(), // R$ per sale
  estimatedMonthlySales: decimal("estimatedMonthlySales", { precision: 15, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ROICalculation = typeof roiCalculations.$inferSelect;
export type InsertROICalculation = typeof roiCalculations.$inferInsert;