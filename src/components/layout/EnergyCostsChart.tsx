"use client";

import type { EnergyData } from "~/server/dto/EnergyData";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

const formatXAxis = (tickItem: string) => {
  const date = new Date(tickItem);
  return date.toLocaleTimeString("en-AT", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Europe/Vienna",
  });
};

export default function EnergyCostsChart({ data }: { data: EnergyData[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={isMobile ? "h-[500px]" : "h-[400px]"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            interval={isMobile ? 16 : 10}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
            angle={isMobile ? -15 : 0}
            height={isMobile ? 80 : 50}
          />
          {!isMobile && (
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(2)}ct`}
              width={50}
            />
          )}
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
  );
}
