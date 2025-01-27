import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getEnergyDataByDate } from "~/server/db/crud";
import EnergyCostChart from "./EnergyCostChart";

export default async function EnergyCostCard({ date }: { date: Date }) {
  const data = await getEnergyDataByDate(date.toISOString().split("T")[0]!);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Energy Cost Variation</CardTitle>
        <CardDescription>
          Cost per kWh over 24 hours (15-minute intervals)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <EnergyCostChart data={data} />
        ) : (
          <h2 className="text-center text-xl font-bold sm:text-2xl md:text-3xl">
            No data available for this date
          </h2>
        )}
      </CardContent>
    </Card>
  );
}
