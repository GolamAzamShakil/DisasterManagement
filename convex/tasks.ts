import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {RateLimiter, HOUR} from "@convex-dev/rate-limiter";

export const get = query(async ({ db }) => {
  return await db.query("tasks").collect();
});

/* const LimitingTaskRate = new RateLimiter(components.rateLimiter, {
  CreateTaskData: {kind:"fixed window", rate: 5, period: HOUR},
}); */

export const CreateTaskData = mutation({
  args: {
    alert: v.boolean(),
    dangerLevel: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    viewable: v.boolean(),
  },
  handler: async(ctx, args) => {
    await ctx.db.insert ("tasks",{
      alert: args.alert,
      dangerLevel: args.dangerLevel,
      title: args.title,
      description: args.description,
      viewable: args.viewable,
    });
  },
});

export const GetTasksData = query({
  args: {},
  handler: async(ctx, args) => {
    return await ctx.db.query("tasks").collect();
  },
});