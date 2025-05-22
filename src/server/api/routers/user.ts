import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
        userId: z.string().length(10).regex(/^\d+$/, "Must be exactly 10 digits"),
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user ID already exists
      const existingUser = await ctx.db
        .select()
        .from(users)
        .where(eq(users.userId, input.userId))
        .limit(1);

      if (existingUser.length > 0) {
        throw new Error("User ID already exists");
      }

      // Create new user
      await ctx.db.insert(users).values({
        id: input.clerkId,
        userId: input.userId,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
      });

      return { success: true };
    }),

  getByUserId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.userId, input))
        .limit(1);

      return user[0];
    }),
});
