import { getItemCurrent, getItemOrders } from "@/app/lib/requests";
import ItemTitle from "@/app/[game]/[item]/itemtitle";
import prisma from "@/prisma/db";
import ItemStats from "@/app/[game]/[item]/itemstats";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { game: string; item: string };
}) {
  prisma.$connect();
  const game = await prisma.app.findUnique({
    where: { appId: parseInt(params.game) },
  });
  const hashName: string = decodeURIComponent(params.item);
  const item = await prisma.item.findUnique({
    where: { itemHashName: hashName },
  });
  const timestamp = new Date();
  prisma.$disconnect();

  if (game && item) {
    let priceOverview;
    try {
      priceOverview = await getItemCurrent(730, item.itemHashName);
    } catch (Error) {
      console.log(Error);
    }

    let orders;
    try {
      orders = await getItemOrders(item.itemNameId);
    } catch (Error) {
      console.log(Error);
    }
    return (
      <>
        <ItemTitle
          game={game}
          item={item}
          priceOverview={priceOverview}
          timestamp={timestamp}
        />
        <ItemStats item={item} orders={orders} />
      </>
    );
  } else {
    return <header className="text-6xl font-bold">Unknown Item</header>;
  }
}
