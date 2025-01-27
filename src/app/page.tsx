import EnergyCostsChart from "~/components/layout/EnergyCostsChart";
import { getEnergyDataByDate } from "~/server/db/crud";

export default async function Home() {
  const currentDate = new Date();
  const data = await getEnergyDataByDate(currentDate);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Energy Costs for {currentDate.toLocaleDateString("en-AT")}
        </h1>
        <EnergyCostsChart data={data} />
      </div>
    </main>
  );
}
