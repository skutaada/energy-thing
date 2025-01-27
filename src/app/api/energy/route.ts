import { NextResponse } from "next/server";
import { createEnergyData } from "~/server/db/crud";
import type { EnergyData } from "~/server/dto/EnergyData";

export async function GET(request: Request) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }
  const response = await fetch("https://apis.smartenergy.at/market/v1/price");
  const { data } = (await response.json()) as { data: EnergyData[] };
  const energyData = data.map((item) => ({
    date: item.date,
    value: Math.round(item.value * 1000),
  }));
  await createEnergyData(energyData);
  return NextResponse.json({ ok: true });
}
