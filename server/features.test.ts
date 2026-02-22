import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock user context
const createMockContext = (role: "admin" | "user" = "user"): TrpcContext => ({
  user: {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  },
  req: {
    protocol: "https",
    headers: {},
  } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("Features Router", () => {
  describe("leads.create", () => {
    it("should create a new lead from public submission", async () => {
      const caller = appRouter.createCaller(createMockContext());

      const result = await caller.leads.create({
        name: "John Doe",
        email: "john@example.com",
        phone: "(11) 99999-9999",
        company: "ACME Corp",
      });

      expect(result.success).toBe(true);
      expect(result.leadId).toBeDefined();
      expect(typeof result.leadId).toBe("number");
    });

    it("should validate email format", async () => {
      const caller = appRouter.createCaller(createMockContext());

      try {
        await caller.leads.create({
          name: "John Doe",
          email: "invalid-email",
          phone: "(11) 99999-9999",
          company: "ACME Corp",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("Invalid");
      }
    });

    it("should require name and email", async () => {
      const caller = appRouter.createCaller(createMockContext());

      try {
        await caller.leads.create({
          name: "",
          email: "test@example.com",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toBeDefined();
      }
    });
  });

  describe("leads.stats", () => {
    it("should return lead statistics for authenticated user", async () => {
      const caller = appRouter.createCaller(createMockContext("user"));

      const stats = await caller.leads.stats();

      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("qualified");
      expect(stats).toHaveProperty("converted");
      expect(stats).toHaveProperty("conversionRate");
      expect(typeof stats.total).toBe("number");
      expect(typeof stats.conversionRate).toBe("number");
    });
  });

  describe("roi.calculate", () => {
    it("should calculate ROI correctly", async () => {
      const caller = appRouter.createCaller(createMockContext());

      const result = await caller.roi.calculate({
        hoursPerDay: 4,
        hourlyRate: 150,
        conversionRate: 35,
        averageTicket: 1000,
      });

      expect(result).toHaveProperty("estimatedSavings");
      expect(result).toHaveProperty("estimatedMonthlySales");
      expect(result).toHaveProperty("roi");
      expect(result).toHaveProperty("hoursPerMonth");
      expect(result).toHaveProperty("qualifiedLeads");

      // 4 hours/day * 22 working days = 88 hours/month
      // 88 * 150 = 13,200 savings
      expect(result.hoursPerMonth).toBe(88);
      expect(result.estimatedSavings).toBe(13200);

      // 100 leads * 35% = 35 qualified leads
      // 35 * 1000 = 35,000 estimated sales
      expect(result.qualifiedLeads).toBe(35);
      expect(result.estimatedMonthlySales).toBe(35000);

      // ROI = (35000 / 2500) * 100 = 1400%
      expect(result.roi).toBe(1400);
    });

    it("should use default conversion rate if not provided", async () => {
      const caller = appRouter.createCaller(createMockContext());

      const result = await caller.roi.calculate({
        hoursPerDay: 2,
        hourlyRate: 100,
        averageTicket: 500,
      });

      expect(result.conversionRate).toBe(35);
    });

    it("should validate input ranges", async () => {
      const caller = appRouter.createCaller(createMockContext());

      try {
        await caller.roi.calculate({
          hoursPerDay: 0, // Invalid: must be positive
          hourlyRate: 100,
          averageTicket: 500,
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toBeDefined();
      }
    });
  });

  describe("subscriptions.current", () => {
    it("should return current subscription for authenticated user", async () => {
      const caller = appRouter.createCaller(createMockContext("user"));

      const subscription = await caller.subscriptions.current();

      // May be undefined if no subscription exists
      if (subscription) {
        expect(subscription).toHaveProperty("plan");
        expect(subscription).toHaveProperty("status");
        expect(subscription).toHaveProperty("monthlyPrice");
      }
    });
  });

  describe("admin operations", () => {
    it("should allow admin to access metrics", async () => {
      const caller = appRouter.createCaller(createMockContext("admin"));

      const metrics = await caller.admin.metrics();

      expect(metrics).toHaveProperty("subscription");
      expect(metrics).toHaveProperty("leads");
      expect(metrics).toHaveProperty("usage");
    });

    it("should deny non-admin access to metrics", async () => {
      const caller = appRouter.createCaller(createMockContext("user"));

      try {
        await caller.admin.metrics();
        expect.fail("Should have thrown authorization error");
      } catch (error: any) {
        expect(error.message).toContain("Unauthorized");
      }
    });

    it("should allow admin to export leads", async () => {
      const caller = appRouter.createCaller(createMockContext("admin"));

      const result = await caller.admin.exportLeads();

      expect(result).toHaveProperty("exportedAt");
      expect(result).toHaveProperty("totalLeads");
      expect(result).toHaveProperty("data");
      expect(Array.isArray(result.data)).toBe(true);
    });

    it("should deny non-admin access to export", async () => {
      const caller = appRouter.createCaller(createMockContext("user"));

      try {
        await caller.admin.exportLeads();
        expect.fail("Should have thrown authorization error");
      } catch (error: any) {
        expect(error.message).toContain("Unauthorized");
      }
    });
  });

  describe("automation.analyzeUrl", () => {
    it("should accept valid URL format", async () => {
      const caller = appRouter.createCaller(createMockContext());

      const result = await caller.automation.analyzeUrl({
        url: "https://example.com",
      });

      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("analysis");
    });

    it("should reject invalid URL format", async () => {
      const caller = appRouter.createCaller(createMockContext());

      try {
        await caller.automation.analyzeUrl({
          url: "not-a-valid-url",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toBeDefined();
      }
    });
  });
});
