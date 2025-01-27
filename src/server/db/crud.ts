import type { EnergyData } from "../dto/EnergyData";
import { db } from ".";
import { energyTable } from "./schema";
import { like } from "drizzle-orm";
import { NeonDbError } from "@neondatabase/serverless";

export async function createEnergyData(data: EnergyData[]) {
  try {
    await db.insert(energyTable).values(data);
  } catch (error) {
    if (
      error instanceof NeonDbError &&
      error.constraint !== "energy-thing_energy_table_date_unique"
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
