import { getItemOrders } from "@/app/lib/requests";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export const revalidate = 10;

export default async function Page({
  params,
}: {
  params: { game: string; item: string };
}) {
  const prisma = new PrismaClient();
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
    const orders = await getItemOrders(item.itemNameId);
    return (
      <div className="min-h-screen flex flex-column">
        <div className="p-16 pt-24 pb-0 text-black min-h-screen bg-white w-full flex flex-col gap-12">
          <div className="flex flex-row items-center gap-10">
            <div className="aspect-square flex items-center bg-slate-200 rounded-full p-4">
              <Image
                src={`http://cdn.steamcommunity.com/economy/image/${item.itemIcon}`}
                width={150}
                height={150}
                alt={`Icon for ${item.itemName}`}
                className=""
              ></Image>
            </div>
            <div className="flex flex-col h-full justify-between">
              <header className="text-6xl">{item.itemName}</header>
              <Link href={`/${game.appId}`}>
                <p className="text-xl text-cyan-500">{game.appName}</p>
              </Link>

              <p className="text-6xl font-semibold">
                {orders["price_prefix"] +
                  (orders["lowest_sell_order"] * 0.01).toFixed(2)}
              </p>
              <p className="opacity-50">At {timestamp.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-column">
        <div className="p-16 pt-24 pb-0 text-black min-h-screen bg-white w-full flex flex-col gap-12">
          <header className="text-6xl font-bold">Unknown Item</header>
        </div>
      </div>
    );
  }
}
