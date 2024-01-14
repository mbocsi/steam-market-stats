import { FaSearch, FaAngleDown } from "react-icons/fa";
import { getPopularItems } from "@/app/lib/requests";
import TopItems from "@/app/ui/topitems";
import { top3items } from "@/app/lib/placholderdata";

export default async function Page() {
  // const response = await getPopularItems();
  // const popItems = response.results.map((item: any) => {
  //   return {
  //     name: item.name,
  //     game: item.app_name,
  //     sell_price: item.sell_price_text,
  //     icon: `http://cdn.steamcommunity.com/economy/image/${item.asset_description.icon_url}`,
  //   };
  // });

  const popItems = top3items;

  return (
    <main className="flex min-h-screen flex-col">
      <div className="min-h-screen p-32 pb-0 bg-[url('/dark1.jpg')] flex flex-col gap-12">
        <header className="text-8xl w-2/3 font-bold my-12">
          Steam Market Statistics
        </header>
        <p className="text-2xl font-semibold">
          Find complete market statistics on any item from any game on steam.
        </p>
        <div className="p-3 rounded-full bg-white w-fit flex text-black items-center space-x-3">
          <button className="rounded-full bg-gray-300 bg-opacity-0 p-3 hover:bg-opacity-50 duration-200">
            <FaSearch size="2em" />
          </button>
          <input
            className="focus:outline-none text-3xl bg-transparent"
            placeholder="Search items here"
          ></input>
        </div>
        <TopItems items={popItems} />
        <div className="mt-auto flex flex-col items-center animate-bounce">
          <div></div>
          <FaAngleDown></FaAngleDown>
        </div>
      </div>
    </main>
  );
}
