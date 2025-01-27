import { integer, pgTableCreator, text } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `energy-thing_${name}`);

export const energyTable = createTable("energy_table", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  date: text("date").notNull(),
  value: integer("value").notNull(),
});
