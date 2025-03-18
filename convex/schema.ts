import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  donation: defineTable({
    amount: v.number(),
    month: v.string(),
    year: v.number(),
    donar: v.optional(v.string()),
  }).index("filter_year", ["year"]),
  expense: defineTable({
    amount: v.number(),
    month: v.string(),
    year: v.number(),
    field: v.optional(v.string()),
  }).index("filter_year", ["year"]),
  role: defineTable({
    email: v.string(),
    role: v.string(),
    userName: v.string(),
  }),
  crisis: defineTable({
    id: v.number(),
    title: v.string(),
    description: v.optional(v.string()),
    location: v.string(),
    severity: v.string(),
    status: v.string(),
    help: v.optional(v.string()),
    viewable: v.boolean(),
  }).index("filter_severity", ["severity"]).index("filter_status", ["status"]).index("filter_viewable", ["viewable"]),
  tasks: defineTable({
    alert: v.boolean(),
    dangerLevel: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    viewable: v.boolean(),
  }).index("filter_viewable", ["viewable"]),
  volunteer: defineTable({
    id: v.number(),
    email: v.string(),
    userName: v.string(),
    status: v.string(),
    age: v.number(),
    mobileNumber: v.number(),
    assignedTask: v.string(),
    location: v.optional(v.string()),
  }).index("filter_status", ["status"]).index("filter_task",["assignedTask"]),
});