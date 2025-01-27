import EnergyCostView from "~/components/layout/EnergyCostView";

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const dateString = (await params).date;
  const date = new Date(dateString);
  return <EnergyCostView date={date} />;
}
