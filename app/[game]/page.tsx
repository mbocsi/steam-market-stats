import GameTitle from "./title";
import prisma from "@/prisma/db";
import { getPopularGameItems } from "../lib/requests";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 30;

export default async function Page({ params }: { params: { game: string } }) {
  prisma.$connect();
  const game = await prisma.app.findUnique({
    where: { appId: parseInt(params.game) },
  });
  prisma.$disconnect();

  if (game) {
    const response = await getPopularGameItems(game.appId, 10);
    const items = response.results.map((item: any) => {
      return {
        name: item.name,
        game: item.app_name,
        appid: item.asset_description.appid,
        sell_price: item.sell_price_text,
        icon: `http://cdn.steamcommunity.com/economy/image/${item.asset_description.icon_url}`,
      };
    });
    return (
      <div className="min-h-screen flex flex-col bg-white text-black">
        <GameTitle gameInfo={game} />
        <div className="px-8 flex flex-col gap-4">
          <Link
            href={`/${game.appId}/popular`}
            className="hover:text-blue-400 w-fit"
          >
            <header className="text-4xl font-bold">Popular items {">"}</header>
          </Link>

          <div className="flex flex-row overscroll-x-contain overscroll-y-contain no-scrollbar overflow-scroll">
            {items.map((item: any) => {
              return (
                <Link
                  href={item.appid ? `/${item.appid}/${item.name}` : "/"}
                  key={item.name}
                  className="flex flex-row items-center space-x-2 py-2 px-2 rounded-full bg-neutral-800 bg-opacity-0 hover:bg-opacity-5 truncate basis-1/4 flex-shrink-0"
                >
                  <Image
                    src={item.icon}
                    width={56}
                    height={56}
                    alt={`Icon for ${item.name}`}
                    className="bg-slate-200 aspect-square object-contain rounded-full p-2"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="font-bold text-xl">{item.sell_price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-32 bg-white text-black min-h-screen">
        <header className="text-8xl font-bold">Unknown game</header>
      </div>
    );
  }
}
