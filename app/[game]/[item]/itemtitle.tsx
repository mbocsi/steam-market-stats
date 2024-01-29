import Image from "next/image";
import Link from "next/link";

export default async function ItemTitle(props: any) {
  const { item, game, priceOverview, timestamp } = props;
  return (
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
        <div className="flex flex-row align-bottom">
          <p className="text-6xl font-semibold">
            {priceOverview ? priceOverview["lowest_price"] : "Error"}
          </p>
          <div className="flex flex-col justify-end">
            <p className="opacity-50 ml-2">
              {priceOverview ? priceOverview["volume"] : "Unknown"} sold in last
              24 hours
            </p>
          </div>
        </div>
        <p className="opacity-50 font-semibold">
          At {timestamp.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
