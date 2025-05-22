import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Annual University Fair",
    description: "Join us for the annual university fair featuring all departments",
    date: new Date("2025-06-15T10:00:00Z"),
    location: "Main Campus Grounds",
    organizerId: "user_123",
    status: "upcoming",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "Engineering Department Symposium",
    description: "A showcase of the latest research from our engineering students",
    date: new Date("2025-07-10T09:00:00Z"),
    location: "Engineering Building, Room 101",
    organizerId: "user_456",
    status: "upcoming",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(() => {
      // Return mock events instead of querying the database
      return mockEvents;
    }),

  create: publicProcedure
    .input(z.object({
      title: z.string().min(1).max(256),
      description: z.string().max(1000).optional(),
      date: z.date(),
      location: z.string().min(1).max(256),
      status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).default('upcoming'),
    }))
    .mutation(({ input }) => {
      // Create a new mock event with description defaulting to empty string if not provided
      const newEvent = {
        id: mockEvents.length + 1,
        title: input.title,
        description: input.description || "", // Ensure description is never undefined
        date: input.date,
        location: input.location,
        status: input.status,
        organizerId: "user_" + Math.random().toString(36).substring(2, 15),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Add to mock events array
      mockEvents.push(newEvent);
      
      return { success: true, event: newEvent };
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
    .mutation(({ input }) => {
      const { id, ...updateData } = input;
      
      // Find the event to update
      const eventIndex = mockEvents.findIndex(event => event.id === id);
      
      if (eventIndex === -1) {
        throw new Error('Event not found');
      }
      
      // We've already checked that eventIndex !== -1, so this event must exist
      const existingEvent = mockEvents[eventIndex];
      
      // TypeScript needs this additional check to be sure existingEvent is defined
      if (!existingEvent) {
        throw new Error('Event not found');
      }
      
      // Update the event with explicit type safety
      mockEvents[eventIndex] = {
        id: existingEvent.id, // Ensure id is explicitly included
        title: updateData.title || existingEvent.title,
        description: updateData.description || existingEvent.description,
        date: updateData.date || existingEvent.date,
        location: updateData.location || existingEvent.location,
        organizerId: existingEvent.organizerId, // Ensure organizerId is explicitly included
        status: updateData.status || existingEvent.status,
        createdAt: existingEvent.createdAt, // Ensure createdAt is explicitly included
        updatedAt: new Date()
      };
      
      return { success: true, event: mockEvents[eventIndex] };
    }),

  delete: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(({ input }) => {
      // Find the event to delete
      const eventIndex = mockEvents.findIndex(event => event.id === input.id);
      
      if (eventIndex === -1) {
        throw new Error('Event not found');
      }
      
      // Remove the event
      mockEvents.splice(eventIndex, 1);
      
      return { success: true };
    }),
});
