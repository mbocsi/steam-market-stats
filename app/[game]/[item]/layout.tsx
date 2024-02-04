import ItemTitle from "./itemtitle";
import ItemStats from "./itemstats";
import { getItem, getApp } from "@/app/lib/dbrequests";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    game: string;
    item: string;
  };
}) {
  const { game, item } = params;
  const iteminfo = await getItem(decodeURIComponent(item));
  const appinfo = await getApp(parseInt(game));
  return (
    <div className="min-h-screen flex flex-column">
      <div className="p-16 pt-24 pb-0 text-black min-h-screen bg-white w-full flex flex-col gap-12">
        <ItemTitle app={appinfo} item={iteminfo} />
        <ItemStats game={game} item={item}>
          {children}
        </ItemStats>
      </div>
    </div>
  );
}
