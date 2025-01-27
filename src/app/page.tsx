import EnergyCostsChart from "~/components/layout/EnergyCostsChart";
import { getEnergyDataByDate } from "~/server/db/crud";

export default async function Home() {
  const currentDate = new Date();
  const data = await getEnergyDataByDate(
    currentDate.toISOString().split("T")[0]!,
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-4 text-center text-2xl font-bold sm:mb-8 sm:text-3xl md:text-4xl">
          Energy Costs for {currentDate.toLocaleDateString("en-AT")}
        </h1>
        {data.length > 0 ? (
          <EnergyCostsChart data={data} />
        ) : (
          <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl md:text-3xl">
            No data available for this date
          </h2>
        )}
      </div>
    </main>
  );
}
