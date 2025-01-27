"use client";

import type { EnergyData } from "~/server/dto/EnergyData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatXAxis = (tickItem: Date) => {
  return tickItem.toLocaleTimeString("en-AT", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function EnergyCostsChart({ data }: { data: EnergyData[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Energy Cost Variation</CardTitle>
        <CardDescription>
          Cost per kWh over 24 hours (15-minute intervals)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                interval={8}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(2)}ct`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.[0]) {
                    const data = payload[0].payload as EnergyData;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Time
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {formatXAxis(data.date)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Cost
                            </span>
                            <span className="font-bold">
                              {(data.value / 1000).toFixed(2)}ct
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
