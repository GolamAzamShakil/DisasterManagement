import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateVolunteerData = mutation({
  args: {
    id: v.number(),
    email: v.string(),
    userName: v.string(),
    status: v.string(),
    age: v.number(),
    mobileNumber: v.number(),
    assignedTask: v.string(),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("volunteer", {
        id: args.id,
        email: args.email,
        userName: args.userName,
        status: args.status,
        age: args.age,
        mobileNumber: args.mobileNumber,
        assignedTask: args.assignedTask,
        location: args.location,
    });
  },
});

export const GetVolunteerData = query({
    args: {},
    handler: async(ctx, args) => {
        return await ctx.db.query("volunteer").collect();
    },
});