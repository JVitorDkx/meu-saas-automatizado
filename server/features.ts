import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createLead,
  getLeadsByUserId,
  updateLeadStatus,
  getLeadStats,
  getSubscriptionByUserId,
  createSubscription,
  updateSubscriptionStatus,
  logUsage,
  getUserUsageStats,
  createROICalculation,
  getUserROICalculations,
  getDashboardMetrics,
} from "./db";
import { invokeLLM } from "./_core/llm";

// ==================== LEAD ROUTER ====================

export const leadsRouter = router({
  // Create a new lead from form submission
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Create lead with userId = 0 for public submissions (will be assigned later)
        const lead = await createLead({
          userId: 0,
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          status: "new",
          automationScore: 0,
          metadata: {
            source: "public_form",
            submittedAt: new Date().toISOString(),
          },
        });

        // Log usage
        await logUsage({
          userId: 0,
          leadId: lead.id,
          action: "lead_created",
          details: { source: "public_form" },
          success: true,
        });

        return { success: true, leadId: lead.id };
      } catch (error) {
        console.error("Error creating lead:", error);
        throw new Error("Failed to create lead");
      }
    }),

  // Get leads for authenticated user
  list: protectedProcedure.query(async ({ ctx }) => {
    return getLeadsByUserId(ctx.user.id);
  }),

  // Get lead statistics
  stats: protectedProcedure.query(async ({ ctx }) => {
    return getLeadStats(ctx.user.id);
  }),

  // Update lead status (admin only)
  updateStatus: protectedProcedure
    .input(
      z.object({
        leadId: z.number(),
        status: z.enum(["new", "qualified", "contacted", "converted", "rejected"]),
        automationScore: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      await updateLeadStatus(input.leadId, input.status, input.automationScore);
      return { success: true };
    }),
});

// ==================== SUBSCRIPTION ROUTER ====================

export const subscriptionsRouter = router({
  // Get current subscription
  current: protectedProcedure.query(async ({ ctx }) => {
    return getSubscriptionByUserId(ctx.user.id);
  }),

  // Create subscription (after payment)
  create: protectedProcedure
    .input(
      z.object({
        plan: z.enum(["starter", "growth", "enterprise"]),
        monthlyPrice: z.string(),
        leadsPerMonth: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const subscription = await createSubscription({
        userId: ctx.user.id,
        plan: input.plan,
        status: "active",
        monthlyPrice: input.monthlyPrice,
        leadsPerMonth: input.leadsPerMonth,
        startDate: new Date(),
      });

      return subscription;
    }),

  // Update subscription status
  updateStatus: protectedProcedure
    .input(
      z.object({
        status: z.enum(["active", "canceled", "expired", "pending"]),
        plan: z.enum(["starter", "growth", "enterprise"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await updateSubscriptionStatus(ctx.user.id, input.status, input.plan);
      return { success: true };
    }),
});

// ==================== ROI CALCULATOR ROUTER ====================

export const roiRouter = router({
  // Calculate ROI based on user inputs
  calculate: publicProcedure
    .input(
      z.object({
        hoursPerDay: z.number().positive(),
        hourlyRate: z.number().positive(),
        conversionRate: z.number().min(0).max(100).optional(),
        averageTicket: z.number().positive(),
      })
    )
    .mutation(async ({ input }) => {
      // Calculate savings
      const hoursPerMonth = input.hoursPerDay * 22; // Working days
      const estimatedSavings = hoursPerMonth * input.hourlyRate;

      const conversionRate = input.conversionRate || 35; // Default 35%
      const leadsPerMonth = 100; // Assume 100 leads/month
      const qualifiedLeads = (leadsPerMonth * conversionRate) / 100;
      const estimatedMonthlySales = qualifiedLeads * input.averageTicket;

      // Save calculation
      const calculation = await createROICalculation({
        userId: null,
        hoursPerDay: input.hoursPerDay.toString(),
        hourlyRate: input.hourlyRate.toString(),
        estimatedSavings: estimatedSavings.toString(),
        conversionRate: conversionRate.toString(),
        averageTicket: input.averageTicket.toString(),
        estimatedMonthlySales: estimatedMonthlySales.toString(),
      });

      return {
        hourlyRate: input.hourlyRate,
        hoursPerMonth,
        estimatedSavings: Math.round(estimatedSavings),
        leadsPerMonth,
        qualifiedLeads: Math.round(qualifiedLeads),
        conversionRate,
        averageTicket: input.averageTicket,
        estimatedMonthlySales: Math.round(estimatedMonthlySales),
        roi: Math.round((estimatedMonthlySales / 2500) * 100), // Assuming R$ 2500/month service cost
      };
    }),

  // Get user's ROI calculations
  history: protectedProcedure.query(async ({ ctx }) => {
    return getUserROICalculations(ctx.user.id);
  }),
});

// ==================== ADMIN DASHBOARD ROUTER ====================

export const adminRouter = router({
  // Get dashboard metrics (admin only)
  metrics: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    return getDashboardMetrics(ctx.user.id);
  }),

  // Get all leads (admin only)
  allLeads: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // In production, this would paginate and filter
    return getLeadsByUserId(ctx.user.id, 1000);
  }),

  // Get usage statistics (admin only)
  usageStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    return getUserUsageStats(ctx.user.id);
  }),

  // Export leads as JSON (admin only)
  exportLeads: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const leads = await getLeadsByUserId(ctx.user.id, 10000);
    return {
      exportedAt: new Date().toISOString(),
      totalLeads: leads.length,
      data: leads,
    };
  }),
});

