import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, leads, subscriptions, usageLogs, roiCalculations } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// ==================== LEAD OPERATIONS ====================

export async function createLead(lead: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(leads).values(lead);
  const leadId = result[0].insertId;
  
  const created = await db.select().from(leads).where(eq(leads.id, Number(leadId))).limit(1);
  return created[0];
}

export async function getLeadsByUserId(userId: number, limit = 100) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(leads)
    .where(eq(leads.userId, userId))
    .orderBy(desc(leads.createdAt))
    .limit(limit);
}

export async function updateLeadStatus(leadId: number, status: string, automationScore?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = { status, updatedAt: new Date() };
  if (automationScore !== undefined) {
    updateData.automationScore = automationScore;
  }

  await db.update(leads)
    .set(updateData)
    .where(eq(leads.id, leadId));
}

export async function getLeadStats(userId: number) {
  const db = await getDb();
  if (!db) return { total: 0, qualified: 0, converted: 0 };

  const userLeads = await db.select().from(leads).where(eq(leads.userId, userId));
  
  return {
    total: userLeads.length,
    qualified: userLeads.filter(l => l.status === "qualified").length,
    converted: userLeads.filter(l => l.status === "converted").length,
    conversionRate: userLeads.length > 0 
      ? Math.round((userLeads.filter(l => l.status === "converted").length / userLeads.length) * 100)
      : 0
  };
}

// ==================== SUBSCRIPTION OPERATIONS ====================

export async function getSubscriptionByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createSubscription(subscription: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(subscriptions).values(subscription);
  const subId = result[0].insertId;
  
  const created = await db.select().from(subscriptions)
    .where(eq(subscriptions.id, Number(subId)))
    .limit(1);
  
  return created[0];
}

export async function updateSubscriptionStatus(userId: number, status: string, plan?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = { status, updatedAt: new Date() };
  if (plan) updateData.plan = plan;

  await db.update(subscriptions)
    .set(updateData)
    .where(eq(subscriptions.userId, userId));
}

// ==================== USAGE LOG OPERATIONS ====================

export async function logUsage(log: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(usageLogs).values(log);
  const logId = result[0].insertId;
  
  const created = await db.select().from(usageLogs)
    .where(eq(usageLogs.id, Number(logId)))
    .limit(1);
  
  return created[0];
}

export async function getUserUsageStats(userId: number) {
  const db = await getDb();
  if (!db) return { totalActions: 0, totalCost: 0, successRate: 0 };

  const logs = await db.select().from(usageLogs).where(eq(usageLogs.userId, userId));
  
  const totalCost = logs.reduce((sum, log) => {
    const cost = parseFloat(log.costEstimate as any || "0");
    return sum + cost;
  }, 0);

  const successCount = logs.filter(l => l.success).length;
  const successRate = logs.length > 0 ? Math.round((successCount / logs.length) * 100) : 0;

  return {
    totalActions: logs.length,
    totalCost: totalCost.toFixed(2),
    successRate,
    lastAction: logs.length > 0 ? logs[0].createdAt : null
  };
}

// ==================== ROI CALCULATION OPERATIONS ====================

export async function createROICalculation(calc: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(roiCalculations).values(calc);
  const calcId = result[0].insertId;
  
  const created = await db.select().from(roiCalculations)
    .where(eq(roiCalculations.id, Number(calcId)))
    .limit(1);
  
  return created[0];
}

export async function getUserROICalculations(userId: number | null) {
  const db = await getDb();
  if (!db) return [];

  if (userId === null) {
    return db.select().from(roiCalculations)
      .orderBy(desc(roiCalculations.createdAt))
      .limit(100);
  }

  return db.select().from(roiCalculations)
    .where(eq(roiCalculations.userId, userId))
    .orderBy(desc(roiCalculations.createdAt))
    .limit(50);
}

// ==================== ANALYTICS OPERATIONS ====================

export async function getDashboardMetrics(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const subscription = await getSubscriptionByUserId(userId);
  const leadStats = await getLeadStats(userId);
  const usageStats = await getUserUsageStats(userId);

  return {
    subscription: subscription ? {
      plan: subscription.plan,
      status: subscription.status,
      monthlyPrice: subscription.monthlyPrice,
      leadsPerMonth: subscription.leadsPerMonth
    } : null,
    leads: leadStats,
    usage: usageStats,
    lastUpdated: new Date()
  };
}
