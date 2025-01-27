import EnergyCostView from "~/components/layout/EnergyCostView";

export default async function Home() {
  const currentDate = new Date();
  return <EnergyCostView date={currentDate} />;
}
