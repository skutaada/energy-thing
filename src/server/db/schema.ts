import { integer, pgTableCreator, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `energy-thing_${name}`);

export const energyTable = createTable("energy_table", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  date: timestamp("date").notNull(),
  value: integer("value").notNull(),
});
