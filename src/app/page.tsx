import EnergyCostView from "~/components/layout/EnergyCostView";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currentDate = new Date(
    new Date().toLocaleDateString("en-US", {
      timeZone: "Europe/Vienna",
    }),
  );
  return <EnergyCostView date={currentDate} />;
}
