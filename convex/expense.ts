import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateExpenseData = mutation({
  args: {
    amount: v.number(),
    month: v.string(),
    year: v.number(),
    field: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("expense", {
        amount: args.amount,
        month: args.month,
        year: args.year,
        field: args.field,
    });
  },
});

export const GetExpenseData = query({
    args: {},
    handler: async(ctx, args) => {
        return await ctx.db.query("expense").collect();
    },
});

export const FilterYearExpenseData = query({
  args: {
    year: v.optional(v.number()),
  },
  handler: async(ctx, args) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear;
    const currentYearString = currentYear.toString();
    const currentYearInt = parseInt(currentYearString);
    const year = args.year ?? 2025;

    const items = await ctx.db
      .query("expense")
      .withIndex("filter_year", (q) => q.eq("year", year)).order("desc").collect();

    return items;
  }
});