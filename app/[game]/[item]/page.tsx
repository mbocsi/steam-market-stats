import ItemSummary from "./itemsummary";

export const revalidate = 60;

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
