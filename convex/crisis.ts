import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/* export const  CreateData = mutation({
    args: {},
    handler: async(ctx, args) => {
        await ctx.db.insert ("",{});
    },
});

export const  ReadData = query({
    args: {},
    handler: async(ctx, args) => {
        return await ctx.db.query("").collect();
    },
}); */

export const CreateCrisisData = mutation({
  args: {
    id: v.number(),
    title: v.string(),
    description: v.optional(v.string()),
    location: v.string(),
    severity: v.string(),
    status: v.string(),
    help: v.optional(v.string()),
    viewable: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("crisis", {
      id: args.id,
      title: args.title,
      description: args.description,
      location: args.location,
      severity: args.severity,
      status: args.severity,
      help: args.help,
      viewable: args.viewable,
    });
  },
});

export const  GetCrisisData = query({
    args: {
      limit: v.optional(v.number()),
    ascending: v.optional(v.boolean()),
    },
    handler: async(ctx, args) => {
        return await ctx.db.query("crisis").collect();
    },
});

export const GetSevereCrisisData = query({
  args: { },
  handler: async(ctx, args) => {
    return await ctx.db.query("crisis").filter((q) => q.eq(q.field("severity"), "third")).order("asc").collect();
  },
});

/* export const FilterData = query({
  args: {
    limit: v.optional(v.number()),
    ascending: v.optional(v.boolean()),
  },
  handler: async(ctx, args) => {
    const order = args.ascending ? "asc" : "desc";
    const limit = args.limit ?? 10;

    const items = await ctx.db
      .query("")
      .withIndex("filter_")
      .order(order)
      .take(limit);

    return items;
  }
}); */

/* For non-indexed Data
const items = await ctx.db.query("items").collect();
    return items.sort((a, b) => b.score - a.score).slice(0, 10); */

export const FilterSevereCrisisData = query({
  args: {
    limit: v.optional(v.number()),
    ascending: v.optional(v.boolean()),
  },
  handler: async(ctx, args) => {
    const order = args.ascending ? "asc" : "desc";
    const limit = args.limit ?? 10;

    const items = await ctx.db
      .query("crisis")
      .withIndex("filter_severity")
      .order(order)
      .take(limit);

    return items;
  }
});

export const FilterStatusCrisisData = query({
  args: {
    limit: v.optional(v.number()),
    ascending: v.optional(v.boolean()),
  },
  handler: async(ctx, args) => {
    const order = args.ascending ? "asc" : "desc";
    const limit = args.limit ?? 10;

    const items = await ctx.db
      .query("crisis")
      .withIndex("filter_status")
      .order(order)
      .take(limit);

    return items;
  }
});

export const FilterViewableCrisisData = query({
  args: {
    limit: v.optional(v.number()),
    ascending: v.optional(v.boolean()),
  },
  handler: async(ctx, args) => {
    const order = args.ascending ? "asc" : "desc";
    const limit = args.limit ?? 20;

    const items = await ctx.db
      .query("crisis")
      .withIndex("filter_viewable")
      .order(order)
      .take(limit);

    return items;
  }
});