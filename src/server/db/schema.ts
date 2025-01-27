import { int, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const energyTable = sqliteTable("energy_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull().unique(),
  value: int("value").notNull(),
});
