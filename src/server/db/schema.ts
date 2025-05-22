// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator, varchar, timestamp } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `event-manage_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);

export const users = createTable(
  "user",
  (d) => ({
    id: d.varchar("id").primaryKey(), // Clerk user ID
    email: d.varchar("email", { length: 256 }).notNull().unique(),
    firstName: d.varchar("first_name", { length: 256 }).notNull(),
    lastName: d.varchar("last_name", { length: 256 }).notNull(),
    role: d.varchar("role", { length: 10 }).default("user").notNull(), // 'admin' or 'user'
    createdAt: d.timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  }),
);

export const events = createTable(
  "event",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.varchar("title", { length: 256 }).notNull(),
    description: d.varchar("description", { length: 1000 }),
    date: d.timestamp("date", { withTimezone: true }).notNull(),
    location: d.varchar("location", { length: 256 }).notNull(),
    organizerId: d.varchar("organizer_id").references(() => users.id).notNull(),
    status: d.varchar("status", { length: 20 }).default("upcoming").notNull(), // 'upcoming', 'ongoing', 'completed', 'cancelled'
    createdAt: d.timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: d.timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (table) => ({
    dateIdx: index("date_idx").on(table.date),
    organizerIdx: index("organizer_idx").on(table.organizerId),
    statusIdx: index("status_idx").on(table.status),
  }),
);
