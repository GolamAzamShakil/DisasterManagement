import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query(async ({ db }) => {
  return await db.query("donation").collect();
});

export const CreateDonationData = mutation({
  args: {
    amount: v.number(),
    month: v.string(),
    year: v.number(),
    donar: v.optional(v.string()),
  },
  handler: async(ctx, args) => {
    await ctx.db.insert ("donation",{
      amount: args.amount,
      donar: args.donar,
      month: args.month,
      year: args.year,
    });
  },
});

export const GetDonationData = query({
  args: {},
  handler: async(ctx, args) => {
    return await ctx.db.query("donation").collect();
  },
});

export const FilterYearDonationData = query({
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
      .query("donation")
      .withIndex("filter_year", (q) => q.eq("year", year)).collect();

    return items;
  }
});


/* export const getDataByYearPaginated = query({
  args: {
    year: v.number(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const year = args.year;
    
    const startDate = new Date(`${year}-01-01`).toISOString();
    const endDate = new Date(`${year + 1}-01-01`).toISOString();
    
    return await ctx.db
      .query("yourTable")
      .withIndex("by_date", (q) => 
        q.gte("date", startDate).lt("date", endDate)
      )
      .paginate(args.paginationOpts);
  },
}); */