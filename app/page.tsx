import { FaSearch, FaAngleDown } from "react-icons/fa";
import { getPopularItems } from "@/app/lib/requests";
import SearchBar from "@/app/ui/searchbar";
import TopItems from "@/app/ui/topitems";

export const revalidate = 10;

export default async function Page() {
  const response = await getPopularItems();
  const popItems = response.results.map((item: any) => {
    return {
      name: item.name,
      game: item.app_name,
      appid: item.asset_description.appid,
      sell_price: item.sell_price_text,
      icon: `http://cdn.steamcommunity.com/economy/image/${item.asset_description.icon_url}`,
    };
  });
  // const popItems = top3items;

  return (
    <main className="flex min-h-screen flex-col">
      <div className="min-h-screen p-32 pb-0 bg-[url('/dark1.jpg')] flex flex-col gap-12">
        <header className="text-8xl w-2/3 font-bold my-12">
          Steam Market Statistics
        </header>
        <p className="text-2xl font-semibold">
          Find complete market statistics on any item from any game on steam.
        </p>
        <SearchBar placeholder="Search items here" href="/search" />
        <TopItems items={popItems} />
        <div className="mt-auto flex flex-col items-center animate-bounce">
          <div></div>
          <FaAngleDown></FaAngleDown>
        </div>
      </div>
    </main>
  );
}
