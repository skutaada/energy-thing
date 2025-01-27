import type { EnergyData } from "../dto/EnergyData";
import { db } from ".";
import { energyTable } from "./schema";
import { between } from "drizzle-orm";

export async function createEnergyData(data: EnergyData[]) {
  try {
    await db.insert(energyTable).values(data);
  } catch (error) {
    if (
      error instanceof Error &&
      !error.message.includes("UNIQUE constraint failed")
    ) {
      throw error;
    }
  }
}

export async function getEnergyDataByDate(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await db
    .select()
    .from(energyTable)
    .where(between(energyTable.date, startOfDay, endOfDay));
}
