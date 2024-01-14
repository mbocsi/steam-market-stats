import { games } from "@/app/lib/games";
import { getItemCurrent } from "@/app/lib/requests";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { game: string; item: string };
}) {
  const gameInfo: GameElement | undefined = games.find(
    (x) => x.page === params.game
  );
  const hashName: string = params.item;
  const itemName: string = decodeURIComponent(hashName);
  const timestamp = new Date();
  const currentInfo = gameInfo
    ? await getItemCurrent(gameInfo.appid, hashName)
    : undefined;

  if (gameInfo && currentInfo) {
    return (
      <div className="min-h-screen flex flex-column">
        <div className="p-16 pt-24 pb-0 text-black min-h-screen bg-white w-full flex flex-col gap-12">
          <div className="flex flex-row items-center gap-10">
            <div className="aspect-square flex items-center bg-slate-200 rounded-full p-4">
              <Image
                src="http://cdn.steamcommunity.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQwnfCcJmxDv9rhwIHZwqP3a-uGwz9Xv8F0j-qQrI3xiVLkrxVuZW-mJoWLMlhpWhFkc9M"
                width={150}
                height={150}
                alt={`Icon for ${itemName}`}
                className=""
              ></Image>
            </div>
            <div className="flex flex-col h-full justify-between">
              <header className="text-6xl">{itemName}</header>
              <Link href={`/${gameInfo.page}`}>
                <p className="text-xl text-cyan-500">{gameInfo.name}</p>
              </Link>

              <p className="text-6xl font-semibold">
                {currentInfo.lowest_price}
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
        <header className="text-6xl font-bold">Unknown Item</header>
      </div>
    );
  }
}
