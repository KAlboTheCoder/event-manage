import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if email already exists
      const existingUser = await ctx.db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (existingUser.length > 0) {
        throw new Error("Email already exists");
      }

      // Create new user
      await ctx.db.insert(users).values({
        id: input.clerkId,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
      });

      return { success: true };
    }),

  getByClerkId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, input))
        .limit(1);

      return user[0];
    }),
});
