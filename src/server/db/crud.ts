import type { EnergyData } from "../dto/EnergyData";
import { db } from ".";
import { energyTable } from "./schema";
import { like } from "drizzle-orm";

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

export async function getEnergyDataByDate(date: string): Promise<EnergyData[]> {
  const data = await db
    .select()
    .from(energyTable)
    .where(like(energyTable.date, `${date}%`));
  return data;
}
