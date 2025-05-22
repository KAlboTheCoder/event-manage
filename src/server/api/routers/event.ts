import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { events, users } from "~/server/db/schema";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      try {
        // Check if db is available
        if (!ctx.db) {
          throw new Error('Database connection not available');
        }
        
        const allEvents = await ctx.db.query.events.findMany({
          orderBy: (events, { desc }) => [desc(events.date)],
        });
        
        return allEvents || [];
      } catch (error) {
        console.error('Error fetching events:', error);
        // Return empty array instead of throwing to prevent client-side errors
        return [];
      }
    }),

  create: publicProcedure
    .input(z.object({
      title: z.string().min(1).max(256),
      description: z.string().max(1000).optional(),
      date: z.date(),
      location: z.string().min(1).max(256),
      status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).default('upcoming'),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if db is available
        if (!ctx.db) {
          throw new Error('Database connection not available');
        }
        
        // Since we're using publicProcedure, we need to handle authentication manually
        // For now, we'll allow any user to create events
        // In a real app, you would check the user's session/token from the headers
        
        // Generate a random organizerId for now
        const organizerId = "user_" + Math.random().toString(36).substring(2, 15);
        
        return ctx.db.insert(events).values({
          ...input,
          organizerId,
        });
      } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Failed to create event. Please try again.');
      }
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).max(256),
      description: z.string().max(1000).optional(),
      date: z.date(),
      location: z.string().min(1).max(256),
      status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if db is available
        if (!ctx.db) {
          throw new Error('Database connection not available');
        }
        
        // Since we're using publicProcedure, we need to handle authentication manually
        // For now, we'll allow any user to update events
        // In a real app, you would check the user's session/token from the headers

        const { id, ...updateData } = input;
        return ctx.db.update(events)
          .set({
            ...updateData,
            updatedAt: new Date(),
          })
          .where(eq(events.id, id));
      } catch (error) {
        console.error('Error updating event:', error);
        throw new Error('Failed to update event. Please try again.');
      }
    }),

  delete: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if db is available
        if (!ctx.db) {
          throw new Error('Database connection not available');
        }
        
        // Since we're using publicProcedure, we need to handle authentication manually
        // For now, we'll allow any user to delete events
        // In a real app, you would check the user's session/token from the headers

        return ctx.db.delete(events)
          .where(eq(events.id, input.id));
      } catch (error) {
        console.error('Error deleting event:', error);
        throw new Error('Failed to delete event. Please try again.');
      }
    }),
});