// ==================== AUTOMATION ANALYSIS ROUTER ====================

export const automationRouter = router({
  // Analyze a URL for automation opportunities
  analyzeUrl: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
        leadId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Use LLM to analyze URL for automation opportunities
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are an expert in business automation and lead qualification. 
              Analyze the given URL and provide:
              1. Automation Score (0-100): How much this business can benefit from lead automation
              2. Key Opportunities: Top 3 automation opportunities
              3. Estimated Lead Loss: Estimated percentage of leads lost due to slow response
              4. Recommendation: Whether they should use the service
              
              Respond in JSON format with these exact fields: automationScore, opportunities (array), estimatedLeadLoss, recommendation`,
            },
            {
              role: "user",
              content: `Analyze this URL for automation opportunities: ${input.url}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "automation_analysis",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  automationScore: {
                    type: "number",
                    description: "Score from 0-100",
                  },
                  opportunities: {
                    type: "array",
                    items: { type: "string" },
                    description: "Top 3 automation opportunities",
                  },
                  estimatedLeadLoss: {
                    type: "number",
                    description: "Percentage of leads lost",
                  },
                  recommendation: {
                    type: "string",
                    description: "Recommendation text",
                  },
                },
                required: [
                  "automationScore",
                  "opportunities",
                  "estimatedLeadLoss",
                  "recommendation",
                ],
                additionalProperties: false,
              },
            },
          },
        });

        const content = response.choices[0]?.message?.content;
        const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
        const analysis = JSON.parse(contentStr || "{}");

        // Update lead if provided
        if (input.leadId) {
          await updateLeadStatus(
            input.leadId,
            "qualified",
            analysis.automationScore
          );
          await logUsage({
            userId: 0,
            leadId: input.leadId,
            action: "lead_analyzed",
            details: analysis,
            success: true,
          });
        }

        return {
          success: true,
          analysis,
        };
      } catch (error) {
        console.error("Error analyzing URL:", error);
        return {
          success: false,
          error: "Failed to analyze URL",
          analysis: {
            automationScore: 0,
            opportunities: [],
            estimatedLeadLoss: 0,
            recommendation: "Unable to analyze",
          },
        };
      }
    }),
});
