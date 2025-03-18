import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query(async ({ db }) => {
  return await db.query("role").collect();
});

export const CreateRoleData = mutation({
  args: {
    email: v.string(),
    role: v.string(),
    userName: v.string(),
  },
  handler: async(ctx, args) => {
    await ctx.db.insert ("role",{
      email: args.email,
      role: args.role,
      userName: args.userName,
    });
  },
});

export const GetRolesData = query({
  args: {},
  handler: async(ctx, args) => {
    return await ctx.db.query("role").collect();
  },
});

export const GetAdminData = query({
  args: { },
  handler: async(ctx, args) => {
    //return await ctx.db.query("role").collect();
    const admin = await ctx.db.query("role").filter((q) => q.eq(q.field("role"), "Admin")).order("asc").collect();

    return admin;
  },
});