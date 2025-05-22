import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { events } from "~/server/db/schema";

export const eventRouter = createTRPCRouter({
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const allEvents = await ctx.db.query.events.findMany({
        orderBy: (events, { desc }) => [desc(events.date)],
      });
      return allEvents;
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1).max(256),
      description: z.string().max(1000).optional(),
      date: z.date(),
      location: z.string().min(1).max(256),
      status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).default('upcoming'),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.auth.userId),
      });

      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized. Only admins can create events.');
      }

      return ctx.db.insert(events).values({
        ...input,
        organizerId: ctx.auth.userId,
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).max(256),
      description: z.string().max(1000).optional(),
      date: z.date(),
      location: z.string().min(1).max(256),
      status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.auth.userId),
      });

      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized. Only admins can update events.');
      }

      const { id, ...updateData } = input;
      return ctx.db.update(events)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(events.id, id));
    }),

  delete: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.auth.userId),
      });

      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized. Only admins can delete events.');
      }

      return ctx.db.delete(events)
        .where(eq(events.id, input.id));
    }),
});
