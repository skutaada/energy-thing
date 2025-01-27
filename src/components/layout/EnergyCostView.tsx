import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Suspense } from "react";
import EnergyCostCard from "./EnergyCostCard";
import { Skeleton } from "../ui/skeleton";

export default async function EnergyCostView({ date }: { date: Date }) {
  const previousDate = new Date(date.getTime() - 86400000)
    .toISOString()
    .split("T")[0];
  const nextDate = new Date(date.getTime() + 86400000)
    .toISOString()
    .split("T")[0];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-4 text-center text-2xl font-bold sm:mb-8 sm:text-3xl md:text-4xl">
          Energy Costs for {date.toLocaleDateString("en-AT")}
        </h1>
        <div className="mb-4 flex justify-center gap-4">
          <Link href={`/${previousDate}`}>
            <Button variant="outline">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Today</Button>
          </Link>
          <Link href={`/${nextDate}`}>
            <Button variant="outline">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Suspense
          fallback={<Skeleton className="h-[512px] w-full rounded-xl" />}
        >
          <EnergyCostCard date={date} />
        </Suspense>
      </div>
    </main>
  );
}
