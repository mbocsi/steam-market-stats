import ItemSummary from "./itemsummary";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: {
    game: string;
    item: string;
  };
}) {
  const { item, game } = params;
  return <ItemSummary itemHash={item} appId={parseInt(game)} />;
}
